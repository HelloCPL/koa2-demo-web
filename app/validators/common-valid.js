/*
  Author: chen
  Description: 通用的校验方法 包括 普通的参数校验(类型，是否必传等) 判断用户id是否存在
  Update: 
*/

const { Rule, LinValidator } = require(`${process.cwd()}/core/lin-validator`)

// 普通的参数校验方法 
//参数单个可为对象 {key, rules: [[type, msg, rule], [type2, msg2, rule], ...]}
//参数多个为数组 [{key, rules: [[type, msg, rule], ...]}, ...] 
// type类型看官网 https://www.npmjs.com/package/validator https://github.com/validatorjs/validator.js
class ParameterValidator extends LinValidator {
  constructor(rules) {
    super()
    if (global._.isArray(rules)) {
      // 数组
      for (let i = 0, len = rules.length; i < len; i++) {
        let rule = rules[i]
        this._setRule(rule)
      }
    } else if (global._.isPlainObject(rules)) {
      // 对象
      this._setRule(rules)
    } else {
      throw new Error('服务器发生错误，普通参数校验传参有误')
    }
  }

  // 设置校验
  _setRule(rule) {
    if (!global._.isArray(rule.rules)) throw new Error('服务器发生错误，普通参数校验传参有误')
    let ruleList = []
    if (global._.isArray(rule.rules[0])) {
      for (let i = 0, len = rule.rules.length; i < len; i++) {
        let item = rule.rules[i]
        ruleList.push(
          new Rule(item[0], item[1], item[2])
        )
      }
    } else {
      ruleList.push(
        new Rule(rule.rules[0], rule.rules[1], rule.rules[2])
      )
    }
    this[rule.key] = ruleList
  }
}

// 判断用户 id 是否存在
// 参数 id
class VerifyUserId extends LinValidator {
  constructor(userId) {
    super()
    this.userId = userId
  }

  async validateIsId() {
    const { db } = require(`${process.cwd()}/core/db`)
    const sql = `SELECT id FROM tb_admin WHERE id = ?;`
    const res = await db.query(sql, this.userId)
    if(res.err) {
      throw new Error(res.err)
    } else if(!res.data[0]) {
      throw new Error('用户id不存在')
    }
  }
}

module.exports = {
  ParameterValidator,
  VerifyUserId
}