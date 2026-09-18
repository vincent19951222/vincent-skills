# HTML 与状态契约

新模板 `assets/template-interactive.html` 的稳定接口：

- `.scene[data-scene]`：Scene 容器，用 hidden 控制非当前内容，标题具有稳定 id。
- `button[data-go]`：导航，只选择按钮，不把 Scene 容器也作为导航绑定。
- `button[data-nav]`：窄屏（≤640px）章节轨道的替代导航，值为 ±1 步进；边界页置 `disabled`，桌面端隐藏。
- `button[data-node]`：选择节点，`aria-pressed` 表达选择状态，`aria-controls` 指向详情。
- `dialog#detail-drawer`：原生模态抽屉，showModal/close 管理可访问性；保存并恢复触发点焦点。
- `.edge[data-edge]`：有语义的关系边；选择节点后只强调它关联的边。

Scene、节点选择、Drawer 开关是不同状态，不混用一个 active 类到所有元素。全局翻页忽略表单焦点和已打开的 Drawer。过渡只使用 transform/opacity；减少动效时立即呈现最终状态。

旧 `template-deck.html` 保留兼容，不声称它已实现这些接口。
