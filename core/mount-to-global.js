/*
  Author: chen
  Description: 将常用的变量或方法挂载到 global 全局变量中
  Update: 
*/

const mountToGlobal = () => {
  // 将lodash挂载到全局 global 上
  const _ = require('lodash')
  global._ = _

  // 将全局配置挂载到全局 global 中
  const config = require(`${process.cwd()}/config/config`)
  global.config = config

  // 将常用全局异常类挂载到 global 中
  const {
    HttpException,
    ParameterException,
    NotFoundException,
    ForbiddenException,
    AuthException,
    Success
  } = require(`${process.cwd()}/core/http-exception`)
  global.HttpException = HttpException
  global.ParameterException = ParameterException
  global.NotFoundException = NotFoundException
  global.ForbiddenException = ForbiddenException
  global.AuthException = AuthException
  global.Success = Success

  // 将常用的业务自定义方法挂载到 global 上
  const tools = require(`${process.cwd()}/core/tools`)
  global.tools = tools
}

module.exports = mountToGlobal 
