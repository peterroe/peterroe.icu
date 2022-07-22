---
title: 由浅入深JS正则表达式
date: 2022-07-10
duration: 13min
---

[[toc]]

## 创建正则表达式

通常情况下，我们通过字面量的形式创建正则表达式，如：

```js
let reg = /^a[A-Z]c$/
```

上面的表达式将会匹配`aEc`、`aSc`、`aQc`的字符串

尝试一下：

<RegExp />

## RegExp.prototype.test

要做到，如上的交互效果，判断指定的正则是否能和目标字符串**完全匹配**，需要用到正则表达式的`test`方法，如：

```js
let reg = /^a[A-Z]c$/

reg.test('aEc') // true
reg.test('abc') // false
```

上面的用法足以覆盖大多数场景的，例如经常可以看到的：

```js
// 匹配手机号
/^[1][3,4,5,7,8][0-9]{9}$/.test('18779580522')

// 匹配URL
/^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i.test('https://www.peterroe.icu/posts/regexp#regexp-prototype-test')

// 匹配邮箱
/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test('peterroe@163.com')
```

## RegExp.prototype.exec

有的时候，我们需要提取匹配的字符串，而不仅仅判断是否匹配，例如现在有一个问题:

```js
// 有如下不规范字符串，需要：
hello World         //从中提取 W
my nameIsPeterroe   //从中提取 n, I, p
Pride andPrejudice  //从中提取 P, a, P
``` 

上面的问题一般的思路不太容易解决，即使可以通过遍历字符串可以得到我们的结果，但是好在我们有正则表达式能够帮我们轻松完成工作：

```js
let reg = /\s\w|[A-Z]/g  //不要忽视g
let str = 'my nameIsPeterroe'

reg.exec(str)
//=> [' n', index: 2, input: 'my nameIsPeterroe', groups: undefined]

reg.exec(str)
//=> ['I', index: 7, input: 'my nameIsPeterroe', groups: undefined]

reg.exec(str)
//=> ['P', index: 9, input: 'my nameIsPeterroe', groups: undefined]

reg.exec(str)
//=> null
```

通过多次调用`exec`，我们就能够得到所有匹配的字符，但是很快，我们从上面又发现了几个问题：

1. `/\s\w|[A-Z]/g` `和/\s\w|[A-Z]/`有什么不同呢
2. 第一次调用返回的是`' n'`而不是`'n'`，多余的空格并不是我们想要的
3. 需要多次调用，过于复杂

---

