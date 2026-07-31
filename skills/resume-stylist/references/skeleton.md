# 简历内容骨架规范（Best Practice）

> 所有视觉皮肤共享的**语义化结构**。皮肤只负责"怎么显示"，本规范负责"有什么、什么顺序、怎么写"。
> 这是 Skill 的 best-practice 核心：**1 个骨架 + 1 份写作规范 + N 个皮肤**。

---

## 一、信息架构（自上而下）

```
┌────────────────────────────────────────────┐
│ 1. Header        姓名 / 意向岗位 / 联系方式    │
├────────────────────────────────────────────┤
│ 2. Summary       职业摘要（3 行以内）          │
├────────────────────────────────────────────┤
│ 3. Experience    工作经历（核心，倒序）         │
│    └─ 公司 · 职位 · 时间 + 3-5 条 bullet     │
├────────────────────────────────────────────┤
│ 4. Projects      项目经历（开源/个人，可选）    │
├────────────────────────────────────────────┤
│ 5. Skills        技能（分组，非罗列）           │
├────────────────────────────────────────────┤
│ 6. Education     教育背景（简）                │
├────────────────────────────────────────────┤
│ 7. Extras        证书 / 语言 / 其他（可选）     │
└────────────────────────────────────────────┘
```

### 排序原则

1. **经历永远在教育前面**（应届生除外——教育可提到 Summary 之后）
2. **时间倒序**，最近的在最上
3. **可选模块的取舍**：工作 5 年以上可删 Projects；Extras 只留与岗位相关的
4. **一页原则**：5 年以内经验一页封顶；超出优先砍旧经历的 bullet 数，不砍最近经历
5. **填充率原则**：内容应填充 A4 页面高度的 **85~95%**。填充不足（<70%）时放大字号/行距/区块留白，而不是留白页脚；溢出时反向压缩。常见错误是按屏幕网页习惯定字号（12-13px 正文在 A4 上必然稀疏）——A4 简历正文建议 10.5pt 以上、行高 1.6 以上，并以此为基准反推其他层级

### 模块显隐规则（按岗位）

| 模块 | PM | 研发 | 职能 |
|---|---|---|---|
| Header / Summary | 必有 | 必有 | 必有 |
| Experience | 必有 | 必有 | 必有 |
| Projects | 有开源/副业才放 | **强烈建议**（GitHub） | 可改为"活动/Campaign" |
| Skills | 分组简列 | 分组详列 | 简列 |
| Education | 简（1-2 行） | 简 | 简 |
| Extras | 只留加分的 | 可省 | 证书相关可留 |

---

## 二、语义化 HTML 契约

皮肤实现时必须使用以下语义化标签与 class 约定，保证同一套内容可以被任意皮肤渲染：

```html
<article class="resume">
  <header class="r-header">
    <h1 class="r-name">陈砚舟</h1>
    <p class="r-title">AI 产品经理</p>
    <ul class="r-contacts">
      <li class="r-contact" data-type="phone|email|city|site|github">…</li>
    </ul>
  </header>

  <section class="r-section" data-section="summary">
    <h2 class="r-section-title">职业摘要</h2>
    <p class="r-summary">…</p>
  </section>

  <section class="r-section" data-section="experience">
    <h2 class="r-section-title">工作经历</h2>
    <div class="r-job">
      <div class="r-job-head">
        <h3 class="r-job-company">星澜科技</h3>
        <span class="r-job-role">高级 AI 产品经理</span>
        <span class="r-job-period">2023.04 – 至今</span>
      </div>
      <p class="r-job-desc">公司简介（可选，一行）</p>
      <ul class="r-bullets">
        <li class="r-bullet">动词开头 + 量化结果……</li>
      </ul>
    </div>
  </section>

  <!-- projects / skills / education / extras 同构 -->
  <section class="r-section" data-section="skills">
    <div class="r-skill-group">
      <span class="r-skill-label">产品</span>
      <span class="r-skill-item">用户研究</span>
    </div>
  </section>
</article>
```

**约定：**
- `data-section` 是皮肤布局的唯一依据（皮肤可对不同 section 做双栏、侧栏等排布）
- bullet 内允许 `<strong>` 包裹关键数字/成果，皮肤可对其做高亮处理
- 不在内容层写任何样式相关的 class（如 `text-blue`）

---

## 三、Bullet 写作规范（简历质量的真正分水岭）

### 公式

> **强动词 + 做了什么 + 量化结果 (+ 业务影响)**

### 强动词表（避免"负责""参与"）

| 场景 | 推荐动词 |
|---|---|
| 从零构建 | 主导、从 0 到 1 搭建、设计并落地 |
| 优化改进 | 重构、压缩、缩短、提升（带数字） |
| 协作领导 | 推动、协调、建立（机制）、带教 |
| 分析决策 | 定位、拆解、验证（假设） |

### 量化优先级

1. **业务结果**：收入、转化率、留存、DAU（最强）
2. **效率/成本**：成本降低 X%、周期从 A 缩到 B
3. **规模**：支撑 X 万用户、Y 人团队、Z 次实验
4. 实在没有数字时：写**可验证的事实**（"被 3 家公司采用"优于"广受好评"）

### 反例 → 正例

| ❌ 反例 | ✅ 正例 |
|---|---|
| 负责搜索产品的日常迭代 | 重构搜索 Query 理解策略，搜索渗透率从 23% 提升至 35% |
| 参与了推荐系统的优化 | 设计冷启动流量策略，新创作者 30 日留存 +18% |
| 工作认真负责，获得好评 | 建立三层 AI 评估体系，bad case 响应周期 2 周 → 2 天 |

### 其他铁律

- 每条 bullet **不超过 2 行**（约 50 字）
- 每段经历 **3-5 条**，最近的经历可以 5 条，3 年前的压到 2-3 条
- 不写主观评价（"学习能力强"），只写事实
- Summary 不复述经历，写**定位 + 差异化优势**（"技术背景出身的产品"）
