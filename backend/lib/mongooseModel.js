/*
 * Mongoose Model
 * */
require('./mongooseConnect');
const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    async = require('async');

/* 学校信息模式 */
// let schoolSchema = new Schema({
//     schoolId: Number,
//     schoolCode: String,
//     schoolName: String,
//     professionId: Number,
//     professionCode: String,
//     professionName: String
// }, {
//     versionKey: false //取消collection在初次建立时生成的_v内部版本数据属性
// });
const schoolSchema = new Schema({
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
const admissionSchema = new Schema({
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
const score2rankSchema = new Schema({
    score: Number,
    subTotal: Number,
    grandTotal: Number
}, {
    versionKey: false
});

/* 2017年计划表模式 */
const plans2017Schema = new Schema({
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
}, {
    versionKey: false
});

/*合表的模式*/
// let plansConformedSchema_2017 = new Schema({
//     // itemIndex: Number, /* 序号 */
//     schoolCode: String, /* 院校代码 */
//     schoolName: String, /* 院校名称 */
//     schoolCategoryCode: String, /* 院校类别代码 */
//     schoolCategory: String, /* 院校类别（专科或者是本科）*/
//
//     // professionId: Number,
//     professionCode: String, /* 专业代码 */
//     professionName: String, /* 专业名称 */
//     professionYear: String, /* 专业学年 */
//     professionCost: String, /* 专业学费（每年） */
//     professionIntro: String, /* 专业介绍 */
//
//     subjectsCode: String, /* 需修科目代码 */
//     subjects: String, /* 需修科目 */
//
//     plansNum: String, /* 计划数 */
//
//     IsNormal: String, /* 是否师范类学校 */
//     city: String, /* 城市 */
//     Is985: String, /* 是否是985 */
//     Is211: String, /* 是否是211 */
//     province: String, /* 省份 */
//     IsPrivate: String, /* 是否是民办学校 */
//
//     schoolIndex: String, /* 院校名次号 */
//
//     admissionCount2016: Number, /* 录取人数 */
//     averageScore2016: Number, /* 平均分 */
//     lowestScore2016: Number, /* 最低分 */
//     rankingNumber2016: Number /* 名次号 */
// }, {
//     versionKey: false
// });

const plansConformedSchema = new Schema({
    itemIndex: Number, /* 序号 */
    schoolCode: String, /* 院校代码 */
    schoolName: String, /* 院校名称 */
    schoolCategoryCode: String, /* 院校类别代码 */
    schoolCategory: String, /* 院校类别（专科或者是本科）*/
    Is985: String, /* 是否是985 */
    Is211: String, /* 是否是211 */
    schoolLevel: String, /* 院校层次 */

    // professionId: Number,
    professionCode: String, /* 专业代码 */
    professionCategory: String, /* 专业类别 */
    professionName: String, /* 专业名称 */
    professionYear: String, /* 专业学年 */
    professionCost: String, /* 专业学费（每年） */
    professionIntro: String, /* 专业介绍 */

    subjectsCode: String, /* 需修科目代码 */
    subjects: String, /* 需修科目 */

    plansNum: String, /* 计划数 */

    city: String, /* 城市 */
    province: String, /* 省份 */
    IsNormal: String, /* 是否师范类学校 */
    IsPrivate: String, /* 是否是民办学校 */

    schoolIndex: String, /* 院校代 号 */

    pastAverageScore: Number, /* 以往平均分 */
    pastLowestScore: Number, /* 以往最低分 */
    pastRankingNumber: Number, /* 以往最低名次号 */
    pastBatch: String, /* 以往批次 */
    pastAdmissionCount: Number      /* 以往录取人数 */
}, {
    versionKey: false
});

//标准精简模式
const standardReducedSchema = new Schema({
    // itemIndex: Number, /* 序号 */
    schoolCode: String, /* 院校代码 */
    schoolName: String, /* 院校名称 */

    // professionId: Number,
    professionCode: String, /* 专业代码 */
    professionName: String, /* 专业名称 */
    professionYear: String, /* 专业学年 */

    province: String, /* 省份 */
    city: String, /* 城市 */

    schoolCategory: String, /* 院校类别（专科或者是本科）*/

    plansNum: String, /* 计划数 */

    // subjectsCode: String, /* 需修科目代码 */
    subjects: String, /* 需修科目 */

    professionCost: String, /* 专业学费（每年） */
    professionIntro: String /* 专业介绍 */
}, {
    versionKey: false
});

/*  NCEE-Data
 *  2017-8-26 与plansConformedSchema保持一致
 *  最终确定下来的数据保存格式，包含当年的数据和往年的五项数据 */
const ncee_standard_schema = new Schema({
    itemIndex: Number, /* 序号 */
    schoolCode: String, /* 院校代码 */
    schoolName: String, /* 院校名称 */
    schoolCategoryCode: String, /* 院校类别代码 */
    schoolCategory: String, /* 院校类别（专科或者是本科）*/
    Is985: String, /* 是否是985 */
    Is211: String, /* 是否是211 */
    schoolLevel: String, /* 院校层次 */

    // professionId: Number,
    professionCode: String, /* 专业代码 */
    professionCategory: String, /* 专业类别 */
    professionName: String, /* 专业名称 */
    professionYear: String, /* 专业学年 */
    professionCost: String, /* 专业学费（每年） */
    professionIntro: String, /* 专业介绍 */

    subjectsCode: String, /* 需修科目代码 */
    subjects: String, /* 需修科目 */

    plansNum: String, /* 计划数 */

    city: String, /* 城市 */
    province: String, /* 省份 */
    IsNormal: String, /* 是否师范类学校 */
    IsPrivate: String, /* 是否是民办学校 */

    schoolIndex: String, /* 院校代号 */

    pastAverageScore: Number, /* 以往平均分 */
    pastLowestScore: Number, /* 以往最低分 */
    pastRankingNumber: Number, /* 以往最低名次号 */
    pastBatch: String, /* 以往批次 */
    pastAdmissionCount: Number      /* 以往录取人数 */
}, {
    versionKey: false
});

exports.saveAdmissionArray = function (arr, collName, callback) {
    if (arr.length) {
        let arrLength = arr.length;
        let targetModel = mongoose.model(collName, admissionSchema, collName);

        console.log('CollName:' + collName + ' ArrayLength: ' + arrLength);

        targetModel.remove({}, function (err) {
            if (err) {
                console.log(err);
            }
        });

        for (let i = 0; i < arrLength; i++) {
            let item = {
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

        let arrLength = arr.length;
        let targetModel = mongoose.model(collName, schoolSchema, collName);

        console.log('CollName:' + collName + ' ArrayLength: ' + arrLength);

        targetModel.remove({}, function (err) {
            if (err) {
                console.log(err);
            }
        });

        // console.log(arr[0]);
        for (let i = 0; i < arrLength; i++) {
            // let item = {
            //     schoolId: parseInt(arr[i][0]),
            //     schoolCode: arr[i][1],
            //     schoolName: arr[i][2],
            //     professionId: parseInt(arr[i][3]),
            //     professionCode: arr[i][4],
            //     professionName: arr[i][5]
            // };
            let item = {
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
        let arrLength = arr.length;
        let targetModel = mongoose.model(collName, score2rankSchema, collName);

        console.log('CollName:' + collName + ' ArrayLength: ' + arrLength);

        targetModel.remove({}, function (err) {
            if (err) {
                console.log(err);
            }
        });

        for (let i = 0; i < arrLength; i++) {
            let item = {
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

        let arrLength = arr.length;
        let targetModel = mongoose.model(collName, plans2017Schema, collName);

        console.log('CollName:' + collName + ' ArrayLength: ' + arrLength);

        targetModel.remove({}, function (err) {
            if (err) {
                console.log(err);
            }
        });

        // console.log(arr[0]);
        for (let i = 0; i < arrLength; i++) {
            let item = {
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

exports.savePlansItem2017 = function (item, collName) {
    if (item) {
        let targetModel = mongoose.model(collName, plans2017Schema, collName);

        new targetModel(item).save(function (err) {
            if (err) {
                // console.log(index + '/' + arrLength + ' 存入失败.');
                return err;
            } else {
                // console.log(i + '/' + arrLength + ' 存入成功.');
            }
        });
    }
};

exports.savePlansConformedItem = function (item, collName) {
    if (item) {
        let targetModel = mongoose.model(collName, plansConformedSchema, collName);

        new targetModel(item).save(function (err) {
            if (err) {
                // console.log(index + '/' + arrLength + ' 存入失败.');
                return err;
            } else {
                // console.log(i + '/' + arrLength + ' 存入成功.');
            }
        });
    }
};

exports.savePlansConformedItemAsync = function (item, data2016, collName) {
    if (item && data2016) {
        let tem = {
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

            schoolIndex: item.schoolIndex, /* 院校名次号 */

            admissionCount2016: data2016.admissionCount, /* 录取人数 */
            averageScore2016: data2016.averageScore, /* 平均分 */
            lowestScore2016: data2016.lowestScore, /* 最低分 */
            rankingNumber2016: data2016.rankingNumber /* 名次号 */
        };

        // console.log(tem);
        // item['admissionsCount2016'] = data2016[0].admissionCount;
        // item.averageScore2016 = data2016[0].averageScore;
        // item.lowestScore2016 = data2016[0].lowestScore;
        // item.rankingNumber2016 = data2016[0].rankingNumber;
        // console.log('admissionsCount2016: ' + item.admissionsCount2016);
        // console.log('lowestScore2016: ' + item.lowestScore2016);
        // console.log(item);
        // console.log(data2016[0]);

        let targetModel = mongoose.model(collName, plansConformedSchema, collName);

        new targetModel(tem).save(function (err) {
            if (err) {
                // console.log(index + '/' + arrLength + ' 存入失败.');
                return err;
            } else {
                // console.log(i + '/' + arrLength + ' 存入成功.');
            }
        });
    }
};

exports.saveConformedOne = function (item, collName, callback) {
    // delete item._id;
    if (item) {
        // console.log(item);

        let targetModel = mongoose.model(collName, plansConformedSchema, collName);
        new targetModel({
            itemIndex: item.itemIndex, /* 序号 */
            schoolCode: item.schoolCode, /* 院校代码 */
            schoolName: item.schoolName, /* 院校名称 */
            schoolCategoryCode: item.schoolCategoryCode, /* 院校类别代码 */
            schoolCategory: item.schoolCategory, /* 院校类别（专科或者是本科）*/
            Is985: item.Is985, /* 是否是985 */
            Is211: item.Is211, /* 是否是211 */
            schoolLevel: item.schoolLevel, /* 院校层次 */

            // professionId: Number,
            professionCode: item.professionCode, /* 专业代码 */
            professionCategory: item.professionCategory,
            professionName: item.professionName, /* 专业名称 */
            professionYear: item.professionYear, /* 专业学年 */
            professionCost: item.professionCost, /* 专业学费（每年） */
            professionIntro: item.professionIntro, /* 专业介绍 */

            subjectsCode: item.subjectsCode, /* 需修科目代码 */
            subjects: item.subjects, /* 需修科目 */

            plansNum: item.plansNum, /* 计划数 */

            IsNormal: item.IsNormal, /* 是否师范类学校 */
            city: item.city, /* 城市 */
            province: item.province, /* 省份 */
            IsPrivate: item.IsPrivate, /* 是否是民办学校 */

            schoolIndex: item.schoolIndex, /* 院校代号 */

            pastAverageScore: item.pastAverageScore, /* 以往平均分 */
            pastLowestScore: item.pastLowestScore, /* 以往最低分 */
            pastRankingNumber: item.pastRankingNumber, /* 以往最低名次号 */
            pastBatch: item.pastBatch, /* 以往批次 */
            pastAdmissionCount: item.pastAdmissionCount  /* 以往录取人数 */
        }).save(function (err) {
            if (err) {
                // console.log(index + '/' + arrLength + ' 存入失败.');

                callback(err);
            } else {
                callback('Save conformed data one success...');
                // console.log(i + '/' + arrLength + ' 存入成功.');
            }
        });
    } else {
        callback('The item does not exist');
    }
};

exports.saveConformedData = function (arr, collName, callback) {
    if (arr.length) {
        let arrLength = arr.length;
        let targetModel = mongoose.model(collName, plansConformedSchema, collName);

        console.log('CollName:' + collName + ' ArrayLength: ' + arrLength);

        targetModel.remove({}, function (err) {
            if (err) {
                console.log(err);
            }
        });


        // console.log(arr[0]);
        for (let i = 0; i < arrLength; i++) {
            if (!arr[i][0]) {
                continue;
            }
            let item = {
                itemIndex: arr[i][0], /* 序号 */
                schoolCode: arr[i][1], /* 院校代码 */
                schoolName: arr[i][2], /* 院校名称 */
                schoolCategoryCode: arr[i][3], /* 院校类别代码 */
                schoolCategory: arr[i][4], /* 院校类别（专科或者是本科）*/
                Is985: arr[i][5], /* 是否是985 */
                Is211: arr[i][6], /* 是否是211 */
                schoolLevel: arr[i][7], /* 院校层次 */

                // professionId: Number,
                professionCode: arr[i][8], /* 专业代码 */
                professionCategory: arr[i][9], /*专业类别*/
                professionName: arr[i][10], /* 专业名称 */
                professionYear: arr[i][11], /* 专业学年 */
                professionCost: arr[i][12], /* 专业学费（每年） */
                professionIntro: arr[i][13], /* 专业介绍 */

                subjectsCode: arr[i][14], /* 需修科目代码 */
                subjects: arr[i][15], /* 需修科目 */

                plansNum: arr[i][16], /* 计划数 */

                city: arr[i][17], /* 城市 */
                province: arr[i][18], /* 省份 */
                IsNormal: arr[i][19], /* 是否师范类学校 */
                IsPrivate: arr[i][20], /* 是否是民办学校 */

                schoolIndex: arr[i][21], /* 院校代号 */

                pastAverageScore: arr[i][22], /* 以往平均分 */
                pastLowestScore: arr[i][23], /* 以往最低分 */
                pastRankingNumber: arr[i][24], /* 以往最低名次号 */
                pastBatch: arr[i][25], /* 以往批次 */
                pastAdmissionCount: arr[i][26]      /* 以往录取人数 */
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

exports.saveStandardReducedOne = function (arr, collName, callback) {
    let targetModel = mongoose.model(collName, standardReducedSchema, collName);
    let item = {
        schoolCode: arr[1], /* 院校代码 */
        schoolName: arr[2], /* 院校名称 */

        // professionId: Number,
        professionCode: arr[3], /* 专业代码 */
        professionName: arr[4], /* 专业名称 */
        professionYear: arr[5], /* 专业学年 */

        province: arr[6], /* 省份 */
        city: arr[7], /* 城市 */

        schoolCategory: arr[8], /* 院校类别（专科或者是本科）*/

        plansNum: arr[9], /* 计划数 */

        // subjectsCode: String, /* 需修科目代码 */
        subjects: arr[10], /* 需修科目 */

        professionCost: arr[11], /* 专业学费（每年） */
        professionIntro: arr[12] /* 专业介绍 */
    };
    // console.log(item);
    new targetModel(item).save(function (err) {
        if (err) {
            console.log('存入失败......');
            // return err;
            callback('Save Data ' + err);
        } else {
            // console.log(i + '/' + arrLength + ' 存入成功.');
            callback('Save Data ' + collName + ' Item Success');
        }
    });
};

exports.getAdmissionData = function (query, collName, callback) {
    // console.log(query);
    // console.log(collName);

    let admissionModel = mongoose.model(collName, admissionSchema);
    admissionModel.find(query, function (err, data) {
        callback(data);
    });
};

exports.getSchoolsData = function (query, collName, callback) {
    let schoolsModel = mongoose.model(collName, admissionSchema);
    schoolsModel.find(query, function (err, data) {
        callback(data);
    });
};

exports.getConformedData = function (query, fields, sorts, collName, callback) {
    console.log('Get conformed model...');

    console.log(query);
    console.log(fields);
    console.log(sorts);

    let conformedModel = mongoose.model(collName, plansConformedSchema);
    conformedModel.find(query, fields, sorts, function (err, data) {
        console.log(data);
        callback(err, data);
    });
};

exports.getConformedDataAsync = async function (query, fields, sorts, collName) {

};

exports.getOneConformedData = function (query, fields, sorts, collName, src, callback) {
    let conformedModel = mongoose.model(collName, plansConformedSchema);
    conformedModel.findOne(query, fields, sorts, function (err, data) {
        console.log('Get conformed model...');
        // console.log(query);
        // console.log(fields);
        // console.log(sorts);
        // console.log(data);
        callback(err, data, src);
    });
};

exports.getRanking = function (score, collName, callback) {
    // console.log('RankScore: ' + score);
    let rankingModel = mongoose.model(collName, score2rankSchema);
    rankingModel.find({'score': score}, function (err, data) {
        // console.log(data);
        callback(data);
    });
};

exports.getRankingAsync = async function (score, collName) {
    let rankingModel = mongoose.model(collName, score2rankSchema);
    return rankingModel.find({'score': score}).exec();
};

exports.getPlans2017 = function (collName, callback) {
    // console.log('RankScore: '+ score);
    let plans2017Model = mongoose.model(collName, plans2017Schema);
    plans2017Model.find({}, function (err, data) {
        // console.log(data);
        if (err) {
            callback(err);
        }
        callback(data);
    });
};

exports.getPlans2016 = function (item, query, collName, callback) {
    let plans2016Model = mongoose.model(collName, schoolSchema);
    plans2016Model.find(query, function (err, data) {
        // console.log(data);
        callback(item, data);
    });
};

exports.conformDataAB = function (collName_A, collName_B, collection_A, collection_B, collection_C) {
    let plansModelA = mongoose.model(collName_A, plans2017Schema);
    let plansModelB = mongoose.model(collName_B, schoolSchema);
    let collModelA = mongoose.model(collection_A, plans2017Schema);
    let collModelB = mongoose.model(collection_B, plans2017Schema);
    let collModelC = mongoose.model(collection_C, plans2017Schema);

    plansModelA.find({}, function (err, data2017) {
        console.log(data2017.length);
        let itemIndex = 0;
        for (; itemIndex < 1000; itemIndex++) {
            let item = data2017[itemIndex];
            if (item.schoolName && item.professionName) {
                let query = {
                    $and: [{
                        schoolName: item.schoolName
                    }, {
                        professionName: item.professionName
                    }]
                };
                (function (item) {
                    plansModelB.find(query, function (err, data2016) {
                        let tem2017 = {
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
                                let tem = {
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

                                    schoolIndex: item.schoolIndex, /* 院校名次号 */

                                    admissionCount2016: data2016.admissionCount, /* 录取人数 */
                                    averageScore2016: data2016.averageScore, /* 平均分 */
                                    lowestScore2016: data2016.lowestScore, /* 最低分 */
                                    rankingNumber2016: data2016.rankingNumber /* 名次号 */
                                };
                                new collModelA(tem).save(function (err) {
                                    if (err) {
                                        return err;
                                    }
                                    else {
                                    }
                                })
                            }
                            else {
                                // mongoModel.savePlansItem2017(tem2017, 'plansNull_2017');
                                new collModelB(tem2017).save();
                            }
                        }
                        else {
                            console.log('Null: ' + tem2017.schoolName + ' ' + tem2017.professionName);
                            new collModelC(tem2017).save();
                            // mongoModel.savePlansItem2017(tem2017, 'plansNew_2017');
                        }
                    });
                })(item);
            }
            else {
                console.log('2017:Data Not Right: ' + item);
            }
        }
    });
};

exports.conformDataAsync = function (collName_A, collName_B, collection_A, collection_B, collection_C) {
    let plansModelA = mongoose.model(collName_A, plans2017Schema);
    let plansModelB = mongoose.model(collName_B, schoolSchema);
    let collModelA = mongoose.model(collection_A, plans2017Schema);
    let collModelB = mongoose.model(collection_B, plans2017Schema);
    let collModelC = mongoose.model(collection_C, plans2017Schema);
    let concurrencyCount = 0;

    plansModelA.find({}, function (err, data2017) {
        console.log(data2017.length);

        async.mapLimit(data2017, 1000, function (item, callback) {
            // fetchUrl(url, callback);

            if (item.schoolName && item.professionName) {
                let query = {
                    $and: [{
                        schoolName: item.schoolName
                    }, {
                        professionName: item.professionName
                    }]
                };
                (function (item) {
                    plansModelB.find(query, function (err, data2016) {
                        let tem2017 = {
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
                                let tem = {
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

                                    schoolIndex: item.schoolIndex, /* 院校名次号 */

                                    admissionCount2016: data2016.admissionCount, /* 录取人数 */
                                    averageScore2016: data2016.averageScore, /* 平均分 */
                                    lowestScore2016: data2016.lowestScore, /* 最低分 */
                                    rankingNumber2016: data2016.rankingNumber /* 名次号 */
                                };
                                new collModelA(tem).save(function (err) {
                                    if (err) {
                                        return err;
                                    }
                                    else {
                                    }
                                })
                            }
                            else {
                                // mongoModel.savePlansItem2017(tem2017, 'plansNull_2017');
                                new collModelB(tem2017).save();
                            }
                        }
                        else {
                            // console.log('Null: ' + tem2017.schoolName + ' ' + tem2017.professionName);
                            new collModelC(tem2017).save();
                        }

                        let delay = parseInt((Math.random() * 10000000) % 2000, 10);

                        concurrencyCount++;
                        console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', item.schoolName, '耗时' + delay + '毫秒');

                        setTimeout(function () {
                            concurrencyCount--;
                            callback(null, item.schoolName);
                        }, delay);
                    });
                })(item);
            }
            else {
                console.log('2017:Data Not Right: ' + item);
            }
        }, function (err, result) {
            console.log('Final:');
            console.log(result);
        });
    });
};
