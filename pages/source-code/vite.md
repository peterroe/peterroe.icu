---
title: vite
---

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