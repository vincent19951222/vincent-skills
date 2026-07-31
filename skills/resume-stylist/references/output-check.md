# 简历成品内容检查

> 只检查从皮肤生成的成品 HTML，不检查 `skins/` 中故意保留虚构人物的源模板。

## 必查项目

### 1. 文件与网页元信息

- 文件名符合 `姓名-意向岗位-简历-风格名.html`。
- `<html lang>` 与简历语言一致。
- `<title>` 同时包含候选人姓名和意向岗位。
- `<meta name="author">` 等于候选人姓名。
- `<meta name="description">` 包含候选人姓名和意向岗位。

### 2. 身份与联系方式

- 页面正文中的姓名、城市、邮箱、手机与用户确认稿一致。
- 最终交付前删除 `example.com`、`****`、`TODO`、`PLACEHOLDER`、`[待补充]` 等占位内容；用户明确要求保留脱敏信息时除外。
- 邮箱链接使用与显示文本一致的 `mailto:` 地址。
- 网站、GitHub、LinkedIn、Behance 和作品集的显示文本与 `href` 指向同一用户。
- 不存在空 `href`、`href="#"` 或 `javascript:` 链接。

### 3. 皮肤示例残留

扫描并删除模板人物及其联系方式、公司和项目数据，包括但不限于：

- 陈砚舟、沈亦楠
- `chenyanzhou@example.com`、`shenyinan@example.com`
- `chenyanzhou.dev`、`yinanshen.design`
- `github.com/yanzhou-chen`、`behance.net/yinan-shen`
- 星澜科技、蓝鲸互娱、云帆软件、未山设计、澜图科技
- `llm-eval-kit`、“城市呼吸”、“野径”

不得只替换可见姓名；同时更新 `<title>`、author、description、链接目标和隐藏文本。

### 4. 确认稿一致性

- 成品中的经历、数字、项目和技能都来自已确认纯文本稿。
- 已确认内容没有因套用皮肤而被静默删除、重复或替换。
- 皮肤的装饰文案不冒充候选人的真实经历、命令输出或评价。

## 自动检查

在 Skill 目录下执行：

```bash
node scripts/check-output.mjs \
  /path/to/李明-产品经理-简历-互联网简洁.html \
  --name "李明" \
  --role "产品经理" \
  --style "互联网简洁" \
  --email "liming@example.cn" \
  --phone "13800138000"
```

脚本检查失败时先修复再交付。用户明确要求保留脱敏占位符时可增加 `--allow-placeholders`，但仍不能放过模板示例身份和错误链接。

环境没有 Node.js 时，逐项执行同一份人工清单，并在交付说明中标记“自动内容检查未运行”。
