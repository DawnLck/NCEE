/**
 * Created by Dell on 2017/6/14.
 */
/**
 * Created by Dell on 2017/6/13.
 */
var mongoModel = require('../lib/mongooseModel');
var xlsx = require('node-xlsx');

exports.readSchoolsExcel = function (xlsxName, collName, callback) {
    var obj = xlsx.parse(xlsxName);
    var data = obj[0].data;
    // var dataReduce = obj[1].data;
    console.log(data.length + ' ' + data[0].length);
    // console.log(dataReduce.length + ' ' + dataReduce[0].length);
    // dataReduce.splice(0, 1);
    data.splice(0, 1);
    mongoModel.saveSchoolArray(data, collName, function (data) {
        // console.log(data);
        callback(data);
    });
};

exports.readAdmissionExcel = function (xlsxName, collName, callback) {
    var obj = xlsx.parse(xlsxName);
    var data = obj[0].data;
    // var dataReduce = obj[1].data;
    console.log(data.length + ' ' + data[0].length);
    // console.log(dataReduce.length + ' ' + dataReduce[0].length);
    data.splice(0, 1);
    mongoModel.saveAdmissionArray(data, collName, function (data) {
        // console.log(data);
        callback(data);
    });
};

exports.readScore2RankExcel = function (xlsxName, collName, callback) {
    var obj = xlsx.parse(xlsxName);
    var data = obj[0].data;
    console.log(data.length + ' ' + data[0].length);
    data.splice(0, 1);
    mongoModel.saveScore2Rank(data, collName, function (data) {
        callback(data);
    });
};

exports.readPlans2017 = function (xlsxName, collName, callback) {
    var obj = xlsx.parse(xlsxName);
    var data = obj[0].data;
    console.log('Get plans 2017: ' + data.length + ' ' + data[0].length);
    data.splice(0, 1);
    mongoModel.savePlans2017(data, collName, function (data) {
        callback(data);
    });
};

exports.getCandidates = function (preferences, score, floatRange, callback) {

    // console.log(preferences);
    var result = [];
    mongoModel.getRanking(score, 'score2ranks', function (data) {
        console.log('getRanking....');
        var rankingNum = data[0].grandTotal;
        var ltLimit = rankingNum + floatRange;
        var gtLimit = rankingNum > floatRange ? (rankingNum - floatRange) : 0;
        console.log('Range: ' + gtLimit + ' ~ ' + ltLimit);
        var query = {
            $and: [
                {rankingNumber: {$gte: gtLimit}},
                {rankingNumber: {$lt: ltLimit}},
                {professionName: new RegExp(preferences.preference1)}
            ]
        };
        mongoModel.getSchoolsData(query, 'schools', function (data) {
            // for(var partIndex in data){
            //     data[partIndex]['class'] = 'part_1';
            // }
            // if(data[data.length - 1].class){
            //     callback(data);
            // }
            callback(data);
        });
    });
};

exports.conformData = function () {
    var reuslts = [];
    mongoModel.getPlans2017('2017plans', function (data2017) {
        console.log(data2017.length);
        var itemIndex = 0;
        for (; itemIndex < data2017.length; itemIndex++) {
            // if (itemIndex > ) {
            //     break;
            // }
            if (data2017[itemIndex].schoolName && data2017[itemIndex].professionName) {
                var query = {
                    $and: [{
                        schoolName: data2017[itemIndex].schoolName
                    }, {
                        professionName: data2017[itemIndex].professionName
                    }]
                };
                var query2 = {
                    schoolName: data2017[itemIndex].schoolName
                };
                // console.log(query);
                mongoModel.getPlans2016(data2017[itemIndex], query, 'schools', function (item, data2016) {
                    // delete item._id;
                    var tem2017 = {
                        schoolCode: item.schoolCode, /* 院校代码 */
                        schoolName: item.schoolName, /* 院校名称 */
                        schoolCategoryCode: item.schoolCategoryCode, /* 院校类别代码 */
                        schoolCategory: item.schoolCategory, /* 院校类别（专科或者是本科）*/

                        // professionId: Number,
                        professionCode: item.professionCode, /* 专业代码 */
                        professionName: item.professionName, /* 专业名称 */
                        professionYear: item.professionYear, /* 专业学年 */
                        professionCost: item.professionCost, /* 专业学费（每年） */
                        professionIntro: item.professionIntro, /* 专业介绍 */

                        subjectsCode: item.subjectsCode, /* 需修科目代码 */
                        subjects: item.subjects, /* 需修科目 */

                        plansNum: item.plansNum, /* 计划数 */

                        IsNormal: item.IsNormal, /* 是否师范类学校 */
                        city: item.city, /* 城市 */
                        Is985: item.Is985, /* 是否是985 */
                        Is211: item.Is211, /* 是否是211 */
                        province: item.province, /* 省份 */
                        IsPrivate: item.IsPrivate, /* 是否是民办学校 */

                        schoolIndex: item.schoolIndex /* 院校名次号 */
                    };
                    if (data2016) {
                        if (data2016[0]) {
                            // console.log(data2016);
                            // console.log

                            // mongoModel.savePlansConformedItemAsync(item, data2016[0], 'conformedPlans');
                        }
                        else {
                            // console.log(tem2017);
                            // console.log(data2016);
                            mongoModel.savePlansItem2017(tem2017, 'plansNull_2017');
                        }
                        // var item = data2017[itemIndex];
                        // console.log(data2016.length);
                        // console.log('2017Data: ' + item);
                        // console.log('2016Data: ' + data2016);

                        // (function (item) {

                        // (function (item) {
                        //     item.admissionsCount2016 = data2016[0].admissionCount;
                        //     item.averageScore2016 = data2016[0].averageScore;
                        //     item.lowestScore2016 = data2016[0].lowestScore;
                        //     item.rankingNumber2016 = data2016[0].rankingNumber;
                        //     console.log('admissionsCount2016: '+item.admissionsCount2016);
                        //     console.log('lowestScore2016: '+item.lowestScore2016);
                        //     console.log(item);
                        //     console.log(data2016[0]);
                        //     mongoModel.savePlansConformedItem(item, 'conformedPlans');
                        // })(item);

                        mongoModel.savePlansConformedItem(item, 'conformedPlans');

                        // setTimeout(function () {
                        //
                        //
                        // }, 1000);
                        // console.log(item);
                    }
                    else {
                        mongoModel.savePlansItem2017(tem2017, 'plansNew_2017');
                    }
                });
            }
            else {
                console.log(data2017[itemIndex]);
            }
        }
    });
};

exports.conformDataAsync  = function(){
    mongoModel.conformDataAsync('2017plans', 'schools', 'conforms', 'news', 'nulls');
};

//读取文件内容
exports.saveSchoolArray = mongoModel.saveSchoolArray;