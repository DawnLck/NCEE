/*
 * Mongoose Model
 * */
require('./mongooseConnect');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* 学校信息模式 */
// var schoolSchema = new Schema({
//     schoolId: Number,
//     schoolCode: String,
//     schoolName: String,
//     professionId: Number,
//     professionCode: String,
//     professionName: String
// }, {
//     versionKey: false //取消collection在初次建立时生成的_v内部版本数据属性
// });
var schoolSchema = new Schema({
    itemIndex: Number, /* 序号 */
    schoolCode: String, /* 院校代码 */
    schoolName: String, /* 院校名称 */
    // professionId: Number,
    // professionCode: String,
    professionName: String, /* 专业名称 */
    province: String, /* 省份 */
    city: String, /* 城市 */
    professionMainClass: String, /* 专业大类 */
    professionCategory: String, /* 专业科类 */
    professionSubjects: String, /* 专业需修科目 */
    schoolLevel: Number, /* 学校层次 */
    originalBatch: String, /* 原批次 */
    admissionCount: Number, /* 录取人数 */
    averageScore: Number, /* 平均分 */
    lowestScore: Number, /* 最低分 */
    rankingNumber: Number /* 名次号 */

}, {
    versionKey: false //取消collection在初次建立时生成的_v内部版本数据属性
});

/* 录取信息模式 */
var admissionSchema = new Schema({
    professionName: String, /* 专业名称 */
    professionClass: String, /* 专业类别 */
    professionCode: String, /* 专业代码 */
    admissionNum: Number, /* 录取数目 */
    averageScore: Number, /* 平均分 */
    lowestScore: Number, /* 最低分 */
    rankingNumber: Number, /* 名次号 */
    originalBatch: String, /* 原有批次 */
    schoolName: String, /* 学校名称 */
    schoolCode: String, /* 学校代码 */
    province: String, /* 省份 */
    city: String                /* 城市 */

}, {
    versionKey: false //取消collection在初次建立时生成的_v内部版本数据属性
});

/* 一分一段表模式 */
var score2rankSchema = new Schema({
    score: Number,
    subTotal: Number,
    grandTotal: Number
},{
   versionKey: false
});

