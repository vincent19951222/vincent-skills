# Med-Tech Precision 视觉基础

## 品牌

保留用户确认的明亮红白黑方向。UI 主红 `#C90000` 是项目暂定值；用户提供的 Logo PNG 保持原色。它们不等于已取得官方 VI 标准。Logo 用法见 [assets.md](assets.md)。

## 基础令牌

```css
:root {
  --bg: #F5F7F8;
  --surface: #FFFFFF;
  --ink: #1D2630;
  --muted: #586572;
  --line: #D9E0E5;
  --brand-primary: #C90000;
  --brand-primary-soft: #FFF0F0;
  --success: #236B46;
  --warning: #805609;
  --danger: #AC3333;
  --info: #215E98;
  --radius-small: 4px;
  --radius-default: 6px;
  --radius-large: 8px;
  --canvas-dot-color: rgba(148,163,184,.28);
  --canvas-dot-gap: 24px;
}
```

品牌红用于选择、主动作、核心路径和重点边界；状态色只在实际或明确标注的模拟状态中使用，并配文字。中性色占主导，不把原稿中的面积比例当成机械配色配额。

## 字体与空间

- 中文选 Noto Sans SC 或已有系统黑体，拉丁文使用 Geist / Inter / IBM Plex Sans 等可用无衬线字体；离线场景保留可靠系统回落，不为字体引入联网依赖。
- 桌面 Display 64-80、Title 40-48、Heading 24-28、Body 16-18、Caption 12-14px。投屏正文按距离增大；手机标题用 clamp 降到 32-40px，不能压缩长段正文凑屏。
- Mono 只用于数字、单位、协议、型号、时间戳和真实参数，不能变成整页装饰标签。
- 12 列结构；桌面安全边距 64-96px，手机 20-24px。间距 8 / 16 / 24 / 40 / 64 / 96 / 160px，按分组关系使用。
- 内容无外框，真实系统单元用 1px hairline 与 6-8px 微圆角，Drawer 用轻阴影表达浮层。轻磨砂仅在细节浮层有益时使用，必须有实色回落。

## 两类画布

Base Canvas 用于观点、过渡、结论，留白承载主次。
Dot Grid 只用于架构、连接、节点关系，在主体下方局部铺设，密集区降低透明度：

```css
.architecture-canvas {
  background-image: radial-gradient(var(--canvas-dot-color) 1.2px, transparent 1.2px);
  background-size: var(--canvas-dot-gap) var(--canvas-dot-gap);
}
```

默认明亮主题；如用户要暗色演讲模式，再成套检验对比度与 Logo，不随机反转某一页。
