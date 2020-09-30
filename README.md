# 项目说明

## 目录说明

```
  - app.js // 项目入口，设置监听
  - init.js // 将 app.js 需初始化的业务分离到该文件
  - package.json // 项目依赖
  - app 目录
    - api 目录 // 存放 api 路由入口的文件
      - 自带 token生成、校验，图片、文件上传与删除，ueditor富文本附件上传 等默认api
    - model 目录 // 存放处理涉及 api 有关的业务和数据返回的业务操作文件
      - 自带 获取用户信息，根据ids获取图片，生成和校验token 等默认业务方法
    - validators 目录 // 存放处理涉及 api 参数校验的文件
      - 自带 普通参数校验，用户id是否存在 等默认校验方法
  - config 目录
    - api-white-list.js // api 路由白名单配置 跳过 token 校验
    - config.js // 开发/正式环境的全局参数配置
  - core 目录
    - db.js // 连接MySQL数据库 提供数据库普通查询和事务查询方法
    - http-exception.js // 设置常用的异常类，统一对异常的处理
    - lin-validator.js // 用于参数校验，引用七月的参数校验文件
    - mount-to-global.js // 将常用的变量或方法挂载到 global 全局变量中
    - tools.js // 自定义业务常用的 js 方法集合
    - utils.js // 定义遍历寻找对象成员的方法，用于 lin-validator.js 参数校验中
  - httpskey 目录 // 存放 https 证书，需要自行到腾讯云或阿里云申请
  - middlewares 目录 // 存放全局中间件拦截文件
    - auth-token.js // 处理 token 权限判断，并提供生成 token 和校验 token 合法性方法
    - exception.js // 统一对异常做处理，通过异常处理返回数据
  - static 目录 // 存放静态资源
    - files 目录 // 存放文件
    - images 目录 // 存放图片
    - ueimages 目录 // 存放富文本附件
  - test 目录 // 测试文件集合
```

## 项目启动

- `npm i` 安装依赖

- `npm run dev` 开发环境

- 或 `npm run prod` 正式环境 

## 常用方法说明

- `mount-to-global.js` global 全局变量挂载
  + lodash 工具类 
    `global._`
  + 全局配置 
    `global.config`
  + 全局异常类 
    `global.HttpException` // 系统异常
    `global.ParameterException` // 参数异常
    `global.NotFoundException` // 404异常
    `global.ForbiddenException` // 权限不足异常
    `global.AuthException` // token无效或过期异常
    `global.Success` // 成功类 特殊异常类，借助异常返回数据
  + 全局常用方法集合 
    `global.tools` // 常用的业务方法，具体看 `tools.js`

## 新项目开发帮助

- 先在 `config/config.js` 文件中配置自己项目的全局参数

- 主要在 `app 目录` 进行开发即可（已建好 token 和 图片文件上传或删除接口，可根据自己的项目需求做舍取或修改）

  + `api 目录` 作为 api 路由的主要入口，每个 api 可分为参数处理和业务处理两块引用即可，具体处理方法可分别提取至 `validators 目录` 和 `model 目录`

  + `validators 目录` api 参数校验类，如需要校验自定义（如类型、异步查询数据库等）以 `validate` 开头定义方法即可，参数可通过 `get('XX.xx')` 获取（XX根据前端传参方式的不同做对应处理，如 `body.id` `query.id` `path.id` `header.content-type`）

  + `model 目录` api 业务处理和数据返回
