---
title: 实现mini-vue3
date: 2022-01-15
---

## Dep

每一个监听的值都通过`Dep`来管理，其中储存了该值的依赖

```js
let activeEffect //设置全局effect空间

class dep {
  constructor() {
    this.subscribers = new Set()
  }
  depend() {
    if(activeEffect) {
      this.subscribers.add(activeEffect)
    }
  }
  notify() {
    this.subscribers.forEach(effect => {
      effect()
    })
  }
}
```

当监听某个属性的变化时候，将会收集依赖

```js
function watchEffect(effect) {
  activeEffect = effect
  effect()
  activeEffect = null
}

watchEffect(() => {
  console.log(state.count)
})
```

## mount

挂载`vDom`到容器里面

```js
function h(tag, props, children) {
  return { tag, props, children }
}

function mount(vNode, container) {
  const el = vNode.el = document.createElement(vNode.tag)
  //props
  if(vNode.props) {
    for(const key in vNode.props) {
      const value = vNode.props[key]
      el.setAttribute(key, value)
    }
  }
  //children
  if(vNode.children) {
    if(typeof vNode.children === 'string') {
      el.textContent = vNode.children
    } else {
      for(const child of vNode.children) {
        mount(child, el)
      }
    }
  }
}

const vDom = h('div', { class: 'red' }, [ //现在我们假设children如果是数组，那么都是vDom，否则是字符串
  h('span', null, 'hello')
])

mount(vDom, document.getElementById('app'))
```

## patch

patch需要比较两个虚拟dom的不同，然后更新它

```js
function patch(n1, n2) {
  if(typeof n1.tag === n2.tag) {
    //props
    const oldProps = n1.props || {}
    const newProps = n2.props || {}
    for(const key in newProps) {
      const oldValue = newProps[key]
      const newValue = newProps[key]
      if(oldValue !== newValue) {
        el.setAttribute(key, newValue)
      }
    }
    for(const key in oldProps) {
      if(!(key in newProps)) {
        el.removeAttribute(key)
      }
    }

    //children
    const oldChildren = n1.children
    const newChildren = n2.children
    if(typeof newChildren === 'string') {
      if(typeof oldChilren === 'string') {
        if(newChildren !== oldChildren) {
          el.textContent = newChildren
        }
      } else {
        el.textContent = newChildren
      }
    } else {
      if(oldChilren === 'string') {
        el.textContent = ''
        newChildren.forEach(child => {
          mount(child, el)
        })
      } else {
        const commonLength = Math.min(oldChildren.length, newChildren.length)
        for(let i = 0; i < commonLength; i++) {
          patch(oldChildren[i], newChildren[i])
        }
        if(oldChildren.length > newChildren.length) {
          oldChildren.slice(newChildren.length).forEach(child => {
            mount(child, el)
          })
        } else {
          newChildren.slice(oldChildren.length).forEach(child => {
            el.removeChild(child.el)
          })
        }
      }
    }
  } else {
    //replace
  }
}
```

## reactivity

通过Javascript的`Proxy`实现响应式效果

```js
const proxyHandlers = {
  get(target, key, reciver) {
    const dep = getDep(target, key)
    dep.depend()
    return Reflect.get(target, key, reciver)
  },
  set(target, key, value, reciver) {
    const dep = getDep(target, key)
    const result = Reflect.set(target, key, value, reciver)
    dep.notify()
    return result
  }
}

new Proxy(target, proxyHandlers)
```

其中，`getDep`用来从全局获取依赖

```js
let targetMap = new WeakMap()

function getDep(target, key) {
  let depsMap = targetMap.get(target)
  if(!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key)
  if(!dep) {
    dep = new Dep()
    depsMap.set(key, dep)
  }
  return dep
}
```

## mini-vue

接下来编写`mountApp`

```js
const App = {
  data: reactive({
    count: 0
  }),
  render() {
    return h('div', {
      class: 'red'
    }),[
      h('span', null, String(App.data.count))
    ]
  }
}

mountApp(App, document.querySelector('#app'))

function mountApp(component, container) {
  let isMounted = false
  let prevDom = null
  watchEffect(() => {
    if(!isMounted) { //without mount
      prevDom = component.render()
      mount(prevDom, container)
      isMounted = true
    } else {
      const newvDom = component.render()
      patch(prevDom, newvDom)
      prevDom = newvDom
    }
  })
}
```

