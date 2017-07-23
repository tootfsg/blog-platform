module.exports = app => {
    class BlogController extends app.Controller {
        * index() {
            const { service } = this;
            const bloggerSqlBylikes = yield service.mysql.select(
                'accounts',
                {},
                ['blogger', 'username'],
                ['likes', 'desc']);
            const hspSql = yield service.mysql.select(
                'hsp',
                {},
                ['id', 'username', 'list', 'h', 's', 'date', 'likes'],
                ['date', 'desc']);
            yield this.ctx.render('blog/index.html', {
                'list': bloggerSqlBylikes,
                'hsp': hspSql
            })
        }
    };
    return BlogController
}
// * login() {
//         yield this.ctx.render('blog/login.html')
//     };
//     * jumping() {
//         function rdString(len) {
//             len = len || 48;
//             let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
//             let maxPos = $chars.length;
//             let pwd = '';
//             for (let i = 0; i < len; i++) {
//                 pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
//             }
//             return pwd;
//         }
//         const userRecv = this.ctx.request.body;
//         const userSql = yield app.mysql.select('accounts', {
//             where: { 'name': userRecv.name },
//             columns: ['name', 'password'],
//             orders: [['id', 'asc']],
//             limit: 1,
//             offset: 0
//         });
//         if (userSql && userSql.length) {
//             if (userSql[0].password === userRecv.password) {
//                 yield this.ctx.render('blog/jumping', { 'h1': '登陆成功', 'btn_type': 'success', 'href': '/index', 'text': '进入首页' })
//                // const token = rdString();
//             } else {
//                 yield this.ctx.render('blog/jumping', { 'h1': '密码错误', 'btn_type': 'warning', 'href': '/login', 'text': '重新登陆' })
//             }
//         } else {
//             yield this.ctx.render('blog/jumping', { 'h1': '用户名不存在', 'btn_type': 'warning', 'href': '/login', 'text': '重新登陆' })
//         }
//     };
//     * index() {
//         const blogname = yield app.mysql.select('accounts', {
//             where: { 'name': 'self' },
//             columns: ['blogname'],
//             orders: [['id', 'asc']],
//             limit: 0,
//             offset: 0
//         });
//         const list = yield app.mysql.select('list', {
//             where: { 'name': 'self' },
//             columns: ['list'],
//             orders: [['id', 'asc']],
//             limit: 0,
//             offset: 0
//         });
//         const hsp = yield app.mysql.select('hsp', {
//             where: { 'name': 'self' },
//             columns: ['id', 'h', 's', 'list'],
//             orders: [['id', 'asc']],
//             limit: 0,
//             offset: 0
//         });
//         const navpath = '<li class="active">首頁</li>';
//         var group = '';
//         for (let i = 0; i < list.length; i++) {
//             group += '<a href="/index/' + list[i]['list'] + '" class="list-group-item">' + list[i]['list'] + '</a>'
//         }
//         var hs = '';
//         for (let i = 0; i < hsp.length; i++) {
//             hs += '<a href="/index/article' + hsp[i]['id'] + '">' + hsp[i]['h'] + '</a><h6>' + hsp[i]['s'] + '</h6>'
//         };
//         yield this.ctx.render('blog/index.html',
//             {
//                 'blogname': blogname[0]['blogname'],
//                 'list': group,
//                 'navpath': navpath,
//                 'hsp': hs
//             }
//         )
//     };
//     * plist() {
//         const type = this.ctx.params.type;
//         const blogname = yield app.mysql.select('accounts', {
//             where: { 'name': 'self' },
//             columns: ['blogname'],
//             orders: [['id', 'asc']],
//             limit: 0,
//             offset: 0
//         });
//         const list = yield app.mysql.select('list', {
//             where: { 'name': 'self' },
//             columns: ['list'],
//             orders: [['id', 'asc']],
//             limit: 0,
//             offset: 0
//         });
//         const hsp = yield app.mysql.select('hsp', {
//             where: { 'name': 'self', 'list': type },
//             columns: ['id', 'h', 's', 'p'],
//             orders: [['date', 'desc']],
//             limit: 0,
//             offset: 0
//         });
//         var group = '';
//         for (let i = 0; i < list.length; i++) {
//             if (list[i]['list'].toLowerCase() == type.toLowerCase()) {

//                 group += '<a href="/index/' + list[i]['list'] + '" class="list-group-item active">' + list[i]['list'] + '</a>'
//             }
//             else {
//                 group += '<a href="/index/' + list[i]['list'] + '" class="list-group-item">' + list[i]['list'] + '</a>'
//             }
//         };
//         if (type.substr(0, 7) != 'article') {
//             //this.ctx.body = list;
//             const navpath = '<li><a href="/index">首頁</a></li><li class="active">' + type + '</li>';
//             var hs = '';
//             for (let i = 0; i < hsp.length; i++) {
//                 hs += '<a href="/index/article' + hsp[i]['id'] + '">' + hsp[i]['h'] + '</a><h6>' + hsp[i]['s'] + '</h6>'
//             };
//             if (hsp.length != 0) {
//                 yield this.ctx.render('blog/index.html', {
//                     'blogname': blogname[0]['blogname'],
//                     'list': group,
//                     'navpath': navpath,
//                     'hsp': hs
//                 })
//             }
//             else { this.ctx.body = '你沒有發表過文章' }
//         } else {
//             let id = type.substr(7);
//             let hsp = yield app.mysql.select('hsp', {
//                 where: { 'id': id },
//                 columns: ['list', 'h', 'p']
//             });
//             const navpath = '<li><a href="/index/">首頁</a><li><a href="/index/' + hsp[0]['list'] + '">' + hsp[0]['list'] + '</a></li><li class="active">' + hsp[0]['h'] + '</li>'
//             var hp = '';
//             for (let i = 0; i < hsp.length; i++) {
//                 hp += '<h4>' + hsp[0]['h'] + '</h4><p>' + hsp[i]['p'] + '</p>'
//             };
//             if (hsp.length != 0) {
//                 yield this.ctx.render('blog/index.html', {
//                     'blogname': blogname[0]['blogname'],
//                     'list': group,
//                     'navpath': navpath,
//                     'hsp': hp
//                 })
//             }
//         }
//     //