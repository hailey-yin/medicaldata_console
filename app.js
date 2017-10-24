var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var api =  require('./routes/api');
/* 添加的**/
var config = require('./common/config');
var TimingService = require('./service/timing/timingservice');
var underscoreS = require('underscore.string');
var session = require('express-session');
var SessionStore = require('express-mysql-session')(session);
var auth = require('./routes/auth');

var app = express();

// view engine setup
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


TimingService.startAllTask(); // 开始所有定时任务
var options = {
    host: config.btdPool.host,
    port: config.btdPool.port,
    user: config.btdPool.user,
    password: config.btdPool.password,
    database: config.btdPool.database,
    ttl: 60*60*24, //session过期时间为1天
    createDatabaseTable: true,
    schema: {
        tableName: 'dash_g_session',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
};
app.use(session({
    key: 'login_name',
    secret: 'password',
    saveUninitialized: false, // don't create session until something stored
    resave: false,
    unset:'destroy',
    store: new SessionStore(options)
}));
app.use('/api', api);
app.use('/', auth);
app.use(function (req, res, next) {
    var url = req.originalUrl;
    if (url == "pages/back_page/complications.html" && !req.session.uid) {
        return res.redirect("/login");
    }
    next();
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