首先，对于问题一，`g`是一个[元字符](/posts/regexp#%E5%85%83%E5%AD%97%E7%AC%A6%E8%A1%A8)，代表着全局匹配，因此可以**匹配多次**，也就允许我们多次调用，如果我们去除`g`:

```diff 
- let reg = /\s\w|[A-Z]/g
+ let reg = /\s\w|[A-Z]/
```

`exec`只执行一次后就会就会返回`null`：
```js
reg.exec(str)
//=> [' n', index: 2, input: 'my nameIsPeterroe', groups: undefined]

reg.exec(str)
//=> null
```

因为此时匹配已经结束了，如果我们想多次匹配，就使用元字符`g`

---

对于问题2，因为我们正则表达式匹配的条件之一就是`\s\w`，所以空格和字母会一起返回，如果去掉`\s`，只剩下`\w`，那么匹配的结果又不是我们想要的

于是正则表达式有一个特性，叫**捕获**，使用方式就是用`()`包裹我们想捕获的内容：

```diff
- let reg = /\s\w|[A-Z]/g
+ let reg = /\s(\w)|[A-Z]/g
```
可以选择性地捕获内容：
```js
reg.exec(str)
//=> [' n', 'n', index: 2, input: 'my nameIsPeterroe', groups: undefined]
```

看如上的结果，在数字的第二个位置，我们得到了不带空格前缀的`'n'`，如果有多个捕获，在返回的数组上往后依次排列

事实上，我们还有一个更好的方式来得到我们捕获的内容，叫做**命名捕获**，用法也很简单，添加前缀`(?<name>)`

```diff
- let reg = /\s(\w)|[A-Z]/g
+ let reg = /\s(?<letter>\w)|[A-Z]/g //这里随便命名letter
```
捕获的内容将会作为`groups`对象的属性：
```js
reg.exec(str)
//=> [' n', 'n', index: 2, input: 'my nameIsPeterroe', groups: { letter: 'n' }}]
```

---

对于第三个问题，或许也是我们最关心的一个问题，使用过于复杂，虽然这个方法提供了`index`等信息，但是它还是不够我们想要的，我们需要一个更加简单的方法，叫做`match`

## String.prototype.match


注意：`match`是一个字符串实例的方法，最简单的用法：

```js
'my nameIsPeterroe'.match(/\s(\w)|[A-Z]/g)
//=> [' n', 'I', 'P']
```

我们通过调用`match`，匹配一个**具有全局模式**的正则表达式，得到了匹配的结果的数组

注意，如果我们的正则表达式中没有`g`，那么`match`方法只会返回一个结果，而不是数组

```js
'my nameIsPeterroe'.match(/\s(\w)|[A-Z]/)
//=> [' n', 'n', index: 2, input: 'my nameIsPeterroe', groups: undefined]
```

那么你可能意识到了，如下两种调用方式返回的结果是一样的：

```js
'my nameIsPeterroe'.match(/\s(\w)|[A-Z]/)
//=> [' n', 'n', index: 2, input: 'my nameIsPeterroe', groups: undefined]

/\s(\w)|[A-Z]/.exec('my nameIsPeterroe')
//=> [' n', 'n', index: 2, input: 'my nameIsPeterroe', groups: undefined]
```

注意：上面的方法返回了不带空格前缀的`'n'`，这正是我们想捕获的结果，可是用这种方式就丢失了**全局模式**，并不是完全是我们想要的

## String.property.matchAll

除了`match`，还有一个方法叫做`matchAll`，它的用法和`match`一样，但是它返回的是一个**迭代器**

```js
'my nameIsPeterroe'.matchAll(/\s(\w)|[A-Z]/g)  //matchAll要求正则必须是全局模式
//=> RegExpStringIterator {}
```

由于返回的结果是一个迭代器，想要消费迭代器，可以通过`for...of`循环，或者通过`Array.from`方法将其转换为数组：

```js
Array.from('my nameIsPeterroe'.matchAll(/\s(\w)|[A-Z]/g))
/* => 
[
  [' n', 'n', index: 2, input: 'my nameIsPeterroe', groups: undefined],
  ['I', undefined, index: 2, input: 'my nameIsPeterroe', groups: undefined],
  ['P', undefined, index: 2, input: 'my nameIsPeterroe', groups: undefined]
]
*/
```

从结果看来，其实，`matchAll`和多次执行的`exec`的结果是**类似**，**不同之处在于消费结果的方式**

## 其他正则相关

> 由于字符串和正则密不可分的关系，因此有的时候他们能够兼容使用

### String.prototype.search

`search`用于查找字符串中是否包含指定的字符串，如果包含，则返回字符串中第一个匹配的字符串的索引，否则返回`-1`

与`String.prototype.indexOf`不同，`search`方法还可以传入一个正则表达式，返回匹配位置的下标信息，例如：

```ts
'this is a test'.search(/\s/) //=> 4
```

### String.property.split

通常情况下，我们使用`split`方法来分割字符串：

```js
'aabbcc'.split('bb') //=> ['aa', 'cc']
```

如果**分隔符**是包含捕获括号的正则表达式，则每次分隔符匹配时，捕获括号的结果（包括任何未定义的结果）将被拼接到输出数组中。

那么我们现在有了另一种选择，保留`bb`

```js
'aabbcc'.split(/(bb)/) //=> ['aa', 'bb', 'cc']
```

### String.property.replace 

这个方法用法有些复杂，我们花一点时间来深入理解下

首先看看`replace`的参数定义：

```js
// 第一个参数接受正则表达式或者字符串，第二个参数接受字符串，或者函数
str.replace(regexp|substr, newSubStr|function)
```

虽然看着复杂，我们实际使用一下：

```js
// 最常用的用法，替换匹配的字符串
'aabbcc'.replace('bb', 'dd') //=> 'aaddcc'

//去除所有数字
'h2el5loWo1r4ld'.replace(/\d/g, '') //=> 'helloWorld'
```

上面可以满足某些使用场景，但还是不够灵活，例如现在有一个问题，需要将`'helloWorld'`转换为`hello_World`

```js
'helloWorld' => 'hello-World'
```

我们可以这样做：

```js
'helloWorld'.replace(/([A-Z])/g, '_$1')
//=> 'hello_World'
```

其中，`replace`方法的第二个参数 - **替换字符串**，替换字符串可以插入下面的特殊变量名


| 变量名| 	代表的值|
| -- | -- |
| $$	| 插入一个 "$"。|
| $&	| 插入匹配的子串。|
| $`	| 插入当前匹配的子串左边的内容。|
| $'	| 插入当前匹配的子串右边的内容。|
| $n  | 假如第一个参数是 RegExp对象，并且 n 是个小于 100 的非负整数，那么插入第 n 个括号匹配的字符串。提示：索引是从 1 开始。如果不存在第 n 个分组，那么将会把匹配到到内容替换为字面量。比如不存在第 3 个分组，就会用“$3”替换匹配到的内容。|
| `$<Name>`	| 这里Name 是一个分组名称。如果在正则表达式中并不存在分组（或者没有匹配），这个变量将被处理为空字符串。只有在支持命名分组捕获的浏览器中才能使用。|

上面可以满足大部分使用场景，但还是不够灵活，我们还想引入`JS`的处理能力，因此，方法第二个参数，我们可以传入一个函数：

```js
'helloWorld'.replace(/([A-Z])/g, (match, p1, offset, str) => `_${p1.toLowerCase()}`)
//=> 'hello_world'

'hello world'.replace(/\s(a-z])/g, (match, p1, offset, str) => `-${p1.toUpperCase()}`)
//=> 'hello-World'
```

如果正则定义了多个捕获，假如是三个，则可以接受多个新参数 `(match, p1, p2 ,p3, offet, str) => {}`，其中`match`是匹配的子串，`p1`, `p2`,`p3`是捕获的子串，`offet`是子字符串在原字符串中的偏移量, `str`是原字符串

---

值得注意的是，字符串还有一个另一个方法`replaceAll`可以用于全局匹配

```js
'abcabc'.replaceAll('a', 'x') //=> 'xbcxbc'

