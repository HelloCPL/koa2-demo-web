/*
  Author: chen
  Description: 主要处理文件相关操作 包括 单个图片上传与删除 单个文件上传与删除
  Update: 
*/

// 导入路由
const Router = require('koa-router')
const router = new Router({ prefix: '/api' })
// 导入业务处理方法
const UploadFileModel = require(`${process.cwd()}/app/model/upload-file-model`)
const { ParameterValidator } = require(`${process.cwd()}/app/validators/common-valid`)

// 单个图片上传
router.post('/img/upload', async (ctx, next) => {
  await UploadFileModel.imgUpload(ctx)
})

// 单个图片删除
// 参数 必填 id
router.get('/img/delete', async (ctx, next) => {
  const v = await new ParameterValidator({
    key: 'id',
    rules: ['isLength', '参数必填', { min: 1 }]
  }).validate(ctx)
  await UploadFileModel.fileDelete(await v.get('query.id'))
})

// 单个文件上传
router.post('/file/upload', async (ctx, next) => {
  await UploadFileModel.fileUpload(ctx)
})

// 单个文件删除
// 参数 必填 id 
router.get('/file/delete', async (ctx, next) => {
  const v = await new ParameterValidator({
    key: 'id',
    rules: ['isLength', '参数必填', { min: 1 }]
  }).validate(ctx)
  await UploadFileModel.fileDelete(await v.get('query.id'))
})

module.exports = router