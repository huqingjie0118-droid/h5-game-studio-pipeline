# 叙事设计模块升级说明 (Narrative Design Module Upgrade)

> 升级日期: 2026-08-03 · 升级方: NarrativeDesigner 专家 · 涉及 skill: `h5-game-studio-pipeline`

## 诊断结论

skill 的系统层（`systems-mechanics.md`）、关卡空间层（`level-design.md`）此前均已有程序性方法论，但**叙事层是最后一个空白**：

| 缺口 | 原状 | 后果 |
|------|------|------|
| 叙事核心 | 仅一句 Logline | 没有主题问题，故事不知"想说什么" |
| 角色设计 | 无 | 角色是名字列表，不是冲突容器 |
| 叙事结构 | 无 | 故事没有节拍，玩家不知道"正在经历什么" |
| 叙事×玩法对齐 | 无 | 剧情和玩法两张皮，玩家觉得故事是贴上去的 |
| 对话规范 | 无 | 没有 Voice Pillars，AI 写出台词腔/书面语 |
| Lore 分层 | 无 | 关键路径可能依赖可选内容才能懂 |
| Gate 2 质量门 | 不检查叙事 | 叙事是最后一个无质量栅栏的交付物 |

## 改动清单

### 1. 新增 `references/narrative-design.md`（核心交付物）
与 `systems-mechanics.md` / `level-design.md` 平级的**程序性叙事设计方法论**，严格遵循同一执行顺序铁律：

```
Narrative Core（主题+Logline+叙事支柱）→ 角色架构（Desire/Need + Voice Pillars）
  → 叙事节拍图 Beat Sheet → 叙事×玩法对齐矩阵 → 对话规范
  → Lore 三层交付 → 环境叙事一致性 → 叙事张力注入点 → H5 叙事约束 → 叙事 Playtest 失败信号
```

含 10 个 §：
- **§1 Narrative Core**：主题问题 + Logline + 叙事支柱（从 Fun Hypothesis 推导）
- **§2 角色架构**：Desire vs Need 核心冲突模板 + 角色关系矩阵 + Voice Pillars 模板（无 Pillar 不给台词）
- **§3 叙事结构**：三幕简版 + Beat Sheet 模板（每个节拍必须挂玩法交付点）
- **§4 叙事×玩法对齐矩阵**：🔴 铁律——故事说"背叛"玩法必须同场发生点什么；后果 2 场景内可感知
- **§5 对话规范**：4 条硬约束（真人会说测试 / 禁 as-you-know / 每节点戏剧功能 / 少即是多）+ Ink 风格对话节点格式（Stage 4 可直接实现）
- **§6 Lore 三层交付**：Tier1 表面 / Tier2 探索者 / Tier3 深层 + 无矛盾铁律（Banned Retcons）+ 世界圣经条目
- **§7 环境叙事**：对接 level-design §7 的叙事一致性侧（孤儿细节挂钩或删 + 无文本叙事测试）
- **§8 叙事张力注入点**：低谷注入 / 高潮前蓄势 / 高潮中静默 / 钩子收尾
- **§9 H5 叙事约束**：Canvas 文本渲染、单屏 ≤3 行 ≤60 字、无/轻过场、移动端打断、叙事密度对齐品类、本地化意识
- **§10 叙事 Playtest 失败信号**：理解度/对齐/对话/投入/一致性五维 + "剧情+玩法合成记忆"测试法

### 2. 扩展 `references/gdd-template.md`
- §1 Executive Summary 新增 **Narrative Pillar** 行（1–2 条可证伪体验陈述）
- 末尾新增 **§11 Narrative & Lore Design**：11.1 Narrative Core / 11.2 Protagonist & Core Conflict / 11.3 Relationship Matrix / 11.4 Beat Sheet / 11.5 Alignment Matrix / 11.6 Dialogue Voice Pillars / 11.7 Lore Tiering / 11.8 World Bible

### 3. 接入 `references/grill-me-framework.md`
- Tier 2 新增 4 个叙事维度提问：Narrative Structure / Protagonist Setup / Story Delivery / Narrative Density
- Exit Criteria 从 12 条扩到 **17 条**，新增 5 条叙事检查项（Core / Desire-Need / Beat+Alignment / 对话 / Tier1+World Bible）

