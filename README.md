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
3. 当前项目已经配置了 `dXiaoWangSec/docs` 的 Repository ID 和 `General` 分类 ID，本地开发可直接运行；修改配置后需要重启开发服务器。
4. GitHub Pages 工作流已内置这两个公开标识作为默认值，也支持使用 Repository secrets 覆盖：`VITE_GISCUS_REPO_ID` 和 `VITE_GISCUS_CATEGORY_ID`。
