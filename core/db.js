/*
  Author: chen
  Description: 主要用于连接MySQL数据库 包括普通查询（一次只执行一条sql查询） 事务查询（一次按顺序执行多条sql查询）
  Update: 
*/

const mysql = require('mysql2')
const Async = require('async')

const pool = mysql.createPool({
  host: global.config.database.host,
  user: global.config.database.user,
  password: global.config.database.password,
  database: global.config.database.dbName,
  port: global.config.database.port,
  connectionLimit: global.config.database.connectionLimit,
})

class Mysql {
  constructor() { }

  // 普通查询 data可以是单个字符串，也可以是数组
  static query(sql, data) {
    return new Promise((reslove) => {
      pool.query(sql, data, (err, results) => {
        if (err) {
          reslove({
            err: `服务器发生错误，数据库查询语句出错 sql=${sql} data=${data}`,
            data: null
          })
        } else {
          reslove({
            err: null,
            data: results
          })
        }
      })
    })
  }

  // 事务查询（一次按顺序执行多条sql查询，且不依赖上一条查询结果） 参数数组对象 [{sql, data}, ...]
  static execTrans(sqlParams) {
    return new Promise((resolve) => {
      pool.getConnection((err, connection) => {
        if (err) {
          throw new global.HttpException('服务器发生错误，数据库连接创建失败')
        } else {
          // 开启事务
          connection.beginTransaction(err2 => {
            if (err2) {
              throw new global.HttpException('服务器发生错误，事务开启失败')
            } else {
              // 处理多条sql语句
              let sqlList = _handleExecTransSQLParams(connection, sqlParams)
              // 串联执行多个异步
              Async.series(sqlList, (err3, res3) => {
                if (err3) {
                  // 回滚事务
                  connection.rollback(() => {
                    connection.release()
                    throw new global.HttpException('服务器发生错误，事务执行失败')
                  })
                } else {
                  connection.commit((err4, res4) => {
                    if (err4) {
                      connection.rollback(() => {
                        connection.release()
                        throw new global.HttpException('服务器发生错误，事务执行失败')
                      })
                    } else {
                      connection.release()
                      resolve({
                        err: null,
                        data: res3
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    })
  }
}

// 处理多条SQL语句
function _handleExecTransSQLParams(connection, sqlParams) {
  let arr = []
  sqlParams.forEach(item => {
    let temp = function (cb) {
      let sql = item.sql
      let data = item.data
      connection.query(sql, data, (err, results) => {
        if (err) {
          connection.rollback(() => {
            connection.release()
            throw new global.HttpException(`服务器发生错误，数据库查询语句出错 sql=${sql} data=${data}`)
          })
        } else {
          cb(null, results)
        }
      })
    }
    arr.push(temp)
  })
  return arr
}

module.exports = {
  db: Mysql
}