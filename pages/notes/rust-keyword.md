---
title: rust常用关键字
date: 2022-02-26
type: rust
---

[[toc]]

## println!

输出语句

```rust
let x = 3;
println!("x: {}", x);
```

## assert_eq!

判断两个值是否相等

```rust
let a = 1;
let b = 2;
assert_eq!(a, b);
```

## dbg!

调试，表达式会**返回值的所有权**

```rust
let a = 3;
let b = 4;
let c = dbg!(3 + 4);

/*
[src\main.rs:20] 3 + 4 = 7
*/
```