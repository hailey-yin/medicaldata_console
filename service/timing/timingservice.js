var later = require('later');
var DataService = require('../data/dataservice');
var Sql = require('../common/sql');
var Config = require('../../common/config');
var Pool = require('../../db/pool');

later.date.localTime(); //设置本地时区

var TimingService = {};

TimingService.startAllTask = function () {
  var self = this;
  for (var key in Sql) {
    self.startTask(key, Sql[key]);
  }
};

TimingService.startTask = function (key, task) {
  var sched = task.realtime ? later.parse.recur().every(Config.realtimeSpan).second() : later.parse.recur().every(Config.tPlusSpan).hour(); // 实时和非实时任务时间间隔
  // TODO 开发时防止卡机 定时时长延长
  //var sched = later.parse.recur().every(Config.tPlusSpan).hour(); // 实时和非实时任务时间间隔
  //var sched = task.realtime ? later.parse.recur().every(5).second() : later.parse.recur().every(15).second(); // 测试环境使用！！！生产环境请注释本行！！！实时任务时间间隔5s，非实时任务时间间隔10s

  start(key, task); // 定时任务开始，第一次执行
  if(!task.realtime) {
    sched = {
      schedules: [{
        h: [Config.timedTask.h],
        m: [Config.timedTask.m]
      }]
    };
  }
  var t = later.setInterval(function () { // 定时任务按定时规则执行
    start(key, task);
  }, sched);
};

function start(key, task){
  for (var script in task['sql']) {
    var cacheKey = key+'/'+script;
      if(script.substr(script.length-4) == 'HIVE'){
          DataService.getFromHive(task['sql'][script], task['pool'], cacheKey, function (err, cacheIsUpdated) {
              if (err) {
                  return ;
              }
          })
      } else {
          DataService.get(task['sql'][script], task['pool'], cacheKey, function (err, cacheIsUpdated) {
              if (err) {
                  return ;
              }
          })
      }

  }
}

module.exports = TimingService;
