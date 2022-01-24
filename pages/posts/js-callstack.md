---
title: js调用栈
date: 2022-01-24
---

执行上下文包括，变量环境，词法环境，和可执行代码

<img src="https://static001.geekbang.org/resource/image/06/13/0655d18ec347a95dfbf843969a921a13.png" />

执行js代码的过程中，会产生两种执行上下文

* 全局执行上下文
* 函数执行上下文

执行全局代码的时候，提前通过预解析生成全集执行上下文，然后将它压入调用栈当中

<img src="https://static001.geekbang.org/resource/image/a5/1d/a5d7ec1f8f296412acc045835b85431d.png" />

调用函数时候，js引擎会编译该函数，生成函数执行上下文，并压入调用栈当中

我们可以通过如下的实验看到浏览器中的调用栈

<img src="https://img-blog.csdnimg.cn/a0e78f855bef432792428838e58e9281.png" />

每个调用栈都保存着自己的变量环境

<div grid grid-cols-3>
  <img src="https://img-blog.csdnimg.cn/c3498861668b43869413dff12dd2a574.png" />
  <img src="https://img-blog.csdnimg.cn/18f52f2c0bd5423e8315f3c3b1ef926d.png" />
  <img src="https://img-blog.csdnimg.cn/594cd548a2ae4facba52e018701ebe5e.png" />
</div>

