#!/usr/bin/env python3
"""Validate the local Mindray Design skill's required structure and asset links."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
required = [
    ROOT / "SKILL.md", ROOT / "VERSION", ROOT / "README.md", ROOT / "components-preview.html",
    ROOT / "assets/mindray-lockup.png", ROOT / "assets/template-deck.html", ROOT / "assets/template-interactive.html",
    ROOT / "references/visual-system.md", ROOT / "references/components.md",
    ROOT / "references/layouts.md", ROOT / "references/assets.md",
    ROOT / "references/interactive-deck.md", ROOT / "references/checklist.md",
    ROOT / "references/validation.md", ROOT / "references/presentation-model.md", ROOT / "references/motion-system.md", ROOT / "references/scene-contract.md", ROOT / "references/intake.md", ROOT / "references/content-contract.md", ROOT / "references/page-contract.md", ROOT / "references/scene-index.md", ROOT / "references/scene-flow.md", ROOT / "references/scene-product.md", ROOT / "references/scene-data.md", ROOT / "references/scene-field.md",
]
missing = [str(p.relative_to(ROOT)) for p in required if not p.exists()]
if missing:
    raise SystemExit("Missing required files:\n" + "\n".join(missing))

skill = (ROOT / "SKILL.md").read_text()
for ref in re.findall(r"\(references/([^\)]+)\)", skill):
    if not (ROOT / "references" / ref).exists():
        raise SystemExit(f"SKILL.md references missing file: references/{ref}")
template = (ROOT / "assets/template-interactive.html").read_text()
for token in ("aria-label", "prefers-reduced-motion", "data-node", "drawer", "mindray-lockup.png"):
    if token not in template:
        raise SystemExit(f"Template missing required behavior or asset token: {token}")
print(f"Mindray Design skill valid: {len(required)} required files, template checks passed.")
