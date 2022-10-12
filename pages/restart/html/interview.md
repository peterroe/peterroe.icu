## async and defer in script

正常情况下，遇到 script 标签，会先停止 HTML 解析，然后夹在 script 资源，执行 JS 脚本

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0a8a139519f46dfa2d1992c58eb5397~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

如果遇到 async script，并不会停止 HTML 解析，而是同步加载 script 资源，知道加载完成了，在去执行 JS 脚本

而 defer script 类似，也不会停止 HTML 的解析，但是执行时机是在**所有元素解析完成之后，DOMContentLoaded事件触发之前**执行
