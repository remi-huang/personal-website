# Remi 个人站 · Ship 前设计 Review

> 日期：2026-05-09
> 范围：`index.html` (首页 EN/ZH) + `one-moment-build.html` (ZH blog) + `one-moment-build-en.html` (EN blog)
> 视角：UI/UX 一致性、Design system 收敛、中英文排版、Ship 阻塞项

---

## 0. 一句话结论

首页的 sketchbook 气质做得很到位（手写、纸张、scribble、polaroid），但 **blog 子页面完全没有继承这套语言**，看起来像两个不同的品牌。要 ship 之前，必须把 design tokens 落到一份共享文件、把 blog 页面拉回到主站的视觉调性、并且把中文版的字体回退、断行问题修掉。

按严重度划分：

- **🔴 Ship 阻塞**：3 项 — blog 字体系统断裂、CN 手写字回退、语言切换与 SEO 冲突
- **🟠 高优先级**：6 项 — Hero 渲染缩水、token 漂移、Newsletter 表单调性、CTA 不统一、SEO meta 缺失、中文文件名
- **🟡 中优先级**：8 项 — 间距尺度、灰阶 token、断点不一致、blog 排版精读细节…

---

## 1. 🔴 Ship 阻塞：必须修掉

### 1.1 Blog 页面的字体系统完全脱节

**现状**

| 文件 | 引入的字体 |
|---|---|
| `index.html` | Caveat / Kalam / Instrument Serif / JetBrains Mono / Inter |
| `one-moment-build.html` | **只有 Inter** |
| `one-moment-build-en.html` | **只有 Inter** |

后果：访客从首页（手写体 + 衬线 + 等宽混排）点进 blog，进入一个**完全无衬线的纯 Inter 页面**。视觉品牌断了。`<h1>` 用的是 `Inter font-weight: 500`，而首页所有大标题都是 `Instrument Serif 400`。同一个网站，两套字体系统。

**修复**

把 blog 页的字体引入对齐首页，并且至少做这几处替换：

- `.article-hero h1` / `.article-body h2` → `Instrument Serif`
- `.article-meta` / `.tools-strip span` / `.step-number` → `JetBrains Mono`
- 文末 community CTA 上方加一行 `Caveat` 手写补白（"看完了 →" 之类）
- `Kalam` 现在 `index.html` 引入了但全站没有任何用到 — **删除**，节省一个字重的下载

### 1.2 中文场景下的字体回退是硬伤

**现状**

- `Caveat` 不支持 CJK。`portraitName` 是 `Hi, 我是 Remi`，"我是 Remi" 中的 "我是" 会回退到系统字体（macOS PingFang / Win 微软雅黑），出现 "Hi" 和 "我是" 字重粗细完全不同的撕裂感
- `phone-tap-hint-label` 中文版是"点这里播放"，全部走 Caveat 渲染，CJK fallback 后既不像手写也不像中文
- `script-accent` 中文版是"做设计"三个字，用 Caveat — 同样问题
- `Instrument Serif` 不支持中文，hero 大标题中文版（"我用 AI 做设计"）也会回退到系统宋体

**修复（关键决策）**

为中文版**单独定义一套字体策略**：

```css
:root {
  /* Latin */
  --font-display: 'Instrument Serif', Georgia, serif;
  --font-script:  'Caveat', cursive;
  --font-mono:    'JetBrains Mono', ui-monospace, monospace;
  --font-body:    'Inter', system-ui, sans-serif;

  /* CJK fallbacks — 关键 */
  --font-display-cjk: 'Instrument Serif', 'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', serif;
  --font-script-cjk:  'Caveat', 'Ma Shan Zheng', 'KaiTi', cursive; /* 楷体作为手写感替代 */
  --font-body-cjk:    'Inter', 'Noto Sans SC', 'PingFang SC', system-ui, sans-serif;
}

html[lang^="zh"] .hero-title { font-family: var(--font-display-cjk); }
html[lang^="zh"] .script-accent,
html[lang^="zh"] .portrait-name { font-family: var(--font-script-cjk); }
```

更激进的方案：**中文版的 `script-accent` 不要用手写体**，改用 `Instrument Serif` 斜体加红色画一笔下划线（`scribble-underline`），保留差异化但避开 Caveat 的中文 fallback 问题。

### 1.3 语言切换 + SEO 撞车

**现状**

