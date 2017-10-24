/**
 * Created by bob on 2016/11/16.
 */
var express = require('express');
var router = express.Router({mergeParams: true});
var RestMsg = require('../../common/restmsg');
var Cache = require('../../service/common/cache');
var Sql = require('../../service/common/sql');
var pinyin = require('pinyin');

//------------------工作排名--------------------
router.route('/jobranking')
    .get(function (req, res, next) {
        var restmsg = new RestMsg();
        var location = req.query.location=='崇明区'?'崇明县':req.query.location;
        var completionPopulation = [];
        if(location == '全上海') {
            var data = Cache.find('/api/home/jobranking/countyData');
            if(data){
                completionPopulation = [{county:'黄浦区',num:[0,0,0,0,0]},{county:'徐汇区',num:[0,0,0,0,0]},{county:'长宁区',num:[0,0,0,0,0]},{county:'静安区',num:[0,0,0,0,0]},{county:'普陀区',num:[0,0,0,0,0]},{county:'虹口区',num:[0,0,0,0,0]},{county:'杨浦区',num:[0,0,0,0,0]},{county:'浦东新区',num:[0,0,0,0,0]},{county:'闵行区',num:[0,0,0,0,0]},{county:'宝山区',num:[0,0,0,0,0]},{county:'嘉定区',num:[0,0,0,0,0]},{county:'金山区',num:[0,0,0,0,0]},{county:'松江区',num:[0,0,0,0,0]},{county:'青浦区',num:[0,0,0,0,0]},{county:'奉贤区',num:[0,0,0,0,0]},{county:'崇明区',num:[0,0,0,0,0]}];//完成人数队列
                for(var i=0; i<completionPopulation.length; i++) {
                    for(var j=0; j<data.length; j++) {
                        data[j]['county'] = data[j]['county']=='崇明县'?'崇明区':data[j]['county'];
                        if(completionPopulation[i]['county'] == data[j]['county']) {
                            completionPopulation[i]['num'][0] = data[j]['sfbb_cnt']?data[j]['sfbb_cnt']:0;
                            completionPopulation[i]['num'][1] = data[j]['vessel']?data[j]['vessel']:0;
                            completionPopulation[i]['num'][2] = data[j]['swm_cnt']?data[j]['swm_cnt']:0;
                            completionPopulation[i]['num'][3] = data[j]['nephropathy']?data[j]['nephropathy']:0;
                            completionPopulation[i]['num'][4] = data[j]['suger']?data[j]['suger']:0;

                        }
                    }
                }
            }
        } else {
            var data = Cache.find('/api/home/jobranking/hospitalData');
            if(data){
                var sliceStr = location=='崇明县'?'县':'区';
                var street = [];
                var town = [];
                var village = [];
                var other = [];
                for(var i=0; i<data.length; i++) {
                    if(data[i]['county'] == location) {
                        var hospital = data[i]['hospital_name'];
                        var start = hospital.indexOf(sliceStr)+1;
                        var end = hospital.length;
                        hospital = hospital.substring(start,end);
                        if(hospital.indexOf('街')) {
                            street.push({
                                county: hospital,
                                num: [data[i]['sfbb_cnt'],0,data[i]['swm_cnt'],0,0]
                            });
                        } else if(hospital.indexOf('镇')) {
                            town.push({
                                county: hospital,
                                num: [data[i]['sfbb_cnt'],0,data[i]['swm_cnt'],0,0]
                            });
                        } else if(hospital.indexOf('村')) {
                            village.push({
                                county: hospital,
                                num: [data[i]['sfbb_cnt'],0,data[i]['swm_cnt'],0,0]
                            });
                        } else {
                            other.push({
                                county: hospital,
                                num: [data[i]['sfbb_cnt'],0,data[i]['swm_cnt'],0,0]
                            });
                        }
                    }
                }
                //分别按照首字母排序
                street.sort(function(a,b){return pinyin(a['county'].substr(0,1),{style:pinyin.STYLE_FIRST_LETTER})[0][0].localeCompare(pinyin(b['county'].substr(0,1),{style:pinyin.STYLE_FIRST_LETTER})[0][0]);});
                town.sort(function(a,b){return pinyin(a['county'].substr(0,1),{style:pinyin.STYLE_FIRST_LETTER})[0][0].localeCompare(pinyin(b['county'].substr(0,1),{style:pinyin.STYLE_FIRST_LETTER})[0][0]);});
                village.sort(function(a,b){return pinyin(a['county'].substr(0,1),{style:pinyin.STYLE_FIRST_LETTER})[0][0].localeCompare(pinyin(b['county'].substr(0,1),{style:pinyin.STYLE_FIRST_LETTER})[0][0]);});
                other.sort(function(a,b){return pinyin(a['county'].substr(0,1),{style:pinyin.STYLE_FIRST_LETTER})[0][0].localeCompare(pinyin(b['county'].substr(0,1),{style:pinyin.STYLE_FIRST_LETTER})[0][0]);});
                completionPopulation = street.concat(town);
                completionPopulation = completionPopulation.concat(village);
                completionPopulation = completionPopulation.concat(other);
            }
        }
        restmsg.successMsg();
        restmsg.setResult(completionPopulation);
        res.send(restmsg);
    })

