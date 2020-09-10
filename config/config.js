/*
  Author: chen
  Description: 全局参数配置
  Update: 
*/

// 环境变量 dev 开发环境 prod 生产环境
const Env = process.argv[2]

const Config = () => {
  switch (Env) {
    case 'dev': // 测试环境配置
      return {
        environment: Env, // 环境
        verifyToken: false, // 是否校验token
        httpPort: 3000, // http 服务端口号
        httpsPort: 443, // https 服务端口号
        baseUrl: 'http://localhost:3000/', // 服务器请求前缀
        fileUrl: 'http://localhost:3000/files/', // 文件静态资源前缀
        imgUrl: 'http://localhost:3000/images/', // 图片静态资源前缀
        ueImgUrl: 'http://localhost:3000/ueimages/', // ue富文本编辑图片保存地址前缀
        maxFieldsSize: 20 * 1024 * 1024, // 文件上传最大限制 20M
        securityToken: { // token 配置
          secretKey: 'mytoken', // 秘钥
          expiresIn: 60 * 60 * 24 * 30 // 有效期30天
        },
        database: { // 数据库配置
          dbName: 'dormitory', // 数据库名称
          user: 'root', // 用户名称
          password: 'CPLabc603.', // 用户密码
          host: '106.55.153.80', // 主机
          port: 3306, // 数据库端口号
          connectionLimit: 500, // 最大连接数
        }
      }
      break;

    case 'prod': // 生产环境配置
      return {
        environment: Env, // 环境
        verifyToken: true, // 是否校验token
        httpPort: 3000, // http 服务端口号
        httpsPort: 443, // https 服务端口号
        baseUrl: 'http://106.55.153.80:3000/', // 服务器请求前缀
        fileUrl: 'http://106.55.153.80:3000/files/', // 文件静态资源前缀
        imgUrl: 'http://106.55.153.80:3000/images/', // 图片静态资源前缀
        ueImgUrl: 'http://106.55.153.80:3000/ueimages/', // ue富文本编辑图片保存地址
        maxFieldsSize: 20 * 1024 * 1024, // 文件上传最大限制 20M
        securityToken: { // token 配置
          secretKey: 'this_is_the_secret_key_123456_abcdef_!@#$%^', // 秘钥
          expiresIn: 60 * 60 * 2 // 有效期 2小时
        },
        database: { // 数据库配置
          dbName: 'dormitory', // 数据库名称
          user: 'root', // 用户名称
          password: 'CPLabc603.', // 用户密码
          host: '106.55.153.80', // 主机
          port: 3306, // 数据库端口号
          connectionLimit: 500, // 最大连接数
        }
      }
      break;
  }
}

module.exports = Config()