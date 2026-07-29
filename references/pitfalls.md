# 已知踩坑与最佳实践 (Known Pitfalls)

> 沉淀自《觉醒纪元》H5 项目真实事故 + H5 Canvas 2D 通用陷阱。每条含 **问题 / 触发 / 解决 / 预防**。
> **使用时机**：Stage 4（集成）、Stage 5（部署）、各质量门，以及 `engineering-lead` / `release-ops-lead` 动手前主动查阅，提前规避。

---

## 一、UI 与交互生命周期

### P01 面板打开后无法关闭
- **问题**：新增 UI 面板未登记进 `ModalManager.panels`，`closeAll()` 只遍历登记表隐藏面板，点关闭/ESC 均失效，遮罩却已隐藏 → 面板浮屏关不掉。
- **触发**：通过 `ModalManager.open/toggle('<id>')` 打开任意未登记 id 的面板（真实案例：`codex-panel` 图鉴、`auction-panel` 拍卖行）。
- **解决**：把面板 id 补入 `ModalManager.panels`；关闭逻辑改为按 `activePanelId` 直接隐藏该节点。
- **预防**：集成后跑静态检查，扫描 `js/` 全部 `ModalManager.open/toggle('<id>')` 调用，断言 id 出现在 `panels` 中，缺失即 CI 失败（见 `ui-panel-registry-check.js` 思路）。

### P02 关闭后面板仍拦截输入 / 焦点未回收
- **问题**：面板 `display:none` 后其遮罩或子元素仍 `pointer-events` 拦截画布点击；或焦点卡在隐藏输入框。
- **触发**：遮罩层未随面板一同隐藏，或关闭时未把焦点 `focus()` 回画布。
- **解决**：关闭时同步隐藏遮罩、`activePanelId=null`、把焦点移回游戏画布（`<canvas>.focus()` 或 `document.body`）。
- **预防**：面板生命周期契约统一含"关闭后无输入陷阱"断言（见 `tests/UI_TESTING_STANDARD.md` C5）。

---

## 二、Canvas / WebGL 渲染

### P03 像素精灵放大变糊
- **问题**：像素美术缩放显示成马赛克/模糊块。
- **触发**：canvas 上下文 `imageSmoothingEnabled=true`（默认）时绘制缩放后的 `Image`。
- **解决**：绘制前 `ctx.imageSmoothingEnabled = false` 保持 crisp pixels。
- **预防**：渲染循环初始化即设 `false`；缩放用整数倍。

### P04 高 DPI 屏（视网膜）整体模糊
- **问题**：canvas 在 Retina / 高分屏上发虚。
- **触发**：`canvas.width/height` 直接等于 CSS 像素，未乘 `devicePixelRatio`。
- **解决**：`canvas.width = cssW * dpr; canvas.height = cssH * dpr; ctx.scale(dpr, dpr);` 再用 CSS 尺寸显示。
- **预防**：初始化按 DPR 设置；窗口 resize 时重算。

### P05 WebGL 上下文丢失
- **问题**：长时间运行 / 切后台 / 显存紧张 → `webglcontextlost`，画面黑屏。
- **触发**：未监听上下文丢失事件；丢失后资源未重建。
- **解决**：`canvas.addEventListener('webglcontextlost', e => e.preventDefault())` + `webglcontextrestored` 里重建贴图/缓冲。
- **预防**：关键资源（精灵表、着色器）可重建；不长期持有大纹理不释放。

---

## 三、资源加载与美术

### P06 素材路径映射错误 → 裂图 / 回退
- **问题**：生成的图名或路径与 `config.js` 约定不符 → 显示破图或静默回退占位。
- **触发**：集成时未按约定命名（`CLASSES[key].frontImg='art-app/assets/<key>_front.png'`、武器 `assets/weapons/<wType>.png`、技能 `art-app/assets/icon_<name>.png`）。
- **解决**：按 `asset-mapping.md` 约定落盘；缺失时框架应回退 `PNG → SVG → Emoji`。
- **预防**：集成后跑 `node scripts/verify_integration.js` 检查资源存在性 + 配置字段映射。

### P07 AI 生成图背景不透明
- **问题**：文生图带纯色/渐变背景，精灵叠到游戏上显方块，破坏融合。
- **触发**：提示词未要求透明背景，或模型默认输出不透明 RGB。
- **解决**：跑 `python scripts/make_transparent.py` 去背（Pillow 阈值抠图）；或生成时要求 `transparent background / isolated on transparent`。
- **预防**：提示词固定加 "transparent background, no background"；出图后统一过一遍去背脚本。

