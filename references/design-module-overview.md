# 设计模块协同总览 (Design Module Overview)

> 本文件是 h5-game-studio-pipeline 五个程序性设计模块的**导航图**：什么时候用哪个、输入输出是什么、角色之间怎么交接、全部质量门汇总在哪。**写代码前先读本文件，选对模块；模块内部细节再进各模块文件。**
> 五个模块分工一句话：`systems-mechanics`（系统怎么做）→ `level-design`（空间怎么做）→ `narrative-design`（意义怎么做）→ `tech-art`（视觉怎么做）→ `engine-optimization`（引擎怎么跑）。它们互为接口，任何两层脱节 = GDD/工程整体 FAIL。

---

## 一、五层流水线总览

```
Stage 2 (grill-me / GDD)          Stage 3 (资产生成)            Stage 4 (集成)
════════════════════════════      ═══════════════════          ═══════════════════
Fun Hypothesis (grill-me Step 0)
   │
   ├─→ systems-mechanics          tech-art §2 规格先行 ──────→ tech-art §3/§4 图集·光照·预烘焙
   │    系统/机制/数值/GDD §2-9        │ 尺寸·内存·图集定死        │
   │                                 └─→ agnes-ai 生成 ──→ 资产   └─→ engine §4 渲染组织
   ├─→ level-design ──→ GDD §4       tech-art §5 VFX 规格  ──→    engine §5 逻辑/物理
   │    关卡意图/流程/遭遇             （Juice表 + 实现成本）        池化/脏标记/空间哈希
   │
   └─→ narrative-design ──→ GDD §11  tech-art §6 预算分账  ──→    engine §2 预算总账
        主题/角色/节拍/对话            （资产侧）                    （引擎侧）
                                                              engine §7 加载 / §8 帧率
                                                              engine §9 HUD / §10 基准
```

**总铁律**：设计先行（Stage 2 三模块）→ 规格先行（tech-art §2）→ 预算先行（engine §2）→ 实现。**任何一层的"先行"被跳过，下一层必返工。**

---

## 二、五模块速查卡

| 模块 | 主路由角色 | 阶段 | 输入 | 输出 | 质量门 |
|------|-----------|------|------|------|--------|
| **systems-mechanics** | `design-strategist` | Stage 2 | Fun Hypothesis + grill-me 答案 | GDD §2–§9（循环/经济/数值/Juice/矩阵/失败信号） | Gate 2（第 1–6 条） |
| **level-design** | `design-strategist` | Stage 2 | Fun Hypothesis + 系统机制 | GDD §4（Intent/Shape/Pacing/Flow/Encounter/Readability/Blockout） | Gate 2（第 7–12 条） |
| **narrative-design** | `design-strategist` | Stage 2 | Fun Hypothesis + Pillars | GDD §1/§11（Core/角色/节拍/对齐/对话/Lore/圣经） | Gate 2（第 13–17 条） |
| **tech-art** | `art-director`（+`engineering-lead` 配合） | Stage 3/4 | GDD §10 + systems §7 Juice | 资产技术规格/图集/预烘焙/VFX 规格/预算分账 | Gate 3（资产清单）+ Gate 4（渲染清单） |
| **engine-optimization** | `engineering-lead`（+`art-director` 配合） | Stage 4 | GDD 性能页 + tech-art 预算分账 | 引擎架构/预算总账/Profiling/优化/PERFORMANCE.md | Gate 4（引擎性能门） |

---

## 三、跨角色交接契约（谁给谁什么）

