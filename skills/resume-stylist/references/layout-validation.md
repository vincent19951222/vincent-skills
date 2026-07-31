# A4 PDF 与布局验证

> 对生成后的真实成品执行，不用空白页或未加载成功的 `file://` 页面代替验证。

## 自动验证

依赖：

- Node.js 与 `npx`
- Playwright CLI（通过 `npx playwright cli` 临时调用）
- Poppler：`pdfinfo`、`pdftotext`、`pdftoppm`

在 Skill 目录下运行：

```bash
node scripts/validate-layout.mjs \
  /path/to/李明-产品经理-简历-互联网简洁.html \
  --pdf /tmp/李明-产品经理-简历-互联网简洁.pdf \
  --name "李明" \
  --role "产品经理" \
  --email "liming@example.cn" \
  --phone "13800138000" \
  --preview /tmp/李明-产品经理-简历-互联网简洁.png
```

脚本先调用 `scripts/check-output.mjs`，再执行浏览器和 PDF 检查。只验证布局、无需检查模板示例内容时可加 `--skip-content-check`。

## 通过条件

- 页面通过本地 HTTP 成功加载，存在 `.resume` 和非空 `.r-name`。
- 正文不是空白页，文本长度足以证明页面内容已加载。
- CSS 中存在 `@page` 且声明 A4。
- `document.fonts.ready` 在超时前完成，所有声明的字体状态为 loaded。
- 页面不超过 A4 的 CSS 高宽，关键内容容器没有被 `overflow: hidden/clip` 裁切。
- header 和所有 `data-section` 都位于 `.resume` 边界内。
- PDF 恰好 1 页，尺寸约为 595 × 842 pt（A4 纵向）。
- `pdftotext` 能提取非空正文；提供姓名时，PDF 文本必须包含姓名。

任何一项失败都不得把 PDF 标记为“已验证”。

## 常见失败与处理

| 失败 | 优先处理 |
|---|---|
| 字体超时或 error | 检查外部字体、CORS、URL；改用可用字体后重新验证 |
| 页面高度超过 A4 | 先调字号、行距、区块间距和装饰留白 |
| 关键容器被裁切 | 删除固定高度或修正 overflow；不要隐藏正文 |
| PDF 多于 1 页 | 回到纯文本确认稿，按确认流程提出合并/删减方案 |
| PDF 文本为空/无姓名 | 确认页面真实加载、字体可提取、打印的不是空白页 |
| 尺寸不是 A4 | 检查 `@page { size: A4; }` 与打印参数 |

## 人工降级流程

自动依赖不可用时：

1. 在 Chrome 打开 HTML，确认姓名、经历和联系方式真实出现。
2. 打印为 PDF：A4、100% 缩放、关闭页眉页脚、开启背景图形。
3. 确认预览只有 1 页，没有截断、重叠、黑块或缺字。
4. 搜索 PDF 中的候选人姓名，确认文本不是空白或纯图片。
5. 在交付说明中写明缺少的依赖和未运行的自动检查。