### P08 localStorage 读写异常导致游戏崩
- **问题**：隐私模式 / 配额满 / 禁用存储 → `setItem` 抛错，存档逻辑中断连锁崩。
- **触发**：存档/读档裸调 `localStorage` 未包裹。
- **解决**：所有 `localStorage` 访问 `try/catch`，失败降级到内存态并提示用户。
- **预防**：封装 `safeStorage` 工具，全项目统一经它读写。

---

## 四、性能与内存

### P09 逐帧 `new Image()` 造成内存压力
- **问题**：每帧新建 `Image` 或重解码 → GC 频繁、卡顿、移动端闪退。
- **触发**：渲染循环内动态创建图片对象而非复用。
- **解决**：预加载精灵表（sprite sheet），复用 `Image` 实例；动态对象池化。
- **预防**：资源启动时一次性预载；离屏静态层用缓存 canvas 复用。

### P10 帧率不独立（缺 delta time）
- **问题**：高刷屏过快、低帧率过慢，位移/计时不一致。
- **触发**：位移用固定步进累加，未基于真实时间差。
- **解决**：`dt = (now - last)/1000`，所有速度/计时乘 `dt`；或固定步长累加器（fixed timestep）。
- **预防**：所有动画/移动/冷却基于 `dt`，不假设 60fps。

### P11 静态层未缓存 → 重复绘制开销
- **问题**：每帧重绘不变背景 / UI 底图，浪费 GPU。
- **触发**：背景、地图底图放在主循环每帧重画。
- **解决**：静态内容预渲染到离屏 canvas，主循环 `drawImage` 整块贴回。
- **预防**：区分"静态层/动态层"，静态层只重绘脏区。

---

## 五、跨浏览器与移动端

### P12 音频自动播放被拦截
- **问题**：页面加载即 `audio.play()` → 浏览器策略拦截，BGM/SFX 不响。
- **触发**：未等用户手势就播音频；`AudioContext` 未 resume。
- **解决**：首次 `click`/`touch` 后解锁 `AudioContext.resume()` 再播；用一次性手势监听。
- **预防**：音频系统默认"暂停态"，由首个用户交互启动。

### P13 移动端点击坐标错位
- **问题**：canvas CSS 缩放后，触摸坐标映射到画布内逻辑坐标偏差。
- **触发**：直接用 `e.clientX` 未做比例换算；或 canvas 被 CSS 拉伸。
- **解决**：`const r = canvas.getBoundingClientRect(); x = (e.clientX - r.left) * (canvas.width / r.width / dpr);`（同理 y）。
- **预防**：所有输入坐标经 `getBoundingClientRect` 比例换算，封装 `toCanvasCoord()`。

### P14 触摸与鼠标事件混用
- **问题**：只绑 `mouse*` 事件 → 移动端无法操作；双绑又触发重复。
- **触发**：未统一指针事件。
- **解决**：用 **Pointer Events**（`pointerdown/move/up`）统一鼠标+触摸+笔；`touch-action: none` 防滚动干扰。
- **预防**：项目默认只绑 Pointer Events，不混用 mouse/touch。

---

## 六、后端与部署

### P15 云存档跨用户隔离缺失
- **问题**：前端存档请求漏鉴权 → 服务端取不到 user → 全落 `save:guest:<slot>`，玩家互覆盖。
- **触发**：`fetch('/api/save')` 未带 `Authorization: Bearer`；服务端依赖 token 推导 user。
- **解决**：所有写接口前端补 Bearer；服务端 `getMe(token)` 校验 user，`validate.js` 结构校验 payload。
- **预防**：写操作服务端强制校验 user；存档 key 用 `save:${userId}:${slot}` 派生（已落地）。

### P16 Vercel 纯静态站用 npm import 写法失效
- **问题**：统计等脚本用 `import { inject } from '@vercel/analytics'`，纯静态无构建 → 浏览器解析不了裸模块名 → 加载失败仅控制台报错。
- **触发**：`vercel.json` 无 build 步骤，却用框架项目的 npm 包写法。
- **解决**：改 Vercel 静态站官方 snippet `<script defer src="/_vercel/insights/script.js"></script>`。
- **预防**：静态站只用 `<script src>` 全局脚本，不 `import` npm 包；统计开关在 Vercel 后台启用。

### P17 Vercel serverless 无 WS / 无 cron
- **问题**：依赖 WebSocket 长连或定时任务 → 线上 `/ws` 永离线、无定时清理。
- **触发**：后端设计假设常驻进程。
- **解决**：实时性用 HTTP 轮询代替 WS；过期数据用读时 sweep（lazy cleanup）代替 cron。
- **预防**：后端默认 serverless 约束——无长连、无定时，状态外置到 Turso。

