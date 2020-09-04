/*
  Author: chen
  Description: api 白名单配置，配置后可跳过 token 验证
  Update: 
*/

const apiWhiteList = [
  // 不需要 token 校验的 api
  {
    path: '/api/test',
    method: ['GET', 'POST']
  }
]

// 需要校验 token 返回 true 否则返回 false
const judgeToken = (method, path) => {
  for(let i = 0, len = apiWhiteList.length; i < len; i++) {
    let flag = apiWhiteList[i]['method'].indexOf(method) !== -1 && apiWhiteList[i]['path'] === path
    if(flag) return false
  }
  return true
}

module.exports = judgeToken