# 技术美术设计模块升级说明 (Technical Art Design Module Upgrade)

> 升级日期: 2026-08-03 · 升级方: TechnicalArtist 专家 · 涉及 skill: `h5-game-studio-pipeline`

## 诊断结论

skill 的设计方法论此前覆盖系统（systems-mechanics）、关卡（level-design）、叙事（narrative-design）三层，但**视觉实现层没有方法论**——而它恰恰决定"美术效果的上限"：

| 缺口 | 原状 | 后果 |
|------|------|------|
| 渲染成本模型 | 无 | 不懂 Canvas 2D 钱花在哪，特效乱上拖垮帧率 |
| 资产技术规格 | asset-gen-spec 仅 3 条 prompt | 尺寸/内存无预算，AI 生成后改尺寸 = 重做 |
| 图集与预烘焙 | 无（仅 pitfalls P25 提及"出事后合图"） | 散图状态切换多、静态层逐帧重绘 |
| 光照氛围方案 | 无 | Canvas 2D 无动态光照，美术效果封顶在"平涂" |
| VFX 实现规格 | systems-mechanics §7 只有"要什么感受" | 设计要光柱，工程不会做或做不起 |
| 美术性能预算 | design-principles 只有全系统 16.67ms 总账 | 缺"资产维度分账"，Gate 4 无渲染审查 |
| 降级档位 | 无 | 低端机/移动端直接卡死或闪退 |

## 改动清单

### 1. 新增 `references/tech-art.md`（核心交付物）
与三个设计模块平级的**程序性技术美术方法论**，铁律执行顺序：

```
渲染成本模型 → 资产技术规格 → 精灵图集与预烘焙 → 无光照氛围方案
  → VFX 技术规格（效果→实现→成本）→ 美术性能预算表 → 像素/HD 双轨
  → 色彩技术 → 移动端约束与降级档位 → Gate 3/4 技术审查清单
```

含 10 个 § 的核心内容：
- **§1 渲染成本模型**：Canvas 2D 操作成本分级（免费→天价）——`fillRect` 免费、1:1 drawImage 便宜、缩放中等、source 切换贵、`filter` 很贵、`shadowBlur` 天价永久禁用、additive 叠加可控但要封层
- **§2 资产技术规格**：全项目唯一尺寸阶梯（角色 512²/图标 256²/粒子 ≤128²）+ 内存预算表（RGBA 字节算法：移动 ≤64MB / 桌面 ≤128MB）+ 格式（PNG 默认 / WebP 大背景）
- **§3 图集与预烘焙**：`ui/fx/char` 三集规范 + JSON 清单 + 预烘焙策略表（静态背景/光照层/光晕/缩放版本/视差层全部离线渲染）
- **§4 无光照氛围方案**：lightmap multiply 叠光 + 混合模式工具箱（additive ≤2 层铁律）+ 色彩分级 overlay（跟随关卡节奏！）+ 视差 ≤3 层
- **§5 VFX 技术规格矩阵**：10 种 Juice 效果 ×（实现方式/资产来源/运行时成本/预算建议）——与 systems-mechanics §7 组成完整 VFX 规格
- **§6 美术性能预算表**：9 项指标双端预算（drawImage 300/800、源切换 8/16、粒子 200/500、additive 2/4、filter 恒 0...）
- **§7 像素 vs HD 双轨**：整数缩放 + imageSmoothing + dpr ≤2 + 动态降分辨率开关
- **§8 色彩技术**：sRGB 一致性、对比度可测、无障碍双通道、氛围 overlay 与可读性冲突检查
- **§9 移动端降级档位**：High/Medium/Low 三档一键切换，**纯视觉降级不改玩法判定**（技术美术与工程的分界契约）
- **§10 Gate 3/4 技术审查清单**：资产规格审查（Gate 3）+ 渲染性能审查（Gate 4）

### 2. 接入 `SKILL.md`
- 路由表：`art-director` 行扩展技术美术关键词（图集/材质/渲染/粒子/性能优化/技术美术）+ deliverable 标注 Tech Art
- Stage 3：Tech-spec first（先生成前定尺寸与内存总账）；Gate 3 加资产规格审查
- Stage 4：Pre-flight 加 tech-art 渲染规则（零 filter/shadowBlur、additive 封层、预烘焙）；Gate 4 加渲染性能审查
- Reference 列表新增 🎨 tech-art.md 条目

### 3. 接入 `studio-roles.md`
art-director（林绘澄）职责扩展为 **Visual Director + Technical Artist**：资产技术规格、预烘焙资产、VFX 规格与预算、渲染性能预算、降级档位；新增"与 engineering-lead 的 tech-art 伙伴关系"（美术持预算，工程花预算）。

### 4. 接入 `phase-sop.md` Gate 3/4
Gate 3 = 文件存在性 + 资产技术规格清单；Gate 4 = 测试 100% PASS + 渲染性能清单（drawImage/源切换/粒子/additive 计数、零 filter、预烘焙、dpr、低端机 30FPS）。

### 5. 扩展 `gdd-template.md` §10
Asset Manifest 从 3 行路径扩展为"路径 + 技术参数"：尺寸、内存预算、图集规划、预烘焙清单、VFX 规格表、降级档位。

### 6. 更新 `design-principles.md` / `README.md`
- design-principles：互补说明改**五文件分工**（标准 / 系统 / 关卡 / 叙事 / 视觉层）
- README：架构列表加 tech-art.md，Key Features 改"四大程序化设计模块"

## 设计决策要点

- **成本模型先行**：所有技术美术决策从"Canvas 2D 钱花在哪"推导——预烘焙、合图、分层三大纪律都是成本模型的推论
- **规格先行于生成**：尺寸/内存/图集在 Stage 3 生成前定死，生成后改尺寸 = 重做 + 内存浪费
- **效果-实现-成本三栏缺一不可**：VFX 规格 = Juice 表（感受）+ 技术表（实现/成本），补齐后设计侧与工程侧才说同一种语言
- **零 filter / 零 shadowBlur**：Canvas 2D 两大帧率杀手永久禁用，全部预烘焙替代
- **降级不改玩法**：降档只砍视觉效果不砍逻辑判定——技术美术与工程的分界契约，也是移动端保命开关
- **Gate 3/4 双审查**：资产生成后查规格，集成后查性能，美术效果从生成到上线的每一关都有栅栏

## 待办 / 建议

- [ ] 用真实项目跑一次 Stage 3→4，验证 Gate 3/4 技术审查清单的实操性
- [ ] 如需，可为 tech-art.md 补一节"示例 VFX 规格表"（完整项目级示例）
- [ ] 若项目升级 WebGL，可在 tech-art.md 基础上扩展"WebGL/WebGPU 渲染管线"子节（shader/纹理压缩/后处理）
