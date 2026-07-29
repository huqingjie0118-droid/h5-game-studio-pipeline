# Grill-me Reverse Interviewing Framework

The **Grill-me Framework** is a structured, interactive reverse-questioning technique used in **Stage 2** by `design-strategist`. It transforms a vague user prompt (e.g., *"Make an idle RPG"*) into a comprehensive, production-ready **Game Design Document (GDD)**.

## Core Interviewing Principles

1. **Layered Deconstruction**: Never ask 10 questions at once. Ask 2–3 focused questions per tier.
2. **Options-Driven Questions**: For every major design choice, offer **2–4 concrete options** with trade-offs.
3. **User Retains Steering**: The agent proposes architectural choices, but the user selects the direction.
4. **MDA Alignment**: Structure questions around **Mechanics** (rules/verbs), **Dynamics** (player behavior/systems), and **Aesthetics** (feel/art/audio).

---

## 4-Tier Interviewing Matrix

### Tier 1: Core Verb & Game Loop (Mechanics)
- **Primary Action**: What is the player doing 80% of the time? (e.g., Real-time action combat, Turn-based tactical, Idle auto-battle, Bullet heaven/survivor).
- **Core Loop**: What is the primary loop? (Kill Monster ➔ Loot Equipment ➔ Upgrade Gear ➔ Challenge Boss).
- **Player Input Model**: Keyboard (WASD + 1-5 skills), Touch/Click-to-move, or Fully automated with manual skill triggers?

### Tier 2: World & Visual/Audio Aesthetic (Aesthetics)
- **Art Direction**: Pixel art retro, Dark fantasy glassmorphism, Vector anime, Minimalist neon?
- **World & Map Structure**: Seamless single map with safe/wild/boss zones, Level-based stage select, or Infinite scrolling dungeon?
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
