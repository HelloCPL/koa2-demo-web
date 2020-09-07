/*
  Author: chen
  Description: 全局捕获异常中间件，统一对异常做处理
  Update: 
*/

const {
  HttpException
} = require(`${process.cwd()}/core/http-exception`)

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    const isHttpException = error instanceof HttpException
    const isDev = global.config.environment === 'dev'
    if (isDev && !isHttpException) throw error
    if (isHttpException) {
      ctx.body = {
        errcode: error.errcode,
        msg: error.msg,
        data: error.data || null,
        total: error.total
      }
      ctx.status = error.code
    } else {
      ctx.body = {
        errcode: 500,
        msg: '服务器发生错误，请求后台开发人员处理',
        data: null,
        total: 0
      }
      ctx.status = 500
    }
  }
}

module.exports = catchError