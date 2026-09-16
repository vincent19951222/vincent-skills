#!/usr/bin/env python3
"""Validate that the checked-in component preview exposes all catalog groups."""
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
preview=(ROOT/'components-preview.html').read_text()
required=('LOGO LOCKUP','CHAPTER ITEM','SELECTABLE FLOW','ARCHIVE INDEX','PRODUCT EVIDENCE','DATA LEGEND','STATUS STRIP')
missing=[x for x in required if x not in preview]
if missing: raise SystemExit('Preview missing: '+', '.join(missing))
print(f'Component preview valid: {len(required)} component examples.')
