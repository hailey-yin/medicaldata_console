/**
 * Created by LL on 2016/7/27.
 */
var express = require('express');
var router = express.Router();
var RestMsg = require('../common/restmsg');
var Pool = require('../db/pool');
var DataService = require('../service/data/dataservice');

router.route('/login')
    .post(function(req, res, next){
      var username = req.body.login_name;
      var password = req.body.login_password;
      var restmsg = new RestMsg();
      DataService.execDevsSql(getLoginSQL(username), Pool.btdPool, function (err, isSuccess, rows) {
        if(err){
          restmsg.errorMsg();
          res.send(restmsg);
          return;
        }
        if(rows.length === 0){
          restmsg.errorMsg('不存在该用户');
          restmsg.setResult();
          res.send(restmsg);
          //return;
        } else if (rows[0].password != password) {
          restmsg.errorMsg('密码错误');
          restmsg.setResult();
          res.send(restmsg);
          //return;
        } else {
          req.session.uid = rows[0].id;
          restmsg.successMsg();
          restmsg.setResult(username);
          res.send(restmsg);
          //return;
        }
      });
    })
    .get(function(req, res, next){
      if(req.session && req.session.uid){
        return res.redirect('/pages/back_page/complications.html');
      }
      res.render('login');
      //return;
    });

// 退出登录
router.get('/logout', function (req, res, next) {
  if (req.session) {
    req.session.uid = null;
    res.clearCookie('uid');
    res.clearCookie('username');
    res.clearCookie('email');
    res.clearCookie('hid');
    res.clearCookie('auth');
    req.session.destroy(function () {
    });
  }
  res.redirect('/');
  //res.send('');
  //return;
});

function getLoginSQL(name){
  return "select * from dash_g_user where username='"+name+"'";
}

module.exports = router;