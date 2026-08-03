# 设计模块协同总览 + 双模块示例补全 (Integration & Worked-Example Pass)

> 升级日期: 2026-08-03 · 升级方: TechnicalArtist 专家 · 涉及 skill: `h5-game-studio-pipeline`

## 本轮目标

延续"每轮一个阶段"的打磨节奏，本轮做三件事：
1. 给 tech-art / engine-optimization 两个新模块补**完整示例章节**（对齐关卡/叙事模块的 Worked Example 标准）
2. 新建**五模块协同总览**文档——解决"五个模块各自强大但缺导航图"的整体级缺口

## 改动清单

### 1. `references/tech-art.md` 追加 §11 完整示例
- **§11.1 资产清单与内存总账**：全项目资产表（8 组 × 尺寸 × RGBA 内存逐项核算，合计 ≈49MB ≤64MB 移动端达标）+ 反例对照（1024² 立绘直接 80MB+ 闪退）
- **§11.2 图集规划**：ui/char/fx 三集的实际打包方案 + JSON 清单格式
- **§11.3 光照与氛围方案**：4 个场景 × 方案 × 运行时成本（拍卖行暖光 lightmap、野外视差、副本冷蓝+战斗红 overlay、火把闪烁免费微调）
- **§11.4 VFX 规格表**：5 个效果完整填写（实现/资产/成本/平台档），与叙事节拍对齐（Boss 破防窗口 = 全屏红 overlay + 光柱，移动端关光柱）
- **§11.5 降级档位** + **§11.6 Gate 3 自检全勾**

### 2. `references/engine-optimization.md` 追加 §11 性能页范本
- **§11.1 预算总账**：6 系统预算 vs 实测对照表（渲染 4.1/5ms 达标，余量 35%）
- **§11.2 基准场景基线**：4 场景 FPS/P1/drawImage/粒子/纹理全表（弹幕 220 粒子超预算 → 砍至 180 的示范）
- **§11.3 优化记录**：4 条 before/after（离屏缓存 render 8→4.1ms、空间哈希物理 6→1.8ms、粒子池化 GC 尖峰 4→0、additive 4→2 层）
- **§11.4 回归状态**：Gate 4 判定格式（无回归 + quality-lead 签字）

### 3. 新增 `references/design-module-overview.md`（本轮核心）
五模块协同**导航图**，五节：
- **§一 五层流水线总览**：ASCII 图串起 Stage 2→4 五个模块的执行时序与交接流（设计→规格→预算→实现）
- **§二 模块速查卡**：5 模块 ×（主路由角色/阶段/输入/输出/质量门）
- **§三 跨角色交接契约**：5 条"谁给谁什么"（design-strategist→art-director 视觉规格、art-director↔engineering-lead 预算分账等）
- **§四 全部质量门汇总**：Gate 1–5 一屏看完 + 四组跨模块联动检查索引（level §14 / narrative §13 / engine↔tech-art / VFX 规格）
- **§五 协同执行五纪律**：顺序不可逆、规格先行、预算先行、总账分账一体、对账表无红叉才放行

### 4. 接入
- **SKILL.md**：Reference 列表首位新增 🧭 design-module-overview.md（标注"第一查阅点"，Stage 1 路由先读）
- **README.md**：架构列表加 design-module-overview.md（15 个 reference）

## 设计决策要点

- **总览文档 = 第一查阅点**：五个模块是"细节说明书"，总览是"导航图"——解决 Orchestrator 路由时"该看哪个文件"的决策成本
- **示例宇宙统一**：tech-art §11 / engine §11 延续"旧秤"世界观（与 level-design §13、narrative-design §12 同一宇宙），四模块示例可互相引用对照，形成一套完整项目样例
- **对账表纪律上升为总纪律**：所有跨模块联动检查（level §14 / narrative §13 / engine↔tech-art）汇总进总览 §四，任一红叉 = 整体 FAIL
- **Gate 一屏看完**：Gate 1–5 + 17 条设计门 + 双性能审查的汇总索引，Orchestrator 无需翻五个文件

## 待办 / 建议

- [ ] 用真实项目跑一次 Stage 1→2→3→4 全流程，验证总览文档的导航实操性
- [ ] 可选：audio-director（阮和鸣）是唯一没有方法论支撑的角色——如需可新建 `audio-design.md`（SFX/BGM 映射策略 + Web Audio 技术实现 + 内存预算）
- [ ] 可选：Game Engine skill 双向引用（engine-optimization.md 已写明分工，可在其 README 补链接）
