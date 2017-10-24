var config = {
    port: 3000, // web应用端口
    btdPool: { // 全程健康
        acquireTimeout: 10000, // 连接超时，10秒
        connectionLimit: 10, // 连接池最大连接数
        waitForConnections: true, // 达到最大连接数之后的连接请求进入等待队列，如果为false则直接返回err
        host: '172.19.12.31', // 数据库服务器ip
        user: 'healthdev', // 数据库用户名
        password: 'healthdev2016', // 数据库密码
        database: 'healthdata', // 数据库名称
        port: 5500 // 数据库端口
    },
    realtimeSpan: 30, // 实时定时任务时间间隔，单位（分钟）
    tPlusSpan: 24, // t+1定时任务时间间隔，单位（小时）
    timedTask: { // sql非实时定时任务执行时间/每日
        h: 1, //h: 时, 取值范围:[0-23]
        m: 0  //m：分, 取值范围:[0-59]
    }
};


module.exports = config;


