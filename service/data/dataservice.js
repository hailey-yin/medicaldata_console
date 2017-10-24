/**
 * 数据模块服务层
 * @type {data|exports}
 */
var Cache = require('../common/cache');
var keyPointPool = require('../../db/pool');
var http = require('http');
var qs = require('querystring');
var queues = require('mysql-queues');
var async = require('async');

function DataService(){

}

/**
 *
 * @param sql 查询sql语句
 * @param callback 回调函数
 */
DataService.get = function(sql, pool, key, callback){
    pool.getConnection(function (err, conn) {
        if (err){
            console.error(err);
            return callback(err);
        }

        conn.query(sql,function(err,rows){
            if (err){
                conn.release();
                err.cacheKey = key;
                err.sql = sql;
                console.error(err);
                return callback(err);
            }
            conn.release();
            var date = new Date();
            for(var i=0;i<rows.length;i++){
                rows[i].queryTime = date;
            }
            if(Cache.update(key, rows)){ // 查询结果更新缓存
                callback(null,true); // 已保存到缓存，执行回调函数
            } else {
                callback('查询成功，保存到缓存失败');
            }
        });
    });
};

DataService.editKeyPoint = function(sql, callback){
    keyPointPool.healthPool.getConnection(function (err, conn) {
        if (err){
            console.error(err);
            return callback(err);
        }

        conn.query(sql,function(err,rows){
            if (err){
                conn.release();
                //err.cacheKey = key;
                err.sql = sql;
                console.error(err);
                return callback(err, false);
            }
            conn.release();
            callback(null, true, rows);
        });
    });
};

DataService.execDevsSql = function(sql, pool, callback){
    pool.getConnection(function (err, conn) {
        if (err){
            console.error(err);
            return callback(err);
        }
        conn.query(sql,function(err,rows){
            if (err){
                conn.release();
                //err.cacheKey = key;
                err.sql = sql;
                console.error(err);
                return callback(err, false);
            }
            conn.release();
            callback(null, true, rows);
        });
    });
};

//将json数据存入内存
DataService.saveJSON = function (key,rows,callback){
    var date = new Date();
    for(var i=0;i<rows.length;i++){
        rows[i].queryTime = date;
    }
    if(Cache.update(key, rows)){ // 查询结果更新缓存
        callback(null,true); // 已保存到缓存，执行回调函数
    } else {
        callback('缓存保存失败');
    }
}


//批量修改数据库
DataService.update = function(sqls, pool, callback){
    pool.getConnection(function (err, conn) {
        if (err){
            console.error(err);
            return callback(err);
        }
        queues(conn, true);
        var trans = conn.startTransaction();
        async.each(sqls,function(item, callback1) {
            trans.query(item,function(err,row){

                if (err){
                    console.error(item);
                    callback1(err);
                } else {
                    callback1(null);
                }
            });
            trans.execute();
        },function(err) {
            if(err) {
                console.error(err);
                trans.rollback();
                conn.release();
                callback(err);
                return;
            }
            trans.commit();
            conn.release();
            callback(null,true);
        });
    });
};

module.exports = DataService;

