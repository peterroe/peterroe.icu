---
title: Demo Case
---

[[toc]]

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