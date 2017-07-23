const nodemailer = require('nodemailer');
module.exports = app => {
    class Mail extends app.Service {
        * sendMail(mail, text) {
            const transport = nodemailer.createTransport({
                service: 'qq',
                auth: {
                    user: '1562195128@qq.com',
                    pass: 'kskzxwpydriuhcih'
                    //user: '885516520@qq.com',
                    //pass: 'iyecdomfygflbfhb'
                }
            });
            const config = {
                from: '1562195128@qq.com',//'1562195128@qq.com ', // sender address
                to: mail, // list of receivers
                subject: '重置/激活服务', // Subject line
                text: '重置链接为http:/127.0.0.1/user/reset/' + text, // plaintext body
                //html: body,
            };
            transport.sendMail(config, function (error, info) {
                //console.log(info);
                if (error) {
                    return 0
                }
            });
        };//sendMail结束
        * sendSMS(number, text) {

        }//短信接口，

    }//结束定义的类
    return Mail
};//
