'use strict';

module.exports = app => {
  //app.get('/', app.controller.home.index);
  //app.post('/', app.controller.home.index);
  //app.get('/news', app.controller.news.list);
  //app.get('/home',app.controller.home)
  // app.get('/login', 'blog.login');
  // app.post('/jumping', 'blog.jumping');
  // app.get('/index', 'blog.index');
  // app.get('/index/:type', 'blog.plist');

  app.get('/1/:params', 'test.test1');
  app.get('/2', 'test.test2');
  app.get('/3', 'test.test3');
  // app.get('/test/:mail', 'test.test');


  app.get('/', 'blog.index')
  app.get('/index', 'blog.index');
  app.get('/blog/:username', 'hsp.username');
  app.get('/blog/:username/:list', 'hsp.list');
  app.get('/blog/:username/:list/:id', 'hsp.hsp');

  app.get('/user/index', 'user.index');
  app.post('/user/login', 'user.login');
  app.post('/user/register', 'user.register');
  app.post('/user/reset', 'user.reset');
  app.get('/user/reset/:address', 'user.resetpage');
  app.get('/user/reset/:address/:password', 'user.getreset');

  app.get('/user/manage', 'manage.home');

  app.post('/manage/publish', 'manage.publish');
  
  //ajax发送注册验证码{ip,验证码类型，验证码},

  // app.get('/hsp/:owner', 'home.index');
  // app.get('/hsp/:owner/:list', 'home.index');
  // app.get('/hsp/:owner/:list/:article', 'home.index')
};