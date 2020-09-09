/*
  Author: chen
  Description: 主要处理公用的相关业务处理 包括 获取请求用户信息 根据图片或文件的id获取图片或文件信息
  Update: 
*/

const { db } = require(`${process.cwd()}/core/db`)

class CommonModel {
  // 获取图片或文件信息
  static async getFileInfo(id) {
    if(!id) return null
    let sql = 'SELECT id, create_time as createTime, file_path as filePath, place, file_name as fileName, file_size as fileSize, type, remark FROM tb_files WHERE id = ?;'
    let res = await db.query(sql, [id])
    if(res.err) {
      return null
    } else {
       return {
        id: res.data.id,
        createTime: res.data.createTime,
        filePath: global.config.baseUrl + res.data.place + '/' + res.data.filePath,
        fileName: res.data.fileName,
        fileSize: res.data.fileSize,
        fileSizeWord: global.tools.getSizeWord(res.data.fileSize),
        type: res.data.type,
      }
    }
  }
}

module.exports = CommonModel