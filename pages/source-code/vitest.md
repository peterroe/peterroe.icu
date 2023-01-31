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

`ui` 项目暴露的出口是一个 `vite` 的插件函数。我们知道，UI 界面的地址一般是 `localhost:5173/__vitest__/`，下面的这个代码就是当启动 `vite` 服务的时候，访问 `/__vitest__` 的时候，打开的资源就是 `dist` 资源

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

通信的技术实际上是通过 `websocket` 实现的，又因为 `websocket` 服务依赖于 `HTTP` 服务，所以一般情况下可能要启动两个 `HTTP` 服务，一个是 `Vite` 的服务，一个是 `WebSocket` 服务。

当然我们有更好的方法，那就是让 vite 的 HTTP 服务，让一个路由来代理 `websocket` 服务，那样就只用启动一个 `Vite` 就可以了，`vitest` 就是这么做的，`vitest` 中是通过 `localhost:5173/__vitest_api__` 这个后端路由代理的

为简化 `websocket` 通信， `antfu` 封装了一个叫 <GitHubLink repo="antfu/birpc" /> 的包，帮助我们去注册服务

```js
export function createRpcServer({
  server,
  someData,
}: {
  server: ViteDevServer
  someData: Data[]
}) {
 const wss = new WebSocketServer({ noServer: true })

  server.httpServer?.on('upgrade', (request, socket, head) => {
    if (!request.url)
      return
    const { pathname } = new URL(request.url, 'http://localhost')
    if (pathname !== API_PATH)
      return

    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request)
      setupClient(ws)
    })
  })

  function setupClient(ws: WebSocket) {
    const rpc = createBirpc<ClientFunctions>(
      serverFunctions,
      {
        post: data => ws.send(data),
        on: (data) => {
          ws.on('message', data)
        },
        serialize: v => JSON.stringify(v),
        deserialize: v => JSON.parse(v),
      },
    )
    // 调用 UI 项目的函数，可以传入数据
    rpc.sendDiffMessage(someData).catch((e) => {
      console.log(e)
    })
  }
  return wss
}
```

`createRpcServer` 的调用实际时机是作为一个中间件，在 `vite` 的 `configureServer` 钩子中执行

```js
{
  name: 'checker',
  enforce: 'pre',
  async configureServer(server) {
    createRpcServer({ server, somedata })
  },
}
```

当然，前端也需要去注册 `Websocket` 服务

```js
export function createRpcClient(clientFunctions: ClientFunctions) {
  const HOST = location.host
  const ws = new WebSocket(`ws://${HOST}${API_PATH}`)
  ws.addEventListener('open', (_) => {
    console.log('create Client')
    const rpc = createBirpc<ServerFunctions>(
      clientFunctions,
      {
        post: data => ws.send(data),
        on: (fn) => {
          (onMessage = fn)
        },
        // these are required when using WebSocket
        serialize: v => JSON.stringify(v),
        deserialize: v => JSON.parse(v),
      },
    )
    ws.addEventListener('message', (v) => {
      console.log('message commit')
      onMessage(v.data)
    })
    return rpc
  })
}

const clientFunctions: ClientFunctions = {
  sendDiffMessage(someData) {
    // 前端 UI 就能够接收到 Vite 服务传过来的信息了
    diff.initNameMap(someData)
  },
}
```

上面就是实现的核心了，写的不是很清楚，只写了个思路，了解更多可以直接去看源码

此外，我们可以通过编程的方式，来启动 `vite` 服务，就可以让我们动态启动 `vite` 服务

```js
import { createServer } from 'vite' 

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
