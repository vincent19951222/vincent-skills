# Image Gen 等距像素提示模板

每张图单独生成。只使用头像作为人物身份参考；服装、比例和动作使用文字规则。头像不提供最终渲染风格。正文配图默认由图片生成模型直接生成 2–5 个简短中文像素批注；小红书 HTML 卡片内嵌主视觉固定无字。

## 新图共享模板

```text
Use case: stylized-concept
Asset type: standalone {WeChat Official Account headline cover / general article cover / article body illustration / Xiaohongshu HTML card embedded visual}
Target platform and exact canvas: {WeChat headline cover: 2.35:1 ultra-wide, composed for 900×383 / general cover: 16:9 / body illustration: 16:9 / Xiaohongshu HTML card embedded visual: 16:9}

Primary request:
Create one original Vincent IP isometric pixel-art scene for this insight: {核心意思}

Reference roles:
- Vincent avatar: the sole identity reference. Preserve a recognizable likeness rather than a generic bespectacled East Asian male. Match the softly elongated oval face, narrowing jaw, straight clear eyebrows, eye placement inside thin round black frames, short tousled black hair with irregular top spikes and natural fringe, nose-to-mouth relationship, sparse moustache, small patch below the lower lip, and short goatee. Ignore watercolor rendering, soft lighting, texture, skin treatment, and portrait composition.
- Do not use any character-sheet reference. Build the mature body proportion, outfit and action only from the written rules below.
- The final rendering must follow the pixel-art contract below, while facial identity remains anchored to the avatar.

Scene theme: {主题}
Physical metaphor: {原创物理隐喻}
Composition: {等距平台、主要物件、空间关系、主视线、平台裁切安全区和标题区域}
Vincent's indispensable action: {Vincent 正在完成的动作}
Text strategy: {WeChat cover: no embedded article title and keep the lower area clean for platform overlay / general cover: no article title and reserve clean title space / body: render 2-5 exact short Chinese pixel labels / Xiaohongshu HTML card embedded visual: no text because all typography is added outside the image in HTML}
Strict text whitelist and roles: {EMPTY for covers / “标注1”放在何处并说明什么 / “标注2”放在何处并说明什么 / “标注3”……}

Pixel-art contract:
Preserve this style anchor: isometric pixel art, 16-bit game asset style, crisp and sharp distinct pixels, hard edges, vibrant distinct color palette, clean dithering, precise geometry, cheerful and cozy atmosphere, professional sprite work, detailed but uncluttered. Use one consistent 2:1 pixel-isometric grid with approximately 26.565-degree left and right axes and vertical upright edges. Make individual pixels visibly intentional. Use a limited palette of roughly 18-32 colors with 2-4 hard-edged shades per material. No anti-aliasing and no smooth gradients.

Vincent sprite:
One clearly readable adult Vincent sprite with natural 5.5-6-head proportions and a recognizable facial likeness to the avatar. Use a front or three-quarter face view unless the requested action makes that impossible. Preserve his softly elongated oval face, narrowing jaw, straight eyebrows, thin round black glasses, short tousled black hair, sparse moustache, small lower-lip patch and short goatee. Use an open cool slate navy hooded jacket near #2B3B52, a plain light T-shirt, simple trousers and low shoes, and warm peach exposed skin near #E39A74. Keep him mature, calm, friendly and focused. If the face is too small to retain identity, enlarge Vincent and simplify the props. Vincent must physically perform the action that makes the metaphor work.

Composition constraints:
Use only 1-3 main objects and no more than about 7 props. Keep one clear focal action and a readable silhouette at thumbnail size. For a WeChat Official Account headline cover, use an exact 2.35:1 ultra-wide composition based on 900×383, not 16:9 and not an approximate generic panorama. Keep Vincent, the core object, and all irreplaceable information in the central square-safe area, preferably in the middle and upper portion. Treat the far left, far right, and lower edge as expendable crop or title-overlay zones; extend only background and nonessential scenery into them. Do not render the article title or any decorative status text. For a general 16:9 cover, occupy roughly 55%-70% of the frame, preserve a clean title-safe area, and keep the text whitelist empty. For a 16:9 body illustration, occupy roughly 35%-60%, keep the scene lighter, and directly render 2-5 exact short Chinese pixel labels that explain inputs, outputs, states, transitions, or results. For a Xiaohongshu HTML card embedded visual, occupy roughly 45%-70%, keep the focal action clear inside a landscape frame, and render no text, title, page number, badge, border, logo, or card UI because the HTML template adds all typography and framing. The whitelist is exhaustive: render no characters, icons, emoji, numbers, status bars, or labels beyond it. Do not add a generic title or repeat the article title.

Avoid:
anti-aliasing, blur, depth of field, motion blur, gradients, soft shadows, bloom, volumetric light, painterly texture, vector curves, low-poly art, voxel art, clay 3D, isometric 3D render, pre-rendered mobile-game look, pixel-filtered painting, mixed pixel sizes, conflicting perspective, chibi proportions, mascot styling, generic anime boy face, round-faced pixel NPC, dense city scenes, excessive props, UI panels, HUD, status bars, health bars, dialogue boxes, decorative emoji, mood labels, coding status, AI percentages, battery or power labels, signal indicators, level counters, date or time labels, logo, watermark, robot, brain, chip, or neon AI network.
```

## 文字片段

用户明确要求纯图片或无字底图，或者资产类型是小红书 HTML 卡片内嵌主视觉时使用：

```text
Do not render any letters, words, numbers, signage, UI, logo, or watermark. {For a cover: preserve a clean low-detail area for later typography at 位置. / For a Xiaohongshu HTML card embedded visual: keep the focal action self-contained and leave all typography to the surrounding HTML; no in-image typography area is required unless the card layout explicitly asks for one.}
```

正文配图默认使用：

```text
The following list is the complete and exhaustive text whitelist for this image: "{标注1}" / "{标注2}" / "{标注3}" {可选第4与第5个}. Render only these labels directly as part of the generated image in a crisp grid-aligned pixel font. Place each label beside its specified object, arrow, state, transition, or result. Reproduce every Chinese character exactly. Do not render any other letters, words, numbers, emoji, icons, status bars, percentages, power indicators, or decorative captions anywhere, especially across the top edge or corners. Generate the scene and its labels together in ImageGen; do not rely on post-processing or later typography.
```

## Midjourney 参数

只有用户明确使用 Midjourney 时，才根据资产类型追加对应参数：

```text
微信公众号头条封面：--ar 900:383 --v 6.1 --style raw
通用封面或正文配图：--ar 16:9 --v 6.1 --style raw
```

原生 ImageGen 或其他生图工具不要携带这些命令参数；在自然语言提示中明确写出 `2.35:1 based on 900×383` 或 `16:9`。

## 局部编辑模板

```text
Edit the provided target image. Change only: {用户指定修改}.

Preserve exactly:
- Vincent's adult identity, short dark hair, round glasses, tiny facial hair and open slate-navy hooded jacket;
- the existing visible pixel size, limited palette, hard edges, clean dithering, 2:1 isometric axes and object scale;
- canvas ratio, crop, composition, lighting direction, all unaffected objects and all unaffected text.

Do not anti-alias, smooth, blur, upscale into painted detail, change the pixel grid, introduce 3D rendering, add props, add text, or redesign unaffected areas. Save as a new image unless replacement was explicitly requested.
```
