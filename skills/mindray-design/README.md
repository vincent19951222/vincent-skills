# Mindray Interactive Presentation

Scene 叙事 + L0-L3 信息深度 + Med-Tech Precision。采用用户提供的 Interactive Presentation Design System v1.0，保留 Mindray 原始 Logo 与项目品牌红。

- [SKILL.md](SKILL.md)：制作入口及按需阅读顺序。
- [新 Scene 样板](assets/template-interactive.html)：两屏演示；节点选择、路径强调、详情抽屉与键盘返回。
- [六屏参考实现](assets/demo.html)：INDEX / FLOW / SYSTEM / DATA / COMPARE / PRODUCT，覆盖 Metric、Status Chip、Comparison、SVG 关系图等 demo 级组件。
- [原始方向文档](references/source/interactive-presentation-v1.md)：用户提供，原样保存。
- [组件规范](references/components.md)：区分可运行组件与尚未实现的设计规则。
- [旧组件预览](components-preview.html)：平面组件目录，尚未完整迁移到新 Scene 模型。
- `assets/template-deck.html`：旧课件模板，保留作比较；新制作从 template-interactive 开始。

维护：`python3 scripts/validate.py` 检查文件与资源关系。浏览器按 references/validation.md 执行，静态校验不代表交互通过。
