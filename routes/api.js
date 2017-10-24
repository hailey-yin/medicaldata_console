/**
 * API 请求路由
 * @type {exports}
 */
var express = require('express');
var router = express.Router();
var cachemonitor = require('./cachemonitor/cachemonitor');
var resultanalysis = require('./home/resultanalysis');
var inside = require('./inside/inside');
var home = require('./home/home');
var dataentry = require('./dataentry/dataentry');


//允许跨域访问资源，
//router.use(function(req, res, next) {
//    res.header('Access-Control-Allow-Origin', '*');
//    next();
//});

router.use('/cachemonitor', cachemonitor);
router.use('/result',resultanalysis);
router.use('/inside',inside);
router.use('/home',home);
router.use('/dataentry',dataentry);

module.exports = router;