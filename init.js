/*
  Author: chen
  Description: koa项目初始化，将所需要初始化的方法分离到该文件
  Update: 
*/

const path = require('path')

class InitManager {
  // 初始化
  static init(app) {
    InitManager.initLoadGlobal()
    InitManager.initCatchError(app)
    InitManager.initStatic(app)
    InitManager.initLoadRouter(app)
  }

  

  // 初始化将常用的变量或方法挂载到全局 global 中
  static initLoadGlobal() {
    const mountToGlobal = require(`${process.cwd()}/core/mount-to-global`)
    mountToGlobal()
  }

  // 监听全局异常，统一处理
  static initCatchError(app) {
    const catchError = require(`${process.cwd()}/middlewares/exception`)
    app.use(catchError)
  }

  // 初始化静态资源
  static initStatic(app) {
    const KoaStatic = require('koa-static')
    const pathStatic = path.join(__dirname, '../static')
    app.use(KoaStatic(pathStatic)) // 访问路径如  http://localhost:3000/images/bg.jpg

    // 处理需要token权限才能访问的静态资源目录
  }

  // 自动加载路由 并做token权限拦截
  static initLoadRouter(app) {
    const Router = require('koa-router')
    const AuthToken = require(`${process.cwd()}/middlewares/auth-token`)
    // token 拦截
    app.use(new AuthToken().m)
  }

}

module.exports = InitManager