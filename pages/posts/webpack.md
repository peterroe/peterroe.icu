---
title: 当我们聊webpack的时候，我们在聊些什么？
date: 2022-02-08
---

[[toc]]

`webpack`官网：

<iframe w-full border rounded-xl h-300px src="https://webpack.js.org"></iframe>

## webpack

`webpack`默认只能打包`js`和`json`文件，这样设计的目的是提高了**灵活度**但带来了**复杂性**。譬如当解析`js`文件时候遇到`css`文件，打包`css`文件就需要用到`css-loader`。`webpack`没有具体要求`loader`的实现，只要满足入口出口即可。

这就给了开发者灵活编写的机会，可以编写各种各样的`loader`或者`plugin`。当然，随着项目的复杂度上升，也必然会在配置上消耗大量的时间。

另一大让人诟病的点是，由于需要解析一个项目的所有的文件数目，使得`webpack`打包速度难以让人满意。在这方面，可以选择新一代的构建工具[`vite`](https://www.vitejs.net/)。

但是我们今天讨论的主题是`webpack`，让我们更进一步。

## 核心配置

`webpack`有最基础和最核心的五大功能，同时，也包含了**前端工程化**的核心思想

1. entry
2. output
3. loader
4. plugin
5. mode

`entry`是打包的入口，`output`是打包的出口，`loader`用于解析文件内容，`plugin`利用打包过程的生命周期进行文件处理，`mode`是代码工作环境

### entry

入口可以有多个，但一般我们都是用**单入口**，指定一个js文件，`webpack`便会从这个入口开始进行**打包工作**

有如下的形式：

```js
module.exports = {
  entry: 'src/index.js' //单入口
  entry: ['src/index.js', 'src/main.js'] //多入口
  entry: { //多入口
    index: 'src/index.js'
    main: 'src/index.js'
  }
}
```

第二种数组方式打包后还是只有一个`chunk`，这个chunk的内容是两个入口打包的结果的内容拼接，例如：

```js
//index.js
console.log(1)

//main.js
console.log(2)

//verdor.xx.js
console.log(1),console.log(2)
```

而第三种对象形式的打包方式就相当于独立执行两次单入口打包，最终`index.html`中会引入两个文件（如果安装了html-webpack-plugin的话）

详见：[entry](https://www.webpackjs.com/configuration/entry-context/)

### output

规定了打包的出口，可以配置打包后文件的路径、名称等

```js
module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist),
    filename: '[name].[hash:8].js'
  }
}
```

详见：[output](https://www.webpackjs.com/configuration/output/)

### loader

`loader`的意思不是一个根配置项的名称，而是代表处理文件的工具集，如下是配置`css-loader`的方法

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}
```

详见：[module.rules](https://www.webpackjs.com/configuration/module/#rule-loader)

### plugin

插件有着比`loader`更加灵活的功能，可以访问打包过程中的生命周期钩子

例如有打包完成后，把打包文件`chunk`写进复制的`html`文件中的`html-webpack-plugin`和清除现有文件的`clean-webpack-plugin`

```js
module.exports = {
  plugins:[
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new CleanWepackPlugin()
  ]
}
```

详见：[plugin](https://www.webpackjs.com/configuration/plugins/)

### mode

最后一个核心配置是`mode`，规定了代码的运行环境，有`development`和`production`两种配置，前者模式下会有更强的报错提示，适合开发使用，后者则会生成更精简的代码包

```js
module.exports = {
  mode: 'production'
}
```

## devServer

但我们通常不会把项目一次性写好而没有经过任何预览（天才除外），所以我们得边写代码，边开启浏览器运行项目，进行开发。

我们希望打包后能立即在浏览器中启动项目，如果直接双击`index.html`，使用是的`file`协议，无法正常运行项目。

那为了在开发环境使用打包工具，`webpack`提供了代理服务，执行`webpack serve`，待打包文件完成后，会开启服务到某一个端口，访问这个端口即可看到`index.html`页面。

实际上`webpack-dev-server`内部使用的是`express`框架，开启一个`NodeJs`服务进程进行文件代理

我们可以自定义打包完后时候是否直接开启浏览器，和定义开启的端口号等等

```js
module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  }
}
```
详见：[devServer](https://www.webpackjs.com/configuration/dev-server/)

## devtool

`devtool`选项和打包速度强关联，关于不同的方式，官网有[详细的介绍](https://www.webpackjs.com/configuration/devtool/)

## HMR

热模块替换是`webpack`的一大优点，极大地提高开发者的开发效率，我们先来看看如何使用`HMR`:

```js
module.exports = {
  devServer: {
    hot: true
  }
}
```