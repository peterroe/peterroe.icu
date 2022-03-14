---
title: vite-plugin-md
date: 2022-03-14
type: vite
---

> use Markdown as Vue component
> use vue component in Markdown

github: <https://github.com/antfu/vite-plugin-md>

## 安装

```bash
pnpm add -D vite-plugin-md
```

## 配置

```ts
//vite.config.ts
Components({
  // allow auto load markdown components under `./src/components/`
  extensions: ['vue', 'md'],
})
MarkDown()
```