---
title: unplugin-auto-import
date: 2022-03-14
type: vite
---

>自动导入api

github: <https://github.com/antfu/unplugin-auto-import>

安装：

```bash
pnpm add -D unplugin-auto-import
```

配置：

```ts
//vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'

AutoImport({
  imports: [
    'vue',
    'vue-router',
    'vue-i18n',
    '@vueuse/head',
    '@vueuse/core',
    'vitest',
  ],
  dts: 'src/auto-imports.d.ts',
}),
```

使用:

```html
<script setup lang="ts">
const appleCont = ref(0)
const router = useRouter()
</script>

```