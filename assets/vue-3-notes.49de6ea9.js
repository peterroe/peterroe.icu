import{_ as o}from"./Post.c7757a6b.js";import{j as c,k as l,g as r,o as p,a as e,i as n}from"./vendor.2adeb70a.js";import"./app.0a4f0146.js";const u=e("div",{class:"prose m-auto"},[e("blockquote",null,[e("p",null,[n("Note: This is my personal notes/tips for migrating to Vue 3 and will be updated overtime. Please refer to "),e("a",{href:"https://v3.vuejs.org",target:"_blank",rel:"noopener"},"the official docs"),n(" for the complete changelog.")])]),e("p",null,"Sorted by the importance of my personal sense."),e("h3",{id:"\u{1F4AB}-use-markraw-for-vendor-objects",tabindex:"-1"},[n("\u{1F4AB} use "),e("code",null,"markRaw"),n(" for vendor objects "),e("a",{class:"header-anchor",href:"#\u{1F4AB}-use-markraw-for-vendor-objects","aria-hidden":"true"},"#")]),e("p",null,[n("The new reactivity system proxied the object passed to the Vue context. For vendor objects or class instances, you need to wrap it with "),e("code",null,"markRaw"),n(" in order to disable the reactivity injection.")]),e("pre",{class:"language-ts"},[e("code",{class:"language-ts"},[e("span",{class:"token comment"},"// works in Vue 2"),n(`
`),e("span",{class:"token keyword"},"this"),e("span",{class:"token punctuation"},"."),n("codemirror "),e("span",{class:"token operator"},"="),n(" CodeMirror"),e("span",{class:"token punctuation"},"."),e("span",{class:"token function"},"fromTextArea"),e("span",{class:"token punctuation"},"("),n("el"),e("span",{class:"token punctuation"},")"),n(`

`),e("span",{class:"token comment"},"// in Vue 3 you need to use markRaw()"),n(`
`),e("span",{class:"token comment"},"// otherwise the CodeMirror won't work as expected"),n(`
`),e("span",{class:"token keyword"},"this"),e("span",{class:"token punctuation"},"."),n("codemirror "),e("span",{class:"token operator"},"="),n(),e("span",{class:"token function"},"markRaw"),e("span",{class:"token punctuation"},"("),n("CodeMirror"),e("span",{class:"token punctuation"},"."),e("span",{class:"token function"},"fromTextArea"),e("span",{class:"token punctuation"},"("),n("el"),e("span",{class:"token punctuation"},")"),e("span",{class:"token punctuation"},")"),n(`
`)])]),e("p",null,"I think this is a pretty tricky one. You won\u2019t see any warn or error on initialization, but the internal state of the vendor object might be messed up. You might face errors that comes from the libraries while couldn\u2019t find out why (the example above took me one hour of debugging to find out)."),e("h3",{id:"\u{1F4AB}-sync-\u2192-v-model",tabindex:"-1"},[n("\u{1F4AB} "),e("code",null,".sync"),n(" \u2192 "),e("code",null,"v-model:"),n(),e("a",{class:"header-anchor",href:"#\u{1F4AB}-sync-\u2192-v-model","aria-hidden":"true"},"#")]),e("p",null,[e("code",null,".sync"),n(" modifier is unified by "),e("code",null,"v-model:")]),e("pre",{class:"language-html"},[e("code",{class:"language-html"},[e("span",{class:"token comment"},"<!-- Vue 2 -->"),n(`
`),e("span",{class:"token tag"},[e("span",{class:"token tag"},[e("span",{class:"token punctuation"},"<"),n("Component")]),n(),e("span",{class:"token attr-name"},"name.sync"),e("span",{class:"token attr-value"},[e("span",{class:"token punctuation attr-equals"},"="),e("span",{class:"token punctuation"},'"'),n("name"),e("span",{class:"token punctuation"},'"')]),e("span",{class:"token punctuation"},"/>")]),n(`

`),e("span",{class:"token comment"},"<!-- Vue 3 -->"),n(`
`),e("span",{class:"token tag"},[e("span",{class:"token tag"},[e("span",{class:"token punctuation"},"<"),n("Component")]),n(),e("span",{class:"token attr-name"},[e("span",{class:"token namespace"},"v-model:"),n("name")]),e("span",{class:"token attr-value"},[e("span",{class:"token punctuation attr-equals"},"="),e("span",{class:"token punctuation"},'"'),n("name"),e("span",{class:"token punctuation"},'"')]),e("span",{class:"token punctuation"},"/>")]),n(`
`)])]),e("p",null,[e("code",null,"v-model"),n(" on native element would be "),e("code",null,"value/input"),n(" while on custom components, it changed to "),e("code",null,"modelValue"),n(" and "),e("code",null,"update:modelValue")]),e("h3",{id:"\u{1F4AB}-shims-vue-d-ts",tabindex:"-1"},[n("\u{1F4AB} "),e("code",null,"shims-vue.d.ts"),n(),e("a",{class:"header-anchor",href:"#\u{1F4AB}-shims-vue-d-ts","aria-hidden":"true"},"#")]),e("blockquote",null,[e("p",null,[n("Update: now you can use "),e("a",{href:"https://github.com/znck/vue-developer-experience/tree/master/packages/typescript-plugin-vue",target:"_blank",rel:"noopener"},[e("code",null,"@vuedx/typescript-plugin-vue")]),n(" for better type inference with SFC (no need for "),e("code",null,"shims-vue.d.ts"),n(" then)")])]),e("p",null,"Changed to this:"),e("pre",{class:"language-ts"},[e("code",{class:"language-ts"},[e("span",{class:"token keyword"},"declare"),n(),e("span",{class:"token keyword"},"module"),n(),e("span",{class:"token string"},"'*.vue'"),n(),e("span",{class:"token punctuation"},"{"),n(`
  `),e("span",{class:"token keyword"},"import"),n(),e("span",{class:"token punctuation"},"{"),n(" defineComponent "),e("span",{class:"token punctuation"},"}"),n(),e("span",{class:"token keyword"},"from"),n(),e("span",{class:"token string"},"'vue'"),e("span",{class:"token punctuation"},";"),n(`
  `),e("span",{class:"token keyword"},"const"),n(" Component"),e("span",{class:"token operator"},":"),n(" ReturnType"),e("span",{class:"token operator"},"<"),e("span",{class:"token keyword"},"typeof"),n(" defineComponent"),e("span",{class:"token operator"},">"),e("span",{class:"token punctuation"},";"),n(`
  `),e("span",{class:"token keyword"},"export"),n(),e("span",{class:"token keyword"},"default"),n(" Component"),e("span",{class:"token punctuation"},";"),n(`
`),e("span",{class:"token punctuation"},"}"),n(`
`)])])],-1),y={setup(i,{expose:a}){const t={title:"Vue 3 Migration Notes",date:"2020-07-01T00:00:00.000Z",lang:"en",meta:[{property:"og:title",content:"Vue 3 Migration Notes"}]};return a({frontmatter:t}),c({title:"Vue 3 Migration Notes",meta:[{property:"og:title",content:"Vue 3 Migration Notes"}]}),(k,m)=>{const s=o;return p(),l(s,{frontmatter:t},{default:r(()=>[u]),_:1})}}};export{y as default};
