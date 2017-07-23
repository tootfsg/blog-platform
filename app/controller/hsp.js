module.exports = app => {
    class HspController extends app.Controller {
        * username() {
            const { service } = this;
            const recv = this.ctx.params.username;
            const listSql = yield service.mysql.select(
                'list',
                { 'username': recv },
                ['username', 'list', 'listLow']);
            const hspSql = yield service.mysql.select(
                'hsp',
                { 'username': recv },
                ['id', 'username', 'listLow', 'h', 's', 'date', 'likes'],
                ['likes', 'desc']);
            yield this.ctx.render('blog/hsp.html', {
                name: true,
                list: listSql,
                hsp: hspSql
            })

        };
        * list() {
            const { service } = this;
            const recv = this.ctx.params;
            const listSql = yield service.mysql.select(
                'list',
                { 'username': recv.username },
                ['username', 'list', 'listLow']);
            const hspSql = yield service.mysql.select(
                'hsp',
                { 'username': recv.username, 'listLow': recv.list },
                ['id', 'username', 'listLow', 'h', 's', 'date', 'likes'],
                ['likes', 'desc']);

            yield this.ctx.render('blog/hsp.html', {
                namelist: true,
                list: listSql,
                hsp: hspSql
            })
            //this.ctx.body = this.ctx.params
        };
        * hsp() {
            const { service } = this;
            const recv = this.ctx.params;
            const listSql = yield service.mysql.select(
                'list',
                { 'username': recv.username },
                ['username', 'list', 'listLow']);
            const hspSql = yield service.mysql.select(
                'hsp',
                { 'id': recv.id },
                ['username', 'h', 'p', 'date', 'likes']);
            yield this.ctx.render('blog/hsp.html', {
                namelistid: true,
                list: listSql,
                hsp: hspSql
            })
            //this.ctx.body = this.ctx.params
        };

    };
    return HspController
}