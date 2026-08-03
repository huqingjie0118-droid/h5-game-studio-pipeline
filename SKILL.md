---
name: h5-game-studio-pipeline
description: Use when tasked with turning a one-line game idea or concept prompt into a fully realized, online-deployed H5 Canvas 2D web game through a 5-stage studio workflow (Orchestration -> Grill-me GDD -> Asset Gen -> Canvas Integration -> Vercel Deployment).
---

# H5 Game Studio Pipeline

> An open-source, studio-grade agentic workflow skill for transforming a single creative prompt into an online-deployed, playable H5 Canvas 2D web game.

## Overview

The **H5 Game Studio Pipeline** operates on an **Orchestrator Architecture**: a lead agent (acting as Studio Producer / Orchestrator) diagnoses project stage, routes specialist tasks, enforces quality gates, and assembles final deliverables without directly editing code or creating art.

```
                  ┌──────────────────────────────────────────────┐
                  │          Orchestrator (Lead Agent)           │
                  │   Diagnoses ➔ Routes ➔ Gates ➔ Assembles    │
                  └──────┬──────────────┬──────────────┬─────────┘
                         │              │              │
        ┌────────────────┴┐    ┌────────┴────────┐   ┌─┴───────────────┐
        │design-strategist│    │  art-director   │   │engineering-lead │
        │  (grill-me/GDD) │    │(agnes-ai/Assets)│   │ (Canvas2D Code) │
        └─────────────────┘    └─────────────────┘   └─────────────────┘
```

## When to Use

- **Full Lifecycle Game Creation**: User provides a prompt (e.g., *"Build a dark-fantasy pixel idle RPG with an auction house"*) and expects an online-deployed game.
- **Structured GDD Ideation**: Decomposing vague ideas into a rigorous Game Design Document via interactive reverse interviews (*grill-me mode*).
- **Automated AI Asset Pipeline**: Generating and integrating character sprites, weapon PNGs, and skill badges using AI image generation (`agnes-ai`).
- **Canvas 2D Framework Integration**: Integrating generated assets into standard H5 Canvas 2D engines without rewriting core rendering loops.
- **Serverless Production Deployment**: Deploying the game to Vercel with cloud DB persistence (Turso/LibSQL) and environment secret isolation.

Do **NOT** use when:
- Fixing localized syntax bugs or single-function issues (route directly to `engineering-lead`).
- Modifying standard backend APIs without affecting game mechanics or UI design.

---

## The 5-Stage Pipeline

```mermaid
graph TD
    A[User Prompt] --> Stage1[Stage 1: Studio Orchestration]
    Stage1 -->|Gate 1: Plan Approved| Stage2[Stage 2: Grill-me GDD Ideation]
    Stage2 -->|Gate 2: GDD Review PASS| Stage3[Stage 3: AI Asset Generation]
    Stage3 -->|Gate 3: Asset Audit PASS| Stage4[Stage 4: Canvas 2D Integration]
    Stage4 -->|Gate 4: Test Suite PASS| Stage5[Stage 5: Vercel Deployment]
    Stage5 -->|Gate 5: Live URL Verified| Final[Playable Game Live URL]
```

| Stage | Milestone Name | Lead Specialist | Key Deliverable | Quality Gate (Pass Criteria) |
|-------|----------------|-----------------|-----------------|------------------------------|
| **1** | Studio Orchestration | Orchestrator | Execution Plan | User explicit approval of plan |
| **2** | Grill-me GDD Ideation | `design-strategist` | `docs/GDD.md` | Core loop, mechanics & balance complete |
| **3** | AI Asset Generation | `art-director` (+ `agnes-ai`) | PNG Sprites & Icons | Specs, transparency & fallback PASS |
| **4** | Canvas 2D Integration | `engineering-lead` | Runnable Canvas Game | Registry check & test suite 100% PASS |
| **5** | Vercel Deployment | `release-ops-lead` | Live Vercel Production URL | HTTP 200 health check & online play verified |

---

## Workflow Execution SOP

### Stage 1: Studio Orchestration (主理人统筹)
1. Inspect project structure (`index.html`, `config.js`, `server/db.js`, `api/index.js`, `vercel.json`).
2. Identify existing features, assets, and database architecture.
3. Formulate a 5-stage milestone execution plan.
4. **Gate 1**: Present the plan to the user. **Obtain explicit user approval before proceeding.**

