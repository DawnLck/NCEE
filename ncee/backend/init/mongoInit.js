/**
 * Created by Dell on 2017/6/14.
 */
/**
 * Created by Dell on 2017/6/13.
 */
var mongoModel = require('../lib/mongooseModel');
var xlsx = require('node-xlsx');
var async = require('async');

// var conformedPlansTable = 'plans_conformed_2017';
// var conformedPlansTable = 'plans_2nd_conformed_2017';
var conformedPlansTable = 'ncee_2017';

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

exports.readConformedData = function (xlsxName, collName, callback) {
    var obj = xlsx.parse(xlsxName);
    var data = obj[0].data;
    console.log('Get plans conformed: ' + data.length + ' ' + data[0].length);
    data.splice(0, 2);

    mongoModel.saveConformedData(data, collName, function (data) {
        callback(data);
    });
};

exports.getCandidates = function (preferences, score, floatRange, callback) {

    mongoModel.getRanking(score, 'score2ranks', function (data) {
        console.log('getRanking....');
        var rankingNum = data[0].grandTotal;
        var ltLimit = rankingNum + floatRange;
        var gtLimit = rankingNum > floatRange ? (rankingNum - floatRange) : 0;
        console.log('Range: ' + gtLimit + ' ~ ' + ltLimit);
        var query = {
            $and: [
                {pastRankingNumber: {$gte: gtLimit}},
                {pastRankingNumber: {$lt: ltLimit}},
                {professionName: new RegExp(preferences.preference1)}
            ]
        };
        var fields = null;
        var sorts = {sort: {pastRankingNumber: -1}};
        mongoModel.getConformedData(query, fields, sorts, conformedPlansTable, function (err, data) {
            console.log(err);
            console.log(data.length);
            callback(data);
        });
    });
};

var autoRecommendPartByProfessionWithWeight = function (query, fields, sorts, weights, rankingNum, callbackPart) {
    // console.log('Params below:');
    // console.log(query);
    // console.log(fields);
    // console.log(sorts);

    mongoModel.getConformedData(query, fields, sorts, conformedPlansTable, function (err, data) {
        if (data.length) {
            var result = data.slice();
            console.log('Auto recommend result length: ' + result.length);
            var mark = 0, count = weights, selectedArr = [];
            if (result.length > 1) {
                for (var i = 0; i < result.length; i++) {
                    if (result[i].pastRankingNumber < rankingNum) {
                        mark = i;
                        console.log('RankingNum: ' + rankingNum);
                        console.log('Mark between ' + result[mark - 1].pastRankingNumber + ' ~ ' + result[mark].pastRankingNumber);
                        break;
                    } else {
                    }
                }
                console.log('Step 1: ' + selectedArr.length);
                for (var j = (mark - 1); j > 0; j--) {
                    if (count > 0) {
                        // console.log(count);
                        selectedArr.push(result[j]);
                        count--;
                    }
                }
                console.log('Step 2: ' + selectedArr.length);
                count = weights;
                for (var x = mark; x < result.length; x++) {
                    if (count > 0) {
                        selectedArr.push(result[x]);
                        count--;
                    }
                }
                console.log('Step 3: ' + selectedArr.length);
                callbackPart(err, selectedArr);
            }
            else {
                console.log('Result length < 1 Or = 1');
                callbackPart(err, result);
            }
        }
        else {
            callbackPart(err, []);
        }
    });
};

var autoRecommendPartByProfession = function (query, fields, sorts, rankingNum, callback) {
    mongoModel.getConformedData(query, fields, sorts, conformedPlansTable, function (err, data) {
        callback(err, data);
    });
};

