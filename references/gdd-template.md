# Master Game Design Document (GDD) Template

> **Game Title**: [Game Name]  
> **Version**: v1.0.0  
> **Target Platform**: Web H5 Canvas 2D (Mobile & Desktop)  
> **Author**: `design-strategist`  

---

## 1. Executive Summary & Pillars
- **Logline**: [1-sentence elevator pitch]
- **Core Genre**: [e.g. Canvas 2D ARPG / Idle RPG]
- **Design Pillars**:
  1. *Pillar 1*: [e.g. Visceral Combat & Combo Scaling]
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

## 6. Asset & Visual Spec Manifest
- **Character Art**: `art-app/assets/<classKey>_front.png` (512x512 PNG)
- **Weapon Icons**: `assets/weapons/<weaponType>.png` (512x512 PNG)
- **Skill Badges**: `art-app/assets/icon_<skillId>.png` (256x256 PNG)
