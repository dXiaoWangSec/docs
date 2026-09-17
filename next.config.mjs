import { createMDX } from "fumadocs-mdx/next";

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // 静态导出：生成纯 HTML/JSON，可直接托管到 GitHub Pages 等静态服务。
  // 配合自定义域名 docs.xiaowang69.top 时无需 basePath（根路径访问）。
  output: "export",
  // 静态导出不支持 Next 图像优化，改用原图直出。
  images: {
    unoptimized: true,
  },
  // 导出目录，GitHub Pages 部署时指向该目录。
  distDir: ".next",
};

export default createMDX()(config);
