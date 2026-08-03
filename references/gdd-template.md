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
- **Narrative Pillar** (1–2 条，从 Fun Hypothesis 推导，服务不到即砍；详见 `references/narrative-design.md §1`):
  1. *Narrative Pillar*: [e.g. "力量皆有代价"——每次变强伴随可感的叙事损耗；必须是可证伪的体验陈述]

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
> 完整方法论见 `references/level-design.md`。以下每一项都是 Gate 2 检查项，缺一项 = GDD 不完整。

### 4.1 Level Intent（关卡意图）
- **Player Fantasy**: [一句话：玩家走出这关时心里装着什么感受；必须推导出 ≥1 个本关独有的布局决策，否则这关没有存在理由]
- **记忆点 (Must-Remember Moment)**: [本关唯一的高潮/记忆场景，如"从猎手变猎物"的倒转]

### 4.2 Shape Language（形状语言）
- **整体形状**: [Linear / Hub / Open / Labyrinth —— 由 Fun Hypothesis 决定，不由美术主题决定]
- **分段形状**（混合时必填）: [如 线性开场 → 枢纽中段 → 线性高潮；每段显式标注]

### 4.3 Pacing Arc（节奏弧线）
- **弧线**: `Tension → Release → Escalation → Climax → Resolution`（不许平线；高潮前必须有强度阶梯）
- **Pacing Chart**:

```
Time   | Activity Type | Tension | Notes
-------|---------------|---------|------------------------------
[0:00] | [叙事/探索]   | [Low]   | [本段服务什么意图]
[1:30] | [遭遇 E01]    | [Med]   | [教学/机制实例]
...    | ...           | ...     | ...
```

### 4.4 Flow Diagram（流程图）
```
[Entry] → [T] → [E01] → [J01] ──→ [主线…]
                              ├──→ [R01 支线奖励·必须从岔路可见]
                              └──→ [Merge] → [E04 高潮] → [Exit]
```
- **黄金法则**: 每条岔路 = 1 条明显主线 + 1 条奖励可见的支线；支线出口必须回汇主线；禁真死路。

### 4.5 Encounter Table（遭遇清单）
> 每个遭遇必须: Entry Read Time（先看见再被伤害） + ≥2 战术选项 + Fallback Position。难度空间优先，数值兜底。

| ID | 类型 | 敌数 | 战术选项 | 撤退位 | 服务意图 | 教学点 |
|----|------|------|----------|--------|----------|--------|
| E01 | [教学遭遇] | [2] | [逐个引/卡门] | [入口门洞] | [教引怪] | [T1] |
| E04 | [Boss 房] | [1+Boss] | [绕柱/高空位] | [Boss 房门] | [高潮记忆点] | [综合应用] |

### 4.6 Navigation Readability Checklist（可读性清单 · Gate 2 必查）
- [ ] 每个房间 3 秒内可指出主线出口方向（3 秒出口测试）
- [ ] 主线光照强度 > 支线
- [ ] 无"看起来像出口的真死路"
- [ ] 岔路处支线奖励可见（诱惑设计成立）
- [ ] 大型区域入口有 Prospect 观察位（安全背靠的高地/平台）
- [ ] 引导用光照/颜色/几何，不依赖小地图与箭头贴纸

### 4.7 Environmental Storytelling（环境叙事节拍）
- [每个房间 1 个叙事节拍，三问法：① 最后一个人离开时是什么状态 ② 道具为何在此位置 ③ 服务哪条 Pillar。禁止纯装饰空房间]

### 4.8 Blockout Spec（房间规格 · 给 Stage 3/4 的交接单）
> 每个核心房间一张，模板见 `references/level-design.md §9`：尺寸 / 功能 / 形状角色 / 掩体地形 / 光照（主光指向出口）/ 入口出口（3 秒可见?）/ 叙事节拍 / 性能注记（同屏对象峰值、对象池需求）。

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
> 技术规格完整方法论见 `references/tech-art.md`。以下每一项含**技术参数**（尺寸/内存/图集/预烘焙），Stage 3 生成前由 `art-director` 按 `tech-art.md §2–§4` 填齐，Gate 3 必查。