var autoRecommendPartByScore = function (preferences, score, floatRange, province, is985, is211, subjects, cb) {
    /* 先从一段一份表里获得自己的分数对应的名次 */
    // console.log('scoreA:'+score);
    score = score> 686 ? 686 : parseInt(score);
    mongoModel.getRanking(score, 'score2ranks', function (data) {
        var rankingNum = parseInt(data[0].grandTotal);
        var ltLimit = rankingNum + floatRange;
        var gtLimit = rankingNum > floatRange ? (rankingNum - floatRange) : 0;

        // console.log(preferences);
        // console.log(is985 === '0');
        console.log('Score: ' + score + ' province:' + ' 985高校:' + is985 + ' 211高校:' + is211);
        console.log('[GetRanking]: ' + score + ' -  ' + rankingNum +
            ' Range: ' + gtLimit + ' ~ ' + ltLimit);

        var fields = null;
        var sorts = {sort: {pastRankingNumber: -1}};

        var provinceQuery = [];
        for (var i = 0; i < province.length; i++) {
            provinceQuery.push({province: new RegExp(province[i])});
        }

        var schoolLevelQuery = {};
        if (parseInt(is985) === 985) {
            if (parseInt(is211) === 211) {
                schoolLevelQuery = {
                    $or: [
                        {
                            Is985: is985
                        },
                        {
                            Is211: is211
                        }
                    ]
                };
            } else {
                schoolLevelQuery = {
                    Is985: is985
                }
            }
        } else {
            schoolLevelQuery = {
                $and: [
                    {Is985: '0'},
                    {Is211: is211}
                ]
            }
        }

        async.auto({
            firstStep: function (callback) {
                var query = {
                    $and: [
                        {pastRankingNumber: {$gte: gtLimit}},
                        {pastRankingNumber: {$lt: ltLimit}},
                        {professionCategory: new RegExp(preferences.preference1)},
                        {
                            $or: provinceQuery
                        },
                        schoolLevelQuery,
                        {
                            $or: subjects
                        }
                    ]
                };

                // console.log('\nFirstStep: ');
                console.log(query);
                // autoRecommendPartByProfession(query, fields, sorts, rankingNum, function (err, data) {
                //     // console.log(data);
                //     callback(null, data);
                // });
                mongoModel.getConformedData(query, fields, sorts, conformedPlansTable, function (err, data) {
                    // console.log('First-step data-length: ' + data.length);
                    callback(err, data);
                });
            },
            secondStep: function (callback) {
                var query = {
                    $and: [
                        {pastRankingNumber: {$gte: gtLimit}},
                        {pastRankingNumber: {$lt: ltLimit}},
                        {professionCategory: new RegExp(preferences.preference2)},
                        {
                            $or: provinceQuery
                        },
                        schoolLevelQuery,
                        {
                            $or: subjects
                        }
                    ]
                };
                // autoRecommendPartByProfession(query, fields, sorts, rankingNum, function (err, data) {
                //     // console.log(data);
                //     callback(null, data);
                // });
                mongoModel.getConformedData(query, fields, sorts, conformedPlansTable, function (err, data) {
                    // console.log('Second-step data-length: ' + data.length);
                    callback(err, data);
                });
            },
            thirdStep: function (callback) {
                var query = {
                    $and: [
                        {pastRankingNumber: {$gte: gtLimit}},
                        {pastRankingNumber: {$lt: ltLimit}},
                        {professionCategory: new RegExp(preferences.preference3)},
                        {
                            $or: provinceQuery
                        },
                        schoolLevelQuery,
                        {
                            $or: subjects
                        }
                    ]
                };
                // autoRecommendPartByProfession(query, fields, sorts, rankingNum, function (err, data) {
                //     // console.log(data);
                //     callback(null, data);
                // });
                mongoModel.getConformedData(query, fields, sorts, conformedPlansTable, function (err, data) {
                    // console.log('Third-step data-length: ' + data.length);
                    callback(err, data);
                });
            }
        }, function (error, result) {
            if (error) {
                console.log('Error:');
                console.log(error);
                cb(error, null);
            }
            else {
                console.log('Score: ' + score + ' Result -> First step ' + result['firstStep'].length +
                    ' / Second Step ' + result['secondStep'].length + ' / ThirdStep ' + result['thirdStep'].length);
                cb(null, result);
            }
        });
    });
    // callback('Return Auto Recommend....');
};

