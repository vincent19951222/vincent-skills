# My Claude Skills

这里是我分享的 Claude Code Skills 合集。每个 Skill 都是一个独立目录，包含 `SKILL.md`（触发条件与工作流）和配套的资源文件。

## 如何使用

把整个 Skill 目录复制到以下任一位置即可：

- **全局**：`~/.claude/skills/`（所有项目可用）
- **项目级**：`<你的项目>/.claude/skills/`（仅该项目可用）

之后在与 Claude Code 对话时，用自然语言描述需求（如"帮我做份简历"），Skill 会被自动触发。

## Skills 列表

### 📝 format-knowledge-notes · 知识提炼与 Markdown 排版

将原始文本、会议记录、资料摘录、产品分析或已有 Markdown 提炼并排版为高信息密度、强结构、易扫描的知识笔记。支持整理笔记、提炼要点、压缩长文、去重重组，以及生成适合 Obsidian、Notion 或 GitHub README 的内容；也支持仅优化排版而不改写原文。

### 📄 resume-stylist · 简历风格生成器

根据**岗位方向**（产品 / 研发 / 职能）与**目标公司性质**（传统 / 互联网 / AI native），生成匹配风格的单页 A4 HTML 简历。

**核心设计**：1 个内容骨架 + N 个视觉皮肤，两者正交——

- `references/skeleton.md`：语义化 HTML 契约 + bullet 写作规范（强动词 + 量化结果，拒绝"负责/参与"）
- `references/styles.md`：8 个皮肤的设计令牌与风格选择速查表
- `skins/`：8 个完整可用的皮肤实现，全部经过单页 A4 打印验证

| 皮肤 | 适合场景 |
|---|---|
| 经典纸质 | 传统 / 国企 / 事业单位 |
| 商务专业 | 传统大厂 / 外企 |
| 互联网简洁 | 互联网（最通用） |
| 工程师终端 | 研发岗位 |
| AI Pixel | AI native 公司 |
| AI Brutalist | AI native / 创意团队（最大胆） |
| 暖色现代 | 市场 / 运营 / HR |
| 瑞士极简 | 外企 / 设计导向 |

皮肤中的示例人物"陈砚舟"为虚构数据，可直接打开 HTML 预览各风格效果。

## License

MIT
