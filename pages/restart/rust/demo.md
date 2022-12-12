---
title: Demo Case
---

[[toc]]

### 转换操作

```rust
let s = String::from("hello");
// String to iterator
let c = s.chars();
// iterator reverse
c.rev();
```

### String 迭代

```rust
let s = String::from("hello world");

let s_arr: Vec<char> = s.chars().collect();

s_arr.iter().enumerate().for_each(|i, it| {

});
```

### Vec Reduce

```rust
let arr = Vec![1,2,3,4];
arr.iter().fold(0, |pre, cur| pre + cur)
```

### 解析命令行参数

原始方式

```rust
use std::env::args;
fn main() {
  let args_1 = args().nth(1).expect("no first args");
  let args_2 = args().nth(2).expect("no second args");
}
```
or:
```rust
use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();
    println!("{:?}", args);
}
```

---

使用第三方库

```json
[dependencies]
structopt = "0.3.13"
```

```rust
use structopt::StructOpt;

struct Cli {
  first: String,
  second: i32,
  third: u64
}

fn main() {
  let args = Cli::from_args();
  println!("param: {}", args.first);
  println!("param: {}", args.second);
  println!("param: {}", args.third);
}

```

### 文件 IO

```rust
use std::fs;
fn main() {
  let contents = fs::read_to_string("./src/c.txt").expect("Some Wrong then read file");
  println!("file Content: {}", contents);
  fs::write("package.json", "helloworld").unwrap();

}
```