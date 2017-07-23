'use strict';

module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + 'Tot';

  // add your config here
  config.view = {
    mapping: {
      '.html': 'nunjucks',
    },
    defaultViewEngine: 'nunjucks',
  };
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'root',
      // 数据库名
      database: 'blog',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  config.nunjucks = {
    autoescape: true,//模板数据转义
    cache: true
  }
  config.security = {
    csrf: false
  };

  return config;
};