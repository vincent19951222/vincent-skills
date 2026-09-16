# Interactive Presentation Design System v1.0

## 0. 定义

Interactive Presentation 是一种以 Web 为载体的交互式演示系统。它保留 Presentation 的叙事节奏，同时使用 HTML、CSS、JavaScript、GSAP、Three.js 等能力提供点击、展开、抽屉、缩放、数据流、3D、状态切换等交互。

目标是建立一种兼具以下能力的表达方式：

- Presentation 的叙事密度
- Editorial / Swiss 的视觉秩序
- Web App 的交互深度
- Data Visualization 的信息表达
- Motion Design 的叙事能力
- Industrial / Med-Tech 的专业精密感

---

# 1. 核心原则

## 1.1 一屏一个核心叙事目标

每个 Scene 必须回答一个问题：

> 这一屏希望观众理解什么？

页面中所有视觉、动效、交互都服务于这个核心目标。

建议：

- 每屏只允许 1 个视觉主焦点
- 每屏最多 3 个主要信息组
- 任何装饰如果无法帮助理解，应删除

## 1.2 默认极简，细节逐层展开

Interactive Presentation 的核心优势是 Depth。

推荐信息深度：

- L0：Key Message
- L1：Overview / Structure
- L2：Drawer / Expand / Tooltip
- L3：Demo / Simulation / Deep Dive

默认界面优先展示 L0 与 L1，细节通过交互进入。

## 1.3 静态画面必须成立

暂停所有动画后，页面仍然应该具备完整的视觉质量。

检查标准：

- 截图是否依然好看
- 层级是否依然明确
- 内容是否依然可理解

动画用于强化表达，不承担弥补排版问题的职责。

## 1.4 交互必须服务于理解

每个交互都需要回答：

1. 它帮助理解了吗？
2. 它让信息更清晰了吗？
3. 删除后是否损失表达？

如果三个问题都回答“否”，删除该交互。

---

# 2. Foundation

## 2.1 Typography

推荐主字号：

- Display：64–80px
- Title：40–48px
- Heading：24–28px
- Body：16–18px
- Caption：12–14px

原则：

- 层级差距要明显
- 关键数字可进一步放大
- 正文避免连续大段
- 单段正文建议控制在 2–4 行

推荐字体：

- Sans：Inter / Geist / SF Pro / IBM Plex Sans
- Mono：Geist Mono / JetBrains Mono / IBM Plex Mono

Mono 仅用于：

- 指标
- 参数
- 型号
- 协议名
- 时间戳
- 实时数据字段

例如：

`SpO2 98%`

`HL7::OBX-3`

`BeneVision N22`

`2026-09-16 14:03:28`

## 2.2 Grid

推荐：

- 12 Column Grid
- 页面左右安全边距：64–96px
- 基础间距单位：8px

Spacing Token：

8 / 16 / 24 / 40 / 64 / 96 / 160

原则：

- 所有元素尽可能依赖网格和对齐线
- 同级元素保持一致间距
- 使用留白表达信息分组

## 2.3 Radius

Industrial Precision Theme 推荐：

- Small：4px
- Default：6px
- Large：8px

避免大面积使用 16px 以上消费级大圆角。

## 2.4 Border

推荐 Hairline Grid：

- 1px 细描边
- 低对比冷灰
- 深色模式使用深灰描边

示例：

`rgba(148, 163, 184, 0.28)`

## 2.5 Shadow

阴影保持克制。

推荐：

- 极轻外阴影
- 少量内高光
- 避免明显漂浮感

视觉目标接近精密仪器面板。

---

# 3. Canvas System

## 3.1 Base Canvas

适用于：

- Hero
- Key Message
- Transition
- Conclusion

风格：

- 纯白 / 浅灰白
- 深蓝灰 / 黑灰
- 大量留白

## 3.2 Dot Grid Canvas

适用于：

- 架构图
- 系统关系
- 数据工作台
- 设备连接
- Node Graph

推荐参数：

```css
--canvas-dot-color: rgba(148, 163, 184, 0.28);
--canvas-dot-size: 1.2px;
--canvas-dot-gap: 24px;

background-image:
  radial-gradient(
    var(--canvas-dot-color)
    var(--canvas-dot-size),
    transparent var(--canvas-dot-size)
  );

background-size:
  var(--canvas-dot-gap)
  var(--canvas-dot-gap);
```

