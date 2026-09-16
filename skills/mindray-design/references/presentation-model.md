# Interactive Presentation model

Mindray decks use the following layered model.

## One scene, one question

Before layout, write `sceneQuestion`: what should the audience understand on this screen? A scene may have many facts, but only one visual protagonist and at most three primary information groups.

## Information depth

- **L0 Key message**: title, conclusion, or current action. Always visible.
- **L1 Structure**: nodes, route, comparison, metric, or legend. Visible in the default state.
- **L2 Explanation**: drawer, expansion, tooltip, or selected detail. User-triggered.
- **L3 Evidence / demo**: screenshot, parameter table, simulation, or linked source. Enter only when it adds a new understanding.

A paused or reduced-motion scene must still work at L0 and L1. Interaction reveals depth, never basic meaning.

## Content to visual mapping

| Content relationship | Preferred visual | Interaction |
|---|---|---|
| conclusion | Hero Statement | optional explore |
| metric or live value | Metric / Telemetry | select metric or trend |
| A versus B | Comparison | toggle or reveal difference |
| system relationship | Node Graph | select node, highlight path |
| ordered work | Step Flow | select step, reveal detail |
| time or history | Timeline | select event |
| cause and result | Causal Chain | step through chain |
| spatial relationship | Map / 2.5D / 3D | zoom only when spatial understanding requires it |
| complex explanation | Detail Drawer | What, Why, How, Evidence |

## Technical roles

HTML and CSS handle layout, type, surfaces, responsive fallback, and accessible structure. JavaScript handles scene state, selection, drawer state, and navigation. GSAP is appropriate for authored timelines, path highlighting, or scene transitions; Three.js is reserved for genuine spatial content. Neither is a default dependency.
