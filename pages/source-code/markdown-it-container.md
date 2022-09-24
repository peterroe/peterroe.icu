---
title: Markdown-it-container
---

<GitHubLink  repo="markdown-it/markdown-it-container" />

功能： `Markdown-it` 插件，用于定义高亮容器，支持自定义容器样式

用法：

```markdown
::: warning
content here
:::
```

::: warning
content here
:::

---

### 核心代码

```ts
interface Ruler {
  before: (a: string, b: string, c: Function) => void;
  after: (a: string, b: string, c: Function) => void;
  push: (a: string, b: Function) => void;
}

interface MarkdownIt {
  inline: {
    ruler: Ruler
  };
  block: {
    ruler: Ruler
  };
  core: {
    ruler: Ruler
  };
  renderer: {
    rules: {
      fence: Function
    }
  };
}

interface Token {
  type: string;
  tag: string;
  attrs: Array<string>;
  nesting: number;
  level: number;
  children: Array<MarkdownIt>;
  content: string;
  markup: string;
  info: string;
  meta: any;
  block: boolean;
  hidden: boolean;
  attrJoin: (a: string, b: string) => void;
  map: [number, number];
}

interface StateBlock {
  src: string;
  md: MarkdownIt,
  env: any;
  tokens: Array<Token>;
  bMarks: Array<number>; // 每行字符开始的位置
  eMarks: Array<number>; // 每行字符结束的位置
  tShift: Array<number>; // 每行字符前的空格数
  sCount: Array<number>; // 每行字符前的空格数
  bsCount: Array<number>; 
  blkIndent: number; 
  line: number; // 当前行
  lineMax: number; // 总行数
  tight: boolean; 
  ddIndent: number;
  lastIndent: number;
  parentType: string;
  level: number;
  result: string;
  push: (a: string, b: string, c: number) => void;
}

interface Options {
  markup: string;
  validate: Function;
  render: Function;
}

// Process block-level custom containers
//
'use strict';


module.exports = function container_plugin(md: MarkdownIt, name: string, options: Options) {

  function validateDefault(params/*, markup*/) {
    return params.trim().split(' ', 2)[0] === name;
  } //验证容器的名字合法性

  function renderDefault(tokens, idx, _options, env, slf) {

    // 默认只是为容器添加一个CSS类名
    if (tokens[idx].nesting === 1) {
      tokens[idx].attrJoin('class', name);
    }

    return slf.renderToken(tokens, idx, _options, env, slf);
  }

  options = options || {}; //参数兜底

  var min_markers = 3, //最少的标记符号
      marker_str  = options.marker || ':',
      marker_char = marker_str.charCodeAt(0), //标记符号的Unicode字符编码
      marker_len  = marker_str.length,
      validate    = options.validate || validateDefault,
      render      = options.render || renderDefault;

  function container(state: StateBlock, startLine: number, endLine: number, silent: boolean) {
    var pos: number, // 标记在文档结束位置下标
        nextLine: number, // 下一行的位置
        marker_count: number, // 标记符号的数量
        markup: string, // :::
        params: string, // warning
        token: Token, // 新增的容器token
        old_parent: string,
        old_line_max: number,
        auto_closed = false,  // 时候否有结束标签
        start = state.bMarks[startLine] + state.tShift[startLine], // 每一行的开始位置
        max = state.eMarks[startLine]; // 每一行的结束位置  

    // Check out the first character quickly,
    // this should filter out most of non-containers
    // 验证捕获到了:开头的行
    if (marker_char !== state.src.charCodeAt(start)) { return false; } 

    // Check out the rest of the marker string
    // 验证标记:::是否完全符合，让pos指向标记符号的最后一个字符
    for (pos = start + 1; pos <= max; pos++) {
      if (marker_str[(pos - start) % marker_len] !== state.src[pos]) {
        break;
      }
    }

    marker_count = Math.floor((pos - start) / marker_len); // 计算标记符号:的数量
    if (marker_count < min_markers) { return false; } // :小于3就退出
    pos -= (pos - start) % marker_len; // 让:的数量是3的倍数，用pos标记

    markup = state.src.slice(start, pos); // :::标记符号
    params = state.src.slice(pos, max); // pos到max之间的内容，即参数
    if (!validate(params, markup)) { return false; } //验证不符合则退出

    // Since start is found, we can report success here in validation mode
    if (silent) { return true; }

    // Search for the end of the block
    //
    nextLine = startLine;

    for (;;) { // 从找到标记头开始，向下找到标记尾
      nextLine++;
      if (nextLine >= endLine) { // 退出条件
        // unclosed block should be autoclosed by end of document.
        // also block seems to be autoclosed by end of parent
        break;
      }
      // 确定开始位置和结束位置
      start = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];
      if (start < max && state.sCount[nextLine] < state.blkIndent) {
        // non-empty line with negative indent should stop the list:
        // - ```
        //  test
        break;
      }
      // 肯定不是标记尾，继续找
      if (marker_char !== state.src.charCodeAt(start)) { continue; }

      if (state.sCount[nextLine] - state.blkIndent >= 4) {
        // closing fence should be indented less than 4 spaces
        continue;
      }

      for (pos = start + 1; pos <= max; pos++) {
        if (marker_str[(pos - start) % marker_len] !== state.src[pos]) {
          break;
        }
      }

      // closing code fence must be at least as long as the opening one
      if (Math.floor((pos - start) / marker_len) < marker_count) { continue; }

      // make sure tail has spaces only
      pos -= (pos - start) % marker_len;
      pos = state.skipSpaces(pos);

      if (pos < max) { continue; }

      // found!
      auto_closed = true;
      break;
    }

    old_parent = state.parentType;
    old_line_max = state.lineMax;
    state.parentType = 'container';

    // this will prevent lazy continuations from ever going past our end marker
    state.lineMax = nextLine;
    // 添加容器开始token
    token        = state.push('container_' + name + '_open', 'div', 1);
    token.markup = markup;
    token.block  = true;
    token.info   = params;
    token.map    = [ startLine, nextLine ];
    // 添加容器内容token
    state.md.block.tokenize(state, startLine + 1, nextLine);
    // 添加容器结束token
    token        = state.push('container_' + name + '_close', 'div', -1);
    token.markup = state.src.slice(start, pos);
    token.block  = true;

    state.parentType = old_parent;
    state.lineMax = old_line_max;
    // 跳过容器行解析后面的
    state.line = nextLine + (auto_closed ? 1 : 0);

    return true;
  }

  md.block.ruler.before('fence', 'container_' + name, container, {
    alt: [ 'paragraph', 'reference', 'blockquote', 'list' ]
  });
  md.renderer.rules['container_' + name + '_open'] = render;
  md.renderer.rules['container_' + name + '_close'] = render;
};
```

[More message about the markdown-it](https://markdown-it.docschina.org)