/* 2017年计划表模式 */
var plans2017Schema = new Schema({
    // itemIndex: Number, /* 序号 */
    schoolCode: String, /* 院校代码 */
    schoolName: String, /* 院校名称 */
    schoolCategoryCode: String, /* 院校类别代码 */
    schoolCategory: String, /* 院校类别（专科或者是本科）*/

    // professionId: Number,
    professionCode: String, /* 专业代码 */
    professionName: String, /* 专业名称 */
    professionYear: String, /* 专业学年 */
    professionCost: String, /* 专业学费（每年） */
    professionIntro: String, /* 专业介绍 */

    subjectsCode: String, /* 需修科目代码 */
    subjects: String, /* 需修科目 */

    plansNum: String, /* 计划数 */

    IsNormal: String, /* 是否师范类学校 */
    city: String, /* 城市 */
    Is985: String, /* 是否是985 */
    Is211: String, /* 是否是211 */
    province: String, /* 省份 */
    IsPrivate: String, /* 是否是民办学校 */

    schoolIndex: String /* 院校名次号 */

    // professionMainClass: String, /* 专业大类 */
    // professionCategory: String, /* 专业科类 */
    // professionSubjects: String, /* 专业需修科目 */
    // schoolLevel: Number, /* 学校层次 */
    // originalBatch: String, /* 原批次 */
    // admissionCount: Number, /* 录取人数 */
    // averageScore: Number, /* 平均分 */
    // lowestScore: Number, /* 最低分 */
    // rankingNumber: Number /* 名次号 */
},{
    versionKey: false
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
                professionName: arr[i][0], /* 专业名称 */
                professionClass: arr[i][1], /* 专业类别 */
                professionCode: arr[i][9], /* 专业代码 */
                admissionNum: parseInt(arr[i][2]), /* 录取数目 */
                averageScore: parseInt(arr[i][3]), /* 平均分 */
                lowestScore: parseInt(arr[i][4]), /* 最低分 */
                rankingNumber: parseInt(arr[i][5]), /* 名次号 */
                originalBatch: arr[i][6], /* 原有批次 */
                schoolName: arr[i][7], /* 学校名称 */
                schoolCode: arr[i][8], /* 学校代码 */
                province: arr[i][10], /* 省份 */
                city: arr[i][11]                    /* 城市 */
            };

            if (i < 10) {
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
            // var item = {
            //     schoolId: parseInt(arr[i][0]),
            //     schoolCode: arr[i][1],
            //     schoolName: arr[i][2],
            //     professionId: parseInt(arr[i][3]),
            //     professionCode: arr[i][4],
            //     professionName: arr[i][5]
            // };
            var item = {
                itemIndex: arr[i][0], /* 序号 */
                schoolCode: arr[i][1], /* 院校代码 */
                schoolName: arr[i][2], /* 院校名称 */
                professionName: arr[i][3], /* 专业名称 */
                province: arr[i][4], /* 省份 */
                city: arr[i][5], /* 城市 */
                professionMainClass: arr[i][6], /* 专业大类 */
                professionCategory: arr[i][7], /* 专业科类 */
                professionSubjects: arr[i][8], /* 专业需修科目 */
                schoolLevel: arr[i][9], /* 学校层次 */
                originalBatch: arr[i][10], /* 原批次 */
                admissionCount: arr[i][11], /* 录取人数 */
                averageScore: arr[i][12], /* 平均分 */
                lowestScore: arr[i][13], /* 最低分 */
                rankingNumber: Math.floor(arr[i][14]) /* 名次号 */
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

exports.saveScore2Rank = function (arr, collName, callback) {
    if (arr.length) {
        var arrLength = arr.length;
        var targetModel = mongoose.model(collName, score2rankSchema, collName);

        console.log('CollName:' + collName + ' ArrayLength: ' + arrLength);

        targetModel.remove({}, function (err) {
            if (err) {
                console.log(err);
            }
        });

        for (var i = 0; i < arrLength; i++) {
            var item = {
                /* 分数、小计、累计（名次） */
                score: arr[i][0],
                subTotal: arr[i][1],
                grandTotal: arr[i][2]
            };

            // if (i < 10) {
            //     console.log(item);
            // }

            new targetModel(item).save(function (err) {
                if (err) {
                    // console.log(i + '/' + arrLength + ' 存入失败.');
                    return err;
                } else {
                    // console.log(i + '/' + arrLength + ' 存入成功.');
                }
            })
        }
        callback('Save score2rank Data ' + collName + ' Array Success');
    } else {
    }
};

exports.savePlans2017 = function (arr, collName, callback) {
    if (arr.length) {

        var arrLength = arr.length;
        var targetModel = mongoose.model(collName, plans2017Schema, collName);

        console.log('CollName:' + collName + ' ArrayLength: ' + arrLength);

        targetModel.remove({}, function (err) {
            if (err) {
                console.log(err);
            }
        });

        // console.log(arr[0]);
        for (var i = 0; i < arrLength; i++) {
            var item = {
                // itemIndex: Number, /* 序号 */
                schoolCode: arr[i][0], /* 院校代码 */
                schoolName: arr[i][1], /* 院校名称 */
                schoolCategoryCode: arr[i][2], /* 院校类别代码 */
                schoolCategory: arr[i][3], /* 院校类别（专科或者是本科）*/

                // professionId: Number,
                professionCode: arr[i][4], /* 专业代码 */
                professionName: arr[i][5], /* 专业名称 */
                professionYear: arr[i][6], /* 专业学年 */
                professionCost: arr[i][7], /* 专业学费（每年） */
                professionIntro: arr[i][8], /* 专业介绍 */

                subjectsCode: arr[i][9], /* 需修科目代码 */
                subjects: arr[i][10], /* 需修科目 */

                plansNum: arr[i][11], /* 计划数 */

                IsNormal: arr[i][12], /* 是否师范类学校 */
                city: arr[i][13], /* 城市 */
                Is985: arr[i][14], /* 是否是985 */
                Is211: arr[i][15], /* 是否是211 */
                province: arr[i][16], /* 省份 */
                IsPrivate: arr[i][17], /* 是否是民办学校 */

                schoolIndex: arr[i][18] /* 院校名次号 */
            };
            // console.log(item);
            // console.log('Processing ' + i + '/' + arrLength);
            new targetModel(item).save(function (index, err) {
                if (err) {
                    console.log(index + '/' + arrLength + ' 存入失败.');
                    return err;
                } else {
                    // console.log(i + '/' + arrLength + ' 存入成功.');
                }
            }(i));
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
exports.getSchoolsData = function (query, collName, callback) {
    var schoolsModel = mongoose.model(collName, admissionSchema);
    schoolsModel.find(query, function (err, data) {
        callback(data);
    });
};
exports.getRanking = function (score, collName ,callback) {
    console.log('RankScore: '+ score);
    var rankingModel = mongoose.model(collName, score2rankSchema);
    rankingModel.find({'score': score}, function (err, data) {
        // console.log(data);
        callback(data);
    });
};