# Presentation 组件与实现状态

先确定要解释什么，再选择组件。原子组件服务于一屏的核心叙事。

实现分两级：`模板` 指 `assets/template-interactive.html` 可直接复制；`demo` 指 mi-ICU 培训演示（内容项目中的 `presentations/demo.html`）已验证的形态，可按需移植。

| 组件 | 默认信息 | 展开信息 / 交互 | 当前实现 |
|---|---|---|---|
| Hero Statement | 观点 + 一句解释 | 进入下一 Scene | 模板 + demo |
| Device Node | 名称 + 角色 | 选中、关联路径强调、打开详情 | 模板 + demo（demo 含 SVG 关系图连线高亮） |
| Detail Drawer | What / Why / How | Evidence 入口；关闭回到触发节点 | 模板 + demo |
| Inline Expand | 一句判断 | 原地展开解释与来源行 | 模板 + demo |
| Metric / Telemetry | Label / Value / Unit / Status | 点击展开指标口径解释带 | demo |
| Status Chip | 文字 + 语义状态点 | 必要时补充原因 | demo（ok / warn / info 三态令牌） |
| Comparison | 同维度 A / B | 差异高亮、状态色对照 | demo |
| Dot Grid Canvas | 工程画布底层 | 不交互，只承载关系类场景 | 模板 + demo |
| System Card | 一个子系统及角色 | 进入组成或证据 | 规范，未实现 |
| Timeline / Causal Chain | 时间或因果主轴 | 选择事件或机制 | 规范，未实现 |
| Tooltip / Popover | 非核心术语解释 | 点击/键盘均可打开和关闭 | 规范，未实现（真实截图热点标注的候选形态） |
| Map / 2.5D / 3D | 空间关系 | 聚焦、缩放、返回概览 | 按真实空间需求实现 |

## L2 呈现按内容分型

展开形式由内容长度和语境决定，不默认全部进抽屉：

- **Drawer**：长解释、因果链、来源与证据。适合 FLOW / SYSTEM 节点。
- **Inline Expand**：一两句判断，且需要对照主画面看。适合 PRODUCT 说明点；`+` 旋转为 `×`，再次点击收起，`aria-expanded` 同步。
- **指标解释带（Focus Strip）**：指标口径与排查顺序，在指标区下方以红色顶线条带出现，不离开数据语境。适合 DATA 场景。

## Device Node

Default、Hover、Active、Selected、Disabled 各自有意义。可操作节点用 button；选中使用 `aria-pressed`。Hover 微提亮、Active 短反馈，Selected 同步强调数据关系。Disabled 配原因，不装作可点击。

连接线的方向/关系来自材料。不能用随意填充比例冒充拓扑或实时传输。demo 的 SVG 连线坐标按节点位置手写对齐，改动节点数量或文案长度时需同步调整。

## Drawer

右侧 360-520px，窄屏全宽。What → Why → How → Evidence 是内容顺序；缺证据时标明，不生成虚构来源。用原生 dialog 或等价模态模式保证焦点进入、Tab 约束、Escape 关闭、关闭后返回触发点。滚动发生在面板内。

短内容不进抽屉：两段以内的说明放入全高抽屉会显空，用 Inline Expand 或解释带。

## Telemetry

Mono 数值、清晰单位、可核实来源。一屏一个主数字，辅助数据降低权重。原稿 HR/SpO2/NIBP 只是展示示例，不能输出成真实患者数据，不推导诊断。演示数据必须标注「示例数据」。

## Status Chip

小尺寸、轻背景、细描边、状态点。状态色独立于品牌红：`--ok:#2c8a57`、`--warn:#b97918`、`--info:#3b6ea5`。芯片是圆角药丸，与节点/卡片的 6px 微圆角属于两套形状规则，不混用。

## Logo 与课件索引

顶栏主 Logo 使用 `assets/mindray-lockup-wide.png`（原图裁掉透明边距的版本，比例 1240×280）；`assets/mindray-lockup.png` 原图保留供溯源，不裁字形、不变色。Logo 放在顶栏左侧作为常驻品牌锚点，章节轨道只保留页码。页码、章节号仅用于真实导航。旧预览中的英文大写标签不必带进最终演示。
