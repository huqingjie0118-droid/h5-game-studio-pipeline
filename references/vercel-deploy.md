# Vercel Deployment Runbook

Guide for deploying the H5 Canvas 2D game to Vercel Serverless environment.

## Architecture & Configuration
- **Serverless API Gateway**: `api/index.js`
- **Routing Configuration**: `vercel.json`
```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/index.js" }
  ]
}
```

## Required Environment Variables
- `TURSO_DATABASE_URL`: Cloud LibSQL database endpoint (e.g. `libsql://legends-db-huqingjie.aws-ap-northeast-1.turso.io`)
- `TURSO_AUTH_TOKEN`: LibSQL database Bearer token

## Deployment Execution Command
```bash
npx vercel --prod
```

## Verification Checklist
1. Ping `/api/health` -> verify `{ ok: true, env: "vercel-serverless" }`.
2. Test user registration & login -> verify JWT Bearer token generation.
3. Test save/load isolation -> verify `save:${userId}:${slot}` database partition.
4. Test auction endpoints (`/api/auction/list`, `/api/auction/create`, `/api/auction/buy`).
