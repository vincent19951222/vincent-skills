# Vincent Skills

这里是我分享的 Agent Skills 合集。每个 Skill 都是一个独立目录，包含 `SKILL.md`（触发条件与工作流）和配套资源文件，支持 Codex、Claude Code 等兼容 Agent Skills 的工具。

## 如何使用

推荐通过 `skills` CLI 安装：

```bash
# 查看仓库中的 Skills
npx skills add vincent19951222/vincent-skills --list

# 交互式选择并安装
npx skills add vincent19951222/vincent-skills

# 全局安装 resume-stylist 到 Codex
npx skills add vincent19951222/vincent-skills \
  --skill resume-stylist \
  --agent codex \
  --global
```

也可以把整个 Skill 目录手动复制到对应工具的 skills 目录，例如 Codex 的 `~/.codex/skills/` 或 Claude Code 的 `~/.claude/skills/`。

安装后，用自然语言描述需求（如“帮我做份简历”），Skill 会根据描述自动触发。

## Skills 列表

### 📝 format-knowledge-notes · 知识提炼与 Markdown 排版

将原始文本、会议记录、资料摘录、产品分析或已有 Markdown 提炼并排版为高信息密度、强结构、易扫描的知识笔记。支持整理笔记、提炼要点、压缩长文、去重重组，以及生成适合 Obsidian、Notion 或 GitHub README 的内容；也支持仅优化排版而不改写原文。

### 📄 resume-stylist · 简历风格生成器

根据**岗位方向**（产品 / 研发 / 职能 / 设计创意）与**目标公司性质**（传统 / 互联网 / AI native），生成匹配风格的单页 A4 HTML 简历。

**核心设计**：1 个内容骨架 + N 个视觉皮肤，两者正交——

- `references/skeleton.md`：语义化 HTML 契约 + bullet 写作规范（强动词 + 量化结果，拒绝"负责/参与"）
- `references/styles.md`：10 个皮肤的设计令牌与风格选择速查表
- `skins/`：10 个完整可用的皮肤实现，全部经过单页 A4 打印验证

| 皮肤 | 适合场景 |
|---|---|
| 经典纸质 | 传统 / 国企 / 事业单位 |
| 商务专业 | 传统大厂 / 外企 |
| 互联网简洁 | 互联网（最通用） |
| 工程师终端 | 研发岗位 |
| AI Pixel | AI native 公司 |
| AI 锋锐 | AI native / 产品 / 设计 |
| 暖调专业 | 市场 / 运营 / HR |
| 瑞士极简 | 外企 / 设计导向 |
| 杂志衬线 | 设计 / 艺术 / 内容 |
| 画廊极简 | 设计工作室 / 外企 / 创意团队 |

皮肤中的“陈砚舟”和“沈亦楠”均为虚构示例人物，可直接打开 HTML 预览各风格效果。

## License

MIT
