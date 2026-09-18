# Examples

## 交互式培训课件

从 `../assets/template-interactive.html` 复制开始（旧 `template-deck.html` 仅作存量参考）。模板自带两个 Scene：FLOW（节点 + 路径高亮 + Drawer）和 Inline Expand（原地展开），先替换：

1. 顶栏 Logo 与档案语境文字（`MI-ICU / TRAINING ARCHIVE`）；
2. 每屏的核心问题（`这一屏回答什么`）、标题和引导句；
3. FLOW 页的真实流程节点、抽屉解释和来源；
4. 说明点的真实判断与来源行。

## 六屏参考实现

`../assets/demo.html` 是本 skill 内置的完整参考：INDEX / FLOW / SYSTEM（SVG 关系图连线高亮）/ DATA（Metric、Status Chip、指标解释带）/ COMPARE（差异高亮对比）/ PRODUCT（占位素材 + 空间热点 Inline Expand）。组件形态与 `../references/components.md` 的实现状态一一对应，可按需移植。

模板与 demo 都只验证结构和交互。占位截图、示例标题和示例数据必须在交付前替换或明确标记。