- 首页：React state + `localStorage`，**前端切换文案不跳转 URL**（爬虫看不到中文版内容，等于没做中文 SEO）
- Blog：`<a href>` 跳转到 `-en.html`，并且 onload 检测 localStorage 自动重定向

**两个机制冲突的真实场景**：用户在首页切到中文 → `localStorage = 'zh'` → 之后用户从 Google 搜到英文 blog 页直接打开 → 被 JS 强制重定向到中文版 → 用户搜的是英文却看到中文，跳出。

**修复**

- 首页 `index.html` 必须拆成两份独立 HTML：`index-en.html` / `index-zh.html`（或最终上 Next.js 时分 `/en` `/zh` 路由）
- 每个页面 `<head>` 加 `<link rel="alternate" hreflang="...">`（`PROJECT.md` 4.1 节自己写过这个要求）
- Blog 页的「localStorage 自动重定向」**移除**，只保留 `<a>` 跳转的语言切换器
- `localStorage` 只用来记住「下次手动切换的偏好」，不用来强制重定向

---

## 2. 🟠 高优先级

### 2.1 Hero 实际渲染比设计稿稀疏

`design-system.md` 写的是"3-photo cluster"，CSS 也定义了 `.photo-back` / `.photo-side` / `.cluster-note` / `.cluster-arrow` / `.cluster-scribble` / `.cluster-smiley`，但 `app.jsx` 只渲染了：

- `.photo-main` (= HeroVideo)
- `.portrait-note`
- `.portrait-arrow`

CSS 里至少 6 个装饰元素是 dead code。Hero 实际气质比设计意图清淡 30-40%。

**修复**：要么补全（再放 2 张 polaroid + 2 个 doodle），要么把 dead CSS 删掉（`design-system.md` 也要同步更新成"1-photo center + 2 doodles"）。建议**补全**，因为 hero 本身就是你的能力名片，再多两张照片能立刻把"这是个会做视觉的人"立住。

### 2.2 Token 在三个 HTML 重复定义、且数值漂移

每个 HTML 都自己 `:root { --ink-blue: ... }`。Body text 的灰色：

- `index.html`: `#3b3b3b`
- `one-moment-build.html`: `#3d3d3d`
- 设计系统里没定义

边框透明度的漂移更夸张：`rgba(26,26,26, 0.12 / 0.14 / 0.16 / 0.18 / 0.2)` — 同一个视觉用途用了 5 个值。

**修复**：抽出一份 `tokens.css`，所有 HTML `<link>` 进来。token 收敛见下面 §5。

### 2.3 Newsletter 表单视觉破调

```css
.newsletter-row input,  .newsletter-row button {
  border: 1px solid var(--ink-black);
  border-radius: 0;   /* 直角 */
}
.newsletter-row button { background: var(--ink-black); }
```

整个站都是手绘 / 圆润 / 纸张感，唯独这块是黑色直角包豪斯风。视觉上像贴了一个外站组件。

**修复**：用 `<svg>` 画一个 scribble border（同 phone 那个 `phone-scribble-frame--outer` 的方法），按钮也改成手绘描边圆角，hover 时填充蓝色。

### 2.4 CTA 视觉至少有 4 种形态

| 出现位置 | 形态 |
|---|---|
| Hero newsletter | 黑底白字方按钮 |
| "Read build notes" | 蓝色 mono 文字 + 下划线 + → |
| App Store badge | 黑色 SVG 圆角 |
| Blog 文末 community | 蓝色 link 文字（无形态） |

**修复**：定义 2 个 CTA 组件：

- **Primary CTA**：手绘描边矩形，hover 时蓝色填充（用于"加入社群"、"下载 App"等转化点）
- **Inline link**：mono 11px 蓝色 + `→` 箭头 + hover 显示下划线（用于"查看详情"、"读 build notes"）

App Store badge 保留官方 badge 样式（苹果有 brand guideline），但放在 Primary CTA 旁边平行排列。

### 2.5 SEO Meta 缺失

`index.html` 只有 `<title>`，没有：

- `<meta name="description">`
- `<meta property="og:image">` / `og:title` / `og:description`
- `<meta name="twitter:card">`
- `<link rel="alternate" hreflang>`
- `<link rel="canonical">`
- favicon

Blog 有 description 和 keywords，但缺 og 系列。

**修复**：每个页面补齐一套完整的 head meta，准备一张 1200×630 的 og:image（用 hero 的 collage 截图就行）。

### 2.6 中文文件名会在生产环境炸

