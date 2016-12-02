var path = require('path');
var koa = require('koa');
var server = require('koa-static');
var Logger = require('mini-logger');
var fs = require('fs');
// var config = require('./config/config');
var router = require('koa-router');
var validator = require('koa-validator');
var bodyParser = require('koa-bodyparser');
var onerror = require('koa-onerror');
// var xtplApp = require('xtpl/lib/koa');
var render = require('koa-ejs');
var staticCache = require('koa-static-cache');
var appRouter = require('./routers');

var webpack = require('webpack');
// var webpackConfig = require('./config/webpack.config');
var webpackConfig = require('./build/webpack.dev.conf');
var webpackDevMiddleware = require('koa-webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var exec = require('child_process').exec;

var config = require('./config');
if (!process.env.NODE_ENV) process.env.NODE_ENV = config.dev.env
var port = process.env.PORT || config.dev.port;

var app = new koa();

app.use(function* (next) {
    //config 注入中间件，方便调用配置信息
    if (!this.config) {
        this.config = config;
    }
    yield next;
});

//log记录

var logger = Logger({
    dir: config.dev.logDir,
    format: 'YYYY-MM-DD-[{category}][.log]'
});

//router use : this.logger.error(new Error(''))
app.context.logger = logger;

onerror(app);

render(app, {
    // root: path.resolve(__dirname, './_templates/'),
    root: process.env.NODE_ENV === 'production'
			? path.resolve(__dirname, './templates/')
			: path.resolve(config.dev.assetsRoot, './templates/'),
    layout: 'layout/layout',
    viewExt: 'html',
    cache: false,
    debug: true
});

// xtplApp(app, {
//     views: config.dev.viewDir
// });



/*
var redisStore = require('koa-redis')(config.redis);
app.redis = redisStore.client;

//session中间件
var session = require('koa-generic-session');

    var sessionConfig = {
    store: redisStore,
    prefix: 'eagle:sess:',
    key: 'eagle.sid'
    };

app.use(session(sessionConfig));*/


//post body 解析
app.use(bodyParser());

app.use(validator());

//静态文件cache
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
    // var staticPath = config.dev.staticDir;
app.use(staticCache(staticPath + '/js'));
app.use(staticCache(staticPath + '/css'));

//路由
// app.use(router.routes()).use(router.allowedMethods());
app.use(router(app));

// appRouter(router);
appRouter(app);
//
if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development') {
    var compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler, {
        hot: true,
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true,
            chunks: false
        }
    }));

    var hotMiddleware = webpackHotMiddleware(compiler);

    app.use(function* (next) {
        yield hotMiddleware.bind(null, this.req, this.res);
        yield next;
    });

    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-after-emit', function (
            data, cb) {
            hotMiddleware.publish({
                action: 'reload'
            });
            cb();
        })
    })
}

execWebpack();

fs.watch('./templates/', function () {
    execWebpack()
});

function execWebpack() {
    exec('webpack --config build/webpack.dev.conf.js --progress --hide-modules',
        function (err, stdout, stderr) {
            if (err) {
                console.error(stderr);
            } else {
                console.log(stdout);
            }
        });
}

app.use(server(path.resolve(__dirname, './dist/'), {}));
app.use(server(path.resolve(__dirname, './assets/'), {}));
app.use(server(path.resolve(__dirname, './views/'), {}));


app.listen(port);

console.log('listening on port %s', port);

module.exports = app;
