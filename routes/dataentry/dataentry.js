/**
 * Created by zl on 2016/10/9.
 */

var express = require('express');
var router = express.Router({mergeParams: true});
var RestMsg = require('../../common/restmsg');
var Pool = require('../../db/pool');
var DataService = require('../../service/data/dataservice');


router.route('/complications')
    .post(function(req,res,next) {
        var restMsg = new RestMsg();
        var params = req.body.params;
        var sqls = [];
        if(params && params.length>0) {
            var date = new Date();
            for(var i = 0; i < params.length; i++) {
                var date  = new Date(new Date(date).getTime());
                var  Y = date.getFullYear() + '-';
                var  M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                var  D = date.getDate() + ' ';
                var  h = date.getHours() + ':';
                var  m = date.getMinutes() + ':';
                var  s = date.getSeconds();
                var data = {
                    id:params[i].id,
                    county: params[i].county,
                    task: params[i].task,
                    timestamp: Y+M+D+h+m+s

            };
                sqls.push(getSQL(data));
            }
        }
        DataService.update(sqls,Pool.btdPool, function (err,success) {
            if(err) {
                restMsg.errorMsg(err);
                res.send(restMsg);
                return;
            }
            if(success) {
                restMsg.successMsg();
                restMsg.setResult('数据更新成功');
                res.send(restMsg)
            }
        })
    })
    .get(function(req,res,next) {
        var restMsg = new RestMsg();
        var sql = "select * from dash_g_complications";
        DataService.execDevsSql(sql,Pool.btdPool,function(err,bool,rows) {
            if(err) {
                restMsg.errorMsg(err);
                res.send(restMsg);
                return;
            }
                restMsg.successMsg();
                restMsg.setResult(rows);
                res.send(restMsg);
        })
})


function getSQL(data) {
    return  "UPDATE dash_g_complications SET task=" + data.task + ", timestamp='" + data.timestamp + "' where id=" + data.id
}

module.exports = router;