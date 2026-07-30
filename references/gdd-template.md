# Master Game Design Document (GDD) Template

> **Game Title**: [Game Name]  
> **Version**: v1.0.0  
> **Target Platform**: Web H5 Canvas 2D (Mobile & Desktop)  
> **Author**: `design-strategist`  

---

## 1. Executive Summary & Pillars
- **Logline**: [1-sentence elevator pitch]
- **Core Genre**: [e.g. Canvas 2D ARPG / Idle RPG]
- **Fun Hypothesis**: [One sentence: "好玩的核心是 ____". Written FIRST, before any system. If blank, the concept is not formed.]
- **Design Pillars** (filter for every later decision; cut systems that serve none):
  1. *Pillar 1*: [e.g. Visceral Combat & Combo Scaling — *experience*, not a feature list]
  2. *Pillar 2*: [e.g. Deep Equipment Rarity & Crafting]
  3. *Pillar 3*: [e.g. Serverless Cloud Economy & Auction House]

---

## 2. Core Game Loop & Mechanics
- **Primary Loop**: `[Explore / Fight]` ➔ `[Loot Gear & Gold]` ➔ `[Upgrade / Refine]` ➔ `[Breakthrough / Boss Fight]`
- **Player Controls**:
  - Movement: WASD / Arrow Keys / Click-to-move
  - Skills: Number keys 1–5 / Touch action bar
  - Hotkeys: `B` (Backpack), `K` (Codex), `J` (Auction House), `L` (Quests)
- **Combat Formula**:
  $$\text{Damage} = \text{BaseAtk} \times \left(1 + \frac{\text{AtkPct}}{100}\right) \times \text{SkillMult} \times \text{CritMult} \times (1 - \text{DamageReduce})$$
- **Loop Layers** (three layers, all required — engineering integrates each):
  - *Moment-to-moment (0–30s)*: [action → feedback → reward; e.g. attack → hitstop → crit number]
  - *Session (5–30min)*: [goal → tension → result; e.g. clear map → loot → upgrade → boss]
  - *Long-term (hours–weeks)*: [milestone → unlock → social loop; e.g. realm break → new map → auction wealth]

---

## 3. Class & Progression System
- **Character Classes**: [List classes, e.g. Warrior, Mage, Taoist, Tank]
- **Stat System**:
  - Primary: HP, MP, ATK, MATK, DEF, MDEF
  - Secondary: Crit Rate, Crit Dmg, CDR, Armor Pen, Movement Speed
- **Talent / Skill Tree**:
  - 3 Branches per class (e.g. Combat, Survival, Mastery), 6 Tiers = 18 Nodes per tree.

---

## 4. Level & Map Design
- **World Layout**:
  1. *Safe Zone (主城安全区)*: NPC Traders, Quest Board, Auction House.
  2. *Wild Region (野外练级区)*: Spawning creeps, elites, chest events.
  3. *Boss Domain (Boss 禁地)*: High difficulty Boss with interruptible phase cast-bars.

---

## 5. Equipment & Economy (Gold Sink)
- **Gear Slots**: Weapon, Armor, Helmet, Ring, Necklace, Boots, Belt, Artifact.
- **Rarity Hierarchy**: Common ➔ Uncommon ➔ Rare ➔ Epic ➔ Legendary ➔ Mythic.
- **Auction House ("集肆")**:
  - Serverless cloud database persistence (Turso/LibSQL).
  - 5% transaction fee on buyer side to serve as a permanent gold sink.

---

## 6. Economy Ledger — Sources & Sinks (通胀第一防线)
- **Ledger** (every resource needs a sink; any source without a sink = inflation bomb):
  | Resource | Source (产出) | Sink (消耗) | Net | Risk |
  |----------|---------------|-------------|-----|------|
  | Gold | kill drop / quest / auction sale | 5% tax / enhance / vendor / repair | [PLACEHOLDER] | if source≫sink → inflation |
  | Enhance Stone | dungeon / event | gear enhance | [PLACEHOLDER] | single source may drought → add event |
- **Check**: ① every resource has a sink ② top-tier (Mythic) has destroy/devalue path ③ F2P & payer both have spend path ④ no infinite-compound source.

## 7. Numerical Tuning Appendix
- **Rules**: every number needs a rationale (no magic numbers); tag unknowns `[PLACEHOLDER]`. Growth curve decided before values (exp for snowball / poly for mid / linear for floor).
- **DPS sheet**: `DPS = (Damage × hitRate) / (atkInterval + windup)`. Boss killable in [PLACEHOLDER]s; player dies in [PLACEHOLDER]s.
- **Stacking guard**: percentage bonuses sum, never multiply (avoid 100×10% → 1e10).

## 8. System Interaction Matrix
| System A | System B | Interaction | Type |
|----------|----------|-------------|------|
| Auction | Economy | 5% tax reclaims gold | intended |
| Auction | Class balance | one class' gear priciest → that class floods | acceptable (monitor) |
| Enhance | Economy | enhance spends gold | intended |

## 9. Playtest Failure Signals (define "bad" before testing)
| System | A-fail (redraw) | B-fail (retune) | C-fail (cut) |
|--------|-----------------|-----------------|--------------|
| Core loop | clueless in 30s | repetitive | keep but weaken |
| Economy | 10x inflation by day 3 | local inflation | add sink |
| Numbers | boss 0 kills / player 0 deaths | fight >5min drags | redo curve |

---

## 10. Asset & Visual Spec Manifest
- **Character Art**: `art-app/assets/<classKey>_front.png` (512x512 PNG)
- **Weapon Icons**: `assets/weapons/<weaponType>.png` (512x512 PNG)
- **Skill Badges**: `art-app/assets/icon_<skillId>.png` (256x256 PNG)
