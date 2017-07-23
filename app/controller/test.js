
module.exports = app => {
    class NewsController extends app.Controller {
        * test1() {
            this.ctx.body=this.ctx.params
            //yield this.ctx.render('测试页面.html', {
            //     hsp: 'true',
            //     list: { name1: '测试页面1' },
            //     hsp: { 'list': 'hsp测试' }
            // })
        };
        * test2() {
            yield this.ctx.render('测试页面.html', {
                hs: 'true',
                list: { name2: '测试页面2' },
                hsp: { 'list': 'hsp测试' }
            })
        };
        * test3() {
            yield this.ctx.render('测试页面.html', {
                hp: 'true',
                list: { name3: '测试页面3' },
                hsp: { 'list': 'hsp测试' }
            })
        };

    }
    return NewsController;
};