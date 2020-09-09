/*
  Author: chen
  Description: 主要处理图片文件相关业务处理与数据返回
  Update: 
*/

const path = require('path')
const fs = require('fs')
const { db } = require(`${process.cwd()}/core/db`)

class UploadFileModel {
  // 上传图片
  static async imgUpload(ctx) {
    let imgInfo = await UploadFileModel._getUploadInfo(ctx, 'images')
    if (global._.isPlainObject(imgInfo)) {
      throw new global.Success({
        data: imgInfo
      })
    } else {
      throw new global.HttpException('服务器发生错误，上传失败')
    }
  }

  // 上传文件
  static async fileUpload(ctx) {
    let fileInfo = await UploadFileModel._getUploadInfo(ctx, 'files')
    if (global._.isPlainObject(fileInfo)) {
      throw new global.Success({
        data: fileInfo
      })
    } else {
      throw new global.HttpException('服务器发生错误，上传失败')
    }
  }

   // 删除图片或文件
   static async fileDelete(id) {
    let sql = 'SELECT id, place, file_path as filePath FROM tb_files WHERE id = ?;'
    let data = [id]
    let res = await db.query(sql, data)
    if (res.err) {
      throw new global.HttpException(res.err )
    } else {
      let imgInfo = res.data[0]
      let sql2 = 'DELETE FROM tb_files WHERE id = ?;'
      let res2 = await db.query(sql2, data)
      if (res2.err) {
        throw new global.HttpException(res2.err)
      } else {
        if (res2.data && res2.data.affectedRows) {
          await _deleteFileInfo(imgInfo)
          throw new global.Success()
        } else {
          throw new global.HttpException('删除失败，该id不存在')
        }
      }
    }
  }

  // 获取图片文件上传信息
  static async _getUploadInfo(ctx, place) {
    try {
      const file = ctx.request.files.file
      // 创建可读流
      const reader = fs.createReadStream(file.path)
      let filePath = global.tools.getFileName(file.name)
      let targetPath = path.join(__dirname, `../../static/${place}/`, filePath)
      const upStream = fs.createReadStream(targetPath)
      reader.pipe(upStream)
      let createTime = global.tools.getTimeValue()
      let sqlList = [
        {
          sql: 'INSERT tb_files (create_time, file_path, place, file_name, file_size, type) VALUES(?, ?, ?, ?, ?, ?);',
          data: [createTime, filePath, place, file.name, file.size, file.type]
        },
        {
          sql: 'SELECT LAST_INSERT_ID();'
        }
      ]
      let res = await db.execTrans(sqlList)
      if (res.err) {
        throw new global.HttpException(res.err)
      } else {
        return {
          id: res.data[1][0]['id'],
          createTime: createTime,
          filePath: global.config.baseUrl + place + '/' + filePath,
          fileName: file.name,
          fileSize: file.size,
          fileSizeWord: global.tools.getSizeWord(file.size),
          type: file.type
        }
      }
    } catch (e) {
      return null
    }
  }

  // 删除图片文件
  static async _deleteFileInfo(fileInfo) {
    let filePath = path.join(__dirname, `../../static/${place}/`, fileInfo.filePath)
    let stat = fs.statSync(filePath)
    if (stat.isFile()) {
      fs.unlinkSync(filePath)
    }
  }
}

module.exports = UploadFileModel