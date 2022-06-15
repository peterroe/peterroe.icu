---
title: Quick Find - Peter Roe
display: Quick Find
subtitle: Tips and tricks for quick finding
---

### 删除远程分支

```
$ git push origin --delete main
```

### 三个很有用的git命令

* git grep <关键词> - 搜索含有指定关键词的文件
* git blame <文件名> - 查看指定文件每一行的提交人和提交时间
* git log -p <文件名> - 查看指定文件的每一次提交和改动

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
