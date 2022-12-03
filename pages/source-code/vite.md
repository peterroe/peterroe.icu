---
title: vite
---

### vite

* 基于 ESM 的 devServer + HMR
* 基于 esbuild 的依赖预优化
* 基于 rollup 的 Plugins + Bundle
* SSR

### Bundle-Based devServer 问题

* devServer 必须等待所有模块构建完成
* 应用越大，启动时间越长
* 分片的模块也要构建

### ESM-devServer 问题

* transform 性能问题
  * 使用性能高的工具
  * Browser Cache + Server Cache
* 非 ESM 模块兼容（TS/JSX/CSS）
  * esbuild 转换，代替 TSC/BABEL
* Browser ESM 不能识别 Node 模块
  * es-module-lexer 扫描 import 语法，替换成 /node_modules/vue/dist/vue.runtime.esm-bundler.js
* 其他 Node 问题
  * 兼容 CJS 模块，将 CJS 转换为 ESM
    * @rollup/plugin-commonjs，边缘 Case ，循环引用是不用的，打包结果不一致
    * esbuild 
      * 用函数包裹CJS
  * 请求过多，例如 Vue，通过缓存

### HMR

* 构建模块依赖图
* 模块含有 import.meta.hot.accept，将模块标记为 boundary
* 文件更新的时候，向上冒泡找到最近的 boundary，通过 devServer 发送给浏览器端
* 浏览器端接收到这些信息，对变更的模块执行加载，找到回调函数调用
* 如果没找到 boundary, 直接 reload
* 对于 Components， 组件级别进行转换的时候，都会进行 HMR 的 boundary

### SSR

* 重写 import 语法，自己处理模块的引入，导出以及一系列初始化的功能，实现了自己的模块加载器

```js
import { ref } from 'vue'
const val = ref(0)

// rewrite
const __vite_ssr_import_0__ = __vite_ssr_import__(\\"vue\\")
const val = __vite_ssr_import_0__.ref(0)
```

### 执行 vite dev 发生了什么？

vite 使用 cac 作为参数解析工具，可以看到，`vite、 vite serve、 vite dev`都是等价的命令，然后解析一系列参数：

```js
cli
  .command('[root]', 'start dev server') // default command
  .alias('serve') // the command is called 'serve' in Vite's API
  .alias('dev') // alias to align with the script name
  .option('--host [host]', `[string] specify hostname`)
  .option('--port <port>', `[number] specify port`)
  .option('--https', `[boolean] use TLS + HTTP/2`)
  .option('--open [path]', `[boolean | string] open browser on startup`)
  .option('--cors', `[boolean] enable CORS`)
  .option('--strictPort', `[boolean] exit if specified port is already in use`)
  .option(
    '--force',
    `[boolean] force the optimizer to ignore the cache and re-bundle`
  )
  .action(async (root: string, options: ServerOptions & GlobalCLIOptions) => {
    filterDuplicateOptions(options)
    // ...
  }
```

过滤参数，保留最后一个：

```js
const filterDuplicateOptions = <T extends object>(options: T) => {
  for (const [key, value] of Object.entries(options)) {
    if (Array.isArray(value)) {
      options[key as keyof T] = value[value.length - 1]
    }
  }
}
```

引入 `createServer` ，创建一个 http 服务，传入命令行携带的选项：

```js
const { createServer } = await import('./server')
const server = await createServer({
  root,
  base: options.base,
  mode: options.mode,
  configFile: options.config,
  logLevel: options.logLevel,
  clearScreen: options.clearScreen,
  optimizeDeps: { force: options.force },
  server: cleanOptions(options)
})

await server.listen() // 开始监听
```

### 其他

**降级处理**

对于环境变量的处理，有一个优雅的降级操作：

```js
if (mode === 'production') {
  process.env.NODE_ENV = 'production'
}
// production env would not work in serve, fallback to development
if (command === 'serve' && process.env.NODE_ENV === 'production') {
  process.env.NODE_ENV = 'development'
}
```

而不是：

```js
if (command === 'serve' && process.env.NODE_ENV === 'production') {
  process.env.NODE_ENV = 'development'
} else if (mode === 'production') {
  process.env.NODE_ENV = 'production'
})
```

**函数重载**

相关链接： https://cn.vitejs.dev/config/#config-intellisense

`defineConfig`既可以传入对象，也可以传入函数

```js
export default defineConfig({
  // ...
})
export default defineConfig(({ command, mode, ssrBuild }) => {
  if (command === 'serve') {
    return {
      // dev 独有配置
    }
  } else {
    // command === 'build'
    return {
      // build 独有配置
    }
  }
})
```

而由于 js 没有重载的概念，所以内部的实现是通过 `typeof` 运算符判断的：

```js
const config = await (typeof userConfig === 'function'
      ? userConfig(configEnv)
      : userConfig)
```

而且还使用了 `await` 关键字，目的也是为了支持异步配置：

```js
export default defineConfig(async ({ command, mode }) => {
  const data = await asyncFunction()
  return {
    // vite 配置
  }
})
```