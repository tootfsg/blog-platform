module.exports = app => {
    class Mysql extends app.Service {
        //单数据库操作
        * select(table, where, columns, order, limit, offset) {
            const object = {};
            object['where'] = where;
            if (Boolean(columns)) { object['columns'] = columns; };
            if (Boolean(order)) { object['orders'] = [order] };
            if (Boolean(limit)) { object['limit'] = limit };
            if (Boolean(offset)) { object['offset'] = offset };
            const result = yield app.mysql.select(table, object);
            return result
        };
        * update(table, object) {
            const result = yield app.mysql.update(table, object);
            const status = result.affectedRows;
            if (status === 1) {
                return true
            } else {
                return false
            }
        };
        * insert(table, object) {
            const result = yield app.mysql.insert(table, object);
            const status = result.affectedRows;
            if (status === 1) {
                return true
            } else {
                return false
            }
        };//
        * delete() {
            //暂无
        }
    };
    return Mysql
}