### Stage 2: Grill-me GDD Ideation (grill-me 拆解)
1. Spawn `design-strategist` in *grill-me* interview mode (see [grill-me-framework.md](references/grill-me-framework.md)).
2. Conduct reverse questioning across 4 dimensions:
   - **Core Verb & Loop**: Combat, movement, idle progression, resources.
   - **Visual & Audio Aesthetic**: Dark fantasy, pixel art, cyberpunk, VFX.
   - **Progression & Economy**: Stat scaling, gear rarities, gold sinks.
   - **Unique Features**: Auction house, skill trees, boss phases.
3. Provide 2–4 concise options for key design choices.
4. Output structured `docs/GDD.md` (see [gdd-template.md](references/gdd-template.md)).
5. **Quality check**: Before Gate 2, verify the GDD passes both:
   - the [design-principles.md](references/design-principles.md) sanity bars — a 30-second core loop exists, ≥2 Bartle player types are served, reward schedule is mixed, difficulty curve has early wins + breathing room;
   - the [systems-mechanics.md](references/systems-mechanics.md) design gates — a **Fun Hypothesis** is written, **3–5 Design Pillars** filter decisions, the **three-layer core loop** (moment/session/long-term) is drafted, the **Sources/Sinks ledger** is balanced (every resource has a sink), and key numbers carry a rationale or `[PLACEHOLDER]`;
   - the [level-design.md](references/level-design.md) level gates — **Level Intent** written (implies ≥1 unique layout decision), **Shape Language** annotated per segment, **Pacing Chart** has no flatline, **Flow Diagram** drawn (every fork has visible reward + merge, no true dead ends), **Encounter Table** complete (read time + ≥2 tactics + fallback per encounter), **navigation readability checklist** all ticked.
6. **Gate 2**: User reviews and approves GDD.

### Stage 3: AI Asset Generation (免费文生图自动生成)
1. Spawn `art-director` to craft prompts based on `docs/GDD.md`.
2. Invoke `agnes-ai` skill (`agnes-image-2.1-flash`) to generate:
   - Character Class Avatars (`art-app/assets/<class>_front.png`)
   - 16 Weapon Icons (`assets/weapons/<weaponType>.png`)
   - Skill Icons (`art-app/assets/icon_<skillId>.png`)
3. Execute `python scripts/make_transparent.py` to produce clean PNG alpha channels.
4. **Naming discipline**: Generate files following the [design-principles.md](references/design-principles.md) art naming convention (`[type]_[object]_[variant]_[state].png`) and folder layout, so Stage 4 integration is zero-touch mapping (see also [asset-mapping.md](references/asset-mapping.md)).
5. **Gate 3**: Verify image files exist, have non-zero size, and meet resolution specs.

### Stage 4: Canvas 2D Integration (Canvas 2D 自动接入)
1. Spawn `engineering-lead` to map generated assets into `config.js` and engine loops (see [asset-mapping.md](references/asset-mapping.md)).
2. **Pre-flight**: Consult [pitfalls.md](references/pitfalls.md) for integration-time traps — panel lifecycle (P01/P02), asset path mapping (P06), canvas blur/DPR (P03/P04), frame-rate independence (P10), pointer events (P14). Also apply [design-principles.md](references/design-principles.md) perf/architecture rules — fixed-timestep loop, object pooling (P22), dirty-flag updates (P24), draw-call batching (P25), canvas state save/restore balance (P26), tab-hidden pause (P23).
3. Preserve native Canvas 2D rendering pipeline and fallback mechanisms (`PNG -> SVG -> Emoji`).
4. Run automated registry check `node scripts/verify_integration.js` and logic tests.
5. **Gate 4**: All logic tests and integration checks return 100% PASS.

### Stage 5: Vercel Deployment & Cloud DB (Vercel 部署与 Turso 云数据库)
- **Role**: `release-ops-lead`
- **Pre-flight**: Consult [pitfalls.md](references/pitfalls.md) for serverless/static-site traps — no WS/cron (P17), static-site analytics snippet (P16), lockfile merge (P18), non-interactive git push auth (P19), cloud-save isolation (P15).
- **Action**: Configure `vercel.json` and environment variables (`TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`). Verify the server's 3-tier database fallback (`Turso LibSQL Cloud` -> `node:sqlite` -> `db.json fallback`). Execute `npx vercel --prod`.
- **Deliverable**: Live production game link (e.g., `https://<app-name>.vercel.app`) with serverless cloud save (`save:${userId}:${slot}`) and auction house persistence.
- **Gate 5**: HTTP GET health check on `/api/health` and verify cloud save/auction house functionality.

---

## Studio Roles & Subagent Routing Table

