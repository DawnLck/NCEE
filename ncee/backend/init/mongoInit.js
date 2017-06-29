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
    var dataReduce = obj[1].data;
    console.log(data.length + ' ' + data[0].length);
    console.log(dataReduce.length + ' ' + dataReduce[0].length);
    dataReduce.splice(0, 1);
    mongoModel.saveSchoolArray(dataReduce, collName, function (data) {
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

exports.getCandidates = function (preferences, rankingNum, floatRange, callback) {
    var ltLimit = rankingNum + floatRange;
    var gtLimit = rankingNum > floatRange ? (rankingNum - floatRange) : 0;
    console.log(gtLimit + ' ~ ' + ltLimit);
    var query = {
        $and: [
            {rankingNumber: {$gte: gtLimit}},
            {rankingNumber: {$lt: ltLimit}}
        ]
    };
    mongoModel.getAdmissionData(query, 'admissions', function (data) {
        callback(data);
    });
};

//读取文件内容
exports.saveSchoolArray = mongoModel.saveSchoolArray;