// 和使用正则是一样的效果
'abcabc'.replace(/a/g, 'x') //=> 'xbcxbc'

// 如果在replaceAll使用正则，则同样会强制要求全局模式
'abcabc'.replaceAll(/a/g, 'x') //=> 'xbcxbc'
```

所以`replaceAll`搭配正则使用实际上效果和`replace`差不多

## 特殊场景

### 非捕获括号 `(?:)`

```js
// 下面使用括号的想法并不是捕获，而仅仅是想把括号里的内容当做一个整体
'foobarbarfoo'.replace(/(bar){2}/g, (match, p1, offset) => {
  console.log(match, p1, offset) //=> 'barbar' 'bar' 3  ：意外地捕获了bar
})

// 可以使用非捕获括号
'foobarbarfoo'.replace(/(?:bar){2}/g, (match, p1) => {
  console.log(match, p1) //=> barbar 3
})
```

### 先行断言 `(?=)`

例如，`/Jack(?=Sprat)/`会匹配到`'Jack'`仅当它后面跟着`'Sprat'`。`/Jack(?=Sprat|Frost)/`匹配‘Jack’仅当它后面跟着'`Sprat'`或者是`‘Frost’`。但是`‘Sprat’`和`‘Frost’`都不是匹配结果的一部分

```js
// 匹配空格的前一个字母

// 普通方法
'hello world'.match(/(\w)\s/)
//=> ['o ', 'o', index: 4, input: 'hello world', groups: undefined]


// 现在有了后行断言
'hello world'.match(/\w(?=\s)/)
//=> ['o', index: 4, input: 'hello world', groups: undefined]
```

### 后行断言 `(?<=)`

与先行断言相反

```js
// 匹配空格的后一个字母

// 普通方法
'hello world'.match(/\s(\w)/)
//=> [' w', 'w', index: 5, input: 'hello world', groups: undefined]


// 现在有了后行断言
'hello world'.match(/(?<=\s)\w/)
//=> ['w', index: 6, input: 'hello world', groups: undefined]
```

### 正向否定查找(?!)

```js
'3.14'.match(/\d+(?!\.)/)
//=> ['14', index: 2, input: '3.14', groups: undefined]
```

### 反向否定查找(?<!)

```js
'3'.match(/(?<!-)\d+/)
//=> ['3', index: 0, input: '3', groups: undefined]

'-3'.match(/(?<!-)\d+/)
// null
```

## 元字符表

