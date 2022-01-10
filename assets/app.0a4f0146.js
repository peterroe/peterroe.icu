var D=Object.defineProperty,M=Object.defineProperties;var R=Object.getOwnPropertyDescriptors;var k=Object.getOwnPropertySymbols;var x=Object.prototype.hasOwnProperty,C=Object.prototype.propertyIsEnumerable;var E=(t,e,i)=>e in t?D(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,T=(t,e)=>{for(var i in e||(e={}))x.call(e,i)&&E(t,i,e[i]);if(k)for(var i of k(e))C.call(e,i)&&E(t,i,e[i]);return t},V=(t,e)=>M(t,R(e));import{o as l,c as _,a as s,u as O,d as w,b as y,w as d,v as h,e as v,f as c,r as j,g as m,p as S,h as Z,i as B,j as N,F as Y,V as H,L as F,N as A}from"./vendor.2adeb70a.js";const W=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const p of r.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&a(p)}).observe(document,{childList:!0,subtree:!0});function i(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerpolicy&&(r.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?r.credentials="include":n.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=i(n);fetch(n.href,r)}};W();const J="modulepreload",L={},q="/",o=function(e,i){return!i||i.length===0?e():Promise.all(i.map(a=>{if(a=`${q}${a}`,a in L)return;L[a]=!0;const n=a.endsWith(".css"),r=n?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${r}`))return;const p=document.createElement("link");if(p.rel=n?"stylesheet":J,n||(p.as="script",p.crossOrigin=""),p.href=a,document.head.appendChild(p),n)return new Promise((f,g)=>{p.addEventListener("load",f),p.addEventListener("error",g)})})).then(()=>e())},G=[{name:"talks",path:"/talks",component:()=>o(()=>import("./talks.310f444c.js"),["assets/talks.310f444c.js","assets/talks.d43464c7.css","assets/Post.c7757a6b.js","assets/Post.844d8ce7.css","assets/vendor.2adeb70a.js","assets/ListPosts.a8649a2a.js","assets/ListPosts.b7c321cb.css","assets/Plum.fdfcc140.js","assets/Plum.eacda17b.css"]),props:!0,meta:{frontmatter:{title:"Talks - Anthony Fu",display:""}}},{name:"projects",path:"/projects",component:()=>o(()=>import("./projects.9bedb372.js"),["assets/projects.9bedb372.js","assets/projects.5a1a248f.css","assets/Post.c7757a6b.js","assets/Post.844d8ce7.css","assets/vendor.2adeb70a.js","assets/Slidev.2fafd7e6.js","assets/Slidev.8ccf5182.css"]),props:!0},{name:"project",path:"/project",component:()=>o(()=>import("./project.1e88c4e4.js"),["assets/project.1e88c4e4.js","assets/project.ea0ed5b9.css","assets/Post.c7757a6b.js","assets/Post.844d8ce7.css","assets/vendor.2adeb70a.js","assets/GitHubLink.e6a4fb87.js","assets/GitHubLink.81ab58dd.css","assets/logo-github.bd98de11.js"]),props:!0,meta:{frontmatter:{title:"Project",subtitle:"List of projects that I am proud of"}}},{name:"posts-windicss-and-tailwind-jit",path:"/posts/windicss-and-tailwind-jit",component:()=>o(()=>import("./windicss-and-tailwind-jit.286f0fd1.js"),["assets/windicss-and-tailwind-jit.286f0fd1.js","assets/windicss-and-tailwind-jit.da7a8c91.css","assets/Post.c7757a6b.js","assets/Post.844d8ce7.css","assets/vendor.2adeb70a.js"]),props:!0,meta:{frontmatter:{title:"Windi CSS and Tailwind JIT",description:"Wish this is the end.",date:"2021-03-18T16:00:00.000Z",lang:"en",duration:"8min"}}},{name:"posts-watch-with-reactivity",path:"/posts/watch-with-reactivity",component:()=>o(()=>import("./watch-with-reactivity.0dd7b55b.js"),["assets/watch-with-reactivity.0dd7b55b.js","assets/new-house.538f33b8.css","assets/Post.c7757a6b.js","assets/Post.844d8ce7.css","assets/vendor.2adeb70a.js"]),props:!0,meta:{frontmatter:{title:"Watch with @vue/reactivity",description:"A brief intro of how it works and a guide to implementing the (missing) `watch` on your own.",date:"2020-09-18T00:00:00.000Z",lang:"en",duration:"12min"}}},{name:"posts-vue-beijing-2021",path:"/posts/vue-beijing-2021",component:()=>o(()=>import("./vue-beijing-2021.e99927dc.js"),["assets/vue-beijing-2021.e99927dc.js","assets/vue-beijing-2021.07f6ef4c.css","assets/Post.c7757a6b.js","assets/Post.844d8ce7.css","assets/vendor.2adeb70a.js"]),props:!0,meta:{frontmatter:{title:"Develop with Vite - Vue Beijing",type:"talk",date:"2021-03-28T16:00:00.000Z",lang:"en",duration:"18min"}}},{name:"posts-vue-3-notes",path:"/posts/vue-3-notes",component:()=>o(()=>import("./vue-3-notes.49de6ea9.js"),["assets/vue-3-notes.49de6ea9.js","assets/Post.c7757a6b.js","assets/Post.844d8ce7.css","assets/vendor.2adeb70a.js"]),props:!0,meta:{frontmatter:{title:"Vue 3 Migration Notes",date:"2020-07-01T00:00:00.000Z",lang:"en"}}},{name:"posts-type-inferencing-in-vue",path:"/posts/type-inferencing-in-vue",component:()=>o(()=>import("./type-inferencing-in-vue.5ab5cd04.js"),["assets/type-inferencing-in-vue.5ab5cd04.js","assets/about-yak-shaving.c0bfc364.css","assets/Post.c7757a6b.js","assets/Post.844d8ce7.css","assets/vendor.2adeb70a.js"]),props:!0,meta:{frontmatter:{draft:!1,title:"Type Inferencing in Vue",date:"2020-06-28T00:00:00.000Z",hero_image:"",lang:"en"}}},{name:"posts-rewrite-in-vite",path:"/posts/rewrite-in-vite",component:()=>o(()=>import("./rewrite-in-vite.20504748.js"),["assets/rewrite-in-vite.20504748.js","assets/rewrite-in-vite.0678660f.css","assets/Post.c7757a6b.js","assets/Post.844d8ce7.css","assets/vendor.2adeb70a.js"]),props:!0,meta:{frontmatter:{title:"Rewrite in Vite",date:"2021-01-31T16:00:00.000Z",lang:"en",duration:"10min",description:"My site is now powered by Vite!"}}},{name:"posts-reimagine-atomic-css-zh",path:"/posts/reimagine-atomic-css-zh",component:()=>o(()=>import("./reimagine-atomic-css-zh.c6314288.js"),["assets/reimagine-atomic-css-zh.c6314288.js","assets/reimagine-atomic-css-zh.8ae8f7e8.css","assets/Post.c7757a6b.js","assets/Post.844d8ce7.css","assets/vendor.2adeb70a.js"]),props:!0,meta:{frontmatter:{title:"\u91CD\u65B0\u6784\u60F3\u539F\u5B50\u5316 CSS",date:"2021-10-26T16:00:00.000Z",lang:"zh",duration:"25min",description:"\u6253\u7834\u5E38\u89C4\uFF0C\u91CD\u65B0\u601D\u8003\u539F\u5B50\u5316 CSS \u7684\u6700\u4F18\u89E3\u3002"}}},{name:"posts-reimagine-atomic-css",path:"/posts/reimagine-atomic-css",component:()=>o(()=>import("./reimagine-atomic-css.a79fc460.js"),["assets/reimagine-atomic-css.a79fc460.js","assets/reimagine-atomic-css.377af8fd.css","assets/Post.c7757a6b.js","assets/Post.844d8ce7.css","assets/vendor.2adeb70a.js"]),props:!0,meta:{frontmatter:{title:"Reimagine Atomic CSS",date:"2021-10-26T16:00:00.000Z",lang:"en",duration:"25min",description:"Let's take a step back and reimagine what's atomic CSS could be in the best."}}},{name:"posts-reflection-of-speaking-in-public",path:"/posts/reflection-of-speaking-in-public",component:()=>o(()=>import("./reflection-of-speaking-in-public.63238fcc.js"),["assets/reflection-of-speaking-in-public.63238fcc.js","assets/Post.c7757a6b.js","assets/Post.844d8ce7.css","assets/vendor.2adeb70a.js"]),props:!0,meta:{frontmatter:{title:"Reflection of Speaking in Public",description:"My sincere apologies to everyone involved.",date:"2021-03-27T16:00:00.000Z",lang:"en",duration:"5min"}}},{name:"posts-publish-esm-and-cjs",path:"/posts/publish-esm-and-cjs",component:()=>o(()=>import("./publish-esm-and-cjs.ca8fb994.js"),["assets/publish-esm-and-cjs.ca8fb994.js","assets/publish-esm-and-cjs.43b96f0f.css","assets/Post.c7757a6b.js","assets/Post.844d8ce7.css","assets/vendor.2adeb70a.js"]),props:!0,meta:{frontmatter:{title:"Publish ESM and CJS in a single package",date:"2021-11-29T16:00:00.000Z",lang:"en",duration:"15min",description:"A short tutorial of shipping both ESM and CJS dual formats in a single NPM package."}}},{name:"posts-new-ways-to-vue-taiwan-2021",path:"/posts/new-ways-to-vue-taiwan-2021",component:()=>o(()=>import("./new-ways-to-vue-taiwan-2021.da877218.js"),["assets/new-ways-to-vue-taiwan-2021.da877218.js","assets/new-ways-to-vue-taiwan-2021.08cc4946.css","assets/Post.c7757a6b.js","assets/Post.844d8ce7.css","assets/vendor.2adeb70a.js","assets/Slidev.2fafd7e6.js","assets/Slidev.8ccf5182.css"]),props:!0,meta:{frontmatter:{title:"New Ways to Vue - { Laravel x Vue } Conf Taiwan 2021",description:"New Ways to Vue - { Laravel x Vue } Conf Taiwan 2021",date:"2021-10-17T08:00:00.000Z",lang:"zh",type:"talk",duration:"30min"}}},{name:"posts-new-ways-to-vue-london-2021",path:"/posts/new-ways-to-vue-london-2021",component:()=>o(()=>import("./new-ways-to-vue-london-2021.03c01bb8.js"),["assets/new-ways-to-vue-london-2021.03c01bb8.js","assets/new-ways-to-vue-taiwan-2021.08cc4946.css","assets/Post.c7757a6b.js","assets/Post.844d8ce7.css","assets/vendor.2adeb70a.js","assets/Slidev.2fafd7e6.js","assets/Slidev.8ccf5182.css"]),props:!0,meta:{frontmatter:{title:"New Ways to Vue - Vue London 2021",description:"New Ways to Vue - Vue London 2021",date:"2021-10-20T08:00:00.000Z",lang:"en",type:"talk",duration:"30min"}}},{name:"posts-new-house",path:"/posts/new-house",component:()=>o(()=>import("./new-house.b20209e3.js"),["assets/new-house.b20209e3.js","assets/new-house.538f33b8.css","assets/Post.c7757a6b.js","assets/Post.844d8ce7.css","assets/vendor.2adeb70a.js"]),props:!0,meta:{frontmatter:{title:"New House",date:"2020-06-12T16:00:00.000Z",draft:!1,lang:"en",duration:"2min"}}},{name:"posts-make-libraries-working-with-vue-2-and-3",path:"/posts/make-libraries-working-with-vue-2-and-3",component:()=>o(()=>import("./make-libraries-working-with-vue-2-and-3.ec928741.js"),["assets/make-libraries-working-with-vue-2-and-3.ec928741.js","assets/Post.c7757a6b.js","assets/Post.844d8ce7.css","assets/vendor.2adeb70a.js"]),props:!0,meta:{frontmatter:{draft:!1,title:"Make Libraries Working with Vue 2 and 3",description:"Try Vue Demi!",date:"2020-07-01T14:00:00.000Z",lang:"en",duration:"5min"}}},{name:"posts-journey-with-icons-continues",path:"/posts/journey-with-icons-continues",component:()=>o(()=>import("./journey-with-icons-continues.67316d8d.js"),["assets/journey-with-icons-continues.67316d8d.js","assets/journey-with-icons-continues.ac217a03.css","assets/Post.c7757a6b.js","assets/Post.844d8ce7.css","assets/vendor.2adeb70a.js","assets/GitHubLink.e6a4fb87.js","assets/GitHubLink.81ab58dd.css","assets/logo-github.bd98de11.js"]),props:!0,meta:{frontmatter:{title:"Journey with Icons Continues",description:"My journey with icons and the solutions I made along the way",date:"2021-09-10T18:00:00.000Z",lang:"en",duration:"15min"}}},{name:"posts-journey-with-icons",path:"/posts/journey-with-icons",component:()=>o(()=>import("./journey-with-icons.6c05bcd4.js"),["assets/journey-with-icons.6c05bcd4.js","assets/journey-with-icons.7a17bf06.css","assets/Post.c7757a6b.js","assets/Post.844d8ce7.css","assets/vendor.2adeb70a.js"]),props:!0,meta:{frontmatter:{title:"Journey with Icons",description:"To solve the pain I faced in using icons for the web, I built several tools to make the DX better.",date:"2020-08-16T16:00:00.000Z",lang:"en",duration:"7min"}}},{name:"posts-icons-in-pure-css-zh",path:"/posts/icons-in-pure-css-zh",component:()=>o(()=>import("./icons-in-pure-css-zh.8968f1ac.js"),["assets/icons-in-pure-css-zh.8968f1ac.js","assets/icons-in-pure-css-zh.3203ac5d.css","assets/Post.c7757a6b.js","assets/Post.844d8ce7.css","assets/vendor.2adeb70a.js"]),props:!0,meta:{frontmatter:{title:"\u804A\u804A\u7EAF CSS \u56FE\u6807",date:"2021-10-31T16:00:00.000Z",lang:"zh",duration:"10min",description:"\u7EAF CSS \u4E2D\u7684\u56FE\u6807\u89E3\u51B3\u65B9\u6848"}}},{name:"posts-icons-in-pure-css",path:"/posts/icons-in-pure-css",component:()=>o(()=>import("./icons-in-pure-css.378ced12.js"),["assets/icons-in-pure-css.378ced12.js","assets/icons-in-pure-css.4b6c767b.css","assets/Post.c7757a6b.js","assets/Post.844d8ce7.css","assets/vendor.2adeb70a.js"]),props:!0,meta:{frontmatter:{title:"Icons in Pure CSS",date:"2021-10-31T16:00:00.000Z",lang:"en",duration:"10min",description:"The icon solution in pure CSS."}}},{name:"posts-domain-email",path:"/posts/domain-email",component:()=>o(()=>import("./domain-email.db170f26.js"),["assets/domain-email.db170f26.js","assets/Post.c7757a6b.js","assets/Post.844d8ce7.css","assets/vendor.2adeb70a.js"]),props:!0,meta:{frontmatter:{title:"Domain Email",date:"2020-06-17T16:00:00.000Z",lang:"en",duration:"2min"}}},{name:"posts-destructuring-with-object-or-array",path:"/posts/destructuring-with-object-or-array",component:()=>o(()=>import("./destructuring-with-object-or-array.1997f503.js"),["assets/destructuring-with-object-or-array.1997f503.js","assets/Post.c7757a6b.js","assets/Post.844d8ce7.css","assets/vendor.2adeb70a.js"]),props:!0,meta:{frontmatter:{title:"Destructuring... with object or array?",description:"Prefer object destructure or array? Can we support both?",lang:"en",date:"2020-10-21T16:00:00.000Z",duration:"8min",image:"/images/destructuring.png"}}},{name:"posts-composable-vue-vueday-2021",path:"/posts/composable-vue-vueday-2021",component:()=>o(()=>import("./composable-vue-vueday-2021.7c630e38.js"),["assets/composable-vue-vueday-2021.7c630e38.js","assets/composable-vue-vueday-2021.1a72fd3c.css","assets/Post.c7757a6b.js","assets/Post.844d8ce7.css","assets/vendor.2adeb70a.js","assets/logo-github.bd98de11.js","assets/Slidev.2fafd7e6.js","assets/Slidev.8ccf5182.css"]),props:!0,meta:{frontmatter:{title:"Composable Vue - VueDay 2021",description:"Slides & transcript for my talk at VueDay 2021",date:"2021-04-28T16:00:00.000Z",lang:"en",type:"talk",duration:"30min"}}},{name:"posts-composable-vue-vueconf-china-2021",path:"/posts/composable-vue-vueconf-china-2021",component:()=>o(()=>import("./composable-vue-vueconf-china-2021.042a4dad.js"),["assets/composable-vue-vueconf-china-2021.042a4dad.js","assets/new-ways-to-vue-taiwan-2021.08cc4946.css","assets/Post.c7757a6b.js","assets/Post.844d8ce7.css","assets/vendor.2adeb70a.js","assets/Slidev.2fafd7e6.js","assets/Slidev.8ccf5182.css"]),props:!0,meta:{frontmatter:{title:"\u53EF\u7EC4\u5408\u7684 Vue - VueConf China 2021",description:"Slides of my talk at VueConf China 2021",date:"2021-05-22T08:00:00.000Z",lang:"zh",type:"talk",duration:"30min"}}},{name:"posts-binfe-2020-zh",path:"/posts/binfe-2020-zh",component:()=>o(()=>import("./binfe-2020-zh.b3cdc9bc.js"),["assets/binfe-2020-zh.b3cdc9bc.js","assets/Post.c7757a6b.js","assets/Post.844d8ce7.css","assets/vendor.2adeb70a.js"]),props:!0,meta:{frontmatter:{title:"import { reactive } from 'vue' - \u6EE8\u6C5F\u524D\u7AEF\u6C99\u9F99 2020",date:"2020-09-26T16:00:00.000Z",lang:"zh",type:"talk",duration:"25min"}}},{name:"posts-async-with-composition-api",path:"/posts/async-with-composition-api",component:()=>o(()=>import("./async-with-composition-api.e8f876d2.js"),["assets/async-with-composition-api.e8f876d2.js","assets/async-with-composition-api.a9fd33dd.css","assets/Post.c7757a6b.js","assets/Post.844d8ce7.css","assets/vendor.2adeb70a.js"]),props:!0,meta:{frontmatter:{title:"Async with Composition API",description:"Notes about the caveat when using async functions in Vue Composition API.",date:"2021-07-16T08:00:00.000Z",lang:"en",duration:"17min"}}},{name:"posts-about-yak-shaving-zh",path:"/posts/about-yak-shaving-zh",component:()=>o(()=>import("./about-yak-shaving-zh.ae932e0b.js"),["assets/about-yak-shaving-zh.ae932e0b.js","assets/Post.c7757a6b.js","assets/Post.844d8ce7.css","assets/vendor.2adeb70a.js"]),props:!0,meta:{frontmatter:{title:"\u5173\u4E8E Yak Shaving",date:"2021-05-19T16:00:00.000Z",lang:"zh",duration:"10min"}}},{name:"posts-about-yak-shaving",path:"/posts/about-yak-shaving",component:()=>o(()=>import("./about-yak-shaving.45378eb1.js"),["assets/about-yak-shaving.45378eb1.js","assets/about-yak-shaving.c0bfc364.css","assets/Post.c7757a6b.js","assets/Post.844d8ce7.css","assets/vendor.2adeb70a.js"]),props:!0,meta:{frontmatter:{title:"About Yak Shaving",date:"2021-05-19T16:00:00.000Z",lang:"en",duration:"10min"}}},{name:"posts",path:"/posts",component:()=>o(()=>import("./index.daed4c79.js"),["assets/index.daed4c79.js","assets/talks.d43464c7.css","assets/Post.c7757a6b.js","assets/Post.844d8ce7.css","assets/vendor.2adeb70a.js","assets/ListPosts.a8649a2a.js","assets/ListPosts.b7c321cb.css","assets/Plum.fdfcc140.js","assets/Plum.eacda17b.css"]),props:!0,meta:{frontmatter:{title:"Blog - Anthony Fu",display:""}}},{name:"notes",path:"/notes",component:()=>o(()=>import("./notes.50f63ffc.js"),["assets/notes.50f63ffc.js","assets/about-yak-shaving.c0bfc364.css","assets/Post.c7757a6b.js","assets/Post.844d8ce7.css","assets/vendor.2adeb70a.js"]),props:!0,meta:{frontmatter:{title:"Notes - Anthony Fu",display:"Notes",subtitle:"Quick notes / tips",description:"Quick notes / tips"}}},{name:"bookmarks",path:"/bookmarks",component:()=>o(()=>import("./bookmarks.0e860c91.js"),["assets/bookmarks.0e860c91.js","assets/Post.c7757a6b.js","assets/Post.844d8ce7.css","assets/vendor.2adeb70a.js"]),props:!0,meta:{frontmatter:{title:"Bookmarks - Anthony Fu",display:"Bookmarks",subtitle:"Some of my favorite websites/tools with excellent design and UX that I highly recommend"}}},{name:"index",path:"/",component:()=>o(()=>import("./index.020373cc.js"),["assets/index.020373cc.js","assets/Post.c7757a6b.js","assets/Post.844d8ce7.css","assets/vendor.2adeb70a.js","assets/Plum.fdfcc140.js","assets/Plum.eacda17b.css"]),props:!0,meta:{frontmatter:{title:"Peter Roe"}}},{name:"404",path:"/:404(.*)*",component:()=>o(()=>import("./_...404_.3e8c669b.js"),["assets/_...404_.3e8c669b.js","assets/Post.c7757a6b.js","assets/Post.844d8ce7.css","assets/vendor.2adeb70a.js"]),props:!0,meta:{frontmatter:{}}}];var I=(t,e)=>{const i=t.__vccOpts||t;for(const[a,n]of e)i[a]=n;return i};const Q={},X={class:"mt-10 mb-6 prose m-auto opacity-50 flex"},K=s("span",{class:"text-sm"},"2022 \xA9 Peter Roe",-1),U=s("div",{class:"flex-auto"},null,-1),tt=[K,U];function et(t,e){return l(),_("div",X,tt)}var ot=I(Q,[["render",et]]);const nt={style:{"vertical-align":"sub"},class:"inline",width:"1.2em",height:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24"},it=s("path",{d:"M12 18a6 6 0 1 1 0-12a6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8a4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636L5.636 7.05L3.515 4.93zM16.95 18.364l1.414-1.414l2.121 2.121l-1.414 1.414l-2.121-2.121zm2.121-14.85l1.414 1.415l-2.121 2.121l-1.414-1.414l2.121-2.121zM5.636 16.95l1.414 1.414l-2.121 2.121l-1.414-1.414l2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z",fill:"currentColor"},null,-1),at=[it];function st(t,e){return l(),_("svg",nt,at)}var rt={name:"ri-sun-line",render:st};const ct={style:{"vertical-align":"sub"},class:"inline",width:"1.2em",height:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24"},pt=s("path",{d:"M10 7a7 7 0 0 0 12 4.9v.1c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2h.1A6.979 6.979 0 0 0 10 7zm-6 5a8 8 0 0 0 15.062 3.762A9 9 0 0 1 8.238 4.938A7.999 7.999 0 0 0 4 12z",fill:"currentColor"},null,-1),lt=[pt];function _t(t,e){return l(),_("svg",ct,lt)}var mt={name:"ri-moon-line",render:_t};const u=O();function pe(t){const e=w(t);return e.year()===w().year()?e.format("MMM D"):e.format("MMM D, YYYY")}const ut=y({setup(t){function e(){u.value=!u.value}return(i,a)=>{const n=mt,r=rt;return l(),_("a",{class:"select-none",title:"Toggle Color Scheme",onClick:e},[d(c(n,null,null,512),[[h,v(u)]]),d(c(r,null,null,512),[[h,!v(u)]])])}}}),dt={style:{"vertical-align":"sub"},class:"inline",width:"1.2em",height:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24"},ht=s("path",{d:"M10.07 20.503a1 1 0 0 0-1.18-.983c-1.31.24-2.963.276-3.402-.958a5.708 5.708 0 0 0-1.837-2.415a1.2 1.2 0 0 1-.167-.11a1 1 0 0 0-.93-.645h-.005a1 1 0 0 0-1 .995c-.004.815.81 1.338 1.141 1.514a4.44 4.44 0 0 1 .924 1.36c.365 1.023 1.423 2.576 4.466 2.376l.003.098l.004.268a1 1 0 0 0 2 0l-.005-.318c-.005-.19-.012-.464-.012-1.182zM20.737 5.377c.032-.125.063-.264.09-.42a6.278 6.278 0 0 0-.408-3.293a1.002 1.002 0 0 0-.615-.58c-.356-.12-1.67-.357-4.184 1.25a13.87 13.87 0 0 0-6.354 0C6.762.75 5.455.966 5.102 1.079a.997.997 0 0 0-.631.584a6.3 6.3 0 0 0-.404 3.357c.025.127.051.246.079.354a6.27 6.27 0 0 0-1.256 3.83a8.422 8.422 0 0 0 .043.921c.334 4.603 3.334 5.984 5.424 6.459a4.591 4.591 0 0 0-.118.4a1 1 0 0 0 1.942.479a1.678 1.678 0 0 1 .468-.878a1 1 0 0 0-.546-1.745c-3.454-.395-4.954-1.802-5.18-4.899a6.61 6.61 0 0 1-.033-.738a4.258 4.258 0 0 1 .92-2.713a3.022 3.022 0 0 1 .195-.231a1 1 0 0 0 .188-1.025a3.388 3.388 0 0 1-.155-.555a4.094 4.094 0 0 1 .079-1.616a7.543 7.543 0 0 1 2.415 1.18a1.009 1.009 0 0 0 .827.133a11.777 11.777 0 0 1 6.173.001a1.005 1.005 0 0 0 .83-.138a7.572 7.572 0 0 1 2.406-1.19a4.04 4.04 0 0 1 .087 1.578a3.205 3.205 0 0 1-.169.607a1 1 0 0 0 .188 1.025c.078.087.155.18.224.268A4.122 4.122 0 0 1 20 9.203a7.039 7.039 0 0 1-.038.777c-.22 3.056-1.725 4.464-5.195 4.86a1 1 0 0 0-.546 1.746a1.63 1.63 0 0 1 .466.908a3.06 3.06 0 0 1 .093.82v2.333c-.01.648-.01 1.133-.01 1.356a1 1 0 1 0 2 0c0-.217 0-.692.01-1.34v-2.35a4.881 4.881 0 0 0-.155-1.311a4.256 4.256 0 0 0-.116-.416a6.513 6.513 0 0 0 5.445-6.424A8.697 8.697 0 0 0 22 9.203a6.13 6.13 0 0 0-1.263-3.826z",fill:"currentColor"},null,-1),vt=[ht];function ft(t,e){return l(),_("svg",dt,vt)}var gt={name:"uil-github-alt",render:ft};const wt={style:{"vertical-align":"sub"},class:"inline",width:"1.2em",height:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24"},yt=s("path",{d:"M15 10l-4 4l6 6l4-16l-18 7l4 2l2 6l3-4",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},null,-1),bt=[yt];function kt(t,e){return l(),_("svg",wt,bt)}var Et={name:"tabler-brand-telegram",render:kt};const Tt={style:{"vertical-align":"sub"},class:"inline",width:"1.2em",height:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24"},Vt=s("path",{d:"M21 15l-6 5.996L4.002 21A.998.998 0 0 1 3 20.007V3.993C3 3.445 3.445 3 3.993 3h16.014c.548 0 .993.456.993 1.002V15zM19 5H5v14h8v-5a1 1 0 0 1 .883-.993L14 13l5-.001V5zm-.829 9.999L15 15v3.169l3.171-3.17z",fill:"currentColor"},null,-1),jt=[Vt];function At(t,e){return l(),_("svg",Tt,jt)}var Lt={name:"ri-sticky-note-line",render:At};const It={style:{"vertical-align":"sub"},class:"inline",width:"1.2em",height:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24"},Pt=s("path",{d:"M5 2h14a1 1 0 0 1 1 1v19.143a.5.5 0 0 1-.766.424L12 18.03l-7.234 4.536A.5.5 0 0 1 4 22.143V3a1 1 0 0 1 1-1zm13 2H6v15.432l6-3.761l6 3.761V4z",fill:"currentColor"},null,-1),$t=[Pt];function zt(t,e){return l(),_("svg",It,$t)}var Dt={name:"ri-bookmark-line",render:zt};const Mt={style:{"vertical-align":"sub"},class:"inline",width:"1.2em",height:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24"},Rt=s("path",{d:"M9.973 18H11v-5h2v5h1.027c.132-1.202.745-2.194 1.74-3.277c.113-.122.832-.867.917-.973a6 6 0 1 0-9.37-.002c.086.107.807.853.918.974c.996 1.084 1.609 2.076 1.741 3.278zM10 20v1h4v-1h-4zm-4.246-5a8 8 0 1 1 12.49.002C17.624 15.774 16 17 16 18.5V21a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.5C8 17 6.375 15.774 5.754 15z",fill:"currentColor"},null,-1),xt=[Rt];function Ct(t,e){return l(),_("svg",Mt,xt)}var Ot={name:"ri-lightbulb-line",render:Ct};const St={style:{"vertical-align":"sub"},class:"inline",width:"1.2em",height:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24"},Zt=s("path",{d:"M20 22H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zm-1-2V4H5v16h14zM7 6h4v4H7V6zm0 6h10v2H7v-2zm0 4h10v2H7v-2zm6-9h4v2h-4V7z",fill:"currentColor"},null,-1),Bt=[Zt];function Nt(t,e){return l(),_("svg",St,Bt)}var Yt={name:"ri-article-line",render:Nt},P="/download.png";const b=t=>(S("data-v-d60c91e0"),t=t(),Z(),t),Ht={class:"header z-40"},Ft={src:P,alt:"logo"},Wt={src:P,alt:"logo"},Jt={class:"nav"},qt=b(()=>s("div",{class:"spacer"},null,-1)),Gt={class:"right"},Qt=b(()=>s("span",{class:"lt-md:hidden"},"Blog",-1)),Xt=B(" Talks "),Kt=b(()=>s("span",{class:"lt-md:hidden"},"Projects",-1)),Ut={href:"https://t.me/peterroe",target:"_blank",title:"Telegram"},te={href:"https://github.com/peterroe",target:"_blank",title:"GitHub"},ee=y({setup(t){return(e,i)=>{const a=j("router-link"),n=Yt,r=Ot,p=Dt,f=Lt,g=Et,$=gt,z=ut;return l(),_("header",Ht,[c(a,{class:"w-10 h-10 absolute lg:fixed m-6 select-none outline-none",to:"/",focusable:"false"},{default:m(()=>[d(s("img",Ft,null,512),[[h,v(u)]]),d(s("img",Wt,null,512),[[h,!v(u)]])]),_:1}),s("nav",Jt,[qt,s("div",Gt,[c(a,{to:"/posts"},{default:m(()=>[Qt,c(n,{class:"md:hidden"})]),_:1}),c(a,{to:"/talks",class:"lt-md:hidden"},{default:m(()=>[Xt]),_:1}),c(a,{to:"/projects"},{default:m(()=>[Kt,c(r,{class:"md:hidden"})]),_:1}),c(a,{to:"/bookmarks",title:"Bookmarks",class:"lt-md:hidden"},{default:m(()=>[c(p)]),_:1}),c(a,{to:"/notes",title:"Notes"},{default:m(()=>[c(f)]),_:1}),s("a",Ut,[c(g)]),s("a",te,[c($)]),c(z)])])])}}});var oe=I(ee,[["__scopeId","data-v-d60c91e0"]]);const ne={class:"px-7 py-10"},ie=y({setup(t){return N({meta:[{property:"og:title",content:"Anthony Fu"},{property:"og:image",content:"https://antfu.me/avatar.png"},{name:"description",content:"Anthony Fu's Portfolio"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:"@antfu7"}]}),(e,i)=>{const a=oe,n=j("router-view"),r=ot;return l(),_(Y,null,[c(a),s("main",ne,[c(n),c(r)])],64)}}}),ae=G.map(t=>V(T({},t),{alias:t.path.endsWith("/")?`${t.path}index.html`:`${t.path}.html`})),se=(t,e,i)=>i||{top:0};H(ie,{routes:ae,scrollBehavior:se},({router:t,isClient:e})=>{w.extend(F),e&&(t.beforeEach(()=>{A.start()}),t.afterEach(()=>{A.done()}))});export{I as _,ut as a,pe as f,u as i};
