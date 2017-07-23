module.exports = app => {
    class Text extends app.Service {
        * rdString(len) {
            len = len || 48;
            let chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';//57位
            let maxPos = chars.length;
            let pwd = '';
            for (let i = 0; i < len; i++) {
                pwd += chars.charAt(Math.floor(Math.random() * maxPos))
            }
            return pwd
        }; //默认生成48位的随机数,带一位可空的长度参数number,去除Oo，Ll,I1
        * isMail(str) {
            if (str == '') { return false }
            if (str.charAt(0) == "." || str.charAt(0) == "@" || str.indexOf('@', 0) == -1
                || str.indexOf('.', 0) == -1 || str.lastIndexOf("@") == str.length - 1 || str.lastIndexOf(".") == str.length - 1)
                return false;
            else
                return true;
        };//验证邮箱格式
        * nowDate() {
            const date = new Date();
            return (date.toISOString()).substr(0, 10)
        }
    } return Text;
};





