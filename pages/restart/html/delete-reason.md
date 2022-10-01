---
title: 被废弃的HTML标签
subtitle: Forgotten History
---

#### 为什么废弃了 big 却保留了 small 标签？

[在 stark overflow 上有一些激烈的讨论](https://stackoverflow.com/questions/2260024/why-big-is-not-in-html-5-tag-list-while-small-is)

我的观点认为，首先， big 标签并不是一个语义标签，没有强调意义，只是单纯想让文字变大而使用，而在文字变大的途径上，我们显然有 h1-h6 标签，以及 css 的 font-size 属性，这些都是更好的选择，这样一来，big 标签就没有存在的必要了。

而 small 标签与 big 不同的是，承载了语义，例如免责声明 / 许可证声明 / 注意事项 / 对标语的详细解释等等，这些都是 small 标签的合适使用场景。

---

再说一点

像 big 这样无语义，只有样式作用的标签，废弃的决定是合理的，也是可预期的。在 CSS 出现之后时候，标签的样式就应该由 CSS 来控制，HTML 只负责语义的作用。

但是由于历史原因，上面方案的实施是一个漫长的过程，所以现在很多 HTML 标签还是保留着样式，为的是尽可能不破坏老网站的页面显示。

当然，抛去历史包袱，其实我们现在已经能在很多地方看见这种思想的推广，像一些 CSS 元框架，例如 UnoCSS，默认会把大部分的标签样式都清除掉，所以得手动为标签添加样式：

```html
<input placeholder="input here"/> <br />
<button>按钮</button>
```

上面的代码在 UnoCSS 中会显示为：

<input placeholder="input here"/> <br />
<button>按钮</button>
