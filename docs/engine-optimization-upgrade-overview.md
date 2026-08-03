# 游戏引擎与性能优化模块升级说明 (Engine & Performance Module Upgrade)

> 升级日期: 2026-08-03 · 升级方: TechnicalArtist 专家（对接 Game Engine skill）· 涉及 skill: `h5-game-studio-pipeline`

## 诊断结论

skill 的设计方法论已覆盖系统、关卡、叙事、技术美术四层，但**工程执行层的性能方法论是碎片化的**——性能知识散落在 `design-principles.md` §三（速记级架构原则）、`pitfalls.md` P21–P28（事故型坑）、`tech-art.md` §6（资产侧分账）三处，没有程序性模块：

| 缺口 | 原状 | 后果 |
|------|------|------|
| 性能预算管理 | 只有 16.67ms 总账表（速记） | 无预算立项/核对流程，性能靠工程师手感 |
| Profiling SOP | P24 一句"先 profile 再优化" | 无测量→定位→决策树，优化常优化错地方 |
| 逻辑/物理优化 | 碎片（P22 池化、P24 脏标记） | 无碰撞优化（空间哈希）、AI 分帧方法论 |
| 内存/加载 | 碎片（P28 渐进加载） | 无内存总账/GC 控制/启动 ≤2MB 纪律 |
| 性能监控 | 无 | H5 无内置 profiler，无持续观测手段 |
| 性能回归 | 无 | Gate 4 不查帧率/内存，优化成果无法防回归 |
| 与 Game Engine skill | 无对接 | 通用引擎知识无处索引 |

## 改动清单

### 1. 新增 `references/engine-optimization.md`（核心交付物）
与五个模块平级的**程序性引擎性能方法论**，铁律执行顺序：

```
引擎架构基线 → 性能预算管理 → Profiling SOP → 渲染优化 → 逻辑物理优化
  → 内存管理 → 加载性能 → 帧率稳定性 → 性能监控 HUD → 性能回归基准
```

含 10 个 § 的核心内容：
- **§1 引擎架构基线**：固定步长 + 渲染插值、输入抽象、状态机起步、模块边界、反模式闸门
- **§2 性能预算管理**：总账 16.67ms 分摊表 + 与 tech-art §6 的"整机 vs 零件"分账关系 + 预算模板
- **§3 Profiling SOP**：三问法（快不快→哪段慢→为什么慢）+ 工具栈 + **瓶颈定位决策树**（持续低帧 → UPDATE/RENDER 分流排查）
- **§4 渲染优化**：drawImage 合批、离屏缓存、**视口裁剪**（同屏预算最大节省来源）、纹理状态保护
- **§5 逻辑物理优化**：对象池（验收 = GC 尖峰消失）、脏标记事件驱动、**碰撞空间哈希**（>50 实体，全量两两 4950 次→每格 ~10 次）、AI 分帧
- **§6 内存管理**：纹理总账、GC 控制（热循环零分配）、启动包 ≤2MB
- **§7 加载性能**：渐进加载策略、预取与并发队列、加载 UI
- **§8 帧率稳定性**：dt 钳制（0.05 防物理爆炸）、后台暂停、**动态降级保命开关**（对接 tech-art §9）
- **§9 性能监控 HUD**：最小实现代码（FPS/P1/drawCalls/粒子/texMB/GC 尖峰六指标）
- **§10 性能回归基准**：4 个基准场景（主城/Boss 峰值/弹幕全开/后台切换）+ 回归闸门（FPS 降 >10% 阻断合并）+ before/after 记录纪律
- **与 Game Engine skill 的对接**：碰撞算法细节/WebGL/框架选型查 `game-engine__skillhub`，本文件专注 Canvas 2D 编排流水线，不重复造轮子

### 2. 接入 `SKILL.md`
- 路由表：`engineering-lead` 行扩展（帧率/加载/内存/优化/卡顿）+ deliverable 标注 Engine & Performance
- Stage 4 Pre-flight：加 engine 规则（预算表首日立项、profile 先行、池化/空间哈希、渐进加载、dt 钳制、性能 HUD）
- Gate 4：加引擎性能门（4 个基准场景 + P1 + 首屏 ≤2MB + 内存 + 无 GC 尖峰）
- Reference 列表新增 ⚙️ engine-optimization.md 条目

### 3. 接入 `studio-roles.md`
engineering-lead（程基岩）职责扩展为 **Chief Architect + Engine Performance Lead**：预算表、Profiling SOP、池化/碰撞优化、加载、HUD、基准回归；新增与 art-director 的"总账 vs 分账"伙伴关系（两条注释呼应）。

### 4. 接入 `phase-sop.md` Gate 4
Gate 4 = 测试 100% PASS + tech-art 渲染清单 + **引擎性能门**（基准场景 FPS/P1/内存/加载/GC）。

### 5. 更新 `design-principles.md` / `README.md`
- design-principles：互补说明改**六文件分工**（标准 / 系统 / 关卡 / 叙事 / 视觉层 / 引擎层）
- README：架构列表加 engine-optimization.md（14 个 reference），Key Features 改"五大程序化模块"

## 设计决策要点

- **预算先立**：性能预算 Stage 4 第一天立项写进 `docs/PERFORMANCE.md`，Gate 4 逐行核对——没有尺子的装修不许开工
- **先量后改**：三问法 + 决策树把"凭感觉优化"变成"测量驱动的流程"，呼应 P24 并升级为 SOP
- **总账分账一体**：engine §2 总账 ↔ tech-art §6 分账，Gate 4 两表都查——渲染 5ms 由资产侧兑现，逻辑 4ms 由引擎侧兑现
- **最坏场景测量**：平均帧率是骗人的，P1（最差 1%）才致命；基准场景覆盖 Boss 峰值/弹幕全开
- **性能防回归**：基准 + 回归闸门（FPS 降 >10% 阻断），性能优化成果不靠记忆靠记录
- **与 Game Engine skill 分工**：通用引擎知识去 game-engine__skillhub，本文件只留 Canvas 2D 编排流水线必需——避免重复造轮子

## 待办 / 建议

- [ ] 用真实项目跑一次 Stage 4，验证基准场景 + 回归闸门的实操性
- [ ] 如需，可为 engine-optimization.md 补一节"完整性能页示例"（docs/PERFORMANCE.md 范本）
- [ ] Game Engine skill 的 `simple-2d-engine.md` / `game-engine-core-principals.md` 可作为本模块的配套实现模板，后续可双向引用
