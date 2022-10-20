---
title: Unocss-play
---

[[toc]]

<GitHubLink  repo="unocss/unocss/tree/main/playground" />

## 前置包

**SplitPanes**

窗格拆分的组件，支持 resize ，docs：https://antoniandre.github.io/splitpanes/

**magic-string**

更加方便地操作字符串：https://github.com/Rich-Harris/magic-string

**codemirror@5**

编辑器的核心实现：https://github.com/codemirror/codemirror5

## 主要部分

分为左边的 Preview 和右边的 Editor

```html
<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'
// @ts-expect-error missing types
import { Pane, Splitpanes } from 'splitpanes'

// https://vueuse.org/core/useBreakpoints/
const bp = useBreakpoints(breakpointsTailwind)

const isMobile = bp.smaller('sm')
</script>

<template>
  <Splitpanes h-screen w-screen :horizontal="isMobile">
    <Pane>
      <Preview />
    </Pane>
    <Pane>
      <Editor />
    </Pane>
  </Splitpanes>
</template>

```

## Preview

priview 的核心是一个 iframe 元素，加载了一个 HTML 页面

```html
<iframe
  v-show="init"
  ref="iframe"
  border-0 flex-grow min-w-0 w-full h-full min-h-0
  :class="{ 'dark': isDark, 'pointer-events-none': isResizing }"
  src="/play/__play.html"
  @load="send"
/>
```

__play.html 的内容

```html
<body>
  <div id="container"></div>
  <style id="style"></style>
</body>

<script type="module">
import '@unocss/reset/tailwind.css'

const container = document.getElementById('container')
const style = document.getElementById('style')

// 监听 message 事件，从 data 中获得 HTML 和 CSS
window.addEventListener('message', ({ data }) => {
  const payload = JSON.parse(data)
  if (payload.source !== 'unocss-playground')
    return

  container.innerHTML = payload.html
  style.innerHTML = payload.css
})
</script>

```

## Editor

Editor 主体由三个编辑器组成，编辑器是自己封装组件的叫 CodeMirror

以 HTML 编辑器的为例子

```html
<CodeMirror
  flex-auto
  mode="htmlmixed"
  class="scrolls border-(l gray-400/20)"
  :matched="output?.matched || new Set()"
  :get-hint="getHint"
  :read-only="options.transform"
  :model-value="options.transform ? transformedHTML : inputHTML"
  @update:model-value="inputHTML = $event"
/>
```

可以看到，编辑器的内容更新，会触发 update 事件，导致 inputHTML 更新。

inputHTML 参数可以来自于 URL，或者默认的模板：

```js
export const inputHTML = ref(decode(params.get('html') || '') || defaultHTML)
```

当HTML编辑器内容改变，使得 inputHTML 改变，会触发一个监听函数：

```js
throttledWatch(
  [customConfigRaw, inputHTML, options],
  () => {
    const url = new URL('/play/', window.location.origin)
    // 改变 URL HTML参数
    url.searchParams.set('html', encode(inputHTML.value))
    // 改变 URL unocss配置
    url.searchParams.set('config', encode(customConfigRaw.value))

    // 改变选项
    url.searchParams.set('options', encode(JSON.stringify(options.value)))

    // 顺便储存到 localStorage中
    localStorage.setItem(STORAGE_KEY, url.search)

    // 触发路由更新更新
    window.history.replaceState('', '', `${url.pathname}${url.search}`)
  },
  { throttle: 1000, deep: true },
)
```

上面的监听函数主要是用来更新 URL 和 localStorage的，除此之外，inputHTML 的更新还会触发另一个 watch

