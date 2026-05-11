# 个人独立站项目规划

> 一份给「自己」看的项目说明文档,记录核心决策、技术架构和开发路线图。

---

## 1. 项目目标

### 核心定位

这不是一个「博客」,也不是一个「作品集」,而是一个**以社群为最终转化目标的个人内容枢纽**。

- **表面产品**:博客文章 + 作品展示 + 个人介绍
- **真实产品**:社群(网站是漏斗的入口)
- **核心 KPI**:从搜索流量 → 网站访问 → 加入社群的转化率

### 受众

- 中文用户(通过 Google 中文搜索进入)
- 英文用户(通过 Google 英文搜索进入)
- 已经认识我的人(通过名字直接搜索进入)

### 我的差异化

**强项是动态交互设计**——所以网站本身就是一个作品,每个交互细节都是能力证明。访客在浏览过程中体验到的微交互、过渡动画、可玩组件,本身就是「为什么应该关注我」的答案。

---

## 2. 技术栈决策

### 框架:Next.js 15 (App Router)

**为什么不是 Astro**:Astro 默认输出静态 HTML,做交互需要 island hydration,体验有割裂感。对一个**需要大量动态交互**的站点不合适。

**为什么是 Next.js**:
- React 完整生态,适合写复杂交互组件
- App Router 支持 Server Components,博客文章这类静态内容仍能享受 SSG 的 SEO 优势
- 内置 i18n 路由(子目录方式),hreflang 配置容易
- Vercel 部署一键完成,免费额度足够

### 核心依赖

| 用途 | 选型 | 理由 |
|------|------|------|
| 框架 | Next.js 15 (App Router) | 见上 |
| 样式 | Tailwind CSS | 快速迭代,和组件库兼容 |
| 动画 | Framer Motion | 业界事实标准,声明式 API |
| 手势 | @use-gesture/react | 拖拽、捏合、滑动,触屏桌面统一 API |
| 3D / WebGL(可选) | React Three Fiber | 如果做 3D 交互 demo |
| 内容管理 | MDX(本地文件) | 文章用 Markdown 写,但能内嵌 React 组件——这是关键! |
| 类型 | TypeScript | 不解释 |
| 部署 | Vercel | 与 Next.js 同公司,零配置 |
| 数据分析 | Plausible 或 Umami | 隐私友好,GDPR 合规 |

### 为什么 MDX 是关键

普通 Markdown 写不出交互。MDX 允许在文章里直接 `import` React 组件:

```mdx
# 我对 spring 动画的理解

一般我们用 cubic-bezier,但物理感更强的是 spring:

<SpringDemo />   ← 这里直接渲染一个可拖拽的交互 demo

参数 stiffness 越大,弹性越硬...
```

这意味着你的每篇文章都可以是一个**可玩的小作品**,而不只是文字。这才是发挥你强项的方式。

---

## 3. 站点结构

### URL 设计

```
yoursite.com/                          → 自动检测语言重定向
yoursite.com/zh/                       → 中文首页
yoursite.com/en/                       → 英文首页

yoursite.com/zh/blog                   → 中文博客列表
yoursite.com/zh/blog/[slug]            → 中文文章
yoursite.com/en/blog                   → 英文博客列表
yoursite.com/en/blog/[slug]            → 英文文章

yoursite.com/zh/works                  → 中文作品集
yoursite.com/zh/works/[slug]           → 中文作品详情
yoursite.com/en/works                  → 英文作品集
yoursite.com/en/works/[slug]           → 英文作品详情

yoursite.com/zh/community              → 中文社群落地页
yoursite.com/en/community              → 英文社群落地页
```

**设计原则**:
- 子目录 `/zh/` `/en/` 而不是子域名,SEO 权重集中
- 一个 URL = 一种语言,绝不混合
- 中英文 URL slug 可以不同(中文用拼音或英文翻译都行,但同一个 slug 在两边对应同一篇文章)

### 文件目录