### 4. 接入 `references/phase-sop.md` Gate 2
质量门现在同时校验 systems-mechanics + level-design + narrative-design 三组设计门。

### 5. 更新 `SKILL.md`
- 路由表：叙事关键词扩展为 `叙事, 剧情, 角色, 对话, 世界观`，deliverable 标注 Narrative Design 与模块引用
- Stage 2 质量检查新增第四组 narrative-design.md 叙事门
- Reference 列表新增 📖 narrative-design.md 条目

### 6. 更新 `references/design-principles.md`
互补说明改为**四文件分工**：标准 / 系统怎么做 / 关卡空间怎么做 / 叙事意义怎么做。

## 设计决策要点

- **与现有模块同构**：完全复用三个平级模块的文体（铁律执行顺序 / 表格 / 反例正例 / 对接段落），接入成本为零。
- **主题先行**：任何角色/世界观细节前先逼出主题问题，且必须能推导出与核心玩法绑定的叙事决策——杜绝"背景设定当故事"。
- **对齐是铁律**：每个叙事节拍必须有玩法后果（系统联动/机制解锁/数值奖惩/世界状态），且 2 场景内可感知——叙事不是贴图，是行为设计。
- **Voice Pillars 纪律**：给不出声音支柱的角色不给台词，哑巴 NPC 强过千人一面。
- **Tier 1 保障**：主线必须无任何可选内容也能自洽，世界圣经 Banned Retcons 防矛盾——H5 无引导环境的硬需求。
- **H5 约束前置**：Canvas 文本渲染、短句、无过场、断点续叙全部在 GDD 阶段生效。

## 待办 / 建议

- [ ] 用真实项目跑一次 Stage 2，验证 17 条 Exit Criteria 的实操性
- [ ] 如需，可为 narrative-design.md 补一节"示例叙事章节"（像 level-design §13 那样的完整 Worked Example）
- [ ] 建议在仓库 README 的特性列表补叙事设计模块描述（连同关卡模块一起）

---

## 第二阶段：叙事模块补全（2026-08-03 同日）

与关卡模块第二阶段同构，补上三个"加速器"章节，叙事模块升级为**方法论 + 模式库 + 示例 + 三方接口协议**：

### 新增 §11 可复用叙事模式库（Narrative Pattern Library）
- 7 个经过验证的叙事模块：开场钩子 / 背叛时刻 / 抉择节点 / 揭示翻转 / 环境叙事段 / 回旋镖 Callback / 代价展示
- 每个模式含结构要点、常见坑、变体；提供组合示例（idle RPG 主线串联全 7 模式）
- **程序化叙事保底规则**：主线节拍全部手工撰写禁止生成；生成事件必须挂接世界圣经（无孤儿事件）；支线不携带 Tier 1 关键信息

### 新增 §12 完整示例叙事章节（Worked Example：旧秤）
- 延续 skill 默认场景（idle 修仙 RPG + 拍卖行），把 §1–§10 全部串起来：Core → 主角 Desire/Need → 关系矩阵 → Beat Sheet（5 拍）→ 对齐矩阵 → Voice Pillars 节选 → Lore Tiering → 世界圣经 → 失败信号
- 亮点示范：B01 旧秤 = 机制解锁（鉴定玩法）、B05"秤量宗主"= 回旋镖伏笔兑现 + Boss 破防窗口（叙事即玩法）
- 定位：**格式范本，不是内容答案**

### 新增 §13 叙事 × 系统 × 关卡三方联动检查（Cross-Check Interface）
- 6 项对账：节拍↔关卡节奏注入点、对齐后果↔机制解锁、叙事奖励↔经济账本、环境叙事↔房间节拍、对话↔工程实现、角色↔进度曲线
- 含三方对账模板 + 反例自查（"失去拍卖行"但系统无补偿、关卡无支线 = 三方各自自洽整体崩盘）
- Gate 2 质量门新增最后一条：**§13 三方联动检查全过（对账表无红叉）**

### 同步更新
- SKILL.md Reference 列表描述加入 §11–§13
- narrative-design.md 铁律段新增"高级用法"说明（模式库起步 / 示例校准格式 / 联动检查收尾）
- **README.md 修复**：Skill Architecture 列表从 8 个补全到 12 个 reference（补上原漏的 design-principles / pitfalls + 新增的 level-design / narrative-design），Key Features 新增"三程序化设计模块"条目

