---
name: mindray-design
description: 制作 Mindray 风格的交互式 HTML Presentation，围绕 Scene 叙事、L0-L3 信息深度、视觉映射和有语义的动效设计培训、产品讲解及系统关系演示。
metadata:
  short-description: Scene-based interactive HTML presentations
---

# Mindray Interactive Presentation

以 Web 承载演示叙事：一屏一个核心问题，默认展示观点与结构，点击后进入解释与证据。
遵循用户认可的 [Interactive Presentation v1.0 原稿](references/source/interactive-presentation-v1.md)。原稿保留供溯源，制作时读取下面的执行规范。本文是项目设计方法，不是迈瑞官方 VI。

## 任务入口

- 讨论方向或审视：先分析内容和实际页面，输出具体判断，不因读到模板而自动重做页面。
- 新建演示：提炼 Scene，制作代表性样板，再完成所需场景；数量由内容决定。
- 局部修改：保持已确认的事实、Logo、导航和其他场景，修改指定部分。
- 更新本 Skill：同步规范、对应实现与验证，明确哪些能力只有规范、哪些已经可运行。

## 制作流程

1. 读取 [intake](references/intake.md)，从已有材料提取受众、讲解目标、版本、来源与运行方式，只问影响结果的缺项。
2. 读取 [Presentation 模型](references/presentation-model.md) 和 [Scene 契约](references/scene-contract.md)，为每屏写出问题、视觉主角、L0-L3、来源与返回路径。制作多屏内容时按 [内容清单](references/content-contract.md) 留下可核对的记录。
3. 按 [布局映射](references/layouts.md) 将观点、数字、对比、关系、流程、时间、因果、空间转换为相应视觉，而非先挑一排卡片填文字。
4. 读取 [视觉基础](references/visual-system.md)。Mindray 继续使用已提供的 Logo、品牌红；底色采用明亮中性色，细节面板采用精密仪器的轻层次。
5. 读取 [组件](references/components.md)、[交互](references/interactive-deck.md) 与 [动效](references/motion-system.md)。每项交互说明它新增的理解价值；不要求每屏都有 Drawer 或 3D。
6. 从 [新 Scene 模板](assets/template-interactive.html) 开始，用 [HTML 契约](references/page-contract.md) 保持状态与可访问性。组件预览 `components-preview.html` 是旧版平面组件目录，尚未完整体现新模型；旧 `assets/template-deck.html` 仅作存量参考。
7. 依 [素材规则](references/assets.md) 复制所需资产到内容项目，保证本地可打开。演示数据明确标记；不把模板文案写成真实产品事实。
8. 按 [验收清单](references/checklist.md) 和 [验证流程](references/validation.md) 检查静态画面、节点路径联动、返回、键盘、窄屏与减少动效；交付文件和实际验证范围。

## 品牌与技术边界

- Logo 使用 [原图](assets/mindray-lockup.png)，不重画、不变色、不压扁；UI 红色仍是项目令牌，不冒称官方色值。
- Vincent 的内容优先、中文排版和来源习惯继续使用；本轮用户选定的 Scene 深度和 Med-Tech Precision 规则优先于旧卡片/平面课件形式。
- HTML/CSS/JS 足够时直接实现。GSAP 用于确实需要编排的时间线；Three.js 只用于空间关系。安装库前检查项目依赖。
- 静止画面必须成立，减少动效不隐藏内容。品牌色和语义状态色独立。
- 每屏一个视觉主角、最多三个主要信息组；超量时拆 Scene 或放入更深层，而非缩小文字。

## 旧课件分类如何继续使用

`INDEX / FLOW / PRODUCT / DATA / FIELD` 是内容分类，不再限定页面模板。场景适配说明按需读：
[INDEX](references/scene-index.md)、[FLOW](references/scene-flow.md)、[PRODUCT](references/scene-product.md)、[DATA](references/scene-data.md)、[FIELD](references/scene-field.md)。
