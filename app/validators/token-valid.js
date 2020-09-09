/*
  Author: chen
  Description: token 模块参数相关校验方法
  Update: 
  remark: 自定义校验规则在校验类型 以 validate 开头定义方法即可
*/

const { Rule, LinValidator } = require(`${process.cwd()}/core/lin-validator`)

// 校验 id 是否存在
class VerifyIdValidator extends LinValidator {
  constructor() {
    super()
    this.id = [new Rule('isLength', '参数必传', { min: 1 })]
  }

  async validateIsId(vals) {
    const { db } = require(`${process.cwd()}/core/db`)
    let id = vals.body.id
    const sql = `SELECT id FROM tb_admin WHERE id = ?;`
    const res = await db.query(sql, id)
    if(res.err) {
      throw new Error(res.err)
    } else if(!res.data[0]) {
      throw new Error('用户账号不存在')
    }
  }
}

module.exports = {
  VerifyIdValidator
}