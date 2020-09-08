/*
  Author: chen
  Description: 主要处理 token 相关业务处理与数据返回
  Update: 
*/

class TokenModel {
  // 返回生成的 token
  static tokenGenerate(id) {
    const AuthToken = require(`${process.cwd()}/middlewares/auth-token`)
    throw new global.Success({
      data: AuthToken.generateToken(id)
    })
  }

  // 校验 token 的合法性
  static tokenVerify(ctx) {
    const AuthToken = require(`${process.cwd()}/middlewares/auth-token`)
    throw new global.Success({
      data: AuthToken.verifyToken(ctx)
    })
  }
}


module.exports = TokenModel