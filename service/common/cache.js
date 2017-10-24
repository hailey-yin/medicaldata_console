var cache = {}; // 缓存模块,key-value形式

cache.data = {}; // 缓存数据

cache.save = function (key, value) { // 新增
  cache.data[key] = value;
  return true;
};

cache.delete = function (key) { // 删除
  cache.data[key] = undefined;
  return true;
};

cache.update = function (key, value) { // 更新
  cache.data[key] = value;
  return true;
};

cache.find = function (key) { // 查询单条记录
  return cache.data[key];
};

cache.findAll = function () { // 查询所有缓存记录
  return cache.data;
};


module.exports = cache;
