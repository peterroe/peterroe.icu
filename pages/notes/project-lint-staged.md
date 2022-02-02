---
title: 工程化-lint-staged
date: 2022-02-02
type: project
---

[`lint-staged`](https://github.com/okonet/lint-staged)也是一款用于配合`pre-commit`格式化代码的工具

**用法**

```shell
pnpm add husky lint-staged prettier
```

配置`package.json`

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.js": [
      "prettier --write"
    ],
    "*.ts": [
      "prettier --parser=typescript --write"
    ]
  }
}
```