```js
// 1.inputHTML 改变会重新执行 getTransformedHTML
const getTransformedHTML = async () => {
  const id = 'input.html'
  const input = new MagicString(inputHTML.value)
  await applyTransformers(input, id, 'pre')
  await applyTransformers(input, id)
  await applyTransformers(input, id, 'post')
  return input.toString()
}

// 2.就会重新生成 transformedHTML
export const transformedHTML = computedAsync(async () => await getTransformedHTML())

// 3. transformedHTML 的改变又会导致执行 generate 函数
watch(
  transformedHTML,
  generate,
  { immediate: true },
)

// 4. generate会执行uno.generate更新 output的内容
export async function generate() {
  output.value = await uno.generate(transformedHTML.value || '')
  init.value = true
}

// 5. 更新的核心在与 unocss 导出了一个 createGenerator 函数
export const uno = createGenerator({}, defaultConfig.value)
```

createGenerator 实例化了一个 class，它有一个 generate 方法，uno.generate 就是调用的这个方法

下面的生成过程有些复杂，可以直接关注结果

## generate

```js
function generate(
  input: string | Set<string> | string[],
  options: GenerateOptions = {},
): Promise<GenerateResult> {
  const {
    id,
    scope,
    preflights = true,
    safelist = true,
    minify = false,
  } = options

  const tokens: Readonly<Set<string>> = isString(input)
    ? await this.applyExtractors(input, id)
    : Array.isArray(input)
      ? new Set(input)
      : input

  if (safelist)
    this.config.safelist.forEach(s => tokens.add(s))

  const nl = minify ? '' : '\n'

  const layerSet = new Set<string>([LAYER_DEFAULT])
  const matched = new Set<string>()
  const sheet = new Map<string, StringifiedUtil[]>()
  let preflightsMap: Record<string, string> = {}

  const tokenPromises = Array.from(tokens).map(async (raw) => {
    if (matched.has(raw))
      return

    const payload = await this.parseToken(raw)
    if (payload == null)
      return

    matched.add(raw)

    for (const item of payload) {
      const parent = item[3] || ''
      const layer = item[4]?.layer
      if (!sheet.has(parent))
        sheet.set(parent, [])
      sheet.get(parent)!.push(item)
      if (layer)
        layerSet.add(layer)
    }
  })

  const preflightPromise = (async () => {
    if (!preflights)
      return

    const preflightContext: PreflightContext = {
      generator: this,
      theme: this.config.theme,
    }

    const preflightLayerSet = new Set<string>([])
    this.config.preflights.forEach(({ layer = LAYER_PREFLIGHTS }) => {
      layerSet.add(layer)
      preflightLayerSet.add(layer)
    })

    preflightsMap = Object.fromEntries(
      await Promise.all(Array.from(preflightLayerSet).map(
        async (layer) => {
          const preflights = await Promise.all(
            this.config.preflights
              .filter(i => (i.layer || LAYER_PREFLIGHTS) === layer)
              .map(async i => await i.getCSS(preflightContext)),
          )
          const css = preflights
            .filter(Boolean)
            .join(nl)
          return [layer, css]
        },
      )),
    )
  })()

  await Promise.all([
    ...tokenPromises,
    preflightPromise,
  ])

  const layers = this.config.sortLayers(Array
    .from(layerSet)
    .sort((a, b) => ((this.config.layers[a] ?? 0) - (this.config.layers[b] ?? 0)) || a.localeCompare(b)),
  )

  const layerCache: Record<string, string> = {}
  const getLayer = (layer: string) => {
    if (layerCache[layer])
      return layerCache[layer]

    let css = Array.from(sheet)
      .sort((a, b) => ((this.parentOrders.get(a[0]) ?? 0) - (this.parentOrders.get(b[0]) ?? 0)) || a[0]?.localeCompare(b[0] || '') || 0)
      .map(([parent, items]) => {
        const size = items.length
        const sorted: PreparedRule[] = items
          .filter(i => (i[4]?.layer || LAYER_DEFAULT) === layer)
          .sort((a, b) => a[0] - b[0] || (a[4]?.sort || 0) - (b[4]?.sort || 0) || a[1]?.localeCompare(b[1] || '') || a[2]?.localeCompare(b[2] || '') || 0)
          .map(([, selector, body,, meta,, variantNoMerge]) => {
            const scopedSelector = selector ? applyScope(selector, scope) : selector
            return [
              [[scopedSelector ?? '', meta?.sort ?? 0]],
              body,
              !!(variantNoMerge ?? meta?.noMerge),
            ]
          })
        if (!sorted.length)
          return undefined
        const rules = sorted
          .reverse()
          .map(([selectorSortPair, body, noMerge], idx) => {
            if (!noMerge && this.config.mergeSelectors) {
              // search for rules that has exact same body, and merge them
              for (let i = idx + 1; i < size; i++) {
                const current = sorted[i]
                if (current && !current[2] && ((selectorSortPair && current[0]) || (selectorSortPair == null && current[0] == null)) && current[1] === body) {
                  if (selectorSortPair && current[0])
                    current[0].push(...selectorSortPair)
                  return null
                }
              }
            }

            const selectors = selectorSortPair
              ? uniq(selectorSortPair
                .sort((a, b) => a[1] - b[1] || a[0]?.localeCompare(b[0] || '') || 0)
                .map(pair => pair[0])
                .filter(Boolean),
              )
              : []

            return selectors.length
              ? `${selectors.join(`,${nl}`)}{${body}}`
              : body
          })
          .filter(Boolean)
          .reverse()
          .join(nl)

        if (!parent)
          return rules

        const parents = parent.split(' $$ ')
        return `${parents.join('{')}{${nl}${rules}${nl}}${parents.map(_ => '').join('}')}`
      })
      .filter(Boolean)
      .join(nl)

    if (preflights) {
      css = [preflightsMap[layer], css]
        .filter(Boolean)
        .join(nl)
    }

    const layerMark = minify ? '' : `/* layer: ${layer} */${nl}`
    return layerCache[layer] = css ? layerMark + css : ''
  }

  const getLayers = (includes = layers, excludes?: string[]) => {
    return includes
      .filter(i => !excludes?.includes(i))
      .map(i => getLayer(i) || '')
      .filter(Boolean)
      .join(nl)
  }

  return {
    get css() { return getLayers() },
    layers,
    matched,
    getLayers,
    getLayer,
  }
}
```