使用规则：

- 点阵永远位于视觉底层
- 不允许抢夺主体注意力
- 信息密集区域应降低点阵透明度
- 不建议所有页面统一铺满 Dot Grid

---

# 4. Content Visual Grammar

内容类型应尽可能映射为稳定的视觉模式。

## 4.1 观点

内容：

核心观点、结论、判断。

视觉形式：

**Hero Statement**

结构：

大标题 + 一句解释 + 可选 CTA / Explore。

---

## 4.2 数字

内容：

指标、KPI、实时值、统计结果。

视觉形式：

**Metric / Telemetry**

结构：

大数字 + 单位 + Label + 状态 + 可选趋势。

规则：

- 一屏最多一个核心数字主角
- 数字使用 Mono
- 辅助数据降低视觉权重

---

## 4.3 对比

内容：

Before / After、A / B、Old / New、方案对比。

视觉形式：

**Comparison**

优先：

双栏、差异高亮、状态变化、Before / After 动画。

避免使用大段文字描述差异。

---

## 4.4 关系

内容：

产品关系、系统关系、上下游、模块依赖。

视觉形式：

**Node Graph / Architecture**

规则：

- 节点只展示短名称与一句角色说明
- 连接线表达关系
- 点击节点进入细节
- 主画布不堆正文

---

## 4.5 流程

内容：

工作流、临床流程、用户旅程、数据链路。

视觉形式：

**Step Flow**

规则：

- 一步一个动作
- 用路径表达顺序
- 点击展开每一步细节

---

## 4.6 时间

内容：

演进、产品路线、历史、事件。

视觉形式：

**Timeline**

规则：

- 时间是主轴
- 事件卡片保持轻量
- 点击展开关键节点

---

## 4.7 因果

内容：

A 导致 B、输入影响结果、问题形成机制。

视觉形式：

**Causal Chain**

推荐：

`Cause → Mechanism → Effect`

---

## 4.8 空间

内容：

医院、手术室、设备位置、物理关系。

视觉形式：

**Map / 2.5D / 3D Scene**

仅在空间关系真正重要时使用 Three.js。

---

## 4.9 复杂解释

视觉形式：

**Detail Drawer**

推荐结构：

What → Why → How → Example / Evidence

---

# 5. Components

## 5.1 Metric Tile

用途：

生命体征、数据指标、系统 KPI。

组成：

Label / Value / Unit / Status / Trend

## 5.2 Device Node

用途：

医疗设备、软件模块、数据节点。

状态：

Default / Hover / Active / Selected / Disabled

交互：

- Hover 微提亮
- Click 选中
- Selected 时关联路径同步高亮

## 5.3 System Card

用途：

子系统、产品模块、能力单元。

规则：

- 信息高度一致
- 内容短
- 避免过度 Card 化

## 5.4 Drawer

用途：

Deep Dive、产品详情、指标解释、Evidence。

推荐：

- 右侧滑出
- 宽度 360–520px
- 轻磨砂
- 350–500ms
- 背景主体轻微 Dim

## 5.5 Status Chip

用于：

Online / Warning / Connected / Realtime / Syncing

要求：

- 小尺寸
- 轻背景
- 细描边
- 可使用状态点

## 5.6 Tooltip / Popover

仅承载轻量解释。

不承载长文、核心信息、多层结构。

---

# 6. Interaction System

## 6.1 Hover

语义：

“这个对象可以操作。”

推荐：

- Scale：1.01–1.03
- Border 提亮
- Background 微变化
- Cursor 改变

## 6.2 Click

语义：

“进入下一层信息。”

行为：

Select / Expand / Drawer / Focus / Deep Dive

## 6.3 Zoom / Focus

适合：

系统图、产品结构、设备细节。

行为：

- 主体放大
- 其他内容 Dim
- 保留明确返回路径

## 6.4 Progressive Disclosure

默认只展示：

- 名称
- 核心关系
- 核心结论

交互后再展示：

- 参数
- 解释
- Evidence
- Demo

---

# 7. Motion System

## 7.1 动画语义

**Fade**

新信息出现。

**Slide**

面板或信息来自某个方向。

**Scale**

聚焦对象。

**Morph**

同一对象状态发生变化。

**Drawer**

进入细节。

**Zoom**

