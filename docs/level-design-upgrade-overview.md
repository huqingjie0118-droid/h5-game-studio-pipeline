# 关卡设计模块升级说明 (Level Design Module Upgrade)

> 升级日期: 2026-08-03 · 升级方: LevelDesigner 专家 · 涉及 skill: `h5-game-studio-pipeline`

## 诊断结论

原 skill 的系统/数值/经济设计方法论（`systems-mechanics.md`）非常扎实，但**关卡空间设计维度几乎空白**：

| 缺口 | 原状 | 后果 |
|------|------|------|
| 关卡意图 | 无 | 关卡没有存在理由，只有"地图" |
| 形状语言 | 无 | 布局凭感觉，不可推导 |
| 节奏管理 | 无 | 张力平线，玩家绷断或无聊 |
| 流程结构 | 无 | 岔路=死路，奖励不可见 |
| 遭遇设计 | 无 | 无读时间/无战术/无撤退位 |
| 导航可读性 | 无 | H5 无小地图，玩家迷路 |
| 环境叙事 | 无 | 纯装饰空房间 |
| Gate 2 质量门 | 不检查关卡 | 关卡是唯一无质量栅栏的交付物 |

## 改动清单

### 1. 新增 `references/level-design.md`（核心交付物）
与 `systems-mechanics.md` 平级的**程序性关卡设计方法论**，严格遵循同一执行顺序铁律：

```
Level Intent → Shape Language → Pacing Arc → Flow Diagram
  → Encounter Design → Navigation Readability → Environmental Storytelling
  → 空间教学阶梯 → Blockout Spec → H5 约束 → 关卡 Playtest 失败信号
```

含 11 个 §，覆盖：玩家幻想定义、四类形状语言选择表、节奏弧线与 Pacing Chart 模板、流程图节点规范（岔路黄金法则）、遭遇设计三大硬性要求（读时间/2 战术/撤退位）、3 秒出口测试与 Prospect-Refuge 引导工具箱、环境叙事三问法、T1/T2/T3 空间教学阶梯、工程可落地的 Blockout Spec 模板、H5 Canvas 2D 专属约束（视口/性能预算/对象池/触摸适配/检查点）、关卡版 A/B/C 失败信号表。

### 2. 扩展 `references/gdd-template.md` §4
从 3 行（安全区/野区/Boss 区）扩展为 8 小节：4.1 Level Intent / 4.2 Shape Language / 4.3 Pacing Arc（含 Pacing Chart 模板）/ 4.4 Flow Diagram / 4.5 Encounter Table / 4.6 Navigation Readability Checklist / 4.7 Environmental Storytelling / 4.8 Blockout Spec 交接单。

### 3. 接入 `references/grill-me-framework.md`
- Tier 2 新增 5 个关卡维度提问：Shape Language、Pacing Preference、Mechanic Teaching Style、Exploration Reward Density（另保留原 World Structure / VFX 项）。
- Exit Criteria 从 6 条扩到 12 条，新增 6 条关卡检查项。

### 4. 接入 `references/phase-sop.md` Gate 2
质量门现在同时校验 systems-mechanics 与 level-design 两组设计门，关卡无栅栏时代结束。

### 5. 更新 `SKILL.md`
- 路由表：`关卡` 关键词扩展为 `关卡, 地图, 流程, 节奏, 遭遇`，deliverable 标注 Level Design 与模块引用。
- Stage 2 质量检查新增第三组：level-design.md 关卡门。
- Reference 列表新增 🗺️ level-design.md 条目。

### 6. 更新 `references/design-principles.md`
开篇互补说明改为三文件分工：本文件管标准，systems-mechanics 管系统怎么做，level-design 管关卡空间怎么做。

## 设计决策要点

- **与现有模块同构**：level-design.md 完全复用 systems-mechanics.md 的文体（铁律执行顺序 / 表格 / 反例正例 / [PLACEHOLDER] 纪律 / 对接段落），接入成本为零。
- **关卡意图先行**：任何布局前必须写 Player Fantasy，且必须推导出本关独有决策——杜绝"复制上一关"。
- **可读性即地基**：H5 游戏无小地图是常态，3 秒出口测试 + 光照/颜色/几何引导被列为 Gate 2 硬检查项。
- **H5 约束前置**：视口单屏可读、性能预算共享、对象池标注、触摸 ≥44pt、检查点，全部在 GDD 阶段生效，避免 Stage 4 返工。
- **空间优先于数值**：遭遇难度首先由位置决定，数值只是兜底——已写入 Encounter 铁律。

## 待办 / 建议

- [ ] 用真实项目跑一次 Stage 2，验证 12 条 Exit Criteria 的实操性，必要时微调措辞
- [ ] 若未来做程序化关卡，可在 level-design.md §10 基础上扩展"程序化生成保底规则"子节
- [ ] 建议在仓库 README 的特性列表补一句关卡设计模块描述（如需）
