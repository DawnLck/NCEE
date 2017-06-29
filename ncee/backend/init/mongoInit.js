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

// var getPartCandidates = function (score, callback) {
//
// };

exports.getCandidates = function (preferences, score, floatRange, callback) {

    // console.log(preferences);
    var result= [];
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

//读取文件内容
exports.saveSchoolArray = mongoModel.saveSchoolArray;