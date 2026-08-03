# Grill-me Reverse Interviewing Framework

The **Grill-me Framework** is a structured, interactive reverse-questioning technique used in **Stage 2** by `design-strategist`. It transforms a vague user prompt (e.g., *"Make an idle RPG"*) into a comprehensive, production-ready **Game Design Document (GDD)**.

## Core Interviewing Principles

1. **Layered Deconstruction**: Never ask 10 questions at once. Ask 2–3 focused questions per tier.
2. **Options-Driven Questions**: For every major design choice, offer **2–4 concrete options** with trade-offs.
3. **User Retains Steering**: The agent proposes architectural choices, but the user selects the direction.
4. **MDA Alignment**: Structure questions around **Mechanics** (rules/verbs), **Dynamics** (player behavior/systems), and **Aesthetics** (feel/art/audio).

---

## Step 0 — Fun Hypothesis & Design Pillars (强制前置)

Force out the two anchors **before any Tier question**. Do not proceed to Tier 1 until both exist.

- **Fun Hypothesis**: One sentence completing "这游戏好玩的核心是 ____". If it cannot be written, the concept is not formed — keep probing raw verbs in Tier 1, never jump to systems/economy.
  - ✗ "一个修仙放置游戏" — that is a genre, not fun.
  - ✓ "好玩的核心是——用最低操作成本看到数值滚雪球式的膨胀反馈."
- **Design Pillars**: Derive 3–5 *falsifiable experience statements* from the hypothesis. Every later mechanic and number is filtered through them; a new system serving no pillar is cut or redone.

For the full procedural method — three-layer loop, economy ledger, tuning discipline, juice spec, system matrix, failure signals — load `references/systems-mechanics.md`.

## 4-Tier Interviewing Matrix

### Tier 1: Core Verb & Game Loop (Mechanics)
- **Primary Action**: What is the player doing 80% of the time? (e.g., Real-time action combat, Turn-based tactical, Idle auto-battle, Bullet heaven/survivor).
- **Core Loop**: What is the primary loop? (Kill Monster ➔ Loot Equipment ➔ Upgrade Gear ➔ Challenge Boss).
- **Player Input Model**: Keyboard (WASD + 1-5 skills), Touch/Click-to-move, or Fully automated with manual skill triggers?

### Tier 2: World & Visual/Audio Aesthetic (Aesthetics)
- **Art Direction**: Pixel art retro, Dark fantasy glassmorphism, Vector anime, Minimalist neon?
- **World & Map Structure**: Seamless single map with safe/wild/boss zones, Level-based stage select, or Infinite scrolling dungeon?
- **Level Shape Language**: Linear corridor (pacing-driven), Hub & spokes (choice-driven), Open field (exploration-driven), or Labyrinth (deliberate disorientation)? *(形状由玩法决定，不由美术主题决定——见 `references/level-design.md §2`)*
- **Pacing Preference**: Relentless tension (action), Alternating tension/release (adventure), or Explore-then-explode (survival/roguelike)? *(对应 `level-design.md §3` 的弧线类型)*
- **Mechanic Teaching Style**: Environment-only teaching (no text popups), Light tutorial overlays, or Skip teaching (assume player knowledge)? *(决定 `level-design.md §8` 空间教学阶梯的强度)*
- **Exploration Reward Density**: Dense (every corner has loot), Sparse (rewards are landmarks), or Hidden-optional (rewards require backtracking)?
- **VFX & Juice**: Screen shake, floating combat text (FCT), particle trails, boss break-bar animations?

### Tier 3: Progression, Stats & Economy (Dynamics)
- **Character Classes**: Single flexible hero, or Multi-class system (e.g., Tank, Warrior, Mage, Taoist)?
- **Gear Rarity Tiering**: 5-tier standard (Common, Uncommon, Rare, Epic, Legendary, Mythic)?
- **Gold Sink & Trading**: Vendor shop only, or Player Auction House ("集肆") with 5% transaction tax to prevent inflation?

### Tier 4: Endgame & Special Mechanics (USP - Unique Selling Points)
- **Skill Tree / Talents**: Branching talent tree (e.g., Combat, Survival, Mastery)?
- **Boss Break/Interrupt Mechanics**: Boss cast bar interruptible by player skills?
- **Cloud Persistence**: Guest local storage fallback + Serverless cloud save (Turso LibSQL)?

---

## Example Interview Interaction

> **Agent (`design-strategist`)**:
> "I see you want to build a *Pixel Art修仙 (Cultivation) Idle RPG*. Let's sharpen Tier 1 (Core Verb):
> 
> 1. **Combat Style**:
>    - Option A: *Real-time Action* (WASD movement, manual skill keys, dodge rolls).
>    - Option B: *Semi-Auto Idle* (Auto-attack monsters, manual/auto ultimate skills) — *(Recommended for Idle RPG)*.
>    - Option C: *Turn-based Tactical* (Speed-based action bar).
> 
> 2. **Cultivation Loop**:
>    - Option A: Meditate for Qi ➔ Breakthrough Realm (练气➔筑基➔金丹) ➔ Craft Pills.
>    - Option B: Monster Slaying ➔ Spirit Core Collection ➔ Gear Refinement & Alchemy.
> 
> Which options fit your vision best?"

---

## Output Contract

Upon completing the interview, output the finalized GDD using the standard template in `references/gdd-template.md` and save it to `docs/GDD.md`.

## Exit Criteria (访谈完成判定)

The grill-me interview is DONE only when ALL hold:

1. **Fun Hypothesis** written and it implies ≥1 testable player decision.
2. **3–5 Design Pillars** set, each falsifiable.
3. **Three-layer core loop** drafted (moment / session / long-term) — see `systems-mechanics.md §3`.
4. **Economy Sources/Sinks ledger** balanced (every resource has a sink) — see `systems-mechanics.md §5`.
5. **Key numbers** carry a rationale or are tagged `[PLACEHOLDER]` — see `systems-mechanics.md §6`.
6. **System interaction matrix** seeded (top pairs flagged intended/acceptable/bug) — see `systems-mechanics.md §8`.
7. **Level Intent** written and it implies ≥1 unique, non-reusable layout decision — see `level-design.md §1`.
8. **Shape Language** annotated per segment (Linear/Hub/Open/Labyrinth) — see `level-design.md §2`.
9. **Pacing Chart** has no flatline (tension varies; peak preceded by a difficulty ramp) — see `level-design.md §3`.
10. **Flow Diagram** drawn: every fork has a visible optional reward + merge point; no true dead ends — see `level-design.md §4`.
11. **Encounter Table** filled: every encounter has entry read time, ≥2 tactical options, and a fallback position — see `level-design.md §5`.
12. **Navigation readability checklist** all boxes ticked (3-second exit test, light guidance, no fake-exit dead ends) — see `level-design.md §6`.

If any fails, keep interviewing or patch the GDD — do not pass Gate 2.
