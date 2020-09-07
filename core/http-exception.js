/*
  Author: chen
  Description: 设置常用异常类，便于统一对异常的处理
  Update: 
*/

// 处理参数
function _handleParams(params) {
  if(global._.isPlainObject(params)) {
    return params
  } else if(global._.isArray(params) || global._.isNumber(params) || global._.isString(params) || global._.isBoolean(params)) {
    return { msg: params }
  } else {
    return {}
  }
}

// 错误类
class HttpException extends Error {
  constructor(params) {
    super()
    params = _handleParams(params)
    this.msg = params.msg || '服务器发生错误'
    this.errcode = params.errcode || 500
    this.code = params.code || 200
    this.data = params.data
    this.total = params.total || 0
  }
}

// 参数异常类
class ParameterException extends HttpException {
  constructor(params) {
    super()
    params = _handleParams(params)
    this.msg = params.msg || '参数错误'
    this.errcode = params.errcode || 400
    this.code = params.code || 200
    this.data = params.data
    this.total = params.total || 0
  }
}

// 资源未找到异常
class NotFoundException extends HttpException {
  constructor(params) {
    super()
    params = _handleParams(params)
    this.msg = params.msg || '资源不存在'
    this.errcode = params.errcode || 404
    this.code = params.code || 200
    this.data = params.data
    this.total = params.total || 0
  }
}

// 权限不足禁止访问异常类
class ForbiddenException extends HttpException {
  constructor(params) {
    super()
    params = _handleParams(params)
    this.msg = params.msg || '权限不足'
    this.errcode = params.errcode || 403
    this.code = params.code || 200
    this.data = params.data
    this.total = params.total || 0
  }
}

// 授权失败异常类
class AuthException extends HttpException {
  constructor(params) {
    super()
    params = _handleParams(params)
    this.msg = params.msg || '授权失败'
    this.errcode = params.errcode || 401
    this.code = params.code || 200
    this.data = params.data
    this.total = params.total || 0
  }
}

// 成功类（特殊异常类，通过抛出成功类型的异常来返回数据）
class Success extends HttpException {
  constructor(params) {
    super()
    params = _handleParams(params)
    this.msg = params.msg || '操作成功'
    this.errcode = params.errcode || 0
    this.code = params.code || 201
    this.data = params.data
    this.total = params.total || 0
  }
}

module.exports = {
  HttpException,
  ParameterException,
  NotFoundException,
  ForbiddenException,
  AuthException,
  Success
}