```
src/
├── app/
│   ├── [lang]/                       ← 动态语言段
│   │   ├── layout.tsx                ← 包含语言切换、导航
│   │   ├── page.tsx                  ← 首页
│   │   ├── blog/
│   │   │   ├── page.tsx              ← 博客列表
│   │   │   └── [slug]/page.tsx       ← 文章详情
│   │   ├── works/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   └── community/page.tsx
│   ├── api/                          ← API 路由(后续需要时)
│   └── layout.tsx                    ← 根 layout(只放 html/body)
├── components/
│   ├── ui/                           ← 基础组件(按钮、卡片)
│   ├── interactive/                  ← 交互 demo 组件(每个都是独立作品)
│   │   ├── _shared/                  ← demo 通用工具
│   │   │   ├── DemoFrame.tsx         ← 统一外壳:标题、重置、全屏按钮
│   │   │   ├── ParamSlider.tsx       ← 参数控制滑块
│   │   │   └── useInView.ts          ← 视口外暂停动画的 hook
│   │   ├── spring-demo/
│   │   │   ├── index.tsx
│   │   │   └── meta.ts               ← 标题、描述、标签等元数据
│   │   ├── cursor-trail/
│   │   └── ...
│   ├── layout/
│   │   ├── Nav.tsx
│   │   ├── Footer.tsx
│   │   └── LangSwitcher.tsx
│   └── seo/
│       └── Hreflang.tsx              ← 关键 SEO 组件
├── content/
│   ├── blog/
│   │   ├── zh/
│   │   │   └── *.mdx
│   │   └── en/
│   │       └── *.mdx
│   └── works/
│       ├── zh/
│       └── en/
├── lib/
│   ├── mdx.ts                        ← MDX 加载和解析
│   ├── i18n.ts                       ← 翻译字典和工具函数
│   └── content.ts                    ← 内容查询函数
└── i18n/
    ├── zh.json                       ← 界面文案中文
    └── en.json                       ← 界面文案英文
```

---

## 4. 双语 SEO 关键配置

这一节是整个项目最容易出错、也最重要的部分。

### 4.1 hreflang 标签(必须)

每个页面 `<head>` 必须包含告诉搜索引擎「这页面有其他语言版本」的标签:

```html
<link rel="alternate" hreflang="zh-CN" href="https://yoursite.com/zh/blog/xxx" />
<link rel="alternate" hreflang="en"    href="https://yoursite.com/en/blog/xxx" />
<link rel="alternate" hreflang="x-default" href="https://yoursite.com/en/blog/xxx" />
```

`x-default` 给的是「不知道用户用什么语言」时的兜底版本,通常指向英文。

### 4.2 文章 frontmatter 约定

每篇 `.mdx` 文件的 frontmatter 这样写:

```yaml
---
title: "学习 React 的几点心得"
description: "..."
lang: "zh"
slug: "learning-react"
alternateSlug: "learning-react"   # 英文版的 slug,用于生成 hreflang
pubDate: 2026-01-15
tags: ["react", "frontend"]
---
```

中英文版本通过 `alternateSlug` 互相关联。文章模板根据这个字段自动生成 hreflang 链接和「切换到英文版」按钮。

### 4.3 语言切换按钮

**必须是真实的 `<a href>` 跳转**,不能用 JavaScript 在前端切换文本。爬虫看不到 JS 切换后的内容。

```tsx
// ✅ 对的
<Link href={`/en/blog/${alternateSlug}`}>English</Link>

// ❌ 错的
<button onClick={() => setLang('en')}>English</button>
```

### 4.4 sitemap.xml

Next.js 用 `app/sitemap.ts` 自动生成。每篇文章的中英文版都要列出来,并且通过 `alternates.languages` 字段标注语言对应关系:

```ts
{
  url: 'https://yoursite.com/zh/blog/learning-react',
  lastModified: '2026-01-15',
  alternates: {
    languages: {
      'zh-CN': 'https://yoursite.com/zh/blog/learning-react',
      'en': 'https://yoursite.com/en/blog/learning-react',
    },
  },
}
```

### 4.5 上线后必做

