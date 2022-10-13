---
title: tsx
---

## 用法

可以直接执行 `ts` 文件

```shell
$ tsx index.ts
```

## 技术实现

* 命令行辅助工具 [cleye](https://github.com/privatenumber/cleye)，类似 `cac`
* 命令执行工具 [cross-spawn](https://github.com/moxystudio/node-cross-spawn)，跨平台
* 转换工具 [@esbuild-kit/esm-loader](https://github.com/esbuild-kit/esm-loader)

核心是基于 `@esbuild-kit/esm-loader` 实现的：

```shell
$ node --loader @esbuild-kit/esm-loader ./file.ts
```

调用：

```ts
import { pathToFileURL } from 'url';
import spawn from 'cross-spawn';

//...
return spawn(
  process.execPath, // node's path
  [
    '--require',
    require.resolve('./suppress-warnings.cjs'),

    '--loader',
    pathToFileURL(require.resolve('./loader.js')).toString(),

    ...argv,
  ],
  {
    stdio,
    env: environment,
  },
);
```

类似的直接执行 ts 文件的工具还有很多，大同小异，具体差别可以[看这里](https://github.com/privatenumber/ts-runtime-comparison)

可以看到 `tsx` 的兼容性是比较好的