### P18 package-lock.json 合并冲突
- **问题**：两条分支各加依赖、基于不同 base → 合并 `package-lock.json` 冲突，npm 重算易写坏。
- **触发**：并行开发（如 bot 分支 + 主分支）各自改依赖段。
- **解决**：把两份合法 lockfile 当 JSON 合并（并集 root deps + 补齐 `node_modules/<pkg>` 条目），name 复原；或 `npm install` 重生成并核对。
- **预防**：改依赖前先 `git pull --rebase`；分支基于同一 base；合并后用 `npm ci` 验证。

---

## 七、工具链与 CI

### P19 非交互环境 git push 认证失败
- **问题**：CI / agent 无 tty → Git Credential Manager 弹不了登录框 → push 被拒。
- **触发**：`git push` 走到交互式 GCM 登录，环境无终端。
- **解决**：用 Personal Access Token（URL 内联或 secret）或部署密钥；或交用户本机 push。
- **预防**：自动化推送走 token/SSH key，不依赖交互式 GCM；敏感凭据走 secret 管理。

### P20 随机源不一致（客户端 Math.random vs 种子 RNG）
- **问题**：客户端 `Math.random()` 决定掉落/词缀，服务端权威重算时结果不一致 → 不同步或被作弊。
- **触发**：掉落、随机词条逻辑散落前端，服务端另算。
- **解决**：随机逻辑集中到纯函数模块，服务端用种子 RNG 统一裁决；客户端只展示。
- **预防**：经济/掉落为服务端权威；纯函数模块（`economy/equip-rules/combat`）可单测、可移植。

---

## 八、补充踩坑（整合自通用游戏开发原理 + 本项目深化）

> 以下条目整合自社区通用游戏开发经验（架构/性能/渲染/联机原理），按本 skill 的四字段格式重述，聚焦 **性能优化 / 内存 / 跨浏览器 / 资源 / Canvas / 移动端** 五类。

### P21 逻辑与渲染耦合（缺固定步长）→ 不可复现、服务端不同步
- **问题**：直接用每帧真实 `dt` 驱动物理/战斗逻辑，帧率波动即导致位移、冷却、计时不一致；做服务端权威战斗时客户端与服务端结果对不上。
- **触发**：`UPDATE` 与 `RENDER` 同一循环、同一 `dt`，无累加器。
- **解决**：**固定步长**（逻辑 50Hz 固定 `dt=1/50`，用累加器消费真实时间）+ 渲染插值。累加器：`acc += frameDt; while(acc >= STEP){ update(STEP); acc -= STEP } render(interp)`。
- **预防**：新战斗/物理系统默认固定步长；联机逻辑必须服务端统一步长（见 `design-principles.md` 联机专项）。

### P22 高频对象未池化（子弹/粒子/特效/怪物）→ GC 尖峰卡顿
- **问题**：每帧 `new` 子弹、粒子、伤害飘字、特效 → 频繁 GC，出现周期性掉帧/卡顿，移动端易闪退。
- **触发**：战斗/特效系统用即时 `new`+`destroy` 而非复用。
- **解决**：**对象池（Object Pooling）**——预分配固定数组，活跃/空闲两集合，复用实例、仅切状态；数量封顶防溢出。
- **预防**：凡"高频 spawn/destroy"对象（弹道、粒子、飘字、AoE 圈）一律池化；`engineering-lead` 在 Stage 4 评审时核对热点路径。

### P23 后台标签页未暂停 → 电量耗尽 + 回前台 dt 跳变物理爆炸
- **问题**：切到后台后 `requestAnimationFrame` 被浏览器节流到 ~1fps，但游戏逻辑仍在跑 → 持续耗电；回前台瞬间 `dt` 巨大 → 位移/物理瞬间爆炸、穿墙。
- **触发**：未监听 `document.visibilityState`，且 `dt` 未做上限钳制。
- **解决**：`visibilitychange` 中 `hidden` 时暂停主循环（停 update、停计时）；回前台重置 `last=now` 并钳制单帧 `dt`（如 `Math.min(dt, 0.05)`）。
- **预防**：主循环默认 `pauseWhenHidden`；所有 `dt` 经 `clamp`；计时器走"游戏内累计时间"而非墙钟。

### P24 性能凭感觉优化 / 每帧全量更新 → 方向错 + 浪费
- **问题**：未 profiling 就盲目优化（如先抠像素再发现瓶颈在网络）；或每帧遍历全部实体更新 UI/状态 → CPU 空转。
- **触发**："觉得慢就优化"；状态变化用轮询而非事件。
- **解决**：**先 profile 再优化**（浏览器 Performance 面板 / FPS 计量）；用**事件/脏标记（dirty flag）**驱动变更（血量变化才更新血条）；热循环**缓存引用**（不在循环里 `.querySelector`/属性查找）。
- **预防**：优化优先级固定为 算法 → 批处理 → 池化 → LOD → 裁剪；状态系统默认事件驱动。

