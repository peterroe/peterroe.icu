---
title: rust的优异特性
date: 2022-02-26
type: rust
---

[[toc]]

### 语句和表达式

语句（statement）是执行一些操作但不返回值的指令，而表达式（expression）计算并产生一些值，语句以分号结尾，而表达式则不需要

它们的不同使用可以影响函数体：

```rust
fn foo() -> i32{  // 返回整型
  3
}
fn bar() {  //不返回值
  3;
}
let x = foo(); //=> 3
let y = bar(); //=> ()
```

甚至也会影响单独的`{}`块

---

例如：假设圆的周长`l`为`10`，求面积`s`的值：

```rust
const PI: f64 = 3.14;
let l: f64  = 10.0;
let s = {
    let r = l / PI / 2_f64;
    r * r * 3.14
};
```

可以看出，将求`s`的过程都封装在了`{}`块内部，逻辑更加清晰

---

同样的道理，也可以结合`if`语句：

```rust
let flag = true;
let x = if flag { 1 } else { 0 };
```

---

或者`loop/break`:

```rust
let x = loop {
  break 3;
}
```

### 所有权与函数

默认情况下，`String`的所有权随着赋值会被转移：

```rust
fn main() {
  let s = String::from("hello");  //s进入作用域
  //s不能再使用了！
  take_ownership(s);

  let x = 5;

  makes_copy(x);
  //x可以继续使用
}

fn take_ownership(some_string: String) {
  println!("{}", some_string);
} //some_string离开作用域并调用drop方法。占用的内存被释放

fn makes_copy(some_integer: i32) {
  println!("{}", some_integer);
}
```

但是，可以通过`&`引用（reference）来使用值带不获取其所有权：

<img src="https://rustwiki.org/zh-CN/book/img/trpl04-05.svg" />

```rust
fn main() {
  not_take_ownership(&s);
}

fn not_take_ownership(some_string: &String) {
  println!("{}", some_string);
}
```

**借用（borrowing）**

我们可以通过借用的方式，创建一个引用来防止所有权转移

**数据竞争**

引用默认是不允许修改值的，所以如果我们想在**引用的同时修改值**，需要用到**可变引用**

可变引用可能造成数据竞争，即
* 多个指针同时访问同一数据
* 至少有一个指针被用来写入数据
* 没有同步数据访问的机制

在**同一时间**只能有一个**可变引用**(作用域不能重叠)

**引用的作用域**

引用的作用域从声明的地方开始一直持续到最后一次使用为止

**悬垂引用（Dangling References）**

指的是引用了一个被释放内容的地址，例如：

```rust
//error
fn main() {
  let x = dangle();
}

fn dangle() -> &String {
  let s = String::from("hello");
  &s
}
```

## match

`match`配合`enum`

```rust
enum Tick{
  one,
  two,
  other(i32)
}

fn back(t: Tick) -> i32{
  match t {
    Tick::one => 1,
    Tick::two => 2,
    Tick::other(num) => num
  }
}

print!("{}", back(Tick::other(4)));
```

### 匹配剩余参数

```rust
let dict = 3;
match dict {
  1 => hello(),
  2 => world(),
  _ => ()
}
```