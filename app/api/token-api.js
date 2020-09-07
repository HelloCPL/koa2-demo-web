/*
  Author: chen
  Description: 主要输出 token 有关api 包括 请求生成token 校验token合法性 登录
  Update: 
*/

// 导入路由
const Router = require('koa-router')
const router = new Router({ prefix: '/api' })

// 导入参数处理方法
const {
  verifyIdValidator
} = require(`${process.cwd()}/app/validators/token-valid`)
// 导入业务处理方法

// 请求生成 token
// 参数 id(必填)
router.post('/token/generate', async (ctx, next) => {
  // 校验并返回参数 
  const v = await new verifyIdValidator().validate(ctx)
  console.log(123, v);
  throw new global.Success({
    data: 'sdfsdf第三方的时代'
  })
})

router.post('/token/generate123', async (ctx, next) => {
  // 校验并返回参数 
  // const v = await new verifyIdValidator().validate(ctx)
  // console.log(v);
  throw new global.Success({
    data: 'sdfsdf第三方的时代'
  })
})




module.exports = router