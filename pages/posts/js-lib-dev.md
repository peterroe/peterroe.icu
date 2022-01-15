---
title: 如何搭建一个Js库的开发环境
date: 2022-01-14
duration: 8min
---

[[toc]]

## 引言

随着前端的蓬勃发展，各种轮子，JS库层出不穷，现 [NPM](https://www.npmjs.com/) 已经有数以百万计的npm包提供开发者使用，那么你是否也想发布自己的npm包，提供自己或者是他人使用呢?

本章的内容将会带你如何搭建一个JS库的开发环境以及如何**配合vite**进行基于Vue环境的调试

## 搭建简易环境

最好先去[NPM](https://www.npmjs.com/)官网注册一个账号，注册完成后，开始搭建我们的开发环境

初始化`package.json`：

```shell
$ npm init
```
新建liv文件夹，在lib下新建index.js文件：
```shell
├─ lib
│  └─ index.js
└─ package.json
```

接下来我们还需要引入打包的工具，选用`vite`开发起来会轻松很多
```shell
//建议先全局安装vite
$ npm install -g vite
//安装完成后，测试是否成功安装
$ vite -v
vite/2.7.10
```
新建vite.config.js，在里面输入一下内容

```js
import { defineConfig } from 'vite'
export default defineConfig({
    build: {
        lib: {
            entry: './lib/index.js',  //库的入口
            formats: ['es', 'umd'],
            name: 'firstadd' //这里是你的包的名字，假设是firstadd
        }
    }
})
```

```shell
├─ src
│  └─ index.js
├─ package.json
└─ vite.config.js
```

修改`package.json`字段，里面的`firstadd`改成和你想取的包名：
```json
{
    "name": "firstadd",  
    "version": "1.0.0",
    "description": "",
    "main": "./dist/firstadd.umd.js",
    "module": "./dist/firstadd.es.js",
    "exports": {
        ".": {
            "import": "./dist/firstadd.es.js",
            "require": "./dist/firstadd.umd.js"
        }
    },
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
        "vite": "^2.7.10"
    }
}
```
环境搭建完成了

## 发布第一个包

修改`index.js`，在这里你导出的东西就是npm包的导入，例如写一个经典的加法包

```js
function add(a, b) {
    return a + b
}
export default add //默认导出
```
打包，因为已经全局安装了vite，所以直接在根目录下执行：
```js
$ vite build
```
将会生成`dist`文件夹，现在的目录结构：
```shell
├─ dist
│  ├─ firstadd.umd.js
│  └─ first.em.js
├─ src
│  └─ index.js
├─ package.json
└─ vite.config.js
```
打包完成下一步就是发布了，我们可以直接利用npm发布

```shell
npm login //确保自己登录了
npm publish //发布当前的包
```
如果包名有冲突，会发布失败，可以换一个包名。如下就代表发布成功了：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ec3817e4f6e4516a19941d968ae0510~tplv-k3u1fbpfcp-watermark.image?)

接下来就可以使用了，因为打包了esm和umd两种格式，所以我们可以通过两种方式使用

ESM:

```shell
$ npm install firstadd
```

```js
import add from firstadd

console.log(add(3, 5))
```

UMD:
```html
<body>
    <!-- 利用免费cdn服务 -->
    <script src="https://unpkg.com/firstadd"></script>
    <!-- 或者 -->
    <!-- <script src="https://cdn.jsdelivr.net/npm/firstadd"></script> -->
    <script>
        console.log(add(3, 5))
    </script>
</body>
```

## 更好的开发环境

如上的开发已经可以很好的测试`js`代码，但是如果这个库和框架强关联，那么我还需要搭建框架的测试环境，下面以`Vue`举例子:

## 修改打包配置

安装下面的开发插件，并修改`vite.config.js`的配置：
```shell
npm instal @vitejs/plugin-vue rollup-plugin-terson vite vue@next
```

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { terser } from 'rollup-plugin-terser'
export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: './lib/index.js',
            formats: ['es', 'umd'],
            name: 'firstadd'
        },
        rollupOptions: {
            plugins: [
                terser()  //压缩代码的插件
            ]
        }
    }
})
```

## 新增开发目录

新增`demo`文件夹，在下面添加`App.vue`和`main.js`两个文件


App.vue:
```vue
<template>
    <div>
        {{Add(1, 3)}}
    </div>
</template>

<script setup>
import Add from '../lib/index.js'
</script>
```
main.js:
```js
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

## 添加vite打包入口

`vite`入口是从`html`文件开始的，我们在根目录下之际新增一个`index.html`文件

index.html:
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
</head>

<body>
    <div id="app">

    </div>
    <script type="module" src="/demo/main.js"></script>
</body>

</html>
```

## 添加script脚本

package.json:
```diff
{
    "name": "firstadd",
    "version": "1.0.0",
    "description": "",
    "main": "./dist/firstadd.umd.js",
    "module": "./dist/firstadd.es.js",
    "exports": {
        ".": {
            "import": "./dist/firstadd.es.js",
            "require": "./dist/firstadd.umd.js"
        }
    },
    "scripts": {
+        "dev": "vite",
+        "build": "vite build",
+        "serve": "vite preview"
    },
    "author": "",
    "license": "MIT",
    "devDependencies": {
        "@vitejs/plugin-vue": "^2.0.1",
        "rollup-plugin-terser": "^7.0.2",
        "vite": "^2.7.3",
        "vue": "^3.2.26"
    }
}
```
现在的结构：

```shell
├─ demo
│  ├─ App.vue
│  ├─ main.js
├─ dist
├─ src
│  └─ index.js
├─ index.html
├─ package.json
└─ vite.config.js
```

## 启动

```shell
npm run dev
```
访问 `http://localhost:3000`，就可以编写`Vue`的内容来测试库的效果,打包发布也是一样的

```shell
npm run build
```

## 最后

利用`vite`打包开发速率将会得到极大的提升，想要测试其他环境也是类似的。配置`vite`的**插件**既可，然后启动`vite`的开发环境