上面返回了一个对象：

```js
return {
  get css() { return getLayers() }, // 返回生成 的 CSS 
  layers, // 例如： ['preflights', 'icons', 'default']
  matched, // Set集合，是用到的所有的 unocss 工具类
  getLayers, // 作用：生成 CSS
  getLayer,
}
```

其中生成的的 CSS 内容会被展示在 output 区域：

```html
<script>
const cssFormatted = useCSSPrettify(
  computed(() => output.value?.getLayers(undefined,
    showPreflights.value
      ? undefined
      : ['preflights'],
  )),
  isCSSPrettify,
)
</script>

<CodeMirror
  :model-value="cssFormatted"
  flex-auto
  mode="css"
  border="l gray-400/20"
  class="scrolls"
  :read-only="true"
/>
```

其次，生成的样式还需要传给 __play.html

```js
// 当 css变化，会更新 iframeData
const iframeData = reactive({
  source: 'unocss-playground',
  css: computed(() => output.value?.css || ''),
  html: transformedHTML,
  dark: isDark,
})

// 然后向 __play.html 发送数据
async function send() {
  iframe.value?.contentWindow?.postMessage(JSON.stringify(iframeData), location.origin)
}

watch([iframeData, iframe], send, { deep: true })
```

到现在为止我们大概清楚一些基本流程:

由于 HTML 的改动，会根据配置生成 CSS，然后发送给 __play.html 页面

## 配置

如果 URL 参数没有的话，就也是默认的配置

```html
<CodeMirror
  v-model="customConfigRaw"
  flex-auto
  mode="javascript"
  border="l gray-400/20"
  class="scrolls"
/>
```

配置的改变也会触发 throttledWatch 更新 URL 和 Storage，和前面一样

