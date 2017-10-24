/**
 * Created by zl on 2016/11/15.
 */

//饼图内部数据显示样式
var myFormat = function(params){
    if(params.value == '--') {
        return '--'
    }
    if(params.value < 0.1) {
        return '';
    }
    if(params.value >= 0.1){
        var value = params.value*100;
        return value.toFixed(1)+'%';
    }
};
//配置各版块的图形尺寸，展示内容
var graph_set = {
    //病变统计图配置
    lesions_statistic: {
        title: {
            show: false
        },
        grid: {
            left:'0',
            top: '0',
            width:'226px',
            height: '141px'
        },
        legend: {
            orient: 'vertical',
            right: '0',
            top: '30%',
            itemWidth: 10,
            itemHeight:10,
            itemGap: 5,
            formatter: function(name) {
                return ' ' + name;
            },
            data: [{
                name: '正常',
                icon:'rect',
                textStyle: {
                    fontSize:14,
                    color: '#718aa6'
                }
            },
                {
                    name: '病变',
                    icon:'rect',
                    textStyle: {
                        fontSize:14,
                        color: '#718aa6'
                    }
                }]
        },
        series : [
            {
                name: '糖尿病筛查病变情况',
                type: 'pie',
                avoidLabelOverlap: false,
                hoverAnimation: false, // 关闭hover放大饼图动画效果
                radius : '90%',
                center: ['39%', '47%'],
                itemStyle:{
                    normal:{
                        label:{
                            show: true,
                            formatter: function(params){
                                if(params.value == '--') {
                                    return '--'
                                }
                                if(params.value < 0.1) {
                                    return '';
                                }
                                if(params.value >= 0.1){
                                    return params.value*100+'%';
                                }
                                /*return params.name + '\n' + Math.round(params.percent)+'%';*/
                            },
                            position: 'inside',
                            textStyle: {
                                fontFamily:'Arial',
                                fontSize:18,
                                color:'#fff'
                            }
                        },
                        labelLine :{show:true}
                    }
                },
                data:[
                    {value:'--',
                        name:'正常',
                        itemStyle:{
                            normal: {
                                color: '#5ec3ce'
                            }
                        }
                    },
                    {value:'--',
                        name:'病变',
                        itemStyle:{
                            normal: {
                                color: '#A086B9'
                            }
                        },
                    }
                ]
            }
        ]
    },
    //组合统计图表配置
    composite_statistic: {
        of_bad: {
            title: {
                show: true,
                text: '勾选病变情况患者在',
                subtext: '病变患者中占比',
                itemGap: 5,
                right: '-5px',
                top: '15%',
                textStyle: {
                    fontSize: 12,
                    color: '#718aa6'
                },
                subtextStyle: {
                    fontSize: 12,
                    color: '#718aa6',
                    fontWeight:'600'
                }
            },
            grid: {
                left:'0',
                top: '0',
                width:'226px',
                height: '102px'
            },
            legend: {
                orient: 'vertical',
                right: '40px',
                top: '50%',
                itemWidth: 10,
                itemHeight:10,
                formatter: function(name) {
                    return ' ' + name;
                },
                data: [{
                    name: '勾选病变',
                    icon:'rect',
                    textStyle: {
                        fontSize:12,
                        color: '#718aa6'
                    }
                },
                    {
                        name: '其他病变',
                        icon:'rect',
                        textStyle: {
                            fontSize:12,
                            color: '#718aa6'
                        }
                    }]
            },
            series : [
                {
                    name: '勾选病变情况患者在病变患者中占比',
                    type: 'pie',
                    avoidLabelOverlap: false,
                    hoverAnimation: false, // 关闭hover放大饼图动画效果
                    radius : '51px',
                    center: ['23%', '51%'],
                    itemStyle:{
                        normal:{
                            label:{
                                show: true,
                                formatter: function(params){
                                    if(params.value == '--') {
                                        return '--';
                                    }
                                    if(params.value < 0.1) {
                                        return '';
                                    }
                                    if(params.value >= 0.1){
                                        return params.value*100+'%';
                                    }
                                    /*return Math.round(params.percent)+'%';*/
                                },
                                position:'inside',
                                textStyle: {
                                    fontFamily:'Arial',
                                    fontSize:18,
                                    color:'#fff'
                                }
                            },
                            labelLine :{show:true}
                        }
                    },

                    data:[
                        {value: '--',
                            name:'勾选病变',
                            itemStyle:{
                                normal: {
                                    color: '#45c8dc'
                                }
                            }
                        },
                        {value:'--',
                            name:'其他病变',
                            itemStyle:{
                                normal: {
                                    color: '#40aae3'
                                }
                            }
                        }
                    ]
                }
            ]
        },
        of_normal: {
            title: {
                show: true,
                text: '勾选病变情况患者在',
                subtext: '筛查患者中占比',
                itemGap: 5,
                right: '-5px',
                top: '15%',
                textStyle: {
                    fontSize: 12,
                    color: '#718aa6'
                },
                subtextStyle: {
                    fontSize: 12,
                    color: '#718aa6',
                    fontWeight:'600'
                }
            },
            grid: {
                left:'0',
                top: '0',
                width:'226px',
                height: '102px'
            },
            legend: {
                orient: 'vertical',
                right: '40px',
                top: '50%',
                itemWidth: 10,
                itemHeight:10,
                formatter: function(name) {
                    return ' ' + name;
                },
                data: [{
                    name: '勾选病变',
                    icon:'rect',
                    textStyle: {
                        fontSize:12,
                        color: '#718aa6'
                    }
                },
                    {
                        name: '其他患者',
                        icon:'rect',
                        textStyle: {
                            fontSize:12,
                            color: '#718aa6'
                        }
                    }]
            },
            series : [
                {
                    name: '勾选病变情况患者在筛查患者中占比',
                    type: 'pie',
                    avoidLabelOverlap: false,
                    hoverAnimation: false, // 关闭hover放大饼图动画效果
                    radius : '51px',
                    center: ['37%', '51%'],
                    itemStyle:{
                        normal:{
                            label:{
                                show: true,
                                formatter: function(params){
                                    if(params.value == '--') {
                                        return '--'
                                    }
                                    if(params.value < 0.1) {
                                        return '';
                                    }
                                    if(params.value >= 0.1){
                                        return params.value*100+'%';
                                    }
                                    /*return Math.round(params.percent)+'%';*/
                                },
                                position:'inside',
                                textStyle: {
                                    fontFamily:'Arial',
                                    fontSize:18,
                                    color:'#fff'
                                }
                            },
                            labelLine :{show:true}
                        }
                    },

                    data:[
                        {value: '--',
                            name:'勾选病变',
                            itemStyle:{
                                normal: {
                                    color: '#45c8dc'
                                }
                            }
                        },
                        {value:'--',
                            name:'其他患者',
                            itemStyle:{
                                normal: {
                                    color: '#40aae3'
                                }
                            }
                        }
                    ]
                }
            ]
        },
        no_bad_of_normal: {
            title: {
                show: true,
                text: '勾选病变情况患者在筛查患者中占比',
                /* subtext: '筛查患者中占比',*/
                itemGap: 5,
                right: '10%',
                top: '15%',
                textStyle: {
                    fontSize: 12,
                    color: '#718aa6'
                },
                /*subtextStyle: {
                 fontSize: 12,
                 color: '#718aa6',
                 fontWeight: '600'
                 }*/
            },
            grid: {
                left:'0',
                top: '0',
                width:'520px',
                height: '102px'
            },
            legend: {
                orient: 'vertical',
                right: '34%',
                top: '40%',
                itemWidth: 10,
                itemHeight:10,
                formatter: function(name) {
                    return ' ' + name;
                },
                data: [{
                    name: '勾选病变',
                    icon:'rect',
                    textStyle: {
                        fontSize:12,
                        color: '#718aa6'
                    }
                },
                    {
                        name: '其他患者',
                        icon:'rect',
                        textStyle: {
                            fontSize:12,
                            color: '#718aa6'
                        }
                    }]
            },
            series : [
                {
                    name: '勾选病变情况患者在筛查患者中占比',
                    type: 'pie',
                    avoidLabelOverlap: false,
                    hoverAnimation: false, // 关闭hover放大饼图动画效果
                    radius : '51px',
                    center: ['37%', '50%'],
                    itemStyle:{
                        normal:{
                            label:{
                                show: true,
                                formatter: function(params){
                                    if(params.value == '--') {
                                        return '--'
                                    }
                                    if(params.value < 0.1) {
                                        return '';
                                    }
                                    if(params.value >= 0.1){
                                        return params.value*100+'%';
                                    }
                                    /*return Math.round(params.percent)+'%';*/
                                },
                                position:'inside',
                                textStyle: {
                                    fontFamily:'Arial',
                                    fontSize:18,
                                    color:'#fff'
                                }
                            },
                            labelLine :{show:true}
                        }
                    },

                    data:[
                        {value: '--',
                            name:'勾选病变',
                            itemStyle:{
                                normal: {
                                    color: '#45c8dc'
                                }
                            }
                        },
                        {value:'--',
                            name:'其他病变',
                            itemStyle:{
                                normal: {
                                    color: '#40aae3'
                                }
                            }
                        }
                    ]
                }
            ]
        }
    },
    //周围神经病变图表配置
    nerve_graph: {
        title: {
            show: true,
            text: '筛查总人数：',
            right: '80px',
            top: '115px',
            subtext: '--人',
            textStyle: {
                fontSize: 16,
                color: '#718aa6'
            },
            subtextStyle: {
                fontFamily: 'Arial',
                fontSize: 28,
                color: '#40aae3',
                fontWeight: 'bold'
            }
        },
        grid: {
            left:'0',
            top: '0',
            width:'560px',
            height: '390px'
        },
        legend: {
            orient: 'vertical',
            right: '60px',
            top: '50%',
            itemWidth: 10,
            itemHeight:10,
            icon:'rect',
            formatter: function(name) {
                switch(name) {
                    case '低危':
                        return ' ' + name + '  8521人';
                        break;
                    case '中危':
                        return ' ' + name + '  5200人';
                        break;
                    case '高危':
                        return ' ' + name + '  11545人'
                }
            },
            textStyle: {
                fontSize:16,
                color: '#718aa6'
            },
            data: ['低危', '中危', '高危']
        },
        series : [
            {
                name: '周围神经病变结果分析',
                type: 'pie',
                avoidLabelOverlap: false,
                hoverAnimation: false, // 关闭hover放大饼图动画效果
                radius : '50%',
                center: ['32%', '50%'],
                itemStyle:{
                    normal:{
                        label:{
                            show: true,
                            formatter: myFormat,
                            position:'inside',
                            textStyle: {
                                fontFamily: 'Arial',
                                fontSize:22,
                                color: '#fff'
                            },
                        },
                        labelLine :{show:true}
                    }
                },

                data:[
                    {value: 8251,
                        name:'低危',
                        itemStyle:{
                            normal: {
                                color: '#45c8dc'
                            }
                        }
                    },
                    {value:5200,
                        name:'中危',
                        itemStyle:{
                            normal: {
                                color: '#629be6'
                            }
                        }
                    },
                    {value:11545,
                        name:'高危',
                        itemStyle:{
                            normal: {
                                color: '#e99d59'
                            }
                        }
                    }
                ]
            }
        ]
    },
    //视网膜病变分析图表配置
    retina_graph: {
        title: {
            show: true,
            text: '筛查总人数：',
            right: '80px',
            top: '85px',
            subtext: '--人',
            textStyle: {
                fontSize: 16,
                color: '#718aa6'
            },
            subtextStyle: {
                fontFamily: 'Arial',
                fontSize: 28,
                color: '#40aae3',
                fontWeight: 'bold'
            }
        },
        grid: {
            left:'0',
            top: '0',
            width:'560px',
            height: '390px'
        },
        legend: {
            orient: 'vertical',
            right: '60px',
            top: '42%',
            itemWidth: 10,
            itemHeight:10,
            icon:'rect',
            formatter: function(name) {
                switch(name) {
                    case '正常':
                        return ' ' + name + '  8521人';
                        break;
                    case '轻度':
                        return ' ' + name + '  5200人';
                        break;
                    case '中度':
                        return ' ' + name + '  11545人';
                        break;
                    case '重度':
                        return ' ' + name + '  9785';
                        break;
                    case '增殖':
                        return ' ' + name + '  6100人';
                }
            },
            textStyle: {
                fontSize:16,
                color: '#718aa6'
            },
            data: ['正常', '轻度', '中度', '重度', '增殖']
        },
        series : [
            {
                name: '视网膜病变结果分析',
                type: 'pie',
                avoidLabelOverlap: false,
                hoverAnimation: false, // 关闭hover放大饼图动画效果
                radius : '110px',
                center: ['35%', '50%'],
                itemStyle:{
                    normal:{
                        label:{
                            show: true,
                            formatter: myFormat,
                            position:'inside',
                            textStyle: {
                                fontFamily: 'Arial',
                                fontSize:22,
                                color: '#fff'
                            }
                        },
                        labelLine :{show:true}
                    }
                },

                data:[
                    {value: 8251,
                        name:'正常',
                        itemStyle:{
                            normal: {
                                color: '#45c8dc'
                            }
                        }
                    },
                    {value:5200,
                        name:'轻度',
                        itemStyle:{
                            normal: {
                                color: '#629be6'
                            }
                        }
                    },
                    {value:11545,
                        name:'中度',
                        itemStyle:{
                            normal: {
                                color: '#9b8ac0'
                            }
                        }
                    },
                    {value:9785,
                        name:'重度',
                        itemStyle:{
                            normal: {
                                color: '#e99d59'
                            }
                        }
                    },
                    {value:6100,
                        name:'增殖',
                        itemStyle:{
                            normal: {
                                color: '#45dcd0'
                            }
                        }
                    }
                ]
            }
        ]
    },
    //足背动脉搏动分析图表配置
    dorsalis_pedis_artery_graph: {
        title: {
            show: false
        },
        grid: {
            left:'0',
            top: '0',
            width:'100%',
            height: '239px'
        },
        legend: {
            orient: 'vertical',
            right: '0%',
            top: '30%',
            itemGap:12,
            itemWidth: 10,
            itemHeight:10,
            icon:'rect',
            formatter: function(name) {
                switch(name) {
                    case '未触及':
                        return ' ' + name + '                   '+ '--' +'人';
                        break;
                    case '触及双侧对称':
                        return ' ' + name + '         '+ '--' + '人';
                        break;
                    case '触及左侧弱或消失':
                        return ' ' + name + '  '+ '--' +'人';
                        break;
                    case '触及右侧弱或消失':
                        return ' ' + name + '  '+ '--' +'人';
                }
            },
            textStyle: {
                fontSize:14,
                color: '#718aa6'
            },
            data: ['未触及', '触及双侧对称', '触及左侧弱或消失', '触及右侧弱或消失']
        },
        series : [
            {
                name: '足背动脉结果分析',
                type: 'pie',
                avoidLabelOverlap: false,
                hoverAnimation: false, // 关闭hover放大饼图动画效果
                radius : '73px',
                center: ['24%', '50%'],
                itemStyle:{
                    normal:{
                        label:{
                            show: true,
                            formatter: myFormat,
                            position:'inside',
                            textStyle: {
                                fontFamily: 'Arial',
                                fontSize:18,
                                color: '#fff'
                            }
                        },
                        labelLine :{show:true}
                    }
                },

                data:[
                    {value: '--',
                        name:'未触及',
                        itemStyle:{
                            normal: {
                                color: '#45c8dc'
                            }
                        }
                    },
                    {value:'--',
                        name:'触及双侧对称',
                        itemStyle:{
                            normal: {
                                color: '#629be6'
                            }
                        }
                    },
                    {value:'--',
                        name:'触及左侧弱或消失',
                        itemStyle:{
                            normal: {
                                color: '#9b8ac0'
                            }
                        }
                    },
                    {value:'--',
                        name:'触及右侧弱或消失',
                        itemStyle:{
                            normal: {
                                color: '#e99d59'
                            }
                        }
                    }
                ]
            }
        ]
    },
    //踝肱指数ABI图表配置
    ankle_brachial_index_graph: {
        title: {
            show: false
        },
        grid: {
            left:'0',
            top: '0',
            width:'100%',
            height: '239px'
        },
        legend: {
            orient: 'vertical',
            left: '0%',
            top: '67',
            itemGap:12,
            itemWidth: 10,
            itemHeight:10,
            icon:'rect',
            formatter: function(name) {
                switch(name) {
                    case '正常':
                        return ' ' + name + '  '+ '--' +'人';
                        break;
                    case '轻度':
                        return ' ' + name + '  '+ '--' +'人';
                        break;
                    case '中度':
                        return ' ' + name + '  '+ '--' +'人';
                        break;
                    case '重度':
                        return ' ' + name + '  '+ '--' +'人';
                }
            },
            textStyle: {
                fontSize:14,
                color: '#718aa6'
            },
            data: ['正常', '轻度', '中度', '重度']
        },
        series : [
            {
                name: '踝肱指数ABI结果分析',
                type: 'pie',
                avoidLabelOverlap: false,
                hoverAnimation: false, // 关闭hover放大饼图动画效果
                radius : '89px',
                center: ['65%', '50%'],
                itemStyle:{
                    normal:{
                        label:{
                            show: true,
                            formatter: myFormat,
                            position:'inside',
                            textStyle: {
                                fontFamily: 'Arial',
                                fontSize:18,
                                color: '#fff',
                                /*fontWeight:'bold'*/
                            }
                        },
                        labelLine :{show:true}
                    }
                },

                data:[
                    {value: '--',
                        name:'正常',
                        itemStyle:{
                            normal: {
                                color: '#45c8dc'
                            }
                        }
                    },
                    {value:'--',
                        name:'轻度',
                        itemStyle:{
                            normal: {
                                color: '#629be6'
                            }
                        }
                    },
                    {value:'--',
                        name:'中度',
                        itemStyle:{
                            normal: {
                                color: '#9b8ac0'
                            }
                        }
                    },
                    {value:'--',
                        name:'重度',
                        itemStyle:{
                            normal: {
                                color: '#e99d59'
                            }
                        }
                    }
                ]
            }
        ]
    },
    //肾脏病变统计图配置
    kidney_graph: {
        title: {
            show: true,
            text: '筛查总人数：',
            right:'120px',
            top: '105px',
            subtext: '--人',
            textStyle: {
                fontSize: 16,
                color: '#718aa6'
            },
            subtextStyle: {
                fontFamily: 'Arial',
                fontSize: 28,
                color: '#40aae3',
                fontWeight: 'bold'
            }
        },
        grid: {
            left:'0',
            top: '0',
            width:'100%',
            height: '100%'
        },
        legend: {
            orient: 'vertical',
            right: '100px',
            top: '185px',
            itemGap:12,
            itemWidth: 10,
            itemHeight:10,
            icon:'rect',
            formatter: function(name) {
                switch(name) {
                    case '低危':
                        return ' ' + name + '     '+ '--' +'人';
                        break;
                    case '中危':
                        return ' ' + name + '     '+ '--' +'人';
                        break;
                    case '高危':
                        return ' ' + name + '     '+ '--' +'人';
                        break;
                    case '极高危':
                        return ' ' + name + '  '+ '--' +'人';
                }
            },
            textStyle: {
                fontSize:14,
                color: '#718aa6'
            },
            data: ['低危', '中危', '高危', '极高危']
        },
        series : [
            {
                name: '肾脏病变分析',
                type: 'pie',
                avoidLabelOverlap: false,
                hoverAnimation: false, // 关闭hover放大饼图动画效果
                radius : '104px',
                center: ['35%', '50%'],
                itemStyle:{
                    normal:{
                        label:{
                            show: true,
                            formatter: myFormat,
                            position:'inside',
                            textStyle: {
                                fontFamily: 'Arial',
                                fontSize:18,
                                color: '#fff',
                                /*fontWeight:'bold'*/
                            }
                        },
                        labelLine :{show:true}
                    }
                },

                data:[
                    {value: '--',
                        name:'低危',
                        itemStyle:{
                            normal: {
                                color: '#45c8dc'
                            }
                        }
                    },
                    {value:'--',
                        name:'中危',
                        itemStyle:{
                            normal: {
                                color: '#629be6'
                            }
                        }
                    },
                    {value:'--',
                        name:'高危',
                        itemStyle:{
                            normal: {
                                color: '#9b8ac0'
                            }
                        }
                    },
                    {value:'--',
                        name:'极高危',
                        itemStyle:{
                            normal: {
                                color: '#e99d59'
                            }
                        }
                    }
                ]
            }
        ]
    },
    //尿ACR统计图表配置
    ACR_graph: {
        title: {
            show: true,
            text: '筛查总人数：',
            right:'140px',
            top: '105px',
            subtext: '--人',
            textStyle: {
                fontSize: 16,
                color: '#718aa6'
            },
            subtextStyle: {
                fontFamily: 'Arial',
                fontSize: 28,
                color: '#40aae3',
                fontWeight: 'bold'
            }
        },
        grid: {
            left:'0',
            top: '0',
            width:'100%',
            height: '100%'
        },
        legend: {
            orient: 'vertical',
            right: '60px',
            top: '185px',
            itemGap:12,
            itemWidth: 10,
            itemHeight:10,
            icon:'rect',
            formatter: function(name) {
                switch(name) {
                    case 'ACR<30':
                        return ' ' + name + '           '+ '--' +'人';
                        break;
                    case '30≤ACR<300':
                        return ' ' + name + '  '+ '--' +'人';
                        break;
                    case 'ACR≥300':
                        return ' ' + name  + '         '+ '--' +'人';
                }
            },
            textStyle: {
                fontSize:14,
                color: '#718aa6'
            },
            data: ['ACR<30', '30≤ACR<300', 'ACR≥300']
        },
        series : [
            {
                name: '尿ACR分析',
                type: 'pie',
                avoidLabelOverlap: false,
                hoverAnimation: false, // 关闭hover放大饼图动画效果
                radius : '104px',
                center: ['30%', '50%'],
                itemStyle:{
                    normal:{
                        label:{
                            show: true,
                            formatter: myFormat,
                            position:'inside',
                            textStyle: {
                                fontFamily: 'Arial',
                                fontSize:18,
                                color: '#fff',
                                /*fontWeight:'bold'*/
                            }
                        },
                        labelLine :{show:true}
                    }
                },

                data:[
                    {value: '--',
                        name:'ACR<30',
                        itemStyle:{
                            normal: {
                                color: '#45c8dc'
                            }
                        }
                    },
                    {value:'--',
                        name:'30≤ACR<300',
                        itemStyle:{
                            normal: {
                                color: '#629be6'
                            }
                        }
                    },
                    {value:'--',
                        name:'ACR≥300',
                        itemStyle:{
                            normal: {
                                color: '#9b8ac0'
                            }
                        }
                    },
                    {value:'--',
                        name:'极高危',
                        itemStyle:{
                            normal: {
                                color: '#e99d59'
                            }
                        }
                    }
                ]
            }
        ]
    },
    //EGFR统计图表配置
    egfr_graph: {
        title: {
            show: true,
            text: '筛查总人数：',
            right:'112px',
            top: '75px',
            subtext: '--人',
            textStyle: {
                fontSize: 16,
                color: '#718aa6'
            },
            subtextStyle: {
                fontFamily: 'Arial',
                fontSize: 28,
                color: '#40aae3',
                fontWeight: 'bold'
            }
        },
        grid: {
            left:'0',
            top: '0',
            width:'100%',
            height: '100%'
        },
        legend: {
            orient: 'vertical',
            right: '100px',
            top: '160px',
            itemGap:12,
            itemWidth: 10,
            itemHeight:10,
            icon:'rect',
            formatter: function(name) {
                switch(name) {
                    case '一期':
                        return ' ' + name + '  '+ '--' +'人';
                        break;
                    case '二期':
                        return ' ' + name + '  '+ '--' +'人';
                        break;
                    case '三期':
                        return ' ' + name + '  '+ '--' +'人';
                        break;
                    case '四期':
                        return ' ' + name + '  '+ '--' +'人';
                        break;
                    case '五期':
                        return ' ' + name + '  '+ '--' +'人';
                }
            },
            textStyle: {
                fontSize:14,
                color: '#718aa6'
            },
            data: ['一期', '二期', '三期', '四期','五期']
        },
        series : [
            {
                name: 'EGFR分析',
                type: 'pie',
                avoidLabelOverlap: false,
                hoverAnimation: false, // 关闭hover放大饼图动画效果
                radius : '104px',
                center: ['35%', '50%'],
                itemStyle:{
                    normal:{
                        label:{
                            show: true,
                            formatter: myFormat,
                            position:'inside',
                            textStyle: {
                                fontFamily: 'Arial',
                                fontSize:18,
                                color: '#fff',
                                /*fontWeight:'bold'*/
                            }
                        },
                        labelLine :{show:true}
                    }
                },

                data:[
                    {value: '--',
                        name:'一期',
                        itemStyle:{
                            normal: {
                                color: '#45c8dc'
                            }
                        }
                    },
                    {value:'--',
                        name:'二期',
                        itemStyle:{
                            normal: {
                                color: '#629be6'
                            }
                        }
                    },
                    {value:'--',
                        name:'三期',
                        itemStyle:{
                            normal: {
                                color: '#9b8ac0'
                            }
                        }
                    },
                    {value:'--',
                        name:'四期',
                        itemStyle:{
                            normal: {
                                color: '#e99d59'
                            }
                        }
                    },
                    {value:'--',
                        name:'五期',
                        itemStyle:{
                            normal: {
                                color: '#45dcd0'
                            }
                        }
                    }
                ]
            }
        ]
    },
    //血糖图标配置（三个可用同一个配置）
    blood_glucose_graph_0:{
        title: {
            show: true,
            text: '筛查总人数：',
            right:'112px',
            top: '120px',
            subtext: '--人',
            textStyle: {
                fontSize: 16,
                color: '#718aa6'
            },
            subtextStyle: {
                fontFamily: 'Arial',
                fontSize: 28,
                color: '#40aae3',
                fontWeight: 'bold'
            }
        },
        grid: {
            left:'0',
            top: '0',
            width:'100%',
            height: '100%'
        },
        legend: {
            orient: 'vertical',
            right: '100px',
            top: '200px',
            itemGap:12,
            itemWidth: 10,
            itemHeight:10,
            icon:'rect',
            formatter: function(name) {
                switch(name) {
                    case '达标':
                        return ' ' + name + '     '+ '--' +'人';
                        break;
                    case '不达标':
                        return ' ' + name + '  '+ '--' +'人';
                }
            },
            textStyle: {
                fontSize:14,
                color: '#718aa6'
            },
            data: ['达标', '不达标']
        },
        series : [
            {
                name: '糖化血红蛋白分析',
                type: 'pie',
                avoidLabelOverlap: false,
                hoverAnimation: false, // 关闭hover放大饼图动画效果
                radius : '104px',
                center: ['35%', '50%'],
                itemStyle:{
                    normal:{
                        label:{
                            show: true,
                            formatter: myFormat,
                            position:'inside',
                            textStyle: {
                                fontFamily: 'Arial',
                                fontSize:18,
                                color: '#fff',
                                /* fontWeight:'bold'*/
                            }
                        },
                        labelLine :{show:true}
                    }
                },

                data:[
                    {value: '--',
                        name:'达标',
                        itemStyle:{
                            normal: {
                                color: '#45c8dc'
                            }
                        }
                    },
                    {value:'--',
                        name:'不达标',
                        itemStyle:{
                            normal: {
                                color: '#629be6'
                            }
                        }
                    }
                ]
            }
        ]
    },
    /* blood_glucose_graph_1:{
     title: {
     show: true,
     text: '筛查总人数：',
     right:'120px',
     top: '120px',
     subtext: '25226人',
     textStyle: {
     fontFamily: ' YaHei',
     fontSize: 16,
     color: '#718aa6',
     fontWeight: 'lighter'
     },
     subtextStyle: {
     fontFamily: 'ArialMT',
     fontSize: 28,
     color: '#40aae3',
     fontWeight: 'bold'
     }
     },
     grid: {
     left:'0',
     top: '0',
     width:'100%',
     height: '100%'
     },
     legend: {
     orient: 'vertical',
     right: '100px',
     top: '200px',
     itemGap:12,
     itemWidth: 10,
     itemHeight:10,
     icon:'rect',
     formatter: function(name) {
     switch(name) {
     case '达标':
     return ' ' + name + '  8521人';
     break;
     case '不达标':
     return ' ' + name + '  5200人';
     }
     },
     textStyle: {
     fontFamily: 'MicroSoft YaHei',
     fontSize:14,
     color: '#718aa6'
     },
     data: ['达标', '不达标']
     },
     series : [
     {
     name: '空腹血糖分析',
     type: 'pie',
     avoidLabelOverlap: false,
     hoverAnimation: false, // 关闭hover放大饼图动画效果
     radius : '104px',
     center: ['35%', '50%'],
     itemStyle:{
     normal:{
     label:{
     show: true,
     formatter: function(params){
     return Math.round(params.percent)+'%';
     },
     position:'inside',
     textStyle: {
     fontFamily: 'ArialMT',
     fontSize:16,
     color: '#fff'
     }
     },
     labelLine :{show:true}
     }
     },

     data:[
     {value: '8521',
     name:'达标',
     itemStyle:{
     normal: {
     color: '#45c8dc'
     }
     }
     },
     {value:5200,
     name:'不达标',
     itemStyle:{
     normal: {
     color: '#629be6'
     }
     }
     }
     ]
     }
     ]
     },
     blood_glucose_graph_2:{
     title: {
     show: true,
     text: '筛查总人数：',
     right:'120px',
     top: '120px',
     subtext: '25226人',
     textStyle: {
     fontFamily: 'MicroSoft YaHei',
     fontSize: 16,
     color: '#718aa6',
     fontWeight: 'lighter'
     },
     subtextStyle: {
     fontFamily: 'ArialMT',
     fontSize: 28,
     color: '#40aae3',
     fontWeight: 'bold'
     }
     },
     grid: {
     left:'0',
     top: '0',
     width:'100%',
     height: '100%'
     },
     legend: {
     orient: 'vertical',
     right: '100px',
     top: '200px',
     itemGap:12,
     itemWidth: 10,
     itemHeight:10,
     icon:'rect',
     formatter: function(name) {
     switch(name) {
     case '达标':
     return ' ' + name + '  8521人';
     break;
     case '不达标':
     return ' ' + name + '  5200人';
     }
     },
     textStyle: {
     fontFamily: 'MicroSoft YaHei',
     fontSize:14,
     color: '#718aa6'
     },
     data: ['达标', '不达标']
     },
     series : [
     {
     name: '餐后2小时血糖分析',
     type: 'pie',
     avoidLabelOverlap: false,
     hoverAnimation: false, // 关闭hover放大饼图动画效果
     radius : '104px',
     center: ['35%', '50%'],
     itemStyle:{
     normal:{
     label:{
     show: true,
     formatter: function(params){
     return Math.round(params.percent)+'%';
     },
     position:'inside',
     textStyle: {
     fontFamily: 'ArialMT',
     fontSize:16,
     color: '#fff'
     }
     },
     labelLine :{show:true}
     }
     },

     data:[
     {value: '8521',
     name:'达标',
     itemStyle:{
     normal: {
     color: '#45c8dc'
     }
     }
     },
     {value:5200,
     name:'不达标',
     itemStyle:{
     normal: {
     color: '#629be6'
     }
     }
     }
     ]
     }
     ]
     },*/
    //血脂四个tab这是哪还形式相同，只需要分别传入不同数据给饼图和环形图
    blood_fat_pie_graph:{
        title: {
            show: true,
            text: '筛查总人数：',
            right:'138px',
            top: '40px',
            subtext: '--人',
            textStyle: {
                fontSize: 16,
                color: '#718aa6'
            },
            subtextStyle: {
                fontFamily: 'Arial',
                fontSize: 28,
                color: '#40aae3',
                fontWeight: 'bold'
            }
        },
        grid: {
            left:'0',
            top: '0',
            width:'100%',
            height: '100%'
        },
        legend: {
            orient: 'vertical',
            right: '60px',
            top: '120px',
            itemGap:12,
            itemWidth: 10,
            itemHeight:10,
            icon:'rect',
            formatter: function(name) {
                switch(name) {
                    case '正常':
                        return ' ' + name + '                   '+ '--' +'人';
                        break;
                    case '无法识别的异常':
                        return ' ' + name + '  '+ '--' +'人';
                        break;
                    case '异常偏高':
                        return ' ' + name + '            '+ '--' +'人';
                        break;
                    case '异常偏低':
                        return ' ' + name + '            '+ '--' +'人';
                }
            },
            textStyle: {
                fontSize:14,
                color: '#718aa6'
            },
            data: ['正常', '无法识别的异常', '异常偏高', '异常偏低']
        },
        series : [
            {
                name: '低密度血脂分析',
                type: 'pie',
                avoidLabelOverlap: false,
                hoverAnimation: false, // 关闭hover放大饼图动画效果
                radius : '100px',
                center: ['30%', '55%'],
                itemStyle:{
                    normal:{
                        label:{
                            show: true,
                            formatter: myFormat,
                            position:'inside',
                            textStyle: {
                                fontFamily: 'Arial',
                                fontSize:18,
                                color: '#fff'
                            }
                        },
                        labelLine :{show:true}
                    }
                },

                data:[
                    {value: '--',
                        name:'正常',
                        itemStyle:{
                            normal: {
                                color: '#45c8dc'
                            }
                        }
                    },
                    {value:'--',
                        name:'无法识别的异常',
                        itemStyle:{
                            normal: {
                                color: '#629be6'
                            }
                        }
                    },
                    {value:'--',
                        name:'异常偏高',
                        itemStyle:{
                            normal: {
                                color: '#9b8ac0'
                            }
                        }
                    },
                    {value:'--',
                        name:'异常偏低',
                        itemStyle:{
                            normal: {
                                color: '#e99d59'
                            }
                        }
                    }
                ]
            }
        ]
    },
    blood_fat_circular_graph: {
        title: {
            show: true,
            text: '异常占比\n   --%',
            right:'180px',
            top: '100px',
            textStyle: {
                fontSize: 18,
                color: '#718aa6',
                fontWeight: 'lighter'
            }
        },
        grid: {
            left:'0',
            top: '0',
            width:'100%',
            height: '100%'
        },
        legend: {
            orient: 'vertical',
            left: '140px',
            top: '100px',
            itemGap:12,
            itemWidth: 10,
            itemHeight:10,
            icon:'rect',
            formatter: function(name){
                return ' ' + name;
            },
            textStyle: {
                fontSize:14,
                color: '#718aa6'
            },
            data: ['正常', '异常']
        },
        series : [
            {
                name: '异常分析',
                type: 'pie',
                avoidLabelOverlap: false,
                hoverAnimation: false, // 关闭hover放大饼图动画效果
                radius : ['50px','94px'],
                center: ['60%', '50%'],
                itemStyle:{
                    normal:{
                        label:{
                            show: false,
                            formatter: myFormat,
                            position:'inside',
                            textStyle: {
                                fontFamily: 'Arial',
                                fontSize:18,
                                color: '#fff',
                                fontWeight:'bold'
                            }
                        },
                        labelLine :{show:true}
                    }
                },
                data:[
                    {value: '--',
                        name:'正常',
                        itemStyle:{
                            normal: {
                                color: '#45c8dc'
                            }
                        }
                    },
                    {value:'--',
                        name:'异常',
                        itemStyle:{
                            normal: {
                                color: '#629be6'
                            }
                        }
                    }
                ]
            }
        ]
    }
};

