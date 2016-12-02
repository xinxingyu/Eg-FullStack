// var request = require('request');

module.exports = {
    index: function* (ctx) {
        yield this.render('test/server/templates/index', {
            "title": "滴滴测试平台",
            "contextPath": "test"
        });
    }
}