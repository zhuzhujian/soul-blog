## 项目介绍

本项目旨在提供一套在线一键搭建动态博客的能力，项目中包含（后台后端 + 后台前端）了全栈代码。创建这个项目是为了快速给另外一个项目提供服务，很多功能和架构可能考虑不完善；后期会进行优化和重构，待优化内容可以查看[TODO](#TODO)。项目的技术选型和功能方案如下：

- 前端：Vue3 + Vue-router + pinia + TypeScript + tailwindcss
- 后端：expressjs + Nodejs
- 数据库：mysql
- 鉴权方案：JWT
- 功能：上传、下载、富文本编辑预览、博客上线&下线、博客排序
- 富文本编辑器：md-editor-v3
- 包管理：pnpm
- 部署：nginx

### 目录结构
- monorepo
```shell
soule-blod
├── soul-blog-admin # 前端模块
└── soul-blog-server # 服务端模块
```
- 前端模块
```shell
./soul-blog-admin
├── public # 静态公共文件
└── src
    ├── api # 接口目录
    ├── assets # 资源目录
    ├── components # 公共组件
    ├── hooks # 钩子函数
    ├── router # 路由
    ├── store # pinia状态配置
    │   └── modules
    ├── types # typescript接口
    ├── utils # 公共函数
    └── views # 页面代码
        ├── article # 文章管理
        │   ├── list # 文章列表（待实现）
        │   └── publish # 发布文章（待实现）
        ├── home # 首页
        │   ├── error-page
        │   └── login # 登录页
        └── layout # 页面布局
            └── sidebar # 侧边栏
```
> 主要组件官网：[element-plus](https://element-plus.org/zh-CN/)、[md-editor-v3](https://imzbf.github.io/md-editor-v3/zh-CN/)

- 后端模块
```shell
.soul-blog-server
├── bin # 启动脚本
│   └── www
├── config # 配置目录
├── keys # 密钥配置
├── middleware # 中间件
├── public # 公共模块
├── router # 路由
├── tests # 测试
└── utils # 工具函数
```

### 项目启动

- 环境准备
NodeJS: ^22.13.0、pnpm

- 启动项目
```shell
#安装依赖
pnpm install
#启动前端
pnpm run dev:admin
#启动后端
pnpm run start:server
```

## TODO