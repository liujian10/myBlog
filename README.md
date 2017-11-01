# 我的博客Demo

本项目基于 [React Redux Starter Kit](https://github.com/davezuko/react-redux-starter-kit) 搭建。

学习资源： [Starting out with react-redux-starter-kit](https://suspicious.website/2016/04/29/starting-out-with-react-redux-starter-kit)

线上地址： [mapleliu.com](http://mapleliu.com)

## 运行项目

命令行（终端）执行
```sh
cd myBlog
yarn install
yarn start
```
浏览器打开 [http://localhost:3000](http://localhost:3000)

## 常用的 script 列表

|`npm run <script>`|说明|
|------------------|-----------|
|`start`|编译更新 vendor.js 并在 `localhost:3000` 启动服务. HMR 打开.|
|`build`|与 `compile` 相同，`NODE_ENV` 覆盖为 "production".（构建上线代码）|
|`compile`|编译应用到磁盘 (`~/dist`).|
|`test`|运行 Karma 的单元测试，并生成覆盖报告.|
|`lint`|检查 `.js` 代码风格.|
|`lint:fix`|检查风格，并修复能修复的错误. [Read more on this](http://eslint.org/docs/user-guide/command-line-interface.html#fix).|

## 项目结构

```
.
│  .editorconfig                      # 代码缩进，换行等配置
│  .eslintignore                      # 不做代码风格检查的文件
│  .eslintrc                          # 代码风格检查配置
│  .gitignore                         # 
│  package.json                       # npm 包配置
│  README.md                          # 
│  
├─build                               # 构建
├─dist                                # 打包结果目标目录
│
├─server                              # 开发时的本地 server
├─src                                 # 前端代码根目录
│  │  config.js                         # 共用的配置
│  │  index.html                        # 单页面入口，会打包到 dist/html
│  │  main.js                           # 前端 js 入口文件
│  │  
│  ├─components                         # 共用的组件
│  ├─containers                         # 共用的容器
│  ├─layouts                            # 共用的布局组件
│  ├─middlewares                        # redux 的中间件
│  ├─routes                             # 页面路由
│  │  ├─index.js                          # 路由入口
│  │  ├─Dashboard                         # 路由模块
│  │  │  ├─index.js                       # 路由模块的入口
│  │  │  ├─components                     # 路由下的组件
│  │  │  ├─containers                     #  路由下的容器
│  │  │  └─modules                        # 路由下的模块
│  │  │            
│  │  └─Other
│  │              
│  ├─static                             # 前端静态文件
│  ├─store                              # Redux 的相关初始化
│  ├─styles                             # 共用的样式
│  └─util                               # 共用的工具
└─tests                                 # 测试
```
