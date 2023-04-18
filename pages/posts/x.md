---
title: 另类的命令行调试方法
date: 2023-03-14
---

最近在看 [rspack](https://github.com/web-infra-dev/rspack) 这个项目，项目根目录下有个 x 文件：

```js
#!/usr/bin/env node
const { createCLI } = require("./scripts/cmd.js");

/// use `./x --help` to get more information..
void (function () {
	const cli = createCLI();
	cli.parse(process.argv);
})();

```

看起来的作用就是为了方便调试 cli 工具，在本地尝试的了一下，确实可行

在 macos 下需要给运行权限

```shell
$ chmod +x x
```

这种方法还是第一次见到，一般来说，调试的方法为将本地开发的命令行工具 link 到全局，例如

```shell
$ pnpm link --global
```

这样，就可以在任意地方使用这个工具了，但是也有一些缺点：

* 影响全局环境，算是双刃剑吧
* windows 下很容易出问题，环境搞坏了（踩坑）

而像 rspack 在项目下调试，就不会影响全局环境了