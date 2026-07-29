# Vercel Serverless Deployment & Turso (LibSQL) Cloud Database Guide

This guide details how to configure Vercel Serverless Function API gateways and integrate Turso (LibSQL) cloud-hosted SQLite databases with a 3-tier fallback architecture.

---

## 1. Cloud Database Architecture (Turso / LibSQL)

The game utilizes **Turso** (serverless cloud SQLite based on LibSQL) for 0-cost, high-performance global persistence.

```
                  ┌──────────────────────────────────────────────┐
                  │          Vercel Serverless Gateway           │
                  │                (api/index.js)                │
                  └──────────────────────┬───────────────────────┘
                                         │
                 ┌───────────────────────┼───────────────────────┐
                 │                       │                       │
          [TURSO_URL & TOKEN]     [Local Node.js]        [Serverless Tmp]
                 ▼                       ▼                       ▼
      ┌────────────────────┐   ┌──────────────────┐   ┌────────────────────┐
      │ Tier 1: Turso Cloud│   │ Tier 2: SQLite   │   │ Tier 3: Memory /   │
      │   (LibSQL Client)  │   │  (node:sqlite)   │   │   db.json Fallback │
      └────────────────────┘   └──────────────────┘   └────────────────────┘
```

### Three-Tier Database Fallback System (`server/db.js`)
1. **Tier 1 (Production Cloud)**: If `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` environment variables are present, automatically connects via `@libsql/client`.
2. **Tier 2 (Local Node.js)**: If running locally with Node.js 22+, uses native `node:sqlite` module writing to `server/data/legends.db`.
3. **Tier 3 (Serverless Memory Fallback)**: If in stateless environments without DB keys, safely falls back to JSON file storage in system temporary directory (`os.tmpdir()`).

---

## 2. Serverless Database Schemas

The database initializes 4 primary tables automatically on first request:

```sql
-- 1. Users Table (Account authentication & salt hashes)
CREATE TABLE IF NOT EXISTS users (
  id          TEXT PRIMARY KEY,
  username    TEXT UNIQUE NOT NULL,
  email       TEXT,
  data        TEXT NOT NULL, -- JSON serialized account metadata
  created_at  INTEGER NOT NULL
);

-- 2. Profiles Table (Character level, exp, profession stats)
CREATE TABLE IF NOT EXISTS profiles (
  user_id     TEXT PRIMARY KEY,
  data        TEXT NOT NULL,
  updated_at  INTEGER NOT NULL
);

-- 3. Cloud Saves Table (Strict user-isolated save slots)
CREATE TABLE IF NOT EXISTS saves (
  slot        TEXT PRIMARY KEY, -- Formatted as `save:${userId}:${slotId}`
  data        TEXT NOT NULL,    -- Gold, Backpack items, Equipment, Map state
  updated_at  INTEGER NOT NULL
);

-- 4. Auction House Table ("集肆" Market & 5% Gold Sink)
CREATE TABLE IF NOT EXISTS auctions (
  id          TEXT PRIMARY KEY,
  seller_id   TEXT NOT NULL,
  item        TEXT NOT NULL,    -- JSON serialized item object
  kind        TEXT NOT NULL,    -- 'equip' | 'material'
  price       INTEGER NOT NULL, -- Listing price in gold
  status      TEXT NOT NULL DEFAULT 'open', -- 'open' | 'sold' | 'cancelled' | 'expired'
  created_at  INTEGER NOT NULL,
  expires_at  INTEGER NOT NULL, -- Default created_at + 24 hours
  buyer_id    TEXT
);

CREATE INDEX IF NOT EXISTS idx_auctions_status ON auctions(status, expires_at);
```

---

## 3. Serverless API Routing & Security (`vercel.json`)

Vercel rewrites all `/api/*` traffic to the unified serverless gateway `api/index.js`:

```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/index.js" }
  ]
}
```

### Security & User Isolation Principles
- **Bearer Token Auth**: All save and auction write operations enforce JWT Bearer header inspection (`auth.getMe(token)`).
- **Slot Isolation**: Storage slot keys are forcibly prefixed on the server (`save:${userId}:${slot}`), preventing cross-user save overwrites.
- **Anti-Cheat Item Validation**: Items listed in auctions are verified against the seller's current cloud save to prevent item duplication or ghost listings.

---

## 4. Vercel & Turso Deployment Steps

### Step 1: Create Free Turso Database
```bash
# Install Turso CLI
curl -sCV https://get.tur.so | bash

# Create database and get connection URL
turso db create legends-db
turso db show legends-db --url
# Example: libsql://legends-db-user.aws-ap-northeast-1.turso.io

# Generate auth token
turso db tokens create legends-db
```

### Step 2: Configure Vercel Environment Variables
In Vercel Project Dashboard ➔ Settings ➔ Environment Variables (or via CLI):
- `TURSO_DATABASE_URL` = `libsql://legends-db-user.aws-ap-northeast-1.turso.io`
- `TURSO_AUTH_TOKEN` = `<your-turso-jwt-token>`

### Step 3: Trigger Production Build
```bash
npx vercel --prod
```

### Step 4: Verify Deployment Health
```bash
curl -i https://<your-app>.vercel.app/api/health
# Expected Output: {"ok":true,"ts":1785304500,"env":"vercel-serverless"}
```
