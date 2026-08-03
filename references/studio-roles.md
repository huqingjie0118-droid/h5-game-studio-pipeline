# Studio Roles & Responsibilities

The studio operates on a 1 Orchestrator + 6 Specialist model.

## 1. Orchestrator (主理人)
- **Role**: Lead agent managing the end-to-end game creation pipeline.
- **Tasks**: Phase diagnosis, task routing, quality gate enforcement, stage assembly.
- **Rule**: Never edits code or generates assets directly.

## 2. design-strategist (文策渊 - 系统与游戏设计)
- **Role**: Lead Game Designer
- **Tasks**: GDD ideation via grill-me interviews, core loop design, numerical balance, level layout, economy rules.
- **Outputs**: `docs/GDD.md`

## 3. engineering-lead (程基岩 - 技术主理与代码)
- **Role**: Chief Architect, Game Developer & Engine Performance Lead
- **Tasks**: Canvas 2D engine integration, asset loading logic in `config.js`, API gateway implementation, test execution, **engine & performance** — fixed-timestep loop & interpolation (`engine-optimization.md` §1), performance budget table stood up day 1 (§2), profile-before-optimize SOP (§3), object pooling / dirty flags / spatial-hash collision (§5), progressive loading ≤2MB first paint (§7), dt clamp & background pause (§8), performance HUD (§9), benchmark scenes & regression gates (§10).
- **Outputs**: Code modifications, runnable game state, performance budget table (`docs/PERFORMANCE.md`), benchmark measurements & Gate 4 engine verdict.
- **Tech-art partnership**: owns the engine-side frame budget & code paths; art-director owns the visual-layer budget & asset prep — two halves of one performance plan (总账 vs 分账).

## 4. art-director (林绘澄 - 美术总监)
- **Role**: Visual Director, Asset Production Lead & Technical Artist
- **Tasks**: Visual spec creation, `agnes-ai` prompt construction, asset batch generation and transparent background processing, **technical art** — asset tech specs (dimensions/memory/atlas per `tech-art.md` §2–§3), pre-bake assets (lightmaps/glows/backgrounds per §3–§4), VFX implementation & budget specs (§5), render performance budget compliance (§6), low-tier degradation profiles (§9).
- **Outputs**: PNG assets in `art-app/assets/` and `assets/weapons/`, atlas JSON manifests, pre-baked canvas layers, VFX spec table, Gate 3/4 tech-art checklist verdicts.
- **Tech-art partnership**: implements rendering approaches with `engineering-lead`; owns the visual-layer frame budget, engineering-lead owns the code path that spends it.

## 5. audio-director (阮和鸣 - 音乐音效)
- **Role**: Audio Director
- **Tasks**: SFX and background music mapping strategy.

## 6. quality-lead (严守真 - 质量把控)
- **Role**: QA Lead
- **Tasks**: Test suite execution, smoke testing, quality gate verdicts (`PASS` / `CONCERNS` / `FAIL`).

## 7. release-ops-lead (路远行 - 部署与运维)
- **Role**: DevOps & Release Lead
- **Tasks**: Vercel configuration (`vercel.json`), production deployment (`npx vercel --prod`), environment secret verification.
