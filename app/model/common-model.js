/*
  Author: chen
  Description: 主要处理公用的相关业务处理 包括 获取请求用户信息 根据图片或文件的id获取图片或文件信息
  Update: 
*/

const { db } = require(`${process.cwd()}/core/db`)

class CommonModel {
  // 获取图片或文件信息 
  // 参数1 ids 
  // 参数2 false 默认返回详细信息 true 只返回url 
  // 参数3 false 无数据返回null 只有一个返回对象或url 两个及以上返回数组对象或url true 默认返回数组 
  static async getFileInfo(ids, onlyUrl, formatArr) {
    if (!ids) return formatArr ? [] : null
    let sql = 'SELECT id, create_time as createTime, file_path as filePath, place, file_name as fileName, file_size as fileSize, type, remark FROM tb_files WHERE FIND_IN_SET(id, ?);'
    let res = await db.query(sql, [ids])
    let data = res.data
    if (res.err) return formatArr ? [] : null
    let handleObj = obj => {
      return {
        id: obj.id,
        createTime: obj.createTime,
        filePath: global.config.baseUrl + obj.place + '/' + obj.filePath,
        fileName: obj.fileName,
        fileSize: obj.fileSize,
        fileSizeWord: global.tools.getSizeWord(obj.fileSize),
        type: obj.type,
      }
    }
    let handlePath = obj => global.config.baseUrl + obj.place + '/' + obj.filePath
    if (data.length >= 2) {
      let arr = []
      data.forEach(item => {
        onlyUrl ? arr.push(handlePath(item)) : arr.push(handleObj(item))
      })
      return arr
    } else if (data.length == 1) { // 只有一个数据查询返回是对象
      if (onlyUrl)
        return formatArr ? [handlePath(data[0])] : handlePath(data[0])
      return formatArr ? [handleObj(data[0])] : handleObj(data[0])
    }
    return formatArr ? [] : null
  }
}

module.exports = CommonModel