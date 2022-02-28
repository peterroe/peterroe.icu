---
title: rust数据类型
date: 2022-02-26
type: rust
---

[[toc]]

## 标量类型（Scalar）

* 整型
* 浮点型
* 布尔型
* 字符型

### 整型

默认：`i32`

| 长度 | 有符号类型 | 无符号类型 |
| - | - | - |
| 8位  | i8        | u8     |
| 16位 | i16       | u16    |
| 32位 | i32       | u32    |
| 64位 | i64       | u64    |
| 128位| i128      | u128   |
| arch | isize     | usize  |

整型字面量：

| 数字字面量 | 实例 |
| - | - |
| 十进制 | 23_34|
| 十六进制 | 0xaf |
| 八进制 | 0o76 |
| 二进制 | 0b1011 |
| 字节（u8）| b'A' |

### 浮点数

`f32`和`f64`，默认为`f64`

### 布尔类型

`bool`

```rust
let isBoy: bool = false;
```

### 字符类型

`char`

```rust
let key: char = 'G';
```

## 复合类型

`rust`有两种基本复合类型：**元组**和**数组**

### 元组

```rust
let tuple: (i32, f64, bool) = (3, 3.14, false);

//支持解构
let (x, y, z) = tuple;

//支持访问下标
println!("first is {}", tuple.0); //=> 3
```

### 数组类型

相较于元组，数组独特之处在于数组内的元素只能是相同类型

```rust
let array = [1, 2, 3, 4, 5];

//声明类型
let array: [i32; 5] = [1, 2, 3, 4, 5];

//声明相同初始值元素的数组
let array = [3.14; 2];  //=> [3.14, 3.14]

//支持访问下标
println!("first element is {}", array[0]);
```

## 切片Slice类型

`slice`类型没有所有权，允许引用集合中一段连续的元素序列

```rust
let s = String::from("hello, world");
let hello = &s[..5];

let a = [1, 2, 3, 4];
let b = &a[1..3];
```

### 字符串字面量就是slice类型

```rust
let s: &str = "hello, world";
```

兼容，使同时接受`String`类型和`&str`类型：

```rust
fn main() {
    let x = "hello";
    let y = String::from("world");
    hello(x);
    hello(&y);
    hello(&y[2..5];
    hello(&y[..];
}

fn hello(x: &str) {

}
```

## 结构体

创建结构体

```rust
struct User {
    name: String,
    age: i32,
    height: f64,
    sex: bool
}
```

### 基本使用

```rust
//实例化
let lsh = User {
    name: String::from("lsh"),
    age: 21,
    height: 166.6,
    sex: true
};

//支持混入
let peter = User {
    name: String::from("peterroe"),
    ..lsh
};
```

### 元组结构体

结构体可以定义成元组类型

```rust
struct Message(i32, i32, i32);
struct StringMessage(String);
```

## 接口

```rust
struct Rectangle {
    width: u32,
    height: u32
}

impl Rectangle {
    fn area(&self) -> u32 {  //&self === self: &Self
        self.width * self.height
    }
}

fn main() {
    let c = Rectangle {
        width: 2,
        height: 5
    };
    dbg!(c.area());
}
```

### 关联函数

像`String::from`一样，通常用于实例化

```rust
struct Rectangle {
    width: u32,
    height: u32
}

impl Rectangle {
    fn create(width: u32, height: u32) -> Rectangle {
        Rectangle {
            width,
            height
        }
    }
}

fn main() {
    let c = Rectangle::create(3, 4);
    dbg!(c.area());
}
```

## 枚举

```rust
#[derive(Debug)]
enum Ip {
    V4,
    V6
}

fn main() {
    let four: Ip = Ip::V4;
    let six: Ip = Ip::V6;
    print!("{:?}", four);
}
```

### 关联数据

枚举可以关联一个数据

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}
```

* `Quit`没有包含数据
* `Move`包含了一个匿名结构体
* `Write`包含了一个`String`
* `ChangeColor`包含了三个`i32`

### 关联函数

```rust
impl Message {
    fn hello(&self) {
        println!("hello")
    }
}

let a = Message::ChangeColor(2, 3, 4);
a.hello();  //通过实例调用
```

### Option

`Option`定义于标准库中:

```rust
enum Option<T> {
  some(T),
  None,
}

//可以直接使用Some/None
let some_number = Some(5);
let abset_number: Option<i32> = None; //使用None需要声明T的类型
```