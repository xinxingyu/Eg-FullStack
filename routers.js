var traffic = require('./src/traffic/server/controller/index');
var test = require('./src/test/server/controller/index');

module.exports = function (app) {
    app.get('/traffic/', traffic.index);
    app.get('/test/', test.index);
};
