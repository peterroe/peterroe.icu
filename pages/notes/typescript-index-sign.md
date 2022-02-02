---
title: Typescript索引签名
date: 2022-02-01
type: typescript
---

有的时候，你可能会有如下代码

```ts
//所有成员的属性都是同一类型，例如string
interface stringType {
  name: string
  age: string
  height: string,
  width: string
}

const o : stringType = {
  name: 'peterroe',
  age: '20',
  height: '200',
  width: '100'
}
```

但是现在你可以通过索引签名统一简写

```ts
interface stringType {
  [index: string]: string
}

//甚至更加复杂的情况，要求每一项都含有num属性
interface someType {
  [index: string] : {
    num: number
  }
}
```

但是如上的`index`除了可读性外，没有任何意义，这意味着你可以将它更改为其他的字面量