从 Overview 进入 Detail。

**Dim**

降低非重点内容权重。

**Path Highlight**

表达数据、设备或流程关系。

## 7.2 Motion Timing

建议：

- Hover：120–180ms
- Click feedback：180–240ms
- UI Transition：250–400ms
- Drawer：350–500ms
- Scene Transition：600–900ms
- Story Animation：1–3s

## 7.3 Motion Character

Med-Tech / Industrial Precision 的关键词：

稳、准、克制、有阻尼、有因果。

避免：

- 大幅弹跳
- 夸张 Overshoot
- 高频粒子
- 快速旋转
- 多种吸睛动画同时出现

---

# 8. Visual Theme：Med-Tech Precision

## 8.1 关键词

Industrial / Clinical / Precise / Calm / Realtime / Technical / Premium

## 8.2 色彩

建议比例：

- 80–90% 冷灰 / 石板灰 / 蓝灰
- 5–10% 品牌强调色
- 少量状态色

品牌红可用于：

- Selected
- Primary CTA
- 核心路径
- 重点标签
- Active Border

状态色：

- Success：冷绿色
- Warning：琥珀色
- Alert：红色
- Info：蓝色

品牌色与状态色职责应分开。

## 8.3 Surface

面板风格：

- 6–8px 微圆角
- 1px Hairline
- 微阴影
- 轻内高光
- Drawer 可使用轻毛玻璃

视觉目标：

**精密医疗设备面板。**

## 8.4 Telemetry

实时数据统一使用：

- Mono
- 小 Label
- 大 Value
- 清晰 Unit
- Status Dot
- 微趋势

示例：

`HR 82 bpm`

`SpO2 98%`

`NIBP 120/80 mmHg`

---

# 9. Scene Patterns

## Overview → Detail

适合：

产品架构、系统关系、医疗设备。

## Problem → Mechanism → Solution

适合：

产品价值、临床问题、技术方案。

## Before → After

适合：

数智化升级、自动化、效率提升。

## System → Component

适合：

产品体系、平台架构。

## Data → Insight

适合：

指标分析、临床数据、运营数据。

## Timeline → Event

适合：

产品发展、项目进度、路线图。

---

# 10. 技术映射

## HTML / CSS

负责：

Layout、Typography、Grid、Surface、Drawer、Component。

## JavaScript / React

负责：

State、Scene、Selection、Drawer、Data Binding、Navigation。

## GSAP

负责：

Timeline、Scene Transition、Stagger、Morph、Path Animation、Focus / Dim、Drawer Motion。

## Three.js

仅用于：

- 真正需要空间关系的内容
- 设备 3D
- 手术室空间
- 复杂结构
- 沉浸式产品展示

Three.js 不作为默认方案。

---

# 11. 硬约束

每一个 Presentation Scene 应满足：

- 一个核心观点
- 一个视觉主角
- 最多三个主要信息组
- 正文控制在必要长度
- 默认状态保持简洁
- 深层信息通过交互进入
- 所有可点击元素有明确 Affordance
- 所有动效具有语义
- 所有视觉元素共享统一 Grid
- 静态截图依然成立

---

# 12. 最终设计检查清单

## 内容

这一屏究竟想表达什么？

三秒后观众应该记住什么？

哪个元素是视觉主角？

## 信息

是否存在可以隐藏到 Drawer 的细节？

是否把关系错误地写成了段落？

是否应该改成流程、对比、节点或数据图？

## 视觉

层级是否明确？

对齐是否一致？

Highlight 是否过多？

色彩是否克制？

留白是否足够？

## 交互

用户是否知道哪里可以点击？

点击以后是否获得新的信息价值？

是否有清晰的返回路径？

## Motion

动画是否帮助理解关系？

动画是否存在明确语义？

同时发生的 Hero Effect 是否超过一个？

## Theme

是否保持 Industrial Precision？

是否避免消费级大圆角？

Telemetry 是否统一使用 Mono？

Dot Grid 是否足够克制？

品牌色是否只用于关键位置？

---

# 13. 一句话定义

> Interactive Presentation Design System 是一套将内容叙事、视觉层级、信息深度、交互探索和 Motion 统一起来的 Web Presentation 设计语言。

最终体验可以概括为：

**第一眼极简，第二步可探索，第三层有深度，整个过程始终保持清晰、克制、精密。**