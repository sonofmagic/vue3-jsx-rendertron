# serverless 场景下的rendertron 方案

## 什么是rendertron ?

Google 团队的一个对网页进行渲染项目,

利用headless chromium实时的对网页进行渲染,尤其是 csr(client side render) 应用

一言以蔽之：**面对爬虫渲染**
## 为什么要会出现这个项目？

vue / react 这类框架的兴起，给前端开发带来了巨大的变化

然而默认他们都是使用的 csr ，

这带来一个问题，由于 spa 中绝大部分的 html dom 都是由 js 去控制产生销毁的

我们浏览器访问一个这样的应用，去查看源代码的话

只能看到引入了大批的脚本文件，并没有任何显示的数据

原先基于http的爬虫也是如此，他并不会执行其中的 js

也就没法通过里面的xhr等等异步方式去获取数据，给 body里面添加内容

所以以普通爬虫的视角来看，我们的spa应用简直可以用空无一物来形容

这就对我们做seo带来了问题


## 解决问题的几种方案
### prerender
预渲染技术也是使用 puppeteer，在我们spa项目打包完成的阶段，预先host这些静态文件，然后使用headless chrome先去渲染它指定的页面，把渲染好的html抽离，和spa项目一起按照目录的结构部署

这种方案最大的优点是非常的方便,小项目使用非常的灵活

不过，假如说有一个动态页面，要根据百万量级数据去生成百万个静态的html

这种方案显然是无法接受的，毕竟渲染这么大的量很花时间，部署的话，这么多静态的东西也很大，得不偿失

### server side render

之前我选用的就是ssr的解决方案

vue / react 项目都有对应成熟框架

比如 nuxt/next/umi ,ssr方案能解决一些问题，
比如说首屏渲染问题，还有seo的一些meta信息，也可以在服务端组装好返回
而且对前端开发来说，由于nodejs扮演角色的升级，能做的事情也更多了


不过可能也存在一些问题：

- 对已经开发好的spa项目，有可能改造成本比较高

- 对前端开发人员，有更高的要求，要清楚哪些代码跑在nodejs，哪些在前端，而哪些2者都跑

然而他的优点是显而易见的

推荐大家采用这种方案去搞seo



<!-- 在webpack的动态引入还未出现的时代，spa应用一次性引入所有的js过大 -->

### rendertron

前面说了 ssr 这么多好处，为啥我们还需要 rendertron 方案呢

这也是给我们在 spa 应用无法改造时候多一条出路

他可以在尽可能少改造原先的项目的情况下，达成我们seo的目的

## rendertron 的 serverless实践 

rendertron 本身只是一个 puppeteer 和 koa 的封装

在阿里云serverless，我已经看到了 `fun` 的配置项，可以直接部署一个 `rendertron` 应用

而腾讯云serverless, 也已经内置了 `chromium` 我们也只需要安装 `puppeteer` ，不需要上传任何的二进制文件，就能直接使用了 

> 目前版本是 HeadlessChrome/80.0.3987.0 (2021.04.19)

本文章以腾讯云serverless作为示例，毕竟直接部署一个现成的 `rendertron` 太无趣了，也很死板自定义的不多


### Step1

创建一个 spa 应用，我用 vite + vue3 

### Step2

创建一个 express 应用,用 history-api-fallback 去处理 history 路由的 spa应用产生的 `index.html`

在express里面去安装 rendertron ，然而我们不出去初始化 Rendertron 实例，只借用他的 Renderer

创建 Renderer 实例之后，我们就有了自己的 `browser` 和 `renderer` 了

然后简单，写个中间件用 isBot 判断是不是爬虫，是爬虫就 去判断缓存，没有命中就把 fullPath 的页面，用 Renderer 去渲染，然后返回给爬虫，然后置缓存

这样，基于SCF的一个自定义的 `rendertron` 就完成了

## 总结

这个方案其实就是给爬虫看

对于我们用户来说，体验就是最纯正的 spa 应用，像 ssr ，假如不做页面或者组件缓存的话，复杂页面的server渲染实际上是很慢的

而这种方案的慢，相当于从 nodejs server的渲染引擎 那里，转移到了 nodejs + chromium 这里

而且由于chromium的内置，也能比较好的处理一些特殊的需求（笑~）