exports.getAutoRecommend = function (params, cb) {
    var preferences = {
        preference1: params.preference1,
        preference2: params.preference2,
        preference3: params.preference3
    };
    var bias = parseInt(params.bias);
    var score = parseInt(params.score);
    var floatRange = parseInt(params.floatRange);
    var province = params.province;
    // if (province === '全部省市') {
    //     province = '';
    // }
    // if (province.length === 0) {
    //     province = null;
    // }
    var is985 = params.schoolLevel_985 === 'true' ? '985' : '0';
    var is211 = params.schoolLevel_211 === 'true' ? '211' : '0';
    var subjectsArr = [];
    // var tem = params.subjects;
    // console.log(tem);
    for (var i = 0; i < params.subjects.length; i++) {
        // console.log(params.subjects[i]);
        if (params.subjects[i].selected === 'true') {
            // console.log('True' + subjects[i].subject);
            subjectsArr.push({subjects: new RegExp(params.subjects[i].subject)});
        }
    }
    // console.log(subjectsArr);

    console.log('score:' + score);

    async.auto({
        scoreHigher: function (callback) {
            autoRecommendPartByScore(preferences, (score + bias), floatRange, province, is985, is211, subjectsArr, function (err, data) {
                callback(null, data);
            });
        },
        scoreNormal: function (callback) {
            autoRecommendPartByScore(preferences, score, floatRange, province, is985, is211, subjectsArr, function (err, data) {
                callback(null, data);
            });
        },
        scoreLower: function (callback) {
            autoRecommendPartByScore(preferences, (score - bias), floatRange, province, is985, is211, subjectsArr, function (err, data) {
                callback(null, data);
            });
        }
    }, function (error, result) {
        if (!error) {
            cb(null, result);
        }
        else {
            console.log('Error:');
            console.log(error);
            cb(error, null);
        }
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

exports.conformDataAsync = function () {
    mongoModel.conformDataAsync('2017plans', 'schools', 'conforms', 'news', 'nulls');
};

exports.filterData_2ndBatch = function (xlsxName, collName, callback) {
    var obj = xlsx.parse(xlsxName);
    var data = obj[0].data;
    console.log('Get plans conformed: ' + data.length + ' ' + data[0].length);
    data.splice(0, 2);

    for (var i = 0; i < data.length; i++) {
        // if(data[0][3])
        var query = {
            'schoolName': data[i][2],
            'professionName': data[i][4]
        };
        mongoModel.getOneConformedData(query, {}, {}, 'plans_conformed_2017', data[i], function (err, doc, src) {
            if (doc) {
                console.log('Find the record....');
                console.log('Record data: ' + doc.schoolName + ' ' + doc.professionName);
                mongoModel.saveConformedOne(doc, '2017_2nd_plans', function (callback_data) {
                    console.log(callback_data);
                });
            } else {
                mongoModel.saveStandardReducedOne(src, '2017_2nd_n_plans', function (callback_data) {
                    console.log(callback_data);
                });
                console.log('The record not find....');
            }
        })
    }
    // console.log('The first data: ' + data[0][2]+' '+data[0][4]);

    callback('Filter Data_2nd ...');
};

exports.filterData_2ndBatchAsync = function (xlsxName, collName, callback) {
    var obj = xlsx.parse(xlsxName);
    var data = obj[0].data;
    console.log('Get plans conformed: ' + data.length + ' ' + data[0].length);
    data.splice(0, 2);
    var concurrencyCount = 0;


    async.eachLimit(data, 1000, function (item, callback) {
        var query = {
            'schoolName': item[2],
            'professionName': item[4]
        };
        mongoModel.getOneConformedData(query, {}, {}, collName, item, function (err, doc, src) {
            if (doc) {
                console.log('Find the record....');
                console.log('Record data: ' + doc.schoolName + ' ' + doc.professionName);
                mongoModel.saveConformedOne(doc, '2017_2nd_merged_plans', function (callback_data) {
                    console.log(callback_data);
                });
            } else {
                mongoModel.saveStandardReducedOne(src, '2017_2nd_merged_n_plans', function (callback_data) {
                    console.log(callback_data);
                });
                console.log('The record not find....');
            }

            var delay = parseInt((Math.random() * 10000000) % 2000, 10);

            concurrencyCount++;
            console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', item[2], '耗时' + delay + '毫秒');

            setTimeout(function () {
                concurrencyCount--;
                callback(null);
            }, delay);
        })
    }, function (err) {
        console.log('Filter data finished....');
    });

    // console.log('The first data: ' + data[0][2]+' '+data[0][4]);

    callback('Filter Data_2nd ...');
};

//读取文件内容
exports.saveSchoolArray = mongoModel.saveSchoolArray;