---
title: Quick Find - Peter Roe
display: Quick Find
subtitle: Tips and tricks for quick finding
---

### URL

```js
'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash'

protocol: `https:`
username: `user`
password: `pass`
hostname: `sub.example.com`
port: `8080`
host: `sub.example.com:8080`
origin: `https://sub.example.com:8080`
pathname: `/p/a/t/h`
search: `?query=string`
hash: `#hash`
href: `https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash`
```

### 设置NPM源

```shell
$ npm set registry=https://registry.npmjs.org
$ npm set registry=https://bnpm.byted.org
```

### mac添加zsh运行shell权限

```shell
$ chmod u+x *.sh
```

### git克隆所有分支

```bash
$ mkdir testRepo # 必要，新建一个文件夹，最好和仓库同名
$ cd testRepo
$ git clone --bare git@github.com:peterroe/testRepo.git .git
$ git config --bool core.bare false
$ git reset --hard
$ git branch
```

```shell
$ git push --all origin # 推送所有分支
```

### 查找某个文件

```shell
$ find /user -name nginx.conf
$ find / -name "*.conf"
```

### 配置目录下面到所有命令到.zshrc

```shell
export PATH=/xx/xx/xx/:$PATH

# eg
export PATH=$HOME/.cargo/bin/:$PATH
```

### git强制远程覆盖本地

```shell
git fetch --all
git reset --hard origin/master
git pull
```

### 在esm中使用__dirname

```ts
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```

### 拉取远程分支

```shell
# 拉取main分支
$ git checkout -b main origin/main
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

安装：

```shell
$ brew search node # 查看所有的node版本
$ brew install node@16 # 安装node@16
$ brew link -overwrite --force node@16 # 创建node@16的链接
$ node -v # 确认node@16已经安装
```

切换：

```shell
$ brew search node
$ brew install node@18
$ brew unlink node@16 # 删除node@16的链接
$ brew link --overwrite --force node@18 
$ node -v
```
