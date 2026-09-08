import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '矛·盾知识库',
  description: '矛·盾知识库，面向安全、AI、工具与笔记的个人站点',
  base: '/docs/',
  cleanUrls: true,
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '矛盾武器库', link: '/weapon/' },
      { text: '安全导航', link: '/navigation/' },
      { text: 'AI工具箱', link: '/ai-toolbox/' },
      { text: '近期资讯', link: '/news/' },
      { text: '博客笔记', link: '/blog/' },
      {
        text: '软件推荐',
        items: [
          { text: '软件推荐总览', link: '/software/' },
          { text: '浏览器工具', link: '/software/browser-tools' },
          { text: '效率软件', link: '/software/productivity' }
        ]
      },
      {
        text: '工具手册',
        items: [
          { text: '工具手册总览', link: '/manual/' },
          { text: 'VitePress 指南', link: '/manual/vitepress' },
          { text: 'GitHub Pages 指南', link: '/manual/github-pages' }
        ]
      },
      { text: '关于我', link: '/about/' }
    ],
    search: {
      provider: 'local'
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/' }],
    sidebar: {
      '/weapon/': [
        {
          text: '矛盾武器库',
          items: [{ text: '总览', link: '/weapon/' }]
        }
      ],
      '/navigation/': [
        {
          text: '安全导航',
          items: [{ text: '总览', link: '/navigation/' }]
        }
      ],
      '/ai-toolbox/': [
        {
          text: 'AI工具箱',
          items: [{ text: '总览', link: '/ai-toolbox/' }]
        }
      ],
      '/news/': [
        {
          text: '近期资讯',
          items: [{ text: '总览', link: '/news/' }]
        }
      ],
      '/blog/': [
        {
          text: '博客笔记',
          items: [{ text: '总览', link: '/blog/' }]
        }
      ],
      '/software/': [
        {
          text: '软件推荐',
          items: [
            { text: '总览', link: '/software/' },
            { text: '浏览器工具', link: '/software/browser-tools' },
            { text: '效率软件', link: '/software/productivity' }
          ]
        }
      ],
      '/manual/': [
        {
          text: '工具手册',
          items: [
            { text: '总览', link: '/manual/' },
            { text: 'VitePress 指南', link: '/manual/vitepress' },
            { text: 'GitHub Pages 指南', link: '/manual/github-pages' }
          ]
        }
      ],
      '/about/': [
        {
          text: '关于我',
          items: [{ text: '个人介绍', link: '/about/' }]
        }
      ]
    },
    footer: {
      message: 'Built with VitePress',
      copyright: 'Copyright © 2026'
    }
  }
})