`/Users/remi/✍️VIBE CODING项目/个人网址搭建/主页动图.mov`、`底图.png`、`APP功能录屏.MP4` — 静态部署到 Vercel 时中文路径需要 URL encode，部分 CDN / 浏览器组合下会 404。

**修复**：把所有需要被网页引用的资源 rename 成 ASCII（`hero-video.mov`、`bg-paper.png`、`app-recording.mp4`），目前 `personal website (1)/uploads/` 下已经命名规范，根目录这几个原始素材如果只是源文件可保留，但**绝不能直接 import 进 HTML**。

---

## 3. 🟡 中优先级 — 排版精读

### 3.1 Type scale 有 11 个独立值，应该收敛

现在出现的字号：`9 / 10 / 11 / 12 / 13 / 14 / 15 / 16 / 17 / 18 / 22 / 28 / 38 / 52 / 56 / 58 / 64 / 66 / 68 / 76 / 86`

太多无规律的 magic number。建议锁死成一套（基于 1.25 minor third）：

```
xs   11   meta / mono
sm   13   body small / nav
base 15   body
md   17   body large / blog body
lg   22   subhead
xl   28   small display
2xl  38   article h2
3xl  52   article h1
4xl  68   hero h1 / built h2 base
5xl  86   built h2 max (clamp)
```

Caveat 单独一套：`18 / 22 / 56 / 76`（节制使用）。

### 3.2 Blog 排版细节

- **行长**：`max-width: 760px` + `font-size: 16px` ≈ 90 字符/行 — 英文勉强可读，**中文应该是 30-38 全角字符 ≈ 580-720px**。建议 ZH blog 把 body `max-width` 缩到 680px
- **段落间距**：`margin: 0 0 16px` 偏紧，提到 `24px`，气更松
- **h2 上下 margin**：`54px 0 18px` 不对称太极端，改成 `48px 0 20px`
- **`.step-number`**：13px / 600 太弱，应该 `Instrument Serif 32px / 400` 或 `Caveat 40px / 500`，让 timeline 有"手记"感
- **`.intro-quote` vs `.pull-note`**：视觉相同（都是左 2px 蓝边），失去层级。intro-quote 应该是文章引言（更大 18-20px italic serif），pull-note 是文中拉出（小一点带背景色块）
- **Tools-strip**：4 列 `border-left` 分隔，`<span>` 用蓝色 mono 10px — 信息密度其实 OK，但 strong 字号 14px 太接近正文 16px，改成 16px / 600 或 18px / 500

### 3.3 灰阶 token 收敛

现在出现的灰：`#666666` / `#888888` / `#9a9a9a` / `#3b3b3b` / `#3d3d3d` — 5 个值。

收敛到 3 个：
```css
--ink-black: #1a1a1a;   /* 标题 */
--ink-body:  #3b3b3b;   /* 正文 */
--ink-soft:  #666666;   /* meta、placeholder */
```

`#888 / #9a9a` 直接删掉，全部用 `--ink-soft` 或在它基础上加 opacity。

### 3.4 边框透明度收敛

5 个 `rgba(26,26,26, 0.12 - 0.20)` 收敛到 2 个：

```css
--rule-soft: rgba(26, 26, 26, 0.12);   /* section divider */
--rule-firm: rgba(26, 26, 26, 0.20);   /* card border、step border */
```

### 3.5 响应式断点不一致

首页用 `1100 / 820 / 640`，blog 用 `820 / 640`。统一成：

```
desktop ≥ 1024
tablet  640 - 1023
mobile  < 640
```

---

## 4. 🟡 交互 / 动效一致性

### 4.1 视频行为不统一

- Hero video：`onMouseEnter playOnce` / `onMouseLeave seekToLastFrame` — 悬停才播
- iPhone demo video：`autoPlay muted loop` — 永远在播

**修复**：统一一个原则 — **所有视频默认在视口内 autoplay 一次后停在最后一帧**，hover 重播。这样既有"会动"的能力展示，又不会有 4 个视频同时无脑循环耗电。

### 4.2 视口外暂停（design-system 计划但未实现）

`PROJECT.md §6.4` 写了"重组件必须支持视口外暂停"，目前没实现。最起码 hero video 和 iPhone demo video 应该在 `IntersectionObserver` 出去时 `.pause()`。

### 4.3 Hero `onMouseEnter` 在移动端无效

