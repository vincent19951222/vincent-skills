# Examples

## 交互式培训课件

从 `../assets/template-interactive.html` 复制开始（旧 `template-deck.html` 仅作存量参考）。模板自带两个 Scene：FLOW（节点 + 路径高亮 + Drawer）和 Inline Expand（原地展开），先替换：

1. 顶栏 Logo 与档案语境文字（`MI-ICU / TRAINING ARCHIVE`）；
2. 每屏的核心问题（`这一屏回答什么`）、标题和引导句；
3. FLOW 页的真实流程节点、抽屉解释和来源；
4. 说明点的真实判断与来源行。

更完整的六屏参考实现（INDEX / FLOW / SYSTEM 关系图 / DATA 指标 / COMPARE 对比 / PRODUCT）见 mi-ICU 内容项目的 `presentations/demo.html`，其中 Metric、Status Chip、Comparison、关系图连线高亮等形态已按 `references/components.md` 的实现状态标注，可按需移植。

模板当前只验证结构和交互。占位截图、示例标题和示例数据必须在交付前替换或明确标记。