```js
export const customConfigRaw = ref(decode(params.get('config') || '') || defaultConfigRaw)

throttledWatch(
  [customConfigRaw, inputHTML, options],
  () => {
    const url = new URL('/play/', window.location.origin)
    url.searchParams.set('html', encode(inputHTML.value))
    url.searchParams.set('config', encode(customConfigRaw.value))
    url.searchParams.set('options', encode(JSON.stringify(options.value)))
    localStorage.setItem(STORAGE_KEY, url.search)
    window.history.replaceState('', '', `${url.pathname}${url.search}`)
  },
  { throttle: 1000, deep: true },
)
```

此外，也会执行 reGenerate 重新渲染

```js
debouncedWatch(
  customConfigRaw,
  async () => {
    customConfigError.value = undefined
    try {
      const result = await evaluateUserConfig(customConfigRaw.value)
      if (result) {
        customConfig = result
        reGenerate()
        if (initial) {
          const { transformers = [] } = uno.config
          if (transformers.length)
            transformedHTML.value = await getTransformedHTML()
          initial = false
        }
      }
    }
    catch (e) {
      console.error(e)
      customConfigError.value = e as Error
    }
  },
  { debounce: 300, immediate: true },
)
```

由于 config 里面有一些 `import xxx from 'xx'` 的句子，JS 是不好直接执行的，需要进行转换：

```js
const CDN_BASE = 'https://esm.sh/'

export async function evaluateUserConfig<U = UserConfig>(configStr: string): Promise<U | undefined> {
  const code = configStr
    .replace(/import\s*(.*?)\s*from\s*(['"])unocss\2/g, 'const $1 = await __import("unocss");')
    .replace(/import\s*(\{[\s\S]*?\})\s*from\s*(['"])([\w-@/]+)\2/g, 'const $1 = await __import("$3");')
    .replace(/import\s*(.*?)\s*from\s*(['"])([\w-@/]+)\2/g, 'const $1 = (await __import("$3")).default;')
    .replace(/export default /, 'return ')
    .replace(/\bimport\s*\(/, '__import(')

  // bypass vite interop
  // eslint-disable-next-line no-new-func
  const _import = new Function('a', 'return import(a);')
  const __import = (name: string): any => {
    if (!modulesCache.has(name)) {
      modulesCache.set(name,
        name.endsWith('.json')
          ? $fetch(CDN_BASE + name, { responseType: 'json' }).then(r => ({ default: r }))
          : _import(CDN_BASE + name),
      )
    }
    return modulesCache.get(name)
  }

  const fn = new AsyncFunction('__import', code)
  const result = await fn(__import)

  if (result)
    return result
}

```

上面的 fn 打印出来是这个样子：

```js
(async function anonymous(__import
) {
  const {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetUno,
  } = await __import("unocss");

  return defineConfig({
    rules: [
      ['custom-rule', { color: 'red' }]
    ],
    shortcuts: {
      'custom-shortcut': 'text-lg text-orange hover:text-teal'
    },
    presets: [
      presetUno(),
      presetAttributify(),
      presetIcons({
        scale: 1.2,
        cdn: 'https://esm.sh/'
      }),
    ]
  })
})
```

可以看到，是通过对 import 语法进行转换，然后通过 Function 构造成函数。还要去 CDN 网站实时拉取包的代码，例如：https://esm.sh/unocss

此外，生成的 result 结果类似如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/272d95c26fa84b1e9564cf74fb008d5a~tplv-k3u1fbpfcp-watermark.image?)

生成的 result 会作为customConfig被注入到 uno 实例中

```js
const reGenerate = () => {
  uno.setConfig(customConfig, defaultConfig.value)
  // 然后重新执行 generate
  generate()
  autocomplete = createAutocomplete(uno)
}
```

## 架构图

<!-- ![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/91e863308c3d4274bc63d7f908733cd0~tplv-k3u1fbpfcp-watermark.image) -->

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/91e863308c3d4274bc63d7f908733cd0~tplv-k3u1fbpfcp-watermark.image" v-viewer />