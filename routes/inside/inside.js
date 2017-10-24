/**
 * Created by hyh on 2016/11/16.
 */
var express = require('express');
var router = express.Router({mergeParams: true});
var RestMsg = require('../../common/restmsg');
var Cache = require('../../service/common/cache');
var Sql = require('../../service/common/sql');

router.route('/analysis')
    .get(function(req,res,next) {
        var restMsg = new RestMsg();
        var data = {};
        for (var script in Sql[req.originalUrl]['sql']) {
            data[script] = Cache.find(req.originalUrl + '/' + script);
        }
        restMsg.successMsg();
        restMsg.setResult(data);
        res.send(restMsg);

    });
router.route('/finished')
    .get(function(req,res,next) {
        var restMsg = new RestMsg();
        var data = {};
        for (var script in Sql[req.originalUrl]['sql']) {
            data[script] = Cache.find(req.originalUrl + '/' + script);
        }
        restMsg.successMsg();
        restMsg.setResult(data);
        res.send(restMsg);

    });

router.route('/workgeneral')
    .get(function(req,res,next) {
        var restMsg = new RestMsg();
        var retData = {};
        retData = Cache.find(req.originalUrl + '/'+ 'finish_number');
        // FIXME 错误处理
        restMsg.setResult(retData);
        restMsg.successMsg();
        res.send(restMsg);
    });

module.exports = router;