移动端没有 hover，hero video 进入视口就播一次然后停在最后一帧 — 用户根本看不到动效。需要在移动端改成 IntersectionObserver 触发 `playOnce()`。

---

## 5. ✅ 收敛后的 Design Tokens（建议直接用）

抽出一个 `tokens.css`，三个 HTML 都 `<link>` 进来：

```css
:root {
  /* === Color === */
  --paper:        #fdfbf5;
  --paper-warm:   #f4efe4;
  --ink-black:    #1a1a1a;
  --ink-body:     #3b3b3b;
  --ink-soft:     #666666;
  --ink-blue:     #1d3a8a;   /* 90% 的 accent 都用这个 */
  --clip-red:     #d94a3a;   /* 仅纸夹 / tape */
  --clip-yellow:  #e8b73a;   /* 仅纸夹 / tape */
  --status-green: #3a8a4a;   /* 在线点，节制使用 */

  --rule-soft:    rgba(26,26,26,0.12);
  --rule-firm:    rgba(26,26,26,0.20);

  /* === Type === */
  --font-display:     'Instrument Serif', Georgia, serif;
  --font-display-cjk: 'Instrument Serif', 'Noto Serif SC', 'Songti SC', serif;
  --font-script:      'Caveat', cursive;
  --font-script-cjk:  'Caveat', 'Ma Shan Zheng', 'KaiTi', cursive;
  --font-body:        'Inter', system-ui, sans-serif;
  --font-body-cjk:    'Inter', 'Noto Sans SC', 'PingFang SC', system-ui, sans-serif;
  --font-mono:        'JetBrains Mono', ui-monospace, monospace;

  /* === Type scale === */
  --t-xs:   11px;
  --t-sm:   13px;
  --t-base: 15px;
  --t-md:   17px;
  --t-lg:   22px;
  --t-xl:   28px;
  --t-2xl:  38px;
  --t-3xl:  52px;
  --t-4xl:  68px;
  --t-5xl:  86px;

  /* === Spacing (8px baseline) === */
  --s-1:  8px;
  --s-2:  16px;
  --s-3:  24px;
  --s-4:  32px;
  --s-5:  48px;
  --s-6:  64px;
  --s-7:  96px;   /* section vertical rhythm */
  --s-8:  128px;

  /* === Radius === */
  --r-sm: 4px;
  --r-md: 12px;
  --r-lg: 24px;
  --r-pill: 999px;

  /* === Rotation 范围（贯彻 sketchbook） === */
  /* 使用规则写在注释里：
     handwriting / scribble: -4deg ~ +4deg
     window / mono UI:       -2deg ~ +2deg
     photo / polaroid:       -9deg ~ +9deg
     tape / clip:            -20deg ~ +20deg
     body text:              永远 0deg
  */
}
```

---

## 6. ✅ 收敛后的字体使用规则（一页备忘）

| 场景 | 字体 | 字号 | 字重 | 颜色 |
|---|---|---|---|---|
| Hero 大标题（EN） | display | 4xl-5xl | 400 | ink-black |
| Hero 大标题（ZH） | display-cjk | 4xl-5xl | 400 | ink-black |
| Hero 手写 accent（EN） | script | 4xl | 500 | ink-blue + rotate -3° |
| Hero 手写 accent（ZH） | display-cjk italic | 4xl | 400 | ink-blue（**不要用 Caveat**） |
| Article H1 | display | 3xl | 400 | ink-black |
| Article H2 | display | 2xl | 400 | ink-black |
| Subhead / 卡片标题 | display | xl | 400 | ink-black |
| Body 长文 | body / body-cjk | md (17) | 400 | ink-body |
| Body 短文 | body / body-cjk | base (15) | 400 | ink-body |
| Nav / Meta / Kicker | mono | sm (13) / xs (11) | 400-500 | ink-blue 或 ink-soft |
| Caption / 手写注 (仅 EN) | script | lg (22) | 500 | ink-blue + rotate -4°~+4° |
| Caption / 手写注 (ZH) | display-cjk italic | base (15) | 400 | ink-blue + rotate -2°~+2° |

**核心原则**：1 page = 1 display + 1 script + 1 mono + 1 body。中文页强制把 script 替换成 display italic。

---

## 7. ✅ 组件清单（要存在的、要复用的）

### 已实现，需要标准化

