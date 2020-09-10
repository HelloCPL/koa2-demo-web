/*
  Author: chen
  Description: koa项目初始化，将所需要初始化的方法分离到该文件
  Update: 
*/

const path = require('path')
// 导入路由
const Router = require('koa-router')
// 导入koa2-cors 跨域处理
const cors = require('koa2-cors')
// 导出koa-body 用于文件上传 不需要另外适用koa-bodyparser
const koaBody = require('koa-body')
// 导入 require-directory 自动加载路由模块文件
const requireDirectory = require('require-directory')
// 导入koa静态资源管理
const KoaStatic = require('koa-static')

class InitManager {
  // 初始化
  static init(app) {
    InitManager.initCors(app)
    InitManager.initLoadGlobal()
    InitManager.initCatchError(app)
    InitManager.initKoaBody(app)
    InitManager.initStatic(app)
    InitManager.initLoadRouter(app)
  }

  // 处理跨域处理
  static initCors(app) {
    app.use(cors())
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

  // 处理文件上传于body参数
  static initKoaBody(app) {
    // 处理文件上传中间件 同时处理body参数
    app.use(koaBody({
      multipart: true, // 允许多文件上传
      formidable: {
        maxFieldsSize: global.config.maxFieldsSize //文件上传最大限制
      }
    }))
  }

  // 初始化静态资源
  static initStatic(app) {
    const pathStatic = path.join(__dirname, './static')
    app.use(KoaStatic(pathStatic)) // 访问路径如  http://localhost:3000/images/bg.jpg

    // 处理需要token权限才能访问的静态资源目录
  }

  // 自动加载路由 并做token权限拦截
  static initLoadRouter(app) {
    const AuthToken = require(`${process.cwd()}/middlewares/auth-token`)
    // token 拦截
    app.use(new AuthToken().m)
    // 自动加载路由模块
    requireDirectory(module, `${process.cwd()}/app/api`, {
      visit: _loadRouterModule
    })
    // 每加载一个文件后的回调，挂载路由
    function _loadRouterModule(obj) {
      if (obj instanceof Router) {
        app.use(obj.routes())
      } else if (obj.router && obj.router instanceof Router) {
        app.use(obj.router.routes())
      }
    }
  }

}

module.exports = InitManager