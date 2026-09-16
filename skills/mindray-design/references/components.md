# Presentation 组件与实现状态

先确定要解释什么，再选择组件。原子组件服务于一屏的核心叙事。

| 组件 | 默认信息 | 展开信息 / 交互 | 当前实现 |
|---|---|---|---|
| Hero Statement | 观点 + 一句解释 | 进入下一 Scene | 新模板 |
| Device Node | 名称 + 角色 | 选中、关联路径强调、打开详情 | 新模板 |
| Detail Drawer | What / Why / How | Evidence 入口；关闭回到触发节点 | 新模板 |
| Status Chip | 文字 + 语义状态 | 必要时补充原因 | 旧预览静态样例 |
| Metric / Telemetry | Label / Value / Unit / Status | 可核实趋势和解释 | 规范，未实现 |
| System Card | 一个子系统及角色 | 进入组成或证据 | 规范，未实现 |
| Comparison | 同维度 A / B | 差异高亮或状态切换 | 规范，未实现 |
| Timeline / Causal Chain | 时间或因果主轴 | 选择事件或机制 | 规范，未实现 |
| Tooltip / Popover | 非核心术语解释 | 点击/键盘均可打开和关闭 | 规范，未实现 |
| Map / 2.5D / 3D | 空间关系 | 聚焦、缩放、返回概览 | 按真实空间需求实现 |

## Device Node

Default、Hover、Active、Selected、Disabled 各自有意义。可操作节点用 button；选中使用 `aria-pressed`。Hover 微提亮、Active 短反馈，Selected 同步强调数据关系。Disabled 配原因，不装作可点击。

连接线的方向/关系来自材料。不能用随意填充比例冒充拓扑或实时传输。

## Drawer

右侧 360-520px，窄屏全宽。What → Why → How → Evidence 是内容顺序；缺证据时标明，不生成虚构来源。用原生 dialog 或等价模态模式保证焦点进入、Tab 约束、Escape 关闭、关闭后返回触发点。滚动发生在面板内。

## Telemetry

Mono 数值、清晰单位、可核实来源。一屏一个主数字，辅助数据降低权重。原稿 HR/SpO2/NIBP 只是展示示例，不能输出成真实患者数据，不推导诊断。

## Logo 与课件索引

使用 `assets/mindray-lockup.png`；透明边距用展示容器处理，不能裁掉字形。页码、章节号仅用于真实导航。旧预览中的英文大写标签不必带进最终演示。