| 交接 | 交付物 | 契约要点 |
|------|--------|----------|
| `design-strategist` → `art-director` | GDD §10 视觉规格（含 tech-art §2 技术参数） | 尺寸/内存/图集在生成前定死；VFX 规格 = Juice 表 + 实现/成本两栏齐全 |
| `design-strategist` → `engineering-lead` | GDD 性能页（目标帧率/设备清单/预算意图） | 性能目标进 GDD，Stage 4 立项时落成 §2 预算模板 |
| `art-director` ↔ `engineering-lead` | 预算分账（tech-art §6 ↔ engine §2） | art-director 持资产侧分账，engineering-lead 持引擎侧总账；**两表 Gate 4 都查** |
| `art-director` → `engineering-lead` | 图集 JSON 清单 / 预烘焙资产 | 集成按 atlas 切片（asset-mapping 新入口）；预烘焙层进主循环整块贴回 |
| `design-strategist` → 全部 | GDD 五章设计门（17 条 Exit Criteria） | 任一模块写不清不准进下一条/下一阶段（各模块铁律） |

---

## 四、全部质量门汇总（Gate 1–5 一屏看完）

| Gate | 阶段 | 检查来源 | 核心检查项 |
|------|------|----------|-----------|
| **Gate 1** | Stage 1 | Orchestrator | 执行计划获用户显式批准 |
| **Gate 2** | Stage 2 | grill-me Exit Criteria（17 条）+ design-principles 准线 | ① systems：Fun Hypothesis/Pillars/三层循环/账本/数值（1–6）② level：Intent/Shape/Pacing/Flow/Encounter/可读性（7–12）③ narrative：Core/Desire-Need/节拍+对齐/对话/Tier1+圣经（13–17） |
| **Gate 3** | Stage 3 | tech-art §10 Gate 3 | 文件存在性 + 尺寸阶梯/内存总账/命名/图集/预烘焙/VFX 规格 |
| **Gate 4** | Stage 4 | verify_integration.js + tech-art §10 Gate 4 + engine §10 | 测试 100% PASS + 渲染清单（drawImage/粒子/additive/零 filter）+ 引擎性能门（4 基准场景 FPS/P1/内存/加载/GC） |
| **Gate 5** | Stage 5 | vercel-deploy | /api/health 200 + 云存档/拍卖行功能验证 |

**跨模块交叉检查**（各模块联动检查的汇总索引）：
- level-design §14：关卡 × 系统 × 数值对账（遭遇↔DPS、奖励↔账本、Boss↔数值）
- narrative-design §13：叙事 × 系统 × 关卡三方对账（节拍↔节奏、后果↔机制、环境↔房间）
- engine-optimization §2 ↔ tech-art §6：引擎总账 ↔ 资产分账（Gate 4 两表都查）
- tech-art §5 ↔ systems-mechanics §7：VFX 规格 = Juice 表 + 实现成本，缺一不可

---

## 五、协同执行纪律（五条）

1. **顺序不可逆**：设计（Stage 2）→ 规格（tech-art §2）→ 预算（engine §2）→ 实现。跳级 = 返工。
2. **规格先行于生成**：任何 `agnes-ai` 出图前，尺寸/内存/图集必须定死（tech-art §2）。
3. **预算先行于优化**：性能预算 Stage 4 第一天立项（engine §2），没有尺子不许装修。
4. **总账分账一体**：渲染 5ms 由 tech-art §6 兑现、逻辑 4ms 由 engine §5 兑现——两表同查，缺一不可。
5. **对账表无红叉才放行**：所有联动检查（level §14 / narrative §13 / engine↔tech-art）通过 = Gate 放行；任何一张对账表有红叉 = 整体 FAIL，回炉对应模块。

---

## 与各文件的对接

- **SKILL.md**：本文件是 Stage 1 Orchestrator 路由时的**第一查阅点**（诊断项目阶段 → 本文件选模块 → 进各模块细节）。
- **phase-sop.md**：本文件 §四 是全部质量门的汇总索引，phase-sop 是各 Gate 的逐步执行手册。
- **studio-roles.md**：本文件 §三 是角色交接契约的落地版，studio-roles 是角色职责定义。
- **grill-me-framework.md**：grill-me 的 17 条 Exit Criteria 即 Gate 2 检查源，本文件 §四 引用。
- 五个设计模块文件：本文件是"导航图"，它们各自是"细节说明书"——读本文件选对门，进门再看细节。
