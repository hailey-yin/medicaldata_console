/**
 * Created by wuyao on 2016/3/23.
 */
var express = require('express');
var router = express.Router({mergeParams: true});
var RestMsg = require('../../common/restmsg');
var Cache = require('../../service/common/cache');

router.route('/')
    .get(function (req, res, next) {
        var restmsg = new RestMsg();
        var key = req.param('key');
        var totalCache = Cache.findAll();
        var result = {};
        result.totalsize = (mbStringLength(JSON.stringify(totalCache))/(1024*1024)).toFixed(2)+'MB';
        result.data = key ? Cache.find(key) : totalCache;

        restmsg.successMsg();
        restmsg.setResult(result);
        res.send(restmsg);
    });

function mbStringLength(s) { // 计算字符串占用字节数
    var totalLength = 0;
    var i;
    var charCode;
    for (i = 0; i < s.length; i++) {
        charCode = s.charCodeAt(i);
        if (charCode < 0x007f) {
            totalLength = totalLength + 1;
        } else if ((0x0080 <= charCode) && (charCode <= 0x07ff)) {
            totalLength += 2;
        } else if ((0x0800 <= charCode) && (charCode <= 0xffff)) {
            totalLength += 3;
        }
    }
    return totalLength;
}


module.exports = router;