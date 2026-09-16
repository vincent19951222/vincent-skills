---
name: wechat-pixel-layout
description: Use when converting Markdown into a local WeChat Official Account preview page using the fixed classic pixel theme, especially when the user wants a phone preview and one-click rich-text HTML copy for pasting into WeChat drafts.
---

# WeChat Pixel Layout

## Overview

Generate a local HTML preview page for a Markdown article using the fixed "classic pixel" theme. The page contains a phone-style preview area and a copy button that writes the rendered rich HTML to the clipboard for pasting into the WeChat Official Account editor.

## Workflow

1. Save the user's Markdown to a `.md` file if it is not already in a file.
2. Run `scripts/create_wechat_preview.py <markdown-file>`.
3. Open the generated `.wechat-pixel.html` file for visual checking.
4. Use the page's copy button to copy the rendered rich HTML, then paste it into WeChat.

## Command

```bash
python /path/to/wechat-pixel-layout/scripts/create_wechat_preview.py article.md
```

Useful options:

```bash
python /path/to/wechat-pixel-layout/scripts/create_wechat_preview.py article.md -o output.html --open
```

## Rules

- Always use `assets/theme01-pixel-classic.json`.
- Do not switch themes unless the user explicitly asks to change the skill.
- Keep the outer wrapper flush with the copied article and use the same background color as the content section, so WeChat night mode does not expose a gray gutter.
- Preserve Markdown as the source of truth; regenerate the preview when content changes.
- Treat the generated HTML as the deliverable. The clipboard action happens inside the browser so the WeChat editor receives rich text, not source code.

## Resources

- `scripts/create_wechat_preview.py`: builds the standalone preview HTML.
- `assets/wechat-pixel-preview-template.html`: browser template with renderer and copy behavior.
- `assets/theme01-pixel-classic.json`: fixed classic pixel theme from the original project.
- `assets/marked.min.js`: bundled Markdown renderer inlined into generated HTML.