- 提交 sitemap 到 [Google Search Console](https://search.google.com/search-console)
- 提交到 [Bing Webmaster Tools](https://www.bing.com/webmasters)
- 暂时**不**考虑百度——除非愿意做 ICP 备案 + 国内服务器,否则百度收录非常慢

---

## 5. 页面规划

### 5.1 首页

不要做成「关于我」页面。首页应该回答三件事(在 5 秒内):

1. **我是谁**——一句话定位
2. **我做什么**——最近的核心作品/输出
3. **下一步去哪**——明确的 CTA(看博客 / 看作品 / 加社群)

**互动设计提示**:首页是你的能力名片,在这里放一个**精心设计的 hero 交互**(比如鼠标跟随效果、滚动视差、可拖拽元素),让访客一进来就感受到「这个人懂动效」。

### 5.2 博客列表 `/[lang]/blog`

- 按时间倒序
- 标签筛选
- 搜索框(可以用 Pagefind 这种静态搜索工具,无需后端)
- 每个卡片显示:标题、摘要、阅读时间、标签

### 5.3 博客详情 `/[lang]/blog/[slug]`

- 文章正文(MDX 渲染,支持嵌入交互组件)
- 阅读进度条
- 文末固定 CTA:「这篇有启发?加入社群获取更多 → 」
- 相关文章推荐
- 语言切换按钮(只在有对应翻译时显示)

### 5.4 作品集 `/[lang]/works`

**核心形式:嵌入式交互 demo**——卡片不是截图,而是直接渲染可玩的 React 组件。访客在列表页就能动手玩,不用点进去。

**列表页布局建议**:

```
┌──────────────┬──────────────┐
│              │              │
│  Demo A      │  Demo B      │
│  (可交互)     │  (可交互)     │
│              │              │
├──────────────┼──────────────┤
│              │              │
│  Demo C      │  Demo D      │
│              │              │
└──────────────┴──────────────┘
```

每个卡片下方放标题 + 一句话说明 + 「查看详情 →」链接。

**性能关键**:列表页可能同时跑多个交互组件,必须做这几件事:
- 使用 `IntersectionObserver`,卡片滚出视口时**暂停动画**
- 重组件用 `next/dynamic` + `ssr: false` 懒加载
- 列表页同屏 demo 不超过 4 个,多了分页

**筛选标签**:动效类型(spring / 物理 / 路径动画)、技术栈(CSS / Canvas / WebGL)、复杂度等。

### 5.5 作品详情 `/[lang]/works/[slug]`

详情页的核心结构:

1. **Hero demo 区**(占首屏)——demo 占据大部分视觉,带「全屏」按钮
2. **参数控制面板**(可选)——让访客调整参数(stiffness、damping 等),实时看效果变化。**这是教学型作品的杀手锏**,远比看视频有说服力
3. **背景故事**——为什么做、解决什么设计问题
4. **关键设计决策**——可以再嵌入对比 demo(「错误做法 vs 正确做法」)
5. **代码片段**——核心实现,用语法高亮
6. **学到了什么**
7. **CTA**:「在社群里看完整制作过程 / 获取源码」

### 5.6 交互 demo 的几个固定设计模式

为了保持一致性,所有 demo 组件都建议遵循这些约定:

**「重置」按钮**:任何带状态的 demo 都要有重置按钮,访客玩坏了能恢复初始状态。

**「全屏」模式**:复杂 demo 要支持全屏查看(尤其是为了截图分享或在小屏幕上看清细节)。

**移动端降级**:鼠标 hover 类的交互在触屏设备上要有替代方案(改成 tap、或者直接显示提示文字)。

**首次提示**:用微妙的动画暗示「这里可以拖/点/滑」,比如卡片首次进入视口时,内部元素轻微抖动一下。

**降低门槛**:不要让访客「读完说明才能玩」。最好是一进来就能看到效果在动,玩起来再慢慢理解。

### 5.6 社群落地页 `/[lang]/community`

这是所有 CTA 的最终落地页,要回答:

- 社群是什么
- 加入能得到什么(具体的、可感知的好处)
- 怎么加入(微信群 / Discord / Telegram / 邮件订阅 / 付费门槛)
- 现有成员的声音(可选)

---

## 6. 交互 demo 的工程化

因为 demo 是你的核心产品,这里独立成节讲清楚约定。

### 6.1 一个 demo = 一个文件夹

每个交互 demo 都是一个独立组件,放在 `components/interactive/[demo-name]/` 下:

```
components/interactive/spring-demo/
├── index.tsx          ← 组件本体
├── meta.ts            ← 元数据(标题/描述/标签/创建日期)
└── README.mdx         ← 这个 demo 的详细介绍(用于详情页)
```

`meta.ts` 的好处:作品集列表页可以**自动扫描**所有 demo 文件夹,根据 meta 生成卡片,你新增 demo 时不用手动维护列表。

### 6.2 统一外壳 `<DemoFrame>`

所有 demo 都用同一个外壳包裹,提供:重置按钮、全屏按钮、加载占位、视口外暂停。

```tsx
<DemoFrame title="Spring Animation" onReset={handleReset}>
  {/* 你的 demo 内容 */}
</DemoFrame>
```

这样保证体验一致,你也省得每个 demo 都重写边框、按钮。

### 6.3 在 MDX 文章里嵌入

MDX 配置完成后,博客文章里这样写:

```mdx
import SpringDemo from '@/components/interactive/spring-demo'

# 我对 spring 动画的理解

一般我们用 cubic-bezier,但物理感更强的是 spring:

<SpringDemo />

参数 stiffness 越大,弹性越硬...
```

**关键**:同一个 demo 组件,既能在作品集出现,也能在博客文章里出现。**一次编写,多处复用**——这就是为什么坚持用 MDX。

### 6.4 性能红线

- 每个 demo 必须支持「视口外暂停」(用 `IntersectionObserver`)
- 重组件(WebGL、Canvas 大量粒子)必须懒加载:
  ```tsx
  const HeavyDemo = dynamic(() => import('./HeavyDemo'), {
    ssr: false,
    loading: () => <DemoSkeleton />
  })
  ```
- 单页面同屏 demo 不超过 4 个
- 移动端默认降低粒子数 / 帧率,加 `prefers-reduced-motion` 支持

### 6.5 触屏适配 checklist

每做完一个 demo,在手机上过一遍:

- [ ] 没有依赖 hover 的核心交互(或者有 tap 替代)
- [ ] 拖拽手势没有和页面滚动冲突(`touch-action` 配置正确)
- [ ] 可控元素尺寸至少 44×44px(苹果 HIG 推荐的最小触控区)
- [ ] 没有依赖键盘的核心交互(或者只是增强,不是必需)

---

## 7. 引流到社群的设计

这是商业目标,不是「附加功能」,要在每个页面都体现。

### 全站统一 CTA 模块

每篇博客文末、每个作品详情页末尾、首页底部,都用同一个 CTA 组件:

```
┌────────────────────────────────────┐
│  喜欢这些内容?                      │
│  我每周在 [社群名] 分享 xxx          │
│  [加入社群 →]                       │
└────────────────────────────────────┘
```

CTA 的关键是**给具体好处**,不是「关注我」「联系我」这种弱动作。

### 把交互 demo 本身变成引流钩子

这是你独有的优势。一般博客只能「文末放 CTA」,但你可以让 demo 本身成为引流入口:

- demo 玩到一半弹出:「想看完整源码 / 调参指南?加入社群获取」
- 高级参数控制需要「解锁」(加入社群后获得密码)
- demo 底部固定一个不打扰的「在社群里讨论这个 demo」按钮

不要做成付费墙,要做成「免费玩 + 加入获得更多」。

### 内容到社群的路径

```
搜索引擎 → 博客文章 → 文末 CTA → /community → 加入
            ↓
         作品集 → 玩 demo → demo 内 CTA → /community → 加入
```

### 数据追踪

至少埋这几个事件:
- `cta_clicked`(哪个页面、哪个位置的 CTA 被点)
- `demo_interacted`(哪个 demo 被玩了多久)——这是判断哪个作品最受欢迎的关键
- `community_page_view`
- `community_join_clicked`(最终跳转到加入入口的点击)

用 Plausible 或 Umami 都能轻松配置自定义事件。

---

## 8. 开发路线图

### Phase 1:骨架(1-2 周)

- [ ] Next.js 项目初始化,TypeScript + Tailwind
- [ ] 配置 i18n 路由(`/zh` `/en`)
- [ ] MDX 集成,跑通一篇带交互组件的测试文章
- [ ] 基础导航 + Footer + 语言切换器
- [ ] hreflang 自动生成
- [ ] sitemap.ts 配置
- [ ] 部署到 Vercel,绑定域名

### Phase 2:核心页面 + demo 基础设施(2-3 周)

- [ ] **`<DemoFrame>` 通用外壳**(重置/全屏/视口暂停)——后续所有 demo 的基础
- [ ] **首个示例 demo**(走通从开发到嵌入 MDX 的完整链路)
- [ ] 首页(含 hero 交互)
- [ ] 博客列表 + 详情模板
- [ ] 作品集列表(自动扫描 demo 文件夹)+ 详情模板
- [ ] 社群落地页
- [ ] 全站 CTA 组件

### Phase 3:内容填充(持续)

- [ ] 第一批 5 篇博客(中英双版)
- [ ] 第一批 3 个作品案例
- [ ] 个人介绍内容定稿

### Phase 4:增强(按需)

- [ ] 站内搜索(Pagefind)
- [ ] RSS 订阅
- [ ] 暗色模式
- [ ] 文章评论(Giscus,基于 GitHub)
- [ ] 邮件订阅(ConvertKit / Buttondown)

---

## 9. 技术决策遗留问题

需要后续决定:

- **域名**:用什么域名?`.com` 还是个人化的 `.dev` `.design`?
- **社群形态**:微信群?Discord?付费 Newsletter?这影响 CTA 的设计
- **内容更新频率**:决定要不要做 RSS、邮件订阅
- **是否需要 CMS**:目前用 MDX 文件足够。如果以后想在手机上随手发文章,再考虑接入 Sanity / Contentlayer

---

## 10. 参考资源

- [Next.js i18n 官方文档](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [Google hreflang 指南](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [MDX + Next.js 集成](https://nextjs.org/docs/app/building-your-application/configuring/mdx)
- [Framer Motion 文档](https://www.framer.com/motion/)

---

*最后更新:2026-05-03*
