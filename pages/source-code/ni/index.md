---
title: '@antfu/ni'
---

## 用法

自动识别项目所用的包管理器，然后使用该管理器安装对应的包

```shell
ni vite
# npm i vite
# yarn add vite
# pnpm add vite
# bun add vite
```

## 原理

运行 `ni vite`，本质上是执行了下面的代码

```ts
import { parseNi } from '../parse'
import { runCli } from '../runner'

runCli(parseNi)
```

`runCli` 的作用是解析命令行的参数，并将参数传入  `run` 函数调用

```ts
export async function runCli(fn: Runner, options: DetectOptions = {}) {
  const args = process.argv.slice(2).filter(Boolean)
  try {
    await run(fn, args, options)
  }
  catch (error) {
    process.exit(1)
  }
}
```

### run

```ts
export async function run(fn: Runner, args: string[], options: DetectOptions = {}) {
  const debug = args.includes(DEBUG_SIGN)
  if (debug)
    remove(args, DEBUG_SIGN) //移除调试标记: "?"

  let cwd = process.cwd() // 获取进程执行时的文件夹目录
  let command

  // 改变安装文件目录，例如 ni -C packages/foo vite
  if (args[0] === '-C') {
    cwd = resolve(cwd, args[1]) // 忽略-C参数，拼接安装目录路径
    args.splice(0, 2) //删除 -C 和 packages/foo
  }

  const isGlobal = args.includes('-g')
  if (isGlobal) { // 可能会使用ni的全局配置
    //# 包管理器确认，并和参数一同传入 parseNi ，得到调用命令
    command = await fn(await getGlobalAgent(), args)
  }

  else { // 查找使用哪一个包管理器
    let agent = await detect({ ...options, cwd }) || await getDefaultAgent()
    if (agent === 'prompt') { // 需要用户选择
      agent = (await prompts({
        name: 'agent',
        type: 'select',
        message: 'Choose the agent',
        choices: agents.filter(i => !i.includes('@')).map(value => ({ title: value, value })),
      })).agent
      if (!agent)
        return
    }
    // 得到命令
    command = await fn(agent as Agent, args, {
      hasLock: Boolean(agent),
      cwd,
    })
  }

  if (!command)
    return

  const voltaPrefix = getVoltaPrefix()
  if (voltaPrefix)
    command = voltaPrefix.concat(' ').concat(command)

  if (debug) {
    // eslint-disable-next-line no-console
    console.log(command)
    return
  }

  // 执行安装命令
  await execaCommand(command, { stdio: 'inherit', encoding: 'utf-8', cwd })
}
```

### getConfig

```ts
export async function getConfig(): Promise<Config> {
  if (!config) {
    // 尝试先从 package.json 里面找是否有packageManager字段
    const result = await findUp('package.json') || ''
    let packageManager = ''
    if (result)
      packageManager = JSON.parse(fs.readFileSync(result, 'utf8')).packageManager ?? ''
    // 解析得到 管理器 和 版本
    const [, agent, version] = packageManager.match(new RegExp(`^(${Object.values(LOCKS).join('|')})@(\d).*?$`)) || []
    // 如果顺利得到了 agent
    if (agent)
      config = Object.assign({}, defaultConfig, { defaultAgent: (agent === 'yarn' && parseInt(version) > 1) ? 'yarn@berry' : agent })
    // 得不到，如果 ni的默认配置 ~/.nirc 也不存在
    // 则使用 npm
    else if (!fs.existsSync(rcPath))
      config = defaultConfig
    // 否则，~/.nirc的配置
    else
      config = Object.assign({}, defaultConfig, ini.parse(fs.readFileSync(rcPath, 'utf-8')))
  }
  return config
}
```

### parseNi

```ts
export const parseNi = <Runner>((agent, args, ctx) => {

  // 如果运行的是 ni --version，则输出版本信息，退出进程
  if (args.length === 1 && (args[0] === '--version' || args[0] === '-v')) {
    console.log(`@antfu/ni v${version}`)
    process.exit(0)
  }

  // 如果运行的是 ni --help，则输出帮助信息，退出进程
  if (args.length === 1 && (args[0] === '--help' || args[0] === '-h')) {
    const dash = c.dim('-')
    console.log(c.green(c.bold('ni')) + c.dim(' use the right package manager\n'))
    console.log(`ni   ${dash}  install`)
    console.log(`nr   ${dash}  run`)
    console.log(`nx   ${dash}  execute`)
    console.log(`nu   ${dash}  upgrade`)
    console.log(`nun  ${dash}  uninstall`)
    console.log(`nci  ${dash}  clean install`)
    console.log(`na   ${dash}  agent alias`)
    console.log(c.yellow('\ncheck https://github.com/antfu/ni for more documentation.'))
    process.exit(0)
  }

  // 支持 bun 
  // bun use `-d` instead of `-D`, #90
  if (agent === 'bun')
    args = args.map(i => i === '-D' ? '-d' : i)

  // 全局模式
  if (args.includes('-g'))
    // exclude 作用是拷贝一份 args 且移除 -g 
    return getCommand(agent, 'global', exclude(args, '-g'))

  // frozen-if-present 安装
  if (args.includes('--frozen-if-present')) {
    args = exclude(args, '--frozen-if-present')
    return getCommand(agent, ctx?.hasLock ? 'frozen' : 'install', args)
  }

  // frozen 安装
  if (args.includes('--frozen'))
    return getCommand(agent, 'frozen', exclude(args, '--frozen'))

  // 如果只运行 ni 或者全部是 -开头参数, 默认当成install命令
  if (args.length === 0 || args.every(i => i.startsWith('-')))
    return getCommand(agent, 'install', args)

  // 否则当成 add
  return getCommand(agent, 'add', args)
})
```

