/**
 * Created by zl on 2016/11/15.
 */
var express = require('express');
var router = express.Router({mergeParams: true});
var RestMsg = require('../../common/restmsg');
var Cache = require('../../service/common/cache');
var Sql = require('../../service/common/sql');

router.route('/analysis')
    .get(function(req,res,next) {
        var restMsg = new RestMsg();
        var flag = req.query.flag;
        var county = req.query.county;
        switch (Number(flag)) {
            case 0:
                break;
            case 1:
                var script = 'nerve';
                break;
            case 2:
                var script = 'retina';
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                break;
            case 6:
                break;
        }
        var url = req.originalUrl;
        var data = Cache.find(url.substr(0,url.indexOf('?')) + '/' + script);
        if(data && data.length>0) {
            for (var i=0;i<data.length;i++) {
                if(data[i].county == county) {
                    var result = data[i];
                }
            }
        }
        restMsg.successMsg();
        restMsg.setResult(result);
        res.send(restMsg);
    });

module.exports = router;