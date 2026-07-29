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
- **Role**: Chief Architect & Game Developer
- **Tasks**: Canvas 2D engine integration, asset loading logic in `config.js`, API gateway implementation, test execution.
- **Outputs**: Code modifications, runnable game state.

## 4. art-director (林绘澄 - 美术总监)
- **Role**: Visual Director & Asset Production Lead
- **Tasks**: Visual spec creation, `agnes-ai` prompt construction, asset batch generation and transparent background processing.
- **Outputs**: PNG assets in `art-app/assets/` and `assets/weapons/`.

## 5. audio-director (阮和鸣 - 音乐音效)
- **Role**: Audio Director
- **Tasks**: SFX and background music mapping strategy.

## 6. quality-lead (严守真 - 质量把控)
- **Role**: QA Lead
- **Tasks**: Test suite execution, smoke testing, quality gate verdicts (`PASS` / `CONCERNS` / `FAIL`).

## 7. release-ops-lead (路远行 - 部署与运维)
- **Role**: DevOps & Release Lead
- **Tasks**: Vercel configuration (`vercel.json`), production deployment (`npx vercel --prod`), environment secret verification.