### getCommand

```ts
export const AGENTS = {
  'npm': {
    'agent': 'npm {0}',
    'run': npmRun('npm'), // 运行script
    'install': 'npm i {0}',
    'frozen': 'npm ci',
    'global': 'npm i -g {0}',
    'add': 'npm i {0}',
    'upgrade': 'npm update {0}',
    'upgrade-interactive': null,
    'execute': 'npx {0}',
    'uninstall': 'npm uninstall {0}',
    'global_uninstall': 'npm uninstall -g {0}',
  },
  'yarn': yarn,
  'yarn@berry': {
    ...yarn,
    'frozen': 'yarn install --immutable',
    'upgrade': 'yarn up {0}',
    'upgrade-interactive': 'yarn up -i {0}',
    // Yarn 2+ removed 'global', see https://github.com/yarnpkg/berry/issues/821
    'global': 'npm i -g {0}',
    'global_uninstall': 'npm uninstall -g {0}',
  },
  'pnpm': pnpm,
  // pnpm v6.x or below
  'pnpm@6': {
    ...pnpm,
    run: npmRun('pnpm'),
  },
  'bun': bun,
}

export function getCommand(
  agent: Agent,
  command: Command,
  args: string[] = [],
) {
  if (!(agent in AGENTS))
    throw new Error(`Unsupported agent "${agent}"`)

  // 得到类似 'npm i -g {0}' 的结果或者是函数
  const c = AGENTS[agent][command]

  if (typeof c === 'function') // 函数，则执行
    return c(args)

  // 不存在，抛出错误
  if (!c)
    throw new Error(`Command "${command}" is not support by agent "${agent}"`)
  // 将 {0} 替代为对应的包
  return c.replace('{0}', args.join(' ')).trim()
}
```

### detect

```ts
export const LOCKS: Record<string, Agent> = {
  'bun.lockb': 'bun',
  'pnpm-lock.yaml': 'pnpm',
  'yarn.lock': 'yarn',
  'package-lock.json': 'npm',
  'npm-shrinkwrap.json': 'npm',
}

export async function detect({ autoInstall, cwd }: DetectOptions) {
  let agent: Agent | null = null
  // 从当前目录依依次向上找 LOCKS 文件的目录
  const lockPath = await findUp(Object.keys(LOCKS), { cwd })
  let packageJsonPath: string | undefined

  // 找到了，则使用上一个目录的package文件
  if (lockPath)
    packageJsonPath = path.resolve(lockPath, '../package.json')
  else // 没找到，就找向上找 package.json 文件
    packageJsonPath = await findUp('package.json', { cwd })

  // read `packageManager` field in package.json
  if (packageJsonPath && fs.existsSync(packageJsonPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
      if (typeof pkg.packageManager === 'string') {
        const [name, version] = pkg.packageManager.split('@')
        if (name === 'yarn' && parseInt(version) > 1)
          agent = 'yarn@berry'
        else if (name === 'pnpm' && parseInt(version) < 7)
          agent = 'pnpm@6'
        else if (name in AGENTS)
          agent = name
        else
          console.warn('[ni] Unknown packageManager:', pkg.packageManager)
      }
    }
    catch {}
  }

  // detect based on lock
  // 如果没有package.json，只有lock，则使用lock对应的 agent
  if (!agent && lockPath)
    agent = LOCKS[path.basename(lockPath)]

  // auto install
  // cmdExists 检查对应的包管理是否安装了
  if (agent && !cmdExists(agent.split('@')[0])) {
    if (!autoInstall) { // 没有auto，要用户确认是否安装
      console.warn(`[ni] Detected ${agent} but it doesn't seem to be installed.\n`)

      if (process.env.CI)
        process.exit(1)
      // 给出各个管理器的链接
      const link = terminalLink(agent, INSTALL_PAGE[agent])
      const { tryInstall } = await prompts({
        name: 'tryInstall',
        type: 'confirm',
        message: `Would you like to globally install ${link}?`,
      })
      if (!tryInstall)
        process.exit(1)
    }
    // 否则直接安装包管理器
    await execaCommand(`npm i -g ${agent}`, { stdio: 'inherit', cwd })
  }

  return agent
}
```

### 查找流程

**pkg**

* 通过 find-up 从当前目录依依次向上找 lock 文件，在找到同级的 pkg 文件
* 通过 find-up 从当前目录依依次向上找 pkg 文件

**packageManager**

* 如果 packageManager 字段为 yarn@version，且 version 大于1，则 `agent` 为 yarn@berry
* 如果 packageManager 字段为 pnpm@version，且 version 小于7，则 `agent` 为 pnpm@6
* packageManager 必须属于 `npm/yarn/yarn@berry/pnpm/pnpm@6/bun`，否则警告不能识别该管理器 

**agent**

* 如果还未确认 `agent` ，且存在 lock 文件，则 `agent` 为 lock 文件对应的包管理器

* 如果确认了 `agent`，但用户设备未安装，则提示用户安装

* 确定 `agent`