| Trigger Keyword / Focus | Spawn Target | Primary Deliverable |
|-------------------------|--------------|---------------------|
| GDD, 概念, 创意, grill-me, 关卡, 地图, 流程, 节奏, 遭遇, 数值, 叙事 | `design-strategist` | System & Game Design, GDD, Grill-me Interview, **Level Design** (see `references/level-design.md`) |
| 架构, 引擎, 代码, 性能, 集成, 接入 | `engineering-lead` | Code Architecture, Canvas 2D Engine Integration |
| 美术, 视觉, 资产规格, 特效, 图标 | `art-director` | Art Specs & `agnes-ai` Image Generation |
| 音乐, 音效, 混音 | `audio-director` | SFX & BGM Implementation Strategy |
| 测试, 冒烟, 回归, 质量门 | `quality-lead` | Test Suite Execution & Gate Verdicts |
| 发布, 部署, vercel, 线上链接 | `release-ops-lead` | Vercel Deployment & Secret Verification |

---

## Iron Laws & Red Flags

> [!IMPORTANT]
> **Core Principle**: Orchestrator orchestrates only. It NEVER writes GDD text, game code, or image files directly.

### Iron Laws
1. **Orchestrator Orchestrates Only**: The lead agent coordinates subagents and enforces quality gates, never writing GDD, code, or assets directly.
2. **Strict Handoff Boundary**: Specialist subagents do not communicate directly; all context handoffs route through the Orchestrator.
3. **No Unapproved Modifications**: File writes require explicit user awareness or approval.
4. **Quality Gates Mandatory**: Stage progression is forbidden until the Quality Gate PASS criteria are met.

### Rationalization Table & Countermeasures

| Agent Rationalization | Reality & Enforcement Rule |
|-----------------------|----------------------------|
| *"The prompt is simple enough to skip Stage 2 grill-me."* | **Forbidden.** Vague prompts lead to mismatched assets and broken Canvas mappings. Grill-me is mandatory. |
| *"Writing code directly in parent context saves tokens."* | **Forbidden.** Violates Orchestrator separation of concerns and pollutes main context window. |
| *"Deployed directly to Vercel without running tests to save time."* | **Forbidden.** Untested serverless code causes silent runtime crashes on Vercel. Run tests first. |

---

## Reference & Utility Guide

- 📄 [studio-roles.md](references/studio-roles.md) — Detailed 7-role prompts & handoff contracts.
- 📄 [phase-sop.md](references/phase-sop.md) — Complete 5-stage SOP & Quality Gate checklists.
- 📄 [grill-me-framework.md](references/grill-me-framework.md) — Grill-me reverse interview framework & options guide.
- 📄 [gdd-template.md](references/gdd-template.md) — Master Game Design Document Markdown template.
- 📄 [asset-gen-spec.md](references/asset-gen-spec.md) — AI Text-to-Image prompt engineering & transparency spec.
- 📄 [asset-mapping.md](references/asset-mapping.md) — Canvas 2D engine asset mapping & fallback spec.
- 📄 [vercel-deploy.md](references/vercel-deploy.md) — Vercel serverless deployment & Turso DB guide.
- ⚠️ [pitfalls.md](references/pitfalls.md) — Known pitfalls & best practices (UI lifecycle, Canvas/WebGL, assets, perf/memory, cross-browser/mobile, backend/deploy, toolchain). 30 entries (P01–P30). Consult before Stage 4 & 5.
- 📐 [design-principles.md](references/design-principles.md) — Design/Art/Multiplayer principles (30-sec core loop, Bartle, art naming & pixel rules, architecture patterns, perf budget, server-authoritative netcode). Route to during Stage 2/3/4 for quality, not just pitfalls.
- 🧩 [systems-mechanics.md](references/systems-mechanics.md) — **游戏系统与机制设计模块**（程序性方法论：Fun Hypothesis → Design Pillars → 三层核心循环 → 机制活检 → 经济 Sources/Sinks 账本 → 数值 Tuning 纪律 → Juice 规格 → 系统交互矩阵 → Playtest 失败信号）。Stage 2 `design-strategist` 主路由，Gate 2 必查。
- 🗺️ [level-design.md](references/level-design.md) — **游戏关卡设计模块**（程序性空间设计方法论：Level Intent → Shape Language → Pacing Arc → Flow Diagram → Encounter Design → Navigation Readability → Environmental Storytelling → 空间教学阶梯 → Blockout Spec → H5 约束 → 关卡 Playtest 失败信号）。与 systems-mechanics.md 并列主路由，Gate 2 必查。
- 🐍 [make_transparent.py](scripts/make_transparent.py) — Automated PNG alpha transparency tool.
- ⚡ [verify_integration.js](scripts/verify_integration.js) — Automated integration & asset registry check script.
