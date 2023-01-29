---
title: vitest
---

[[toc]]

## `vitest --ui` 是如何实现的？

vitest --ui 后，会开启一个界面服务，更好的观察测试结果

![vitest](https://raw.githubusercontent.com/peterroe/static-img/master/20230121122541.png)

### 单纯 vitest 命令

单纯 `vitest` 命令的实现其实很好理解，利用 `chokidar` 监听所有测试文件的修改就可以，然后重新执行测试

### `--ui` 选项

`vitest` 使用 `cac` 作为命令行参数解析工具

### 项目工程

看下 `vitest/packages/ui` 目录基本结构

```shell
├─ node
├─ client
│   ├─ index.ts
│   └─ App.vue
├─ vite.config.ts
├─ rollup.config.js
└─ package.json
```

`ui` 项目暴露的出口是一个 `vite` 的插件函数。我们知道，UI 界面的地址一般是 `localhost:5173/__vitest__/`，下面的这个代码就是当启动 vite 服务的时候，访问 `/__vitest__` 的时候，打开的资源就是 `dist` 资源

```js
export default (base = '/__vitest__/') => {
  return <Plugin>{
    name: 'vitest:ui',
    apply: 'serve',
    async configureServer(server) {
      const clientDist = resolve(fileURLToPath(import.meta.url), '../client')
      server.middlewares.use(base, sirv(clientDist, {
        single: true,
        dev: true,
      }))
    },
  }
}
```

`vite --ui` 让我感兴趣的点是，在 Node 中才能访问的文件信息，是如何能展现在浏览器页面上的呢，必然有一个浏览器和 `nodejs` 通信的过程

通信的技术实际上是通过 `websocket` 实现的，又因为 websocket 服务依赖于 `HTTP` 服务，所以一般情况下可能要启动两个 HTTP 服务，一个是 Vite 的服务，一个是 WebSocket 服务。

当然我们有更好的方法，那就是让 vite 的 HTTP 服务，让一个路由来代理 websocket 服务，那样就只用启动一个 Vite 就可以了，vitest 就是这么做的，vitest 中是通过 `localhost:5173/__vitest_api__` 这个后端路由代理的

为了封装 websocket 通信， antfu 封装了一个叫 <GitHubLink repo="antfu/brirpc" /> 的包，帮助我们去注册服务



```js
const config: ViteInlineConfig = {
    logLevel: 'error',
    configFile: configPath,
    // this will make "mode" = "test" inside defineConfig
    mode: options.mode || process.env.NODE_ENV || mode,
    plugins: await VitestPlugin(options, ctx),
  }

  const server = await createServer(mergeConfig(config, mergeConfig(viteOverrides, { root: options.root })))

  if (ctx.config.api?.port)
    await server.listen()
```

---
