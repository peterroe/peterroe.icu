---
title: unplugin-vue-components
date: 2022-03-14
type: vite
---

> 自动导入vue组件，在src/components注册的组件，在src/xxx.vue中可以直接使用

github: <https://github.com/antfu/unplugin-vue-components>

安装：

```bash
pnpm add -D unplugin-vue-components
```

配置：

```ts
//vite.config.ts
Components({
  // allow auto load markdown components under `./src/components/`
  extensions: ['vue', 'md'],

  // allow auto import and register components used in markdown
  include: [/\.vue$/, /\.vue\?vue/, /\.md$/],

  // custom resolvers
  resolvers: [
    // auto import icons
    // https://github.com/antfu/unplugin-icons
    IconsResolver({
      prefix: false,
      // enabledCollections: ['carbon']
    }),
  ],

  dts: 'src/components.d.ts',
}),
```