module.exports = app => {
    class ManageController extends app.Controller {
        * home(ctx) {
            const { service } = this;
            const cookies = (ctx.request.header.cookie).match(/login=[A-z,2-9]{48}/);
            const login = cookies[0].substr('login='.length);
            const loginSql = yield service.mysql.select(
                'accounts',
                { 'cookie': login },
                ['id', 'username']
            );
            const listSql = yield service.mysql.select(
                'list',
                { 'username': loginSql[0].username },
                ['list', 'listLow']
            )
            if (loginSql.length != 0) {

            };
            yield ctx.render('user/manage.html', { 'test': loginSql[0].username, 'list': listSql })
            //ctx.body = listSql //ctx.request.header



        };
        * addList(ctx) {

        };
        * publish(ctx) {
            const { service } = this;
            const cookies = (ctx.request.header.cookie).match(/login=[A-z,2-9]{48}/);
            const recv = ctx.request.body;
            const date=new Date();
            const login = cookies[0].substr('login='.length);
            const loginSql = yield service.mysql.select(
                'accounts',
                { 'cookie': login },
                ['id', 'username']
            );
            ctx.body=date
            //ctx.body={1:recv,2:date.toJSON}

        };


    };
    return ManageController
}