/*
  Author: chen
  Description: 自定义业务常用的 js 方法（普通的js工具方法可使用 lodash 提供的方法，如 global._XXX ）
  Update: 
*/

/*
  方法集合说明：
  getTimeValue() 获取当前时间戳
  参数 无

  toParse(params) 将JSON字符串转为 对象或数组 并返回
  参数 params JSON格式的字符串

  toStringify(param) 转为JSON格式字符串 并返回
  参数 params 对象或数组

  getSizeWord(size) 将文件大小转为可描述文字
  参数 size 文件大小，单位 K

  random(lower, upper) 返回 [lower, upper] 的随机整数
  参数 lower 最小值； upper 最大值

  getFileName(fileName, count = 5, type = false) 返回随机文件名
  参数 fileName 原文件名(包含后缀名)； count 遍历次数； type 文件名类(false 时间戳+随机数，true 原文件名+时间戳+随机数)

  getCamelCase(obj, type = '_') 将对象键值名 由指定字符（默认下划线）转为驼峰命名
  参数 obj 对象 type 指定字符(默认下划线)

*/

const tools = {
  // 获取当前时间戳
  getTimeValue() {
    return new Date().valueOf()
  },

  // 将JSON字符串转为 对象或数组 并返回
  toParse(param) {
    if (param) {
      try {
        let newParam = JSON.parse(param)
        return newParam
      } catch (e) {
        return param
      }
    } else {
      return param
    }
  },

  // 转为JSON格式字符串 并返回
  toStringify(param) {
    if (param) {
      try {
        let newParam = JSON.stringify(param)
        return newParam
      } catch (e) {
        return params
      }
    } else {
      return param
    }
  },

  // 将文件大小转为可描述文字
  getSizeWord(size) {
    try {
      let size1 = size / 1024 / 1024
      let size2 = size / 1024
      if (size1 >= 1) {
        return size1.toFixed(2) + 'M'
      } else if (size2 >= 1) {
        return size2.toFixed(2) + 'KB'
      } else {

        return size ? parseInt(size) + 'B' : 0
      }
    } catch (e) {
      return 0
    }
  },

  // 返回 [lower, upper] 的随机整数
  random(lower, upper) {
    return Math.floor(Math.random() * (upper - lower + 1)) + lower
  },

  // 返回随机文件名 参数1 原文件名（包含后缀名） 参数2 遍历次数 参数3 文件名类型 false => 时间戳+随机数 true => 原文件名+时间戳+随机数
  getFileName(fileName, count = 5, type = false) {
    let timestamp = new Date().valueOf()
    let index = fileName.lastIndexOf('.')
    if (index === -1)
      throw new global.errs.ParameterException('上传的文件格式有错误')
    let name = fileName.substring(0, index)
    let suffix = fileName.substring(index)
    let arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    for (let i = 0; i < count; i++) {
      let num = tools.random(0, 35)
      timestamp += arr[num]
    }
    let newFileName = timestamp + suffix
    if (type) newFileName = name + '-' + newFileName
    return newFileName
  },

  // 将对象键值名 由指定字符（默认下划线）转为驼峰命名
  getCamelCase(obj, type = '_') {
    let o = {}
    if (global._.isPlainObject(obj)) {
      // 将字符串转为驼峰命名
      let _getCamelCase = str => {
        let arr = str.split(type)
        return arr.map((item, index) => {
          if (index === 0) return item
          return item.charAt(0), toUpperCase() + item.slice(1)
        }).join('')
      }
      for (let key in obj) {
        let oKey = _getCamelCase(key)
        o[oKey] = obj[key]
      }
      return o
    } else {
      return obj
    }
  }
}

module.exports = tools