- **Character Art**: `art-app/assets/<classKey>_front.png` — 512×512 PNG，进 `char.atlas`
- **Weapon Icons**: `assets/weapons/<weaponType>.png` — 256×256 PNG，进 `ui.atlas`
- **Skill Badges**: `art-app/assets/icon_<skillId>.png` — 256×256 PNG，进 `ui.atlas`
- **Texture Memory Budget**: 移动端 ≤64MB / 桌面 ≤128MB（`tech-art.md §2`），超了先算总账再生成
- **Atlas 规划**: `ui.atlas`（图标/面板）、`fx.atlas`（粒子/特效）、`char.atlas`（角色/敌人）——按用途分集，留边 ≥2px
- **Pre-bake 清单**: 静态背景 / 光照贴图 lightmap / 发光光晕 / 缩放版本（1x/2x）——全部离线预渲染（`tech-art.md §3.2/§4`）
- **VFX Spec 表**: 每个 Juice 效果标注实现方式 + 运行时成本 + 平台档位（`tech-art.md §5`）
- **降级档位**: High（桌面）/ Medium（默认移动）/ Low（低端机）三档配置，纯视觉降级不改玩法判定（`tech-art.md §9`）

---

## 11. Narrative & Lore Design
> 完整方法论见 `references/narrative-design.md`。以下每一项都是 Gate 2 检查项，缺一项 = GDD 不完整。

### 11.1 Narrative Core（叙事核心）
- **Theme Question** (主题问题): [这游戏在问玩家什么问题；必须能推导 ≥1 个与核心玩法绑定的叙事决策]
- **Logline**: [一句话故事钩子]
- **Narrative Pillars**: [1–2 条，可证伪的体验陈述，服务不到即砍]

### 11.2 Protagonist & Core Conflict（主角核心冲突）
- **Desire（想要）**: [意识层面的目标]
- **Need（需要）**: [真正需要的东西，与 Desire 冲突]
- **Core Conflict**: [Desire 与 Need 如何对立 = 故事发动机]

### 11.3 Relationship Matrix（角色关系矩阵）
| 角色 A | 角色 B | 关系类型 | 立场冲突 | 首次揭示点 |
|--------|--------|----------|----------|------------|
| [主角] | [宗主] | [师徒/利用] | [求真相 vs 藏真相] | [第 2 幕密卷] |

### 11.4 Beat Sheet（叙事节拍图）
```
Beat # | 节拍名称 | 幕 | 认知变化（玩家知道了什么） | 玩法交付点（何时触发）
-------|----------|----|---------------------------|---------------------
[B01]  | [献祭开场]| [1]| [力量要付出代价]          | [教学关 Boss 后]
...
```

### 11.5 Narrative-Gameplay Alignment Matrix（叙事×玩法对齐）
> 铁律：每个核心节拍 ≥1 条玩法后果，后果须在 2 场景内可感知；无后果的节拍回炉。

| 故事节拍 | 玩法后果 | 玩家感受 | 对齐类型（系统联动/机制解锁/数值奖惩/世界状态） |
|----------|----------|----------|------------------------------------------------|
| [背叛揭晓] | [失去传送+势力怪刷新] | [背叛实感] | [系统联动] |

### 11.6 Dialogue Voice Pillars（对话声音支柱）
> 每个有台词的 NPC 一份：Vocabulary / Sentence Rhythm / Topics They Avoid / Subtext Default / What They Would NEVER Say。无 Pillar 的角色不给台词。对话须过 4 条规范：真人会说测试 / 禁 as-you-know / 每节点有戏剧功能 / 单段 ≤3 轮 ≤20 字/句。

### 11.7 Lore Tiering（叙事交付分层）
- **Tier 1 表面**（所有玩家，主线自洽的底线）: [主线情节/角色动机/核心冲突]
- **Tier 2 探索者**（主动探索）: [世界观细节/支线故事/阵营史]
- **Tier 3 深层**（考据玩家）: [隐藏真相/线索闭环/元叙事]

### 11.8 World Bible（世界圣经快速条目）
- **Timeline**: [关键事件与时间]
- **Factions**: [势力：目标/哲学/与玩家关系]
- **Rules of the World**: [可能/不可能的边界]
- **Banned Retcons**: [Tier 1 确立、永不可推翻的事实清单]
