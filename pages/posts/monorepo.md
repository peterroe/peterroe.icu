## Why Monorepo?

通常一个项目对应一个代码仓库，因为这些仓库可能由不同的团队维护。

但是我们发现，如果把一些相关的项目，作为一个大项目子项目维护，放在同一个仓库里，能带来许多好处。例如共用 ts、eslint 等配置，统一代码风格

当然，monorepo 最大的好处还是在依赖管理方面

## lerna

借助 node 会层层往上查找 node_modules 的特性，我们将「公共依赖」放在 Monorepo 项目的根目录，这样尽管某个 package 的 package.json 文件中没有声明这个依赖，它仍然能够正常加载依赖

lerna 就是这样做的，当运行 `lerna bootstrap --hoist` 的时候，就会将重复的依赖提取到最外层

