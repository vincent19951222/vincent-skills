# Asset and source rules

- `assets/mindray-lockup.png` is the user-supplied logo reference. Treat it as the canonical project asset until the user provides a vector or official brand package.
- Keep original source assets intact. Create derived crops in a separate file only when the output needs it.
- Product screenshots, diagrams, PDFs, and data must retain a source note or filename when used in a deck.
- Do not use generated images as product UI, medical evidence, device photos, or personal work history.
- Do not embed remote image URLs in final HTML when the deck must work offline. Copy approved local assets into the project.
- If an asset is missing, use an explicit placeholder such as `待替换素材 / source required`; never make the placeholder look like a completed product screen.


## Included starters

`assets/template-interactive.html` is the new Scene-based starter; copy the HTML and mindray-lockup.png together. It uses illustrative content, not verified product behavior. `assets/template-deck.html` remains a legacy comparison only. Neither output is a self-contained single file until its local PNG dependency is embedded.
