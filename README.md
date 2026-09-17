# 文档站（docs-site）

一个基于 [Fumadocs](https://fumadocs.dev) 的文档站点：左侧边栏 + 顶部搜索 + 右侧目录 + 暗色模式。**纯静态产物**，可托管到 GitHub Pages / Cloudflare Pages / Netlify 等任意静态托管，无后端、无数据库。

> 基于 Fumadocs 的最小化单应用，针对中文做了优化（内置中文分词搜索），无后端、无数据库。

## 特性

- **中文全文搜索（纯前端）**：搜索索引在构建时生成，浏览器端本地检索，无需联网或外部搜索服务，已内置中文分词（搜「武器库」「AI 工具箱」等短词可直接命中）
- **暗色模式**：右上角一键切换，默认跟随系统
- **响应式**：桌面端三栏，移动端折叠
- **代码高亮**：多语言（bash/ts/json/py 等），基于 Shiki
- **排版组件**：提示框（5 种语义）、卡片网格、表格、引用、有序 / 无序列表
- **自定义域名**：已配置 `docs.xiaowang69.top`（见 `public/CNAME`）

## 技术栈

| 类别 | 选型 |
| --- | --- |
| 框架 | Next.js 15（App Router）+ React 19，`output: export` 静态导出 |
| 文档引擎 | fumadocs-ui / fumadocs-core / fumadocs-mdx 15.5.x |
| 样式 | Tailwind CSS v4 + fumadocs-ui 主题 |
| 字体 | Inter（正文）/ Source Serif 4（标题）/ Geist Mono（代码） |
| 搜索 | Orama（构建时导出索引 → 浏览器端加载并检索） |
| 主题切换 | next-themes |

## 环境要求

- Node.js ≥ 18（推荐 20 LTS）
- npm / pnpm 均可

## 快速开始

```bash
# 安装依赖（首次会执行 postinstall 生成 .source 索引）
npm install

# 启动开发服务器（默认 http://localhost:3000）
npm run dev
```

修改 `content/docs/` 下的文件会热更新，无需重启。

## 构建与部署

```bash
# 静态导出：把 MDX 编译为静态 HTML + 导出搜索索引到 out/
npm run build
```

构建产物在 `out/` 目录（纯静态文件）。`public/CNAME` 会自动被复制到 `out/CNAME`，用于在 GitHub Pages 上绑定自定义域名 `docs.xiaowang69.top`。

**GitHub Pages 自动部署**：推送 `main` 分支即触发 `.github/workflows/deploy.yml`，自动构建并发布到 GitHub Pages（详见该文件）。

## 目录结构

```
（仓库根目录）
├── app/
│   ├── layout.tsx              # 全局壳：主题、字体、注入自定义搜索框（RootProvider）
│   ├── global.css              # 主题变量与排版
│   ├── (docs)/                # 文档路由组
│   │   ├── layout.tsx          # 文档布局（侧边栏 + 目录）
│   │   ├── [[...slug]]/page.tsx# 文档渲染页（generateStaticParams + 中文搜索 hook）
│   │   └── search.tsx          # 自定义搜索框（客户端静态检索，注入中文分词器）
│   └── api/search/route.ts     # 导出搜索索引（staticGET，构建时生成静态文件）
├── components/
│   └── search-dialog.tsx       # 客户端静态搜索对话框（Orama + 中文分词）
├── content/docs/               # ★ 你的文档源，都在这里
│   ├── index.mdx               # 首页
│   ├── meta.json               # 根侧边栏顺序与分组
│   ├── about/ ai-toolbox/ weapon/ software/ blog/ news/   # 分区（占位页待补充）
│   └── faq.mdx
├── lib/
│   ├── source.ts               # Fumadocs 文档源定义
│   ├── layout.shared.ts        # 站点导航配置（站名、链接）
│   └── search.ts               # 中文分词器 + 搜索 schema（服务端/客户端共用）
├── public/CNAME                # 自定义域名（GitHub Pages）
├── source.config.ts            # fumadocs-mdx 集合定义
├── mdx-components.tsx          # MDX 组件映射
└── next.config.mjs             # output: export 静态导出配置
```

## 如何写文档

1. 在 `content/docs/` 下新建 `xxx.mdx`（分区就建 `xxx/index.mdx`）；
2. 顶部写 frontmatter：

   ```md
   ---
   title: 页面标题
   description: 一句话简介
   ---

   正文从这里开始……
   ```

3. 把 `xxx` 加进所在目录 `meta.json` 的 `pages` 数组（决定侧边栏顺序）；
4. 刷新页面，侧边栏即出现新条目。

**目录 → 侧边栏层级**：`content/docs/a/b.mdx` 对应侧边栏里 `a` 分组下的 `b` 页面；多级目录自动渲染成多级可折叠菜单。

### 可用的排版组件

| 组件 | 用法 | 说明 |
| --- | --- | --- |
| 提示框 | `<Callout type="info" title="...">` | `info`/`warning`/`error`/`success`/`question` 五种 |
| 卡片网格 | `<Cards><Card title href>…</Card></Cards>` | 入口网格 |
| 代码块 | ```` ```ts ```` 等围栏 | 自动语法高亮 |
| 表格 / 引用 / 列表 | 原生 Markdown | 直接写即可 |
| 折叠 | 原生 `<details><summary>` | 替代 Accordion |

> ⚠️ **不可用**：Fumadocs 默认组件里**没有** `Steps` / `Tabs` / `Accordion`，MDX 里直接写会运行时报错。步骤用有序列表、折叠用原生 `<details>` 替代。

### 编写约定（务必遵守）

1. **正文不要重复写标题**：`title` 已由页面自动渲染成页头大标题，正文从 `##` 二级标题开始，不要再写 `# 标题`，否则页面会出现两个标题。
2. **JSX 标签里的文字要用 `{ }` 包裹**：MDX 会把 JSX 标签内的“裸文本”再套一层 `<p>`，生成 `<p><p>…</p></p>` 非法结构，触发 React hydration 报错（`In HTML, <p> cannot be a descendant of <p>`）。写法：

   ````md
   {/* ❌ 错误：裸文本在 JSX 里，会被再包一层 p */}
   <p className="note">这是一段说明</p>

   {/* ✅ 正确：用 { } 包成表达式文本 */}
   <p className="note">{"这是一段说明"}</p>

   {/* ✅ 也正确：干脆不用 JSX，写纯 Markdown 段落 */}
   这是一段说明
   ````

3. **页面地址没有 `/docs` 前缀**：路由用了 `(docs)` 路由组（不进 URL），所以地址是 `/weapon`、`/faq`，**不是** `/docs/weapon`。
4. **新页面要登记 `meta.json`**：见上文；不登记侧边栏看不到。

### meta.json 分组与排序

`meta.json` 的 `pages` 决定侧边栏顺序；用 `"---"` 插分隔线、用纯字符串当分组标题：

```json
{ "title": "文档", "pages": ["index", "---", "常用工具", "weapon", "software", "---", "其他", "blog", "news", "faq"] }
```

多级目录（如 `content/docs/weapon/vpn.mdx`）需在 `content/docs/weapon/meta.json` 里登记 `"vpn"`。


## 搜索（中文已支持，纯前端）

搜索链路：

```
content/docs/*.mdx
   │  构建时：fumadocs-mdx 抽取每页标题/章节/正文（structuredData）
   ▼
app/api/search/route.ts        ← createSearchAPI('advanced') + staticGET
   │  构建时把索引导出为静态文件 out/api/search（Orama 存档）
   ▼
浏览器端 components/search-dialog.tsx
   │  useDocsSearch({ type: 'static' }) 加载 /api/search 并在本地 Orama 检索
   ▼
⌘K / 搜索框 → 本地中文全文检索（无后端、不联网）
```

Orama 默认分词按空格切词，对中文不友好（整句成一词）。本项目在 `lib/search.ts` 内置中文分词器（`Intl.Segmenter` + 逐字/相邻双字组合），**服务端导出索引与浏览器端检索使用同一套分词器**，中文短词搜索可直接命中。

## 自定义外观

- **改站点名 / logo**：`lib/layout.shared.ts` 的 `nav.title`，并在 `app/layout.tsx` 的 `nav` 配置加 `icon`；页面标题上方的小标签在 `app/(docs)/[[...slug]]/page.tsx` 的 `.doc-heading` 段落。
- **改品牌色**：`app/global.css` 的 `--color-fd-primary`（链接 / 选中）与 `--color-fd-accent`（高亮背景）。
- **改字体**：已在 `app/layout.tsx` 引入 Inter / Source Serif 4 / Geist Mono；若要替换，改 `app/global.css` 的 `--font-sans/--font-serif/--font-mono` 并在 layout 引入对应字体。
- **改自定义域名**：编辑 `public/CNAME`（同时记得在 GitHub Pages 设置里绑定该域名并配置 DNS）。

## 常见问题 / 排错

- **新页面写了侧边栏看不到？** 必须把它加进 `meta.json` 的 `pages`，Fumadocs 不会自动收录。
- **访问 `/分区名` 报 404？** 纯文件夹若没有 `index.mdx` 落地页，直接访问该 URL 会 404。给分区加一个 `index.mdx`（规范地址即 `/分区名`）即可。
- **改了依赖后页面 500（Cannot find module './vendor-chunks/...'）？** 多为 `.next` 旧 chunk 损坏，删掉 `.next` 重启 `npm run dev` 即可重建（`.next` 已被 git 忽略）。
- **代码块里的中文/英文字符串 grep 不到？** 属 Shiki 高亮把文本拆成多个 `<span>`，并非内容缺失，页面正常渲染。

## License

本项目可自由用于私有或商业文档站，遵循 Fumadocs 相关开源协议。