Demo:

```html
<div id="app"></div>

<script>
    let activeEffect

    const targetMap = new WeakMap()

    class Dep {
        constructor(value) {
            this.subscribes = new Set()
        }
        notify() {
            this.subscribes.forEach(effect => {
                effect()
            })
        }
        depend() {
            if (activeEffect) {
                this.subscribes.add(activeEffect)
            }
        }
    }

    function watchEffect(effect) {
        activeEffect = effect
        effect()
        activeEffect = null
    }

    function getDep(target, key) {
        let depsMap = targetMap.get(target)
        if (!depsMap) {
            depsMap = new Map()
            targetMap.set(target, depsMap)
        }
        let dep = depsMap.get(key)
        if (!dep) {
            dep = new Dep()
            depsMap.set(key, dep)
        }
        return dep
    }

    const reactiveHandlers = {
        get(target, key, reciver) {
            const dep = getDep(target, key)
            dep.depend() //收集访问的依赖
            return Reflect.get(target, key, reciver)
        },
        set(target, key, value, reciver) {
            const dep = getDep(target, key)
            const result = Reflect.set(target, key, value, reciver)
            dep.notify()
            return result
        }
    }

    function reactive(raw) {
        return new Proxy(raw, reactiveHandlers)
    }

    function h(tag, props, children) {
        return {
            tag,
            props,
            children
        }
    }

    function mount(vNode, container) {
        const el = vNode.el = document.createElement(vNode.tag)

        //props
        if (vNode.props) {
            for (const key in vNode.props) {
                const value = vNode.props[key]
                if (key.startsWith('on')) {
                    for (const eventName in value) {
                        el.addEventListener(eventName, value[eventName])
                    }
                }
                el.setAttribute(key, value)
            }
        }
        //children
        if (vNode.children) {
            if (typeof vNode.children === 'string') {
                el.textContent = vNode.children
            } else {
                for (const child of vNode.children) {
                    mount(child, el)
                }
            }

        }
        container.appendChild(el)
    }

    function patch(n1, n2) {
        if (n1.tag === n2.tag) {
            //props
            const el = n2.el = n1.el
            const oldProps = n1.props || {}
            const newProps = n2.props || {}
            for (const key in newProps) {
                const oldValue = oldProps[key]
                const newValue = newProps[key]
                if (oldValue != newValue) {
                    el.setAttribute(key, newValue)
                }
            }
            for (const key in oldProps) {
                if (!(key in newProps)) {
                    el.removeAttribute(key)
                }
            }

            //children
            const oldChildren = n1.children
            const newChildren = n2.children
            if (typeof newChildren === 'string') {
                if (typeof oldChildren === 'string') {
                    if (newChildren !== oldChildren) {
                        el.textContent = newChildren
                    }
                } else { //vDom
                    el.textContent = newChildren
                }
            } else {
                if (typeof oldChildren === 'string') {
                    newChildren.forEach(child => {
                        mount(child, el)
                    });
                } else { //both vDom
                    const commonLength = Math.min(newChildren.length, oldChildren.length)
                    for (let i = 0; i < commonLength; i++) {
                        patch(oldChildren[i], newChildren[i])
                    }
                    if (newChildren.length > oldChildren.length) {
                        newChildren.slice(oldChildren.length).forEach(child => {
                            mount(child, el)
                        })
                    } else { //remove
                        oldChildren.slice(newChildren.length).forEach(child => {
                            el.removeChild(child.el)
                        })
                    }
                }
            }
        } else {
            //replace
        }
    }

    const App = {
        data: reactive({
            count: 1
        }),
        methods: {
            onClick() {
                App.data.count++
            }
        },
        render() {
            return h('div', {
                on: {
                    click: this.methods.onClick
                }
            }, String(App.data.count))
        }
    }

    function mountApp(component, container) {
        let isMounted = false
        let prevDom = null
        watchEffect(() => {
            if (!isMounted) {
                prevDom = component.render()
                mount(prevDom, container)
                isMounted = true
            } else {
                const newvDom = component.render()
                patch(prevDom, newvDom)
                prevDom = newvDom
            }
        })
    }

    mountApp(App, document.querySelector('#app'))
</script>
```