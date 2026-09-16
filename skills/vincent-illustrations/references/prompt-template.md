# Image Gen 极简线描提示模板

每张图单独生成。头像只负责身份校准，线描角色板负责最终视觉风格。两者冲突时，必须采用角色板的低细节线描方式。

## 新图共享模板

```text
Use case: stylized-concept
Asset type: standalone 16:9 Chinese article body line sketch

Primary request:
Create one extremely sparse conceptual line drawing for this article insight: {核心意思}

Reference roles:
- Vincent avatar: identity facts only — face shape, short tousled hair, round glasses, tiny moustache and goatee. Ignore its watercolor rendering, skin color, lighting, texture, and portrait composition.
- Vincent line character sheet: strict final style, detail level, body proportion, outfit shorthand, and action language. Do not reproduce its four-character lineup.

Brand mode: {档案态 Retro Studio / 编辑态 Editorial}
Theme: {主题}
Physical metaphor: {原创物理隐喻}
Composition: {主要物件、平面空间关系、信息流向}
Vincent's indispensable action: {Vincent 正在完成的动作}

Text (verbatim):
"{标注1}" / "{标注2}" / "{标注3}" {可选第4、5个}

Core visual language:
An extremely minimalist ink-pen concept sketch on a perfectly flat near-white #FAF7EF background. It should feel like a quick whiteboard explanation drawn by a product builder, not a finished illustration. Use thin, slightly wobbly, short contour lines. Draw only what is needed to recognize each object. Most props should be drawable with about 5-20 strokes. Keep roughly 65%-80% of the canvas visually empty. Target total ink coverage below about 15%-20% and total colored coverage below about 10%.

Vincent shorthand:
One small adult line-drawn Vincent with a solid simple short-hair shape, round glasses, a few tiny moustache/goatee marks, an open hooded jacket, plain T-shirt, straight trousers, and simple shoes. Fill the hooded jacket only with one perfectly flat cool slate navy #2B3B52. Fill only his face, ears, exposed neck, and hands with one perfectly flat muted warm peach #E39A74. Keep the T-shirt, trousers, and shoes near-white and unfilled. Mature natural proportions. Keep the face and clothing radically simplified. Vincent must physically perform the action that makes the metaphor work.

Mode rules:
{粘贴所选模式片段}

Constraints:
Use only 3-5 floating handwritten Chinese labels and render them verbatim. Do not put labels inside polished plaques or cards. Do not add a generic title. Cool slate navy #2B3B52 is reserved exclusively for Vincent's hooded jacket. Warm peach #E39A74 is reserved exclusively for Vincent's exposed skin. Both fills must be perfectly flat with no shading, highlight, gradient, or texture. No watercolor, color wash, dry brush, paper grain, beige texture, wood grain, metal texture, fabric folds, realistic material, hatching, cross-hatching, shading, highlights, shadows, floor shadow, gradients, perspective rendering, 3D volume, screws, detailed machinery, dense scenery, realistic hands, detailed shoes, UI, PPT, formal flowchart, course page, commercial vector mascot, children's illustration, robot, brain, chip, logo, or watermark. Do not copy prior example compositions.
```

## 档案态模式片段

```text
Use ink navy #172033 for almost every line and the solid hair shape. Use cool slate navy #2B3B52 only on Vincent's hooded jacket. Use warm peach #E39A74 only on Vincent's face, ears, exposed neck, and hands. Choose exactly one functional accent: cobalt blue #1557B0 for normal flow and connection, or forest green #2F6B4F for a real success or completion state. Never use both. Do not use rust orange or mustard yellow. Do not fill objects, T-shirt, trousers, shoes, or cards with brand colors. Allow at most one tiny pixel-like project mark. No grid.
```

## 编辑态模式片段

```text
Use ink #15151A for almost every line and the solid hair shape. Use cool slate navy #2B3B52 only on Vincent's hooded jacket. Use warm peach #E39A74 only on Vincent's face, ears, exposed neck, and hands. Editorial blue #3D5AFE is the only functional color and may appear exactly once as one path, measurement mark, or key handwritten word. Outside Vincent's jacket and exposed skin, do not use pale-blue panels or any green, orange, yellow, red, or decorative fill. No grid.
```

## 局部编辑模板

```text
Edit the provided target image. Change only: {用户指定修改}.

Preserve exactly:
- Vincent's four identity shorthand cues: hair shape, round glasses, tiny facial-hair marks, hooded-jacket outline;
- the sparse line-art treatment, low ink coverage, flat near-white background, fixed flat jacket #2B3B52, fixed flat warm skin #E39A74, current brand mode and accent count;
- canvas ratio, crop, composition, all unaffected lines, objects, and text.

Do not add any fill outside Vincent's hooded jacket and exposed skin. Do not add texture, shading, detail, labels, titles, objects, people, logos, or decorative marks. Save as a new image unless replacement was explicitly requested.
```
