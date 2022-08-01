---
title: 如何使用vuepress + PicGo + Typora打造一个静态个人博客
isShowComments: false
categories: 
  - 前端
tags: 
  - 教学
---

## 快速构建vuepress
- 首先打开[vuepress](https://www.vuepress.cn/ "vuepress")官网
- 按照指南先快速搭建一个vuepress项目
- 如下图所示：
![image-20220801142335551](http://img.p000bb.work/image-20220801142335551.png)

## 配置主题
- 如下图所示：
![image-20220801142619748](http://img.p000bb.work/image-20220801142619748.png)
::: tip 说明
主题可自行开发也可使用第三方主题，本博客系统使用的是[reco](https://vuepress-theme-reco.recoluan.com/ "reco")主题
:::

## 配置config.js
- 目录结构
```
.
├── docs
│   ├── .vuepress (可选的)
│   │   ├── components (可选的)
│   │   ├── theme (可选的)
│   │   │   └── Layout.vue
│   │   ├── public (可选的)
│   │   ├── styles (可选的)
│   │   │   ├── index.styl
│   │   │   └── palette.styl
│   │   ├── templates (可选的, 谨慎配置)
│   │   │   ├── dev.html
│   │   │   └── ssr.html
│   │   ├── config.js (可选的)
│   │   └── enhanceApp.js (可选的)
│   │ 
│   ├── README.md
│   ├── guide
│   │   └── README.md
│   └── config.md
│ 
└── package.json
```
```js
module.exports = {
  title: "熊猫宝宝",
  description: "欢迎来到90后快乐肥宅熊猫宝宝的个人博客😄😄😄",
  theme: "reco",
  themeConfig: {
    subSidebar: "auto", //在所有页面中启用自动生成子侧边栏，原 sidebar 仍然兼容
    type: "blog", //	主题类别
    author: "熊猫宝宝",
    repo: "p000bb/xmbb_blog", // 导航栏右侧生成Github链接
    editLinkText: "编辑一下！",
    sidebarDepth: 1,
	smoothScroll: true, // 页面滚动
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
```
::: tip 说明
具体配置项可查看[vuepress](https://www.vuepress.cn/config/ "vuepress")官网以及[reco](https://vuepress-theme-reco.recoluan.com/views/1.x/blog.html "reco")
:::

## 编写第一篇个人博客

::: tip 说明
reco主题会自动获取文件下的md文件，所以只要在你想要的文件下新建md文件编写第一篇博客(本项目是在blob文件夹下进行创建)
:::

![image-20220801143710698](http://img.p000bb.work/image-20220801143710698.png)

## 启动服务

```sh
yarn docs:dev # npm run docs:dev
```

- 如下图所示
![image-20220801144314996](http://img.p000bb.work/image-20220801144314996.png)

## 下载[Typora](https://typoraio.cn/ "Typora")以及[PicGo](https://github.com/Molunerfinn/PicGo/releases/tag/v2.3.0 "PicGo")

- 配置Typora
::: tip 说明
PicGo路径选择你PicGo安装的路径即可
:::
![image-20220801145159693](http://img.p000bb.work/image-20220801145159693.png)

- 配置PicGo
::: tip 说明
我是用的是七牛图床(购买的腾讯域名使用CDN 加速域名)(请自行查找如何配置七牛云cdn)
:::
![image-20220801145418550](http://img.p000bb.work/image-20220801145418550.png)

- 在Typora编写博客并上传图片
- 成功后返回如下结果
![image-20220801150953838](http://img.p000bb.work/image-20220801150953838.png)
- 七牛云后台查看相应文件
::: tip 说明
至此之后在Typora上写的博客图片均被存放至七牛云
:::
  ![image-20220801151117695](http://img.p000bb.work/image-20220801151117695.png)

## github自动化部署

1. 设置 Secrets
生成教程可以看 GitHub 官方的帮助文档：[创建个人令牌](https://docs.github.com/cn/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token "创建个人令牌")

::: warning 警告
切记：令牌名字一定要叫：`ACCESS_TOKEN`，这是后面的 Action 需要用的
<br>
:::
2. 编写 workflow 文件
::: tip 
持续集成一次运行的过程，就是一个 workflow（工作流程）。
:::
<p>目录结构如图所示：</p>

![image-20220801151627098](http://img.p000bb.work/image-20220801151627098.png)

`main.yml`的代码如下：
``` yml
name: Deploy GitHub Pages

# 触发条件：在 push 到 master 分支后
on:
  push:
    branches:
      - master

# 任务
jobs:
  build-and-deploy:
    # 服务器环境：最新版 Ubuntu
    runs-on: ubuntu-latest
    steps:
      # 拉取代码
      - name: Checkout
        uses: actions/checkout@v2
        with:
          persist-credentials: false

      # 生成静态文件
      - name: Build
        run: npm install && npm run build

      # 部署到 GitHub Pages
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@releases/v3
        with:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          BRANCH: gh-pages
          FOLDER: docs/.vuepress/dist

```

3. 自动化部署

配置好上面所有的东西之后，每当你提交代码到你的github master分支之后，github就会自动帮你自动构建

## 上传至github









