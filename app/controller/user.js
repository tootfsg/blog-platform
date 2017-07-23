'use strict'
module.exports = app => {
	class UserController extends app.Controller {
		* index() { yield this.ctx.render('user/index.html') };
		//登陆
		* login() {
			const { service } = this;
			//接收登陆post的值[登陆类型[username,mail],密码]，查询数据库的id，密码，状态
			const userRecv = this.ctx.request.body;
			const logintype = userRecv.logintype;//登录类型，客户端根据判断是username(还是nickname(有中文字符))还是mail
			const where = {};
			where[logintype] = userRecv.username;
			const userSql = yield service.mysql.select('accounts', where, ['id', 'password', 'status']);
			//判断顺序❶数组正常、状态正常、密码正常❷select空数组❸数组正常、状态正常but密码错误❹数组正常but未激活
			if (userSql.length != 0  && userSql[0].password === userRecv.password) {
				const cookies = yield service.text.rdString();
				this.ctx.cookies.set('login', cookies);
				const updateSql = yield service.mysql.update('accounts', { 'id': userSql[0].id, 'cookie': cookies });
				if (updateSql) {
					this.ctx.body = { 'status': 1, 'text': '成功登陆', 'href': '此处返回用户管理界面' }
				} else {
					this.ctx.body = { 'status': 1, 'text': '成功登陆,cookies更新错误', 'href': '此处返回用户管理界面' }
				};
				return
			};
			if (userSql.length === 0) {
				this.ctx.body = { 'status': 0, 'text': '用户名不存在' };
				return
			};
			if (userSql.length != 0 && userSql[0].status === 1 && userSql[0].password != userRecv.password) {
				this.ctx.body = { 'status': 0, 'text': '密码错误' };
				return
			};
			//this.ctx.body=userSql
			// if (userSql.length != 0 && userSql[0].status === 0) {
			// 	this.ctx.body = { 'status': 0, 'text': '该用户未激活，请通过重置密码激活' };
			// 	return
			// }
		};
		//注册
		* register() {
			const { service } = this;
			//const ip = this.ctx.request.header.host;
			const userRecv = this.ctx.request.body;
			//ajax.post请求格式{用户名，密码}
			const nameSql = yield service.mysql.select('accounts', { 'username': userRecv.username });
			if (nameSql.length === 0) {
				const date = yield service.text.nowDate();
				const insert = yield service.mysql.insert('accounts', {
					'username': userRecv.username,
					'password': userRecv.password,
					'dateReg': date
				});
				if (insert) {
					this.ctx.body = { 'status': '1', 'text': '注册成功', 'href': '这里填写用户管理界面的地址' };
					return
				} else {
					this.ctx.body = { 'status': '0', 'text': '未知错误' };
					return
				}

			} else {
				this.ctx.body = { 'status': '0', 'text': '用户名已存在' };
				return
			}
			//const mailSql = yield service.mysql.select('accounts', { 'mail': userRecv.mail }, ['status']);
			//const nickSql = yield service.mysql.select('accounts', { 'nickname': userRecv.nickname }, ['status']);
			//const codeSql = yield service.mysql.select('regcode', { 'ip': ip }, ['code']);
			//验证 username，nickname，mail的合法性
			// if (nameSql.length === 0 && mailSql.length === 0 && nickSql.length === 0) {
			// 	if (codeSql[0].code === code) {
			// 		const insert = yield service.mysql.insert('accounts', {
			// 			'username': userRecv.username,
			// 			'mail': userRecv.mail,
			// 			'nickname': userRecv.nickname,
			// 			'password': userRecv.password,
			// 			'status': 1
			// 		});
			// 		if (insert) {
			// 			this.ctx.body = { 'status': 1, 'text': '注册成功', 'href': '用户管理界面' }
			// 		} else {
			// 			this.ctx.body = { 'status': 0, 'text': '注册失败,未知的原因' }
			// 		}
			// 	} else {
			// 		const insert = yield service.mysql.insert('accounts', {
			// 			'username': userRecv.username,
			// 			'mail': userRecv.mail,
			// 			'nickname': userRecv.nickname,
			// 			'password': userRecv.password,
			// 			'status': 0
			// 		});
			// 		if (insert) {
			// 			this.ctx.body = { 'status': 2, 'text': '注册成功,但未激活', 'href': '/user/reset' }
			// 		} else {
			// 			this.ctx.body = { 'status': 0, 'text': '注册失败,未知的原因' }
			// 		}
			// 	};
			// 	return
			// };
			//
			// if (mailSql.length != 0) {
			// 	this.ctx.body = { 'status': 0, 'text': '邮箱已被注册' };
			// 	return
			// };
			// if (nameSql.length != 0) {
			// 	this.ctx.body = { 'status': 0, 'text': '用户名已被注册' };
			// 	return
			// };
			// if (nickSql.length != 0 && nameSql.length === 0 && mailSql.length === 0) {
			// 	this.ctx.body = { 'status': 0, 'text': '昵称已被注册' };
			// 	return
			// }
		};
		//生成重置链接
		* reset() {
			//ajax.get参数{mail:''}
			const { service } = this;
			const mailRecv = this.ctx.request.body.mail;
			const mailSql = yield service.mysql.select('accounts', { 'mail': mailRecv }, ['id']);
			if (mailSql.length === 0) {
				this.ctx.body = { 'status': 0, 'text': '邮箱未注册' };
				return
			} else {
				const reset = yield service.text.rdString(98);
				const updateSql = yield service.mysql.update('accounts', { 'id': mailSql[0].id, 'reset': reset, 'status': 1 });
				const sendMail = yield service.mail.sendMail(mailRecv, reset);
				//设置临时地址reset的时效
				//console.log(updateSql, status)
				if (updateSql && sendMail === undefined) {
					this.ctx.body = { 'status': 1, 'text': '邮件发送成功,请到邮箱查看邮件' };
					return
				} else {
					this.ctx.body = { 'status': 0, 'text': '出现了一个未知错误，请重新发送' };
					return
				}
			};
		};
		//重置密码页面
		* resetpage() {
			const { service } = this;
			const address = this.ctx.params.address;
			const aSql = yield service.mysql.select('accounts', { 'reset': address }, ['id']);
			if (aSql.length != 0) {
				yield this.ctx.render('user/reset.html');
				return

			} else {
				this.ctx.body = '<h1 style="text-align:center;background:yellow;color:red">未知的失效界面</h1>';
				return
			}
		}
		//重置页面提交
		* getreset() {
			const { service } = this;
			const params = this.ctx.params;
			const aSql = yield service.mysql.select('accounts', { 'reset': params.address }, ['id']);
			if (aSql.length === 0) {
				this.ctx.body = { 'status': 0, 'text': '未知的失效界面' };
				return
			} else {
				const deleteSql = yield service.mysql.update('accounts', { 'id': aSql[0].id, 'reset': null });
				if (deleteSql) {
					const updateSql = yield service.mysql.update('accounts', { 'id': aSql[0].id, 'password': params.password });
					if (updateSql) {
						this.ctx.body = { 'status': 1, 'text': '重置成功，请登录' };
						return
					} else {
						this.ctx.body = { 'status': 0, 'text': '出现了一个未知错误，请重新填写' };
						return
					}
				} else {
					this.ctx.body = { 'status': 0, 'text': '出现了一个未知错误，请重新填写' };
					return
				}

				//for (let i = 0; deleteSql.affectedRows != 1;) { yield app.mysql.update('accounts', { 'id': aSql[0], 'reset': '' }) }

			}
		}
	}
	return UserController;
}