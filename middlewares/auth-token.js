/*
  Author: chen
  Description: 主要做token权限判断处理
  Update: 
*/

const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
// 导入 judgeToken 判断是否需要校验 token
const judgeToken = require(`${process.cwd()}/config/api-white-list`)

class AuthToken {
  // token 校验中间件 校验 token 合法性并返回访问用户id
  get m() {
    return async (ctx, next) => {
      console.log(`访问的接口是：${ctx.method} ${ctx.path}`);
      if (judgeToken(ctx.method, ctx.path) && global.config.verifyToken) {
        // 获取解析后的 token
        const tokenInfo = basicAuth(ctx.req)
        let errmsg = 'token不合法'
        let decode
        if (!tokenInfo || !tokenInfo.name) throw new global.ForbiddenException({ msg: errmsg })
        try {
          decode = jwt.verify(tokenInfo.name, global.config.securityToken.secretKey)
        } catch (e) {
          if (e.name === 'TokenExpiredError') errmsg = 'token令牌过期'
          throw new global.ForbiddenException({ msg: errmsg })
        }
        ctx.authInfo = {
          id: decode.id
        }
        await next()
      } else {
        // 直接跳过校验
        await next()
      }
    }
  }

  // 生成token 参数 用户id
  static generateToken(id) {
    if (!id) throw new global.ParameterException('生成token出错：请传入userId')
    return jwt.sign({ id }, global.config.securityToken.secretKey, { expiresIn: global.config.securityToken.expiresIn })
  }

  // 检测 token 合法性
  static verifyToken(ctx) {
    const tokenInfo = basicAuth(ctx.req)
    if (!tokenInfo || !tokenInfo.name)
      throw new global.ForbiddenException('token令牌不存在')
    try {
      jwt.verify(tokenInfo.name, global.config.securityToken.secretKey)
    } catch (error) {
      throw new global.ForbiddenException('token令牌不存在')
    }
    throw new global.Success({ data: true })
  }

}

module.exports = AuthToken