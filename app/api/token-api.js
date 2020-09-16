/*
  Author: chen
  Description: 主要输出 token 有关api 包括 请求生成token 校验token合法性 登录
  Update: 
*/

// 导入路由
const Router = require('koa-router')
const router = new Router({ prefix: '/api' })

// 导入参数处理方法
const { VerifyIdValidator } = require(`${process.cwd()}/app/validators/token-valid`)
// 导入业务处理方法
const TokenModel = require(`${process.cwd()}/app/model/token-model`)
const CommonModel = require(`${process.cwd()}/app/model/common-model`)
const { ParameterValidator, VerifyUserId } = require(`${process.cwd()}/app/validators/common-valid`)
// 请求生成 token
// 参数 必填 id
router.post('/token/generate', async (ctx, next) => {
  // 校验并返回参数 
  const v = await new VerifyIdValidator().validate(ctx)
  let id = await v.get('body.id')
  // 业务处理并返回
  TokenModel.tokenGenerate(id)
})

// 校验 token 合法性
router.post('/token/verify', async (ctx, next) => {
  // 业务处理并返回
  TokenModel.tokenVerify(ctx)
})

// 测试接口
// 参数 必填) a 选填 b
router.all('/test', async (ctx, next) => {
  let info = await CommonModel.getUserInfo(1)
  throw new global.Success({data: info})
})

module.exports = router