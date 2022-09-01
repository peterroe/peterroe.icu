---
title: 优雅操作URL
date: 2022-08-27
duration: 5min
---

[[toc]]

### URL的组成

日常开发中，我们会遇到了各式各样的`URL`，例如：

```sh
https://peterroe.icu
http://23.4343.23.54:8080
https://peterroe.icu/posts/oprate-url#url的组成
http://localhost:8080?name=peterroe
```

上面的`URL`各有各的表现形式，看起来非常乱，因为URL是可以省略某部分的。我们可以使用一个完整的结构来描述他们：

```js
'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash'

protocol: `https:`
username: `user`
password: `pass`
hostname: `sub.example.com`
port: `8080`
host: `sub.example.com:8080`
origin: `https://sub.example.com:8080`
pathname: `/p/a/t/h`
search: `?query=string`
hash: `#hash`
href: `https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash`
```

你所有能看到的`URL`无非都包含在了这个结构之中，现在你可以用上面的词来描述`URL`中的特定结构了

例如`port`是`8080`，`pathname`是`/p/a/t/h`  ，`search`是`?query=string`等等。


### 标准API

浏览器和`NodeJs`中都提供了一个全局构造函数`URL`，你可以通过创建一个实例来得到上面的结果：

```js
const url = new URL('https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash')

console.log(url)
```

`NodeJs`下打印的结果：

```sh
URL {
  href: 'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash',
  origin: 'https://sub.example.com:8080',
  protocol: 'https:',
  username: 'user',
  password: 'pass',
  host: 'sub.example.com:8080',
  hostname: 'sub.example.com',
  port: '8080',
  pathname: '/p/a/t/h',
  search: '?query=string',
  searchParams: URLSearchParams { 'query' => 'string' },
  hash: '#hash'
}
```

我们可以通过访问实例的属性来得到对应的值：

```js
console.log(url.protocol.slice(0, -1)) // https
console.log(url.username) // user
console.log(url.password) // pass
console.log(url.hostname) // sub.example.com
console.log(url.port) // 8080
```

你可能注意到了打印出来的`URL`实例有一个未提及的属性`searchParams`

### URLSearchParams

实际上`searchParams`属性的值是`URLSearchParams`构造函数的实例：

```js
url.searchParams instanceof URLSearchParams // true
```

我们先了解下[`URLSearchParams`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams)的用法

他是用于处理`search`参数的：

```js
let searchParams = new URLSearchParams('name=peterroe&profession=f2e')
console.log(searchParams)

//=> 返回了一个类似“Map”的对象
//=> URLSearchParams { 'name' => 'peterroe', 'profession' => 'f2e' }

// 访问迭代器方法
searchParams.keys()
searchParams.values()
searchParams.entries()

// 添加一个值
searchParams.append('age', 100)
searchParams.append('age', 18)
// 删除一个值
searchParams.delete('name')
// 设置一个值
searchParams.set('profession', 'softwareEngineer')
// 是否存在某个值
searchParams.has('age') //=> true
// 获得一个值
searchParams.get('age') //=> "100"
// 获得所有的值
searchParams.getAll('age') //=> [100, 18]
// 清空所有的值
searchParams.clear()

// 转换为字符串
searchParams.toString() //=> "profession=softwareEngineer&age=100&age=18"
```

上面展示了`URLSearchParams`的一些常用方法，你可以通过`URLSearchParams`来操作`search`参数，然后通过`searchParams.toString()`来得到`search`参数的字符串形式


### 实战练习

假如现在有个原始`URL`，你需要对他进行一系列的操作，使它变为我们想要的`URL`

```txt
http://peterore.icu/posts?name=peterroe  # 原始URL

https://lsh@peterore.icu/post/oprate-url?name=peter&age=100  # 目标URL
```

那么你可以这样做：

```js
let url = new URL('http://peterore.icu/posts?name=peterroe')
url.protocol = 'https:'
url.username = 'lsh'
url.pathname = '/post/oprate-url'
url.searchParams.append('age', 100)
url.searchParams.set('name', 'peter')
url.toString()

//=> 'https://lsh@peterore.icu/post/oprate-url?name=peterroe&age=peter'
```