- `<PhotoPlaceholder>` ✅ 已写，但首页没用。建议在 hero 补上 2 张
- `<ScribbleUnderline>` / `<ScribbleArrow>` / `<ScribbleCircle>` / `<ScribbleSparkle>` / `<ScribbleStar>` ✅
- `<NewsletterSignup>` ⚠️ 视觉要重做（见 §2.3）
- `<HomeAppIcon>` ✅
- `<LanguageSwitch>` ⚠️ 要从 React state 改成 `<a href>` 真跳转

### 缺失，必须补

- `<ScribbleFrame>` — 手绘描边矩形，给 newsletter input、CTA 按钮用
- `<PrimaryCTA>` — 手绘描边按钮 + hover 填充蓝
- `<InlineLink>` — mono 蓝色 + → + hover 下划线
- `<SectionKicker>` — mono 11-12px 蓝色大写字母 + 字距 0.08em
- `<PullQuote>` vs `<IntroQuote>` — 视觉要分层（一个用左蓝边、一个用浅纸色背景 + Instrument Serif italic）
- `<ArticleHeader>` — blog 顶部统一布局（meta → display H1 → 副标 → tools-strip）
- `<CommunityCTA>` — 全站统一的"加入社群"模块（design-system v0.1 没定义）

---

## 8. ✅ Blog 页面专属修复 punch list

按改动量从小到大排：

1. 引入 `Instrument Serif` + `Caveat` + `JetBrains Mono`（5 分钟）
2. `.article-hero h1` / `.article-body h2` 改用 Instrument Serif（5 分钟）
3. `.article-meta` 改用 JetBrains Mono uppercase（已经在做，但字体没引入，回退到 Inter）
4. 文末 community CTA 上方加一行 Caveat 手写补白（10 分钟）
5. `.intro-quote` 与 `.pull-note` 视觉分层（intro 改成无边框纸色背景 + serif italic）（15 分钟）
6. `.step-number` 改成 Instrument Serif 32px 或 Caveat 40px，恢复"手账"感（10 分钟）
7. ZH 版正文 `max-width` 从 760 → 680，段间距从 16 → 24（5 分钟）
8. 顶部 `.article-nav` 加上 ScribbleUnderline 给 active 项（10 分钟）
9. 文末 community CTA 改成 PrimaryCTA 组件（手绘描边按钮）（30 分钟）
10. 移除 onload localStorage 自动重定向（5 分钟）
11. 整页加一个浅 grain noise overlay（复用 index.html 的 `.site-shell::before`）（5 分钟）

---

## 9. ✅ 中英文双版本 Checklist

每次发布一篇内容前过一遍：

- [ ] EN 和 ZH 两个 HTML 都存在，URL slug 已确定
- [ ] 每个 HTML 的 `<head>` 有 hreflang 三件套（zh-CN / en / x-default）
- [ ] `<html lang="...">` 正确（zh 页 `zh-CN`，en 页 `en`）
- [ ] 顶部 nav 切换语言用 `<a href="...">` 真跳转
- [ ] CN 页面所有用 Caveat 的地方手动检查 — 是否回退到了 PingFang，是否难看
- [ ] CN 页面 body `max-width` ≤ 700px（CJK 行长舒适区）
- [ ] CN 页面 mono 数字保留 JetBrains Mono（数字英文，不用考虑 fallback）
- [ ] og:image / og:title 在两边都正确
- [ ] sitemap 把这两个 URL + 它们的 hreflang 关系都列出来

---

## 10. 🚀 Ship 前最小动作

如果只能挑 **5 件事** 在 ship 前必做，按 ROI 排：

1. **抽出 `tokens.css` 共享给三个 HTML**（消除 token 漂移，1 小时）
2. **Blog 页面引入完整字体栈 + h1/h2 改 Instrument Serif**（视觉品牌一致性回归，1 小时）
3. **CN 版 Caveat 替换为 Instrument Serif italic**（中文视觉不再撕裂，1 小时）
4. **Newsletter 表单 + 全站 CTA 统一**（提升转化点视觉信任度，2 小时）
5. **每个页面补 og:image / description / hreflang**（SEO ship 阻塞项，1 小时）

总计 ~ 6 小时。Ship 后再迭代 §3 的精读细节和 §2.1 的 hero 补全。

---

*这份 review 假设最终架构是 PROJECT.md 描述的 Next.js + i18n 路由。在那之前的 HTML 静态版本可以先按 §10 的 5 件事改，迁移 Next.js 时把 `tokens.css` 直接转成 Tailwind theme 配置，组件清单 (§7) 直接照搬。*
