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

`ui` 项目暴露的出口是一个 `vite` 的插件函数

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

提供给 vitest 核心使用

```js
function VitestPlugin() {
  async function UIPlugin() {
    await ensurePackageInstalled('@vitest/ui', getRoot())
    return (await import('@vitest/ui')).default(options.uiBase)
  }
  // ...
}

```

注入 vite 服务器的插件当中

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

可以详细看下这个包，下面这个包的作用，封装了一些协议，可以让我们把在 Node 上跑的vitest 测试数据，发送到前端的 UI 界面，这就是实现的核心！

<GitHubLink repo="vitest-dev/vitest/tree/main/packages/vite-node" />
