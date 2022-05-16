---
title: Quick Find - Peter Roe
display: Quick Find
subtitle: Tips and tricks for quick finding
---

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
