---
title: 工程化-prerry-quick
date: 2022-02-02
type: project
---

可以把`pretty-quick`看成是`prettier`的增强工具，有着更强的命令行提示，使用也很简单

```shell
pnpm install prettier pretty-quick
```

**用法**

```json
npx pretty-quick --staged
```

## 配合husky

```json
{
  "husky": {
    "hooks": {
      "pre-commit" : "pretty-quick --staged"
    }
  }
}
```