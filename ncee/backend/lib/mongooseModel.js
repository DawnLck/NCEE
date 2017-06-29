/*
 * Mongoose Model
 * */
require('./mongooseConnect');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* 学校信息模式 */
var schoolSchema = new Schema({
    schoolId: Number,
    schoolCode: String,
    schoolName: String,
    professionId: Number,
    professionCode: String,
    professionName: String
}, {
    versionKey: false //取消collection在初次建立时生成的_v内部版本数据属性
});

/* 录取信息模式 */
var admissionSchema = new Schema({
    professionName: String,     /* 专业名称 */
    professionClass: String,    /* 专业类别 */
    professionCode: String,     /* 专业代码 */
    admissionNum: Number,       /* 录取数目 */
    averageScore: Number,       /* 平均分 */
    lowestScore: Number,        /* 最低分 */
    rankingNumber: Number,      /* 名次号 */
    originalBatch: String,      /* 原有批次 */
    schoolName: String,         /* 学校名称 */
    schoolCode: String,         /* 学校代码 */
    province: String,           /* 省份 */
    city: String                /* 城市 */

}, {
    versionKey: false //取消collection在初次建立时生成的_v内部版本数据属性
});

exports.saveAdmissionArray = function (arr, collName, callback) {
    if (arr.length) {
        var arrLength = arr.length;
        var targetModel = mongoose.model(collName, admissionSchema, collName);

        console.log('CollName:' + collName + ' ArrayLength: ' + arrLength);

        targetModel.remove({}, function (err) {
            if (err) {
                console.log(err);
            }
        });

        for (var i = 0; i < arrLength; i++) {
            var item = {
                professionName: arr[i][0],          /* 专业名称 */
                professionClass: arr[i][1],         /* 专业类别 */
                professionCode: arr[i][9],          /* 专业代码 */
                admissionNum: parseInt(arr[i][2]),       /* 录取数目 */
                averageScore: parseInt(arr[i][3]),       /* 平均分 */
                lowestScore: parseInt(arr[i][4]),        /* 最低分 */
                rankingNumber: parseInt(arr[i][5]),      /* 名次号 */
                originalBatch: arr[i][6],           /* 原有批次 */
                schoolName: arr[i][7],              /* 学校名称 */
                schoolCode: arr[i][8],              /* 学校代码 */
                province: arr[i][10],               /* 省份 */
                city: arr[i][11]                    /* 城市 */
            };

            if(i<10){
                console.log(item);
            }

            new targetModel(item).save(function (err) {
                if (err) {
                    // console.log(i + '/' + arrLength + ' 存入失败.');
                    return err;
                } else {
                    // console.log(i + '/' + arrLength + ' 存入成功.');
                }
            })
        }
        callback('Save Admission Data ' + collName + ' Array Success');
    } else {
    }
};

exports.saveSchoolArray = function (arr, collName, callback) {
    if (arr.length) {

        var arrLength = arr.length;
        var targetModel = mongoose.model(collName, schoolSchema, collName);

        console.log('CollName:' + collName + ' ArrayLength: ' + arrLength);

        targetModel.remove({}, function (err) {
            if (err) {
                console.log(err);
            }
        });

        // console.log(arr[0]);
        for (var i = 0; i < arrLength; i++) {
            var item = {
                schoolId: parseInt(arr[i][0]),
                schoolCode: arr[i][1],
                schoolName: arr[i][2],
                professionId: parseInt(arr[i][3]),
                professionCode: arr[i][4],
                professionName: arr[i][5]
            };
            // console.log(item);
            // console.log('Processing ' + i + '/' + arrLength);
            new targetModel(item).save(function (err) {
                if (err) {
                    // console.log(i + '/' + arrLength + ' 存入失败.');
                    return err;
                } else {
                    // console.log(i + '/' + arrLength + ' 存入成功.');
                }
            })
        }
        callback('Save Data ' + collName + ' Array Success');
    } else {
    }
};

exports.getAdmissionData = function (query, collName, callback) {
    // console.log(query);
    // console.log(collName);

    var admissionModel = mongoose.model(collName, admissionSchema);
    admissionModel.find(query, function (err, data) {
        callback(data);
    });
};
