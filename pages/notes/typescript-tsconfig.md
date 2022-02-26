---
title: tsconfig.json详解
date: 2022-02-26
type: typescript
---

```json
/* Language and Environment */
"lib": ["DOM", "ESNext"],           //ts需要引用的库
"target" : "es6/es2020",            //编译后的版本
"jsx": "preserve/react-jsx/react",  //指定jsx用于的开发环境
"experimentalDecorators": true,     //启用实验性质的装饰器

/* Modules */
"module": "commonjs/system/AMD/ES2015",   //指定生成哪个模块系统代码
"rootDir": "./",                   //根目录
"basrUrl": "./",                   //用于设置解析非相对模块名称的基本目录，相对模块不会受到baseUrl的影响
"moduleResolution": "node",        //表示如何处理模块
"paths": {                         //用于设置模块名到基于baseUrl的映射
  "*":["./node_modules/@types", "./typings/*"], 
}
"rootDirs": [],                    //根目录列表
"typeRoots": [],                   //要包含的类型声明文件路径列表
"types": [],                       //要包含的类型声明文件名列表
"resolveJsonModule": true,         //是否允许把json文件当作模块进行解析

/* JavaScript Support */
"allowJs": true,                   //允许编译js
"checkJs": true,                   //与allowjs配合使用，报告js错误

/* Emit */
"declaration": true,               //生成声明文件
"sourceMap": true,                 //把ts编译成js的时候，同时生成对应的map文件
"outFile": "./",                   //用于指定输入文件合并为一个文件，只有设置module为amd/system时候才支持此配置
"outDir": "./dist",                //指定输出文件夹
"removeComments": true,            //删除所有注释
"noEmit": true,                    //不生成输出文件

/* Interop Constraints */
"isolatedModules": true,                      //每个文件需要是一个模块
"esModuleInterop": true,                      //可以使用es6的方法导入nodeJs的方法
"forceConsistentCasingInFileNames": true,     //文件名是否区分大小写

/* Type Checking */
"noImplicitAny": true,                        //不允许隐式的any类型
"strict": true,                               //开启严格类型检查
"strictPropertyInitialization": true,         //类实例的属性必须初始化

/* Completeness */
"skipLibCheck": true,                         //是否跳过声明文件的检查

/* other */
"include": ["src/*"],                         //执行检查的目录
"exclude": ["dist", "node_modules"],          //不执行检查的目录
```