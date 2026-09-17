import type { DocsLayoutProps } from "fumadocs-ui/layouts/docs";

export const baseOptions: Omit<DocsLayoutProps, "tree"> = {
  nav: {
    title: "我的项目文档",
    url: "/",
  },
  links: [],
};
