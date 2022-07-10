---
title: Quick Find - Peter Roe
display: Quick Find
subtitle: Tips and tricks for quick finding
---

### 在esm中使用__dirname

```ts
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```

### 删除远程分支

```shell
$ git push origin --delete main
```

### CSS单行省略和多行省略

```css
{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

```css
{
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical; /*设置对齐模式*/
  -webkit-line-clamp: 2; /*设置多行的行数*/
}
```

### Git清除缓存

```shell
$ git rm -r --cached
```

### brew切换node版本

```shell
$ brew search node # 查看所有的node版本
$ brew install node@16 # 安装node@16
$ brew link -overwrite --force node@16 # 创建node@16的链接
$ node -v # 确认node@16已经安装
```
