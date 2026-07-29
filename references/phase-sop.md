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
4. **Gate 2**: User reviews and approves `GDD.md`.

## Stage 3: Asset Generation (免费文生图)
1. Read `docs/免费文生图.md` and GDD requirements.
2. Spawn `art-director` to craft image prompts for `agnes-ai` (using model `agnes-image-2.1-flash`).
3. Generate:
   - Character Class Art (`art-app/assets/<class>_front.png`)
   - 16 Weapon Icons (`assets/weapons/<weaponType>.png`)
   - Skill Icons (`art-app/assets/icon_<skillName>.png`)
4. Process transparent backgrounds if needed (`make_transparent.py`).
5. **Gate 3**: Verify image files exist, have non-zero size, and match expected paths.

## Stage 4: Asset Integration (Canvas 2D 接入)
1. Spawn `engineering-lead` to connect asset paths to `config.js`:
   - `CLASSES[classKey].frontImg = 'art-app/assets/<classKey>_front.png'`
   - `WEAPON_TYPES[type].icon = 'assets/weapons/<type>.png'`
   - `SKILLS[id].img = 'art-app/assets/icon_<name>.png'`
2. Ensure rendering fallback logic (`getEquipmentIconHTML`) functions correctly.
3. Run test suites (`tools/_test_auction.js`, `tests/ui-panel-registry-check.js`).
4. **Gate 4**: All logic & UI registry tests return 100% PASS.

## Stage 5: Vercel Deployment (Vercel 部署)
1. Spawn `release-ops-lead`.
2. Ensure `vercel.json` rewrite rules for `/api/(.*)` -> `api/index.js` are in place.
3. Execute `npx vercel --prod` (or verify deployment configuration).
4. Perform HTTP GET health check on deployed URL (`/api/health`).
5. **Gate 5**: Online game URL is accessible, authenticated cloud save & auction house functional.
