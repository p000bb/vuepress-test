module.exports = {
  title: "熊猫宝宝",
  description: "欢迎来到90后快乐肥宅熊猫宝宝的个人博客😄😄😄",
  theme: "reco",
  head: [
		['link', { rel: 'icon', href: '/favicon.ico' }],
		['meta', { name: 'referrer', content: 'no-referrer' }],
	],
  themeConfig: {
    subSidebar: "auto", //在所有页面中启用自动生成子侧边栏，原 sidebar 仍然兼容
    type: "blog", //	主题类别
    author: "熊猫宝宝",
    repo: "p000bb/xmbb_blog", // 导航栏右侧生成Github链接
    editLinkText: "编辑一下！",
    sidebarDepth: 1,
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: "分类", // 默认文案 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: "标签", // 默认文案 “标签”
      },
    },
    nav: [
      {
        text: "首页",
        link: "/",
      },
    ],
  },
};
