/*
  Author: chen
  Description: koa2 项目入口 主要用户 设置http/https监听
  Update: 
*/

// 导入内置模块 http/https fs 
const http = require('http')
const https = require('https')
const fs = require('fs')

// 导入koa
const Koa = require('koa')

// 导入项目自定义初始化文件
const InitManager = require('./init')

// 创建 koa 实例
const app = new Koa()

// ---------------------- 业务处理 --------------------
// 初始化
InitManager.init(app)

// 设置 http 监听
http.createServer(app.callback())
.listen(global.config.httpPort, () => {
  console.log(`Http Service(${global.config.httpPort}) Running...`);
})

// 设置 https 监听
const sslify = require('koa-sslify').default
app.use(sslify())
// 注意：.key文件和.crt文件 SSl 证书需要自行到腾讯云或阿里云获取
const httpsOptions = {
  key: fs.readFileSync('./httpskey/2_www.cpl.ajsj.work.key'),
  cert: fs.readFileSync('./httpskey/1_www.cpl.ajsj.work_bundle.crt')
}
https.createServer(httpsOptions, app.callback())
.listen(global.config.httpsPort, () => {
  console.log(`Https Service(${global.config.httpsPort}) Running...`)
})