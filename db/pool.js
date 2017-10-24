/**
 * mySql连接池
 */

var config = require('../common/config');
var mysql = require('mysql');
var pool = {};

pool.btdPool = mysql.createPool(config.btdPool);
module.exports = pool;