| 元字符 | 描述 |
| -- | -- |
| \	 | 将下一个字符标记为一个特殊字符、或一个原义字符、或一个 向后引用、或一个八进制转义符。例如，'n' 匹配字符 "n"。'\n' 匹配一个换行符。序列 '\\' 匹配 "\" 而 "\(" 则匹配 "(" |
| ^ |	匹配输入字符串的开始位置。如果设置了 RegExp 对象的 Multiline 属性，^ 也匹配 '\n' 或 '\r' 之后的位置。|
| $ |	匹配输入字符串的结束位置。如果设置了RegExp 对象的 Multiline 属性，$ 也匹配 '\n' 或 '\r' 之前的位置。|
| * |	匹配前面的子表达式零次或多次。例如，zo* 能匹配 "z" 以及 "zoo"。* 等价于{0,}。|
| + |	匹配前面的子表达式一次或多次。例如，'zo+' 能匹配 "zo" 以及 "zoo"，但不能匹配 "z"。+ 等价于 {1,}。|
| ? |	匹配前面的子表达式零次或一次。例如，"do(es)?" 可以匹配 "do" 或 "does" 。? 等价于 {0,1}。|
| {n} |	n 是一个非负整数。匹配确定的 n 次。例如，'o{2}' 不能匹配 "Bob" 中的 'o'，但是能匹配 "food" 中的两个 o。|
| {n,} |	n 是一个非负整数。至少匹配n 次。例如，'o{2,}' 不能匹配 "Bob" 中的 'o'，但能匹配 "foooood" 中的所有 o。'o{1,}' 等价于 'o+'。'o{0,}' 则等价于 'o*'。|
| {n,m}	| m 和 n 均为非负整数，其中n <= m。最少匹配 n 次且最多匹配 m 次。例如，"o{1,3}" 将匹配 "fooooood" 中的前三个 o。'o{0,1}' 等价于 'o?'。请注意在逗号和两个数之间不能有空格。|
| ? |	当该字符紧跟在任何一个其他限制符 (*, +, ?, {n}, {n,}, {n,m}) 后面时，匹配模式是非贪婪的。非贪婪模式尽可能少的匹配所搜索的字符串，而默认的贪婪模式则尽可能多的匹配所搜索的字符串。例如，对于字符串 "oooo"，'o+?' 将匹配单个 "o"，而 'o+' 将匹配所有 'o'。|
| . |	匹配除换行符（\n、\r）之外的任何单个字符。要匹配包括 '\n' 在内的任何字符，请使用像"(.|\n)"的模式。|
| [xyz]	 | 字符集合。匹配所包含的任意一个字符。例如， '[abc]' 可以匹配 "plain" 中的 'a'。|
| [^xyz] |	 负值字符集合。匹配未包含的任意字符。例如， '[^abc]' 可以匹配 "plain" 中的'p'、'l'、'i'、'n'。|
| [a-z]	 | 字符范围。匹配指定范围内的任意字符。例如，'[a-z]' 可以匹配 'a' 到 'z' 范围内的任意小写字母字符。|
| [^a-z] |	 负值字符范围。匹配任何不在指定范围内的任意字符。例如，'[^a-z]' 可以匹配任何不在 'a' 到 'z' 范围内的任意字符。|
| \b | 匹配一个单词边界，也就是指单词和空格间的位置。例如， 'er\b' 可以匹配"never" 中的 'er'，但不能匹配 "verb" 中的 'er'。
| \B	| 匹配非单词边界。'er\B' 能匹配 "verb" 中的 'er'，但不能匹配 "never" 中的 'er'。|
| \d	| 匹配一个数字字符。等价于 [0-9]。|
| \D |	匹配一个非数字字符。等价于 [^0-9]。|
| \f	| 匹配一个换页符。等价于 \x0c 和 \cL。|
| \n	| 匹配一个换行符。等价于 \x0a 和 \cJ。|
| \r	| 匹配一个回车符。等价于 \x0d 和 \cM。|
| \s	| 匹配任何空白字符，包括空格、制表符、换页符等等。等价于 [ \f\n\r\t\v]。|
| \S	| 匹配任何非空白字符。等价于 [^ \f\n\r\t\v]。|
| \t	| 匹配一个制表符。等价于 \x09 和 \cI。|
| \v	| 匹配一个垂直制表符。等价于 \x0b 和 \cK。|
| \w	| 匹配字母、数字、下划线。等价于'[A-Za-z0-9_]'。|
| \W	| 匹配非字母、数字、下划线。等价于 '[^A-Za-z0-9_]'。|