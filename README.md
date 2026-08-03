# H5 Game Studio Pipeline Skill 🎮

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![AgentSkills Spec](https://img.shields.io/badge/AgentSkills-Compliant-blue.svg)](https://agentskills.io/specification)

An open-source, studio-grade agentic workflow skill for AI coding assistants (Google Antigravity, Claude Code, AGY, WorkBuddy). Transforms a single creative prompt into an online-deployed, playable H5 Canvas 2D web game on Vercel.

---

## 🌟 Key Features

1. **Studio Orchestrator Model**: Producer lead manages 6 specialist subagents (`design-strategist`, `art-director`, `engineering-lead`, etc.) with strict Hand-off Contracts.
2. **Grill-me Reverse Interviewing**: Interactively decomposes vague game prompts into a structured Game Design Document (`docs/GDD.md`).
3. **Four Procedural Design Modules**: 系统与机制 (`systems-mechanics.md`)、关卡空间 (`level-design.md`)、叙事意义 (`narrative-design.md`)、技术美术 (`tech-art.md`)——每个模块自带执行顺序铁律、模板与质量门检查项。
4. **AI Text-to-Image Pipeline**: Batch-generates character sprites, weapon PNGs, and skill badges via `agnes-ai` free image generation protocol.
5. **Canvas 2D Engine Integration**: Automatically maps generated images to `config.js` rendering loops with PNG ➔ SVG ➔ Emoji fallbacks.
6. **Serverless Cloud Deployment**: One-command Vercel production deployment with LibSQL database cloud persistence & environment secret safety.

---

## 🚀 Quick Start

### Installation

Copy the `h5-game-studio-pipeline` directory into your agent skills location:

```bash
# For Google Antigravity / Agentic coding tools:
~/.gemini/config/skills/h5-game-studio-pipeline/

# For Claude Code:
~/.claude/skills/h5-game-studio-pipeline/

# For WorkBuddy:
~/.workbuddy/skills/h5-game-studio-pipeline/
```

### Usage

Provide a single prompt or game concept in chat:

```text
"做个像素风御灵修仙放置挂机游戏，包含五行克制和玩家拍卖行"
```

The agent will load `h5-game-studio-pipeline` and initiate **Stage 1 (Orchestration)** followed by **Stage 2 (Grill-me GDD Interview)**.

---

## 📂 Skill Architecture

```
h5-game-studio-pipeline/
├── SKILL.md                          # Core Orchestrator guide & Skill Spec
├── LICENSE                           # MIT License
├── README.md                         # Documentation
├── references/
│   ├── studio-roles.md               # Studio 7-Role Architecture & Subagent Routing
│   ├── phase-sop.md                  # 5-Stage SOP & Quality Gates (Gate 1~5)
│   ├── grill-me-framework.md         # Reverse Interviewing Protocol
│   ├── systems-mechanics.md          # 游戏系统与机制设计模块 (Fun Hypothesis→Pillars→Loop→Economy→Tuning→Juice→Matrix→Signals)
│   ├── level-design.md               # 游戏关卡设计模块 (Intent→Shape→Pacing→Flow→Encounter→Readability→Storytelling→Blockout→Patterns→Cross-check)
│   ├── narrative-design.md           # 游戏叙事设计模块 (Core→Characters→Beats→Alignment→Dialogue→Lore→Patterns→Cross-check)
│   ├── tech-art.md                   # 技术美术设计模块 (Cost Model→Asset Specs→Atlas→Lighting→VFX→Budget→Pixel/HD→Mobile Tiers→Gate Reviews)
│   ├── design-principles.md          # Design/Art/Multiplayer Principles & Quality Bars
│   ├── pitfalls.md                   # Known Pitfalls & Best Practices (P01~P30)
│   ├── gdd-template.md               # Master Game Design Document Template
│   ├── asset-gen-spec.md             # AI Asset Generation & Prompting Standards
│   ├── asset-mapping.md              # Canvas 2D Engine Asset Mapping Guide
│   └── vercel-deploy.md              # Vercel Deployment & Cloud Secret Guide
└── scripts/
    ├── make_transparent.py           # Automated PNG Alpha Transparency Tool
    └── verify_integration.js         # Automated Integration & Registry Checker
```

---

## 📜 License

Distributed under the MIT License. Free for commercial and non-commercial use.