### P25 逐张 Image 绘制 → draw call / 状态切换过多
- **问题**：每个精灵独立 `drawImage` 且来源不同 → 大量纹理绑定/状态切换，draw call 膨胀，GPU 吃紧。
- **触发**：素材散成单图、未合图；同屏大量独立 `Image` 源。
- **解决**：**精灵表（Atlas）/ 雪碧图**合并同批素材，按帧/区域 `drawImage` 切片；同来源连续绘制减少切换；离屏层整块 `drawImage` 贴回。
- **预防**：角色/怪物/UI 图标生成后合并 atlas；Stage 3 素材生成即按 `类型_对象_变体_状态` 命名（见 `design-principles.md` 美术命名规范），便于合图。

### P26 Canvas 2D 状态泄漏（save/restore 不匹配）
- **问题**：`ctx.save()` 后未配平 `ctx.restore()`，或改了 `globalAlpha`/`fillStyle`/`transform` 不还原 → 后续绘制串色、叠加、坐标错乱，且难定位。
- **触发**：在分支/异常路径提前 `return` 漏了 `restore`；嵌套 save 层级算错。
- **解决**：成对 `save/restore` 包裹；或绘制前显式重置关键状态（`setTransform(1,0,0,1,0,0)`、`globalAlpha=1`）。推荐用 `ctx.save() ... ctx.restore()` 块而非手动复位。
- **预防**：渲染函数"进入即 save、退出即 restore"；避免在循环内叠 save 不还原；用栈深度断言（调试期）。

### P27 移动端触摸目标过小 / 未处理中断
- **问题**：按钮命中区 < 44×44pt → 误触难点；来电/切后台未暂停 → 回前台状态错乱；强制横屏惹恼用户。
- **触发**：UI 沿用桌面尺寸；未监听中断；`orientation` 写死。
- **解决**：触摸目标 ≥ 44×44pt 且带点击反馈；`visibilitychange`/`pagehide` 中暂停并保存；支持横竖屏自适应（或明确只支持一种并在启动提示）。
- **预防**：UI 规范默认移动端命中区下限；`touch-action: none` 防误滚动；虚拟摇杆/手势抽象输入（见 P14）。

### P28 资源一次性全加载 / 不挂 onerror → 首屏慢或静默卡死
- **问题**：启动把所有图/音频全载 → 首屏 >2MB 白屏久；单个资源 `onerror` 未处理 → 加载失败静默卡死在某帧。
- **触发**：`new Image()` 不挂 `onload/onerror`；无加载进度/超时兜底。
- **解决**：**渐进式加载**——启动只载核心 <2MB，玩法资源按需 lazy load，下一关预取；每个资源挂 `onerror` 回退（PNG→SVG→Emoji，见 P06）并计数；压缩纹理（WebP/KTX2）、音频（WebM/Opus）。
- **预防**：资源系统默认"带 onerror + 超时 + 回退"；启动包体积预算写入 Stage 4 验收；不阻塞式等音频加载。

### P29 联机信任客户端 → 作弊与不同步
- **问题**：客户端自报"命中/伤害/掉落"，服务端照单全收 → 加速挂、自瞄、物品复制、存档篡改。
- **触发**：战斗/经济裁决逻辑放在前端，服务端只做转发存储。
- **解决**：**服务端权威**——服务端校验移动合法性（速度上限）、视线（自瞄）、物品归属（防复制）、时序（是否可能）；客户端只发输入/意图，由服务端裁决并下发状态。
- **预防**：联机系统（Sprint 3）默认"服务端是唯一真相源"；反作弊映射表见 `design-principles.md`；纯函数战斗模块可移植到服务端（呼应 P20）。

### P30 联机直接同步精确坐标 → 抖动 + 带宽爆
- **问题**：每帧同步对象精确 `x/y` → 网络抖动下远端玩家乱跳；全量广播 → 带宽爆（尤其多实体）。
- **触发**：状态同步发完整坐标、固定高频无差别广播。
- **解决**：**插值 + 预测 + 协调（Reconciliation）**平滑远端；**增量/量化同步**（只发变化、降精度）；**兴趣区域（AOI）**只同步邻近实体；位置 20–60Hz、血量/背包按变更发。
- **预防**：联机同步默认"输入同步 + 插值渲染 + 增量 + AOI"；网络预算纳入 Sprint 3 设计评审。
