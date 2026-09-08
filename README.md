# docs

基于 VitePress 的文档站，支持发布到 GitHub Pages。

## 本地运行

```bash
npm install
npm run dev
```

## 构建发布

```bash
npm run build
```

推送到 `main` 后会通过 GitHub Actions 自动部署。

## 评论区

已接入 giscus 评论组件，评论区会自动出现在首页和所有文章页面底部。访客点击“使用 GitHub 登录”后，即可使用 GitHub 账号留言；账号认证由 GitHub/Giscus 完成，本站不接触密码或 OAuth 凭据。

### 配置评论区

1. 在 `dXiaoWangSec/docs` 的 GitHub 仓库 Settings > General 中开启 Discussions。
2. 安装 [Giscus App](https://github.com/apps/giscus)，并在 [giscus.app](https://giscus.app/zh-CN) 选择本仓库和 `General` 分类。
3. 本地开发时，将 `.env.example` 复制为 `.env.local`，填入 Giscus 页面生成的 `VITE_GISCUS_REPO_ID` 和 `VITE_GISCUS_CATEGORY_ID`，然后重启开发服务器。
4. GitHub Pages 部署时，在仓库 Settings > Secrets and variables > Actions 中新增两个 Repository secrets：`VITE_GISCUS_REPO_ID` 和 `VITE_GISCUS_CATEGORY_ID`。工作流会自动注入它们。