//------------------情况分析--------------------
router.route('/analysis')
    .get(function (req, res, next) {
        var restmsg = new RestMsg();
        var lefttab = req.query.lefttab;
        var righttab = req.query.righttab;
        var result = {};
        var data = {};
        var url = req.originalUrl.substr(0,req.originalUrl.indexOf("?"));
        for (var script in Sql[url]['sql']) {
            data[script] = Cache.find(url + '/' + script);
        }
        if(data){
            var countyData = data['countyData']?data['countyData']:0; //各区县数据
            var screeningPopulation = data['screeningPopulation']?data['screeningPopulation']:0;//参加筛查总人数
            var cityData = data['cityData']?data['cityData']:0;//全上海数据，用作界面饼图分母
            var array = [];
            var cityNum = [];
            var cityRate = [];
            if(countyData && cityData) {
                if(lefttab==0 && righttab==0) {
                    for(var i=0; i<countyData.length; i++){
                        var county = countyData[i]['county']=='崇明县'?'崇明区':countyData[i]['county'];
                        var item = {county:county,total:countyData[i]['qb_cnt'],num:[],rate:[]};
                        var nerve = countyData[i]['sjbb_cnt']?countyData[i]['sjbb_cnt']:0;
                        var retina = countyData[i]['swm_cnt']?countyData[i]['swm_cnt']:0;
                        var both = countyData[i]['both_cnt']?countyData[i]['both_cnt']:0;
                        var nerveRate = countyData[i]['sjbb_rate']?countyData[i]['sjbb_rate']:0;
                        var retinaRate = countyData[i]['swm_rate']?countyData[i]['swm_rate']:0;
                        var bothRate = countyData[i]['both_rate']?countyData[i]['both_rate']:0;
                        item.num = [nerve,retina,both];
                        item.rate = [nerveRate,retinaRate,bothRate];
                        array.push(item);
                    }
                    var cityNerve = cityData[0]['sjbb_cnt']?cityData[0]['sjbb_cnt']:0;
                    var cityRetina = cityData[0]['swm_cnt']?cityData[0]['swm_cnt']:0;
                    var cityBoth = cityData[0]['both_cnt']?cityData[0]['both_cnt']:0;
                    var cityNerveRate = cityData[0]['sjbb_rate']?cityData[0]['sjbb_rate']:0;
                    var cityRetinaRate = cityData[0]['swm_rate']?cityData[0]['swm_rate']:0;
                    var cityBothRate = cityData[0]['both_rate']?cityData[0]['both_rate']:0;
                    cityNum = [cityNerve,cityRetina,cityBoth];
                    cityRate = [cityNerveRate,cityRetinaRate,cityBothRate];
                } else if(lefttab==1 && righttab==0) {
                    for(var i=0; i<countyData.length; i++){
                        var county = countyData[i]['county']=='崇明县'?'崇明区':countyData[i]['county'];
                        var item = {county:county,total:countyData[i]['qb_cnt'],num:[],rate:[]};
                        item.num = [0,0,0,0];
                        item.rate = [0,0,0,0];
                        array.push(item)
                    }
                    cityNum = [0,0,0,0];
                    cityRate = [0,0,0,0];
                } else if(lefttab==0 && righttab==1) {
                    for(var i=0; i<countyData.length; i++){
                        var county = countyData[i]['county']=='崇明县'?'崇明区':countyData[i]['county'];
                        var item = {county:county,total:countyData[i]['qb_cnt'],num:[],rate:[]};
                        var nerve = countyData[i]['sjbb_uncom']?countyData[i]['sjbb_uncom']:0;
                        var retina = (countyData[i]['swm_uncom']?countyData[i]['swm_uncom']:0);
                        var none = countyData[i]['none_cnt'];
                        var nerveRate = countyData[i]['sjbb_uncom_rate']?countyData[i]['sjbb_uncom_rate']:0;
                        var retinaRate = countyData[i]['swm_uncom_rate']?countyData[i]['swm_uncom_rate']:0;
                        var noneRate = countyData[i]['none_rate'];
                        item.num = [nerve,retina,none];
                        item.rate = [nerveRate,retinaRate,noneRate];
                        array.push(item);
                    }
                    var cityNerve = cityData[0]['sjbb_uncom'];
                    var cityRetina = cityData[0]['swm_uncom'];
                    var none = cityData[0]['none_cnt'];
                    var cityNerveRate = cityData[0]['sjbb_uncom_rate'];
                    var cityRetinaRate = cityData[0]['swm_uncom_rate'];
                    var noneRate = cityData[0]['none_rate'];
                    cityNum = [cityNerve,cityRetina,none];
                    cityRate = [cityNerveRate,cityRetinaRate,noneRate];
                } else if(lefttab==1 && righttab==1){
                    for(var i=0; i<countyData.length; i++){
                        var county = countyData[i]['county']=='崇明县'?'崇明区':countyData[i]['county'];
                        var item = {county:county,total:countyData[i]['qb_cnt'],num:[],rate:[]};
                        item.num = [0,0,0,0];
                        item.rate = [0,0,0,0];
                        array.push(item)
                    }
                    cityNum = [0,0,0,0];
                    cityRate = [0,0,0,0];
                }
            }
            result = {
                countyData: array,
                ScreeningPopulation: screeningPopulation?screeningPopulation[0]['count(distinct personcard_no)']:0,
                cityData:{
                    total:cityData?cityData[0]['qb_cnt']:0,
                    num: cityNum,
                    rate: cityRate
                }
            }
        }
        restmsg.setResult(result);
        restmsg.successMsg();
        res.send(restmsg);
    });

router.route('/workgeneral')
    .get(function(req,res,next) {
        var restMsg = new RestMsg();
        var retData = {};
        retData = Cache.find(req.originalUrl + '/'+ 'finish_number');
        // FIXME 错误处理
        restMsg.setResult(retData);
        restMsg.successMsg();
        res.send(restMsg);
    });



module.exports = router;
