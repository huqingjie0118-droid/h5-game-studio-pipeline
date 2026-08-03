# Phase SOP & Quality Gate Standard

## Stage 1: Studio Orchestration (主理人统筹)
1. Inspect target project files (`index.html`, `config.js`, `server/db.js`, `api/index.js`).
2. Identify existing game features and assets.
3. Formulate a 5-stage milestone plan.
4. **Gate 1**: Present execution plan to user. Obtain explicit approval before proceeding.

## Stage 2: Concept Ideation & GDD (grill-me 拆解)
1. Spawn `design-strategist` in grill-me mode.
2. Ask reverse questions covering:
   - Core Verb & Loop (Combat, Idle, Collection, Economy)
   - Visual Style (Dark Fantasy, Pixel Art, Cyberpunk)
   - Progression & Num System (Level caps, Stat scaling, Equipment rarity)
   - Special Mechanics (Auction house, Skill tree, Boss mechanics)
3. Write complete `docs/GDD.md`.
4. **Gate 2**: User reviews and approves `GDD.md`. Before approval, verify the design gates from `references/systems-mechanics.md`: Fun Hypothesis exists, 3–5 Pillars set, three-layer loop drafted, Sources/Sinks ledger balanced, key numbers have rationale or `[PLACEHOLDER]`. **Additionally verify the level design gates from `references/level-design.md`**: Level Intent written (implies ≥1 unique layout decision), Shape Language annotated per segment, Pacing Chart has no flatline, Flow Diagram drawn (every fork has visible reward + merge, no true dead ends), Encounter Table complete (every encounter has entry read time + ≥2 tactical options + fallback position), navigation readability checklist all ticked. **Also verify the narrative design gates from `references/narrative-design.md`**: Narrative Core written (theme question + logline + narrative pillars), Protagonist Desire/Need conflict set, Beat Sheet with gameplay delivery points per beat, Alignment Matrix with no empty rows (every beat ≥1 gameplay consequence), dialogue sample passes Voice Pillars (real-person test, no as-you-know), Tier 1 critical path comprehensible without optional content, World Bible free of internal contradictions.

## Stage 3: Asset Generation (免费文生图)
1. Read `docs/免费文生图.md` and GDD requirements. **Tech-spec first**: lock asset dimensions & texture memory budget per `references/tech-art.md` §2; plan atlas & pre-bake assets per §3–§4.
2. Spawn `art-director` to craft image prompts for `agnes-ai` (using model `agnes-image-2.1-flash`).
3. Generate:
   - Character Class Art (`art-app/assets/<class>_front.png`)
   - 16 Weapon Icons (`assets/weapons/<weaponType>.png`)
   - Skill Icons (`art-app/assets/icon_<skillName>.png`)
4. Process transparent backgrounds if needed (`make_transparent.py`).
5. **Gate 3**: Verify image files exist, have non-zero size, and match expected paths **plus the tech-art asset checklist** (`tech-art.md` §10 Gate 3): sizes follow the dimension ladder, texture memory within budget, naming compliant, atlas/pre-bake planned, VFX spec table filled.

## Stage 4: Asset Integration (Canvas 2D 接入)
1. Spawn `engineering-lead` to connect asset paths to `config.js`:
   - `CLASSES[classKey].frontImg = 'art-app/assets/<classKey>_front.png'`
   - `WEAPON_TYPES[type].icon = 'assets/weapons/<type>.png'`
   - `SKILLS[id].img = 'art-app/assets/icon_<name>.png'`
2. Ensure rendering fallback logic (`getEquipmentIconHTML`) functions correctly.
3. Run test suites (`tools/_test_auction.js`, `tests/ui-panel-registry-check.js`).
4. **Gate 4**: All logic & UI registry tests return 100% PASS **plus the tech-art render checklist** (`tech-art.md` §10 Gate 4): per-frame drawImage / source-switch / particle / additive counts within budget, zero `filter` / `shadowBlur`, static layers pre-baked, pixel-art integer scaling & HD dpr ≤2, low-tier degradation profile holds 30FPS.

## Stage 5: Vercel Deployment (Vercel 部署与 Turso 云数据库)
1. Spawn `release-ops-lead` (see `references/vercel-deploy.md`).
2. Ensure `vercel.json` rewrite rules for `/api/(.*)` -> `api/index.js` are in place.
3. Configure cloud database secrets in Vercel: `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` (Turso LibSQL SQLite cloud instance).
4. Verify server 3-tier fallback (`Turso Cloud` -> `node:sqlite` -> `db.json fallback`).
5. Execute `npx vercel --prod`.
6. Perform HTTP GET health check on deployed URL (`/api/health`).
7. **Gate 5**: Online game URL is accessible, authenticated cloud save (`save:${userId}:${slot}`) and 5% gold sink auction house (`auctions` table) are fully functional.
