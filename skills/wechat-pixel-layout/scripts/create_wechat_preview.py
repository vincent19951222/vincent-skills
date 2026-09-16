#!/usr/bin/env python3
"""Create a standalone WeChat classic-pixel preview HTML from Markdown."""

from __future__ import annotations

import argparse
import base64
import html
import json
import mimetypes
import re
import sys
import webbrowser
from pathlib import Path


SKILL_DIR = Path(__file__).resolve().parents[1]
ASSETS_DIR = SKILL_DIR / "assets"
TEMPLATE_PATH = ASSETS_DIR / "wechat-pixel-preview-template.html"
THEME_PATH = ASSETS_DIR / "theme01-pixel-classic.json"
MARKED_PATH = ASSETS_DIR / "marked.min.js"
CALLOUT_LABELS = {
    "abstract": "摘要",
    "bug": "问题",
    "danger": "危险",
    "example": "示例",
    "failure": "失败",
    "info": "说明",
    "note": "笔记",
    "question": "问题",
    "quote": "引用",
    "success": "完成",
    "tip": "提示",
    "todo": "待办",
    "warning": "注意",
}


def resolve_local_asset(markdown_path: Path, target: str) -> Path | None:
    asset_path = Path(target).expanduser()
    if asset_path.is_absolute():
        return asset_path if asset_path.is_file() else None

    candidates = [markdown_path.parent / asset_path]
    candidates.extend(parent / asset_path for parent in markdown_path.parents)
    for candidate in candidates:
        if candidate.is_file():
            return candidate.resolve()
    return None


def image_data_uri(path: Path) -> str:
    mime_type = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    encoded = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:{mime_type};base64,{encoded}"


def prepare_markdown(markdown: str, markdown_path: Path) -> str:
    if markdown.startswith("---\n"):
        _, separator, remainder = markdown.partition("\n---\n")
        if separator:
            markdown = remainder.lstrip("\n")

    def replace_obsidian_image(match: re.Match[str]) -> str:
        raw_target = match.group(1)
        target = raw_target.split("|", 1)[0].strip()
        resolved = resolve_local_asset(markdown_path, target)
        if resolved is None:
            return match.group(0)
        alt = resolved.stem
        return f"![{alt}]({image_data_uri(resolved)})"

    markdown = re.sub(r"!\[\[([^\]]+)\]\]", replace_obsidian_image, markdown)
    def replace_callout_marker(match: re.Match[str]) -> str:
        callout_type = match.group(1).strip().lower()
        custom_title = (match.group(3) or "").strip()
        label = custom_title or CALLOUT_LABELS.get(callout_type, callout_type)
        escaped_label = html.escape(label, quote=True)
        return f'> <span data-wechat-quote-label="{escaped_label}"></span>'

    markdown = re.sub(
        r"^>[ \t]*\[!([^\]]+)\]([+-])?(?:[ \t]+(.*))?$",
        replace_callout_marker,
        markdown,
        flags=re.MULTILINE,
    )
    markdown = re.sub(r"==(.+?)==", r"<mark>\1</mark>", markdown)
    return markdown


def extract_title(markdown: str, fallback: str) -> str:
    for line in markdown.splitlines():
        stripped = line.strip()
        if stripped.startswith("# "):
            title = stripped[2:].strip()
            if title:
                return title
    return fallback


def build_preview(markdown_path: Path, output_path: Path) -> Path:
    markdown = markdown_path.read_text(encoding="utf-8-sig")
    prepared_markdown = prepare_markdown(markdown, markdown_path)
    theme = json.loads(THEME_PATH.read_text(encoding="utf-8"))
    template = TEMPLATE_PATH.read_text(encoding="utf-8")
    marked_js = MARKED_PATH.read_text(encoding="utf-8")
    title = extract_title(markdown, markdown_path.stem)

    rendered = (
        template.replace("__WECHAT_PIXEL_DOCUMENT_TITLE__", html.escape(title, quote=True))
        .replace(
            "__WECHAT_PIXEL_MARKDOWN_JSON__",
            json.dumps(prepared_markdown, ensure_ascii=False),
        )
        .replace("__WECHAT_PIXEL_THEME_JSON__", json.dumps(theme, ensure_ascii=False))
        .replace("__MARKED_MIN_JS__", marked_js)
    )

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(rendered, encoding="utf-8")
    return output_path


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Generate a classic-pixel WeChat preview HTML with rich-text copy."
    )
    parser.add_argument("markdown", help="Path to the Markdown source file.")
    parser.add_argument("-o", "--output", help="Output HTML path. Defaults beside the Markdown file.")
    parser.add_argument("--open", action="store_true", help="Open the generated HTML in the default browser.")
    args = parser.parse_args(argv)

    markdown_path = Path(args.markdown).expanduser().resolve()
    if not markdown_path.exists():
        parser.error(f"Markdown file not found: {markdown_path}")

    output_path = (
        Path(args.output).expanduser().resolve()
        if args.output
        else markdown_path.with_suffix(".wechat-pixel.html")
    )

    generated = build_preview(markdown_path, output_path)
    print(str(generated))

    if args.open:
        webbrowser.open(generated.as_uri())

    return 0


if __name__ == "__main__":
    sys.exit(main())
