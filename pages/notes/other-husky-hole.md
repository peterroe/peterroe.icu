---
title: husky踩坑
date: 2022-02-02
type: other
---

[`husky`](https://github.com/typicode/husky)能够让用户方便的编写`git`钩子

```shell
pnpm install husky
```

## 注意破环性变更！！！

在版本`v6.0.0`之前，我们可以通过配置`package.json`

```json
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "husky": {
    "pre-commit": "pnpm test"
  }
}
```

当执行`git commit -m 'xxx'`的时候，会执行相对应的我们预设的命令

***

但是`v6.0.0`之后，引入了破坏性的更改，必须通过如下的方式运行

**安装**

```shell
pnpm add husky
npx husky install
```

**添加钩子**

```shell
npx husky add .husky/pre-commit "npm test"
```

## 建议

建议使用之前的版本，例如你可以这样安装

```shell
pnpm add husky@^4.3.8
```