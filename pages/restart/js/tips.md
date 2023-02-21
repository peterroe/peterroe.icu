### class 

```ts
// module A
const name = 'hello'
function sayHi() {

}
function eat() {

}

// ↓ ↓ ↓ ↓ ↓ ↓ better

export class abstract Animal {
  public name
  public constructor(name) {
    this.name = name
  }
  public abstract sayHi()
}
class Cat extends Animal {
  public eat() {
    console.log(`${this.name} is eating`)
  }
}
```

### pkg

有第三方包就尽量用第三方包，尽可能的高层次抽象

### 分支

关心结果而不是过程

```js
if(scale < min) {
  scale = min
} else if (scale > min) {
  scale = max
} else {
  min
}

// ↓ ↓ ↓ ↓ ↓ ↓ better

scale = clamp(scale, min, max)
```