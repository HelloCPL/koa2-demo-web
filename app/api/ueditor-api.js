/*
  Author: chen
  Description: 主要处理前端 ueditor 富文本的图片、视频、文件等上传
  Update: 
*/

const path = require('path')
const Router = require('koa-router')
const router = new Router({
  prefix: '/api'
})
const ueditor = require('koa2-ueditor')

let ueditorPath = '/static/ueimages'
router.all('/ueditor/upload', ueditor(path.join(__dirname, '../../static/ueimages'), {
  imageUrlPrefix: global.config.ueImgUrl,
  imagePathFormat: ueditorPath,
  scrawlPathFormat: ueditorPath,
  snapscreenPathFormat: ueditorPath,
  catcherPathFormat: ueditorPath,
  videoPathFormat: ueditorPath,
  filePathFormat: ueditorPath,
  imageManagerListPath: ueditorPath,
  fileManagerListPath: ueditorPath,
}))