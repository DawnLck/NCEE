/**
 *  Mongoose Schemas
 **/

const Schema = require('./connect').Schema;

let schemas = {};

/* 一分一段表模式 */
schemas.score2ranks = new Schema({
    score: Number,
    subTotal: Number,
    grandTotal: Number
}, {
    versionKey: false
});

/* 存放的数据主体格式 */
schemas.finals = new Schema({
    itemIndex: Number, /* 序号 */
    schoolCode: String, /* 院校代码 */
    schoolName: String, /* 院校名称 */
    schoolCategoryCode: String, /* 院校类别代码 */
    schoolCategory: String, /* 院校类别（专科或者是本科）*/
    Is985: String, /* 是否是985 [985 or 0] */
    Is211: String, /* 是否是211 [211 or 0] */
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
    pastAdmissionCount: Number,      /* 以往录取人数 */

    past: Object
 // {
 //            year: String, /* 以往平均分 */
 //        average: Number, /* 以往最低分 */
 //        ranking: Number, /* 以往最低名次号 */
 //        batch: String, /* 以往批次 */
 //        admission: String  /* 以往录取人数 */
 //    }
}, {
    versionKey: false
});

/* 数据预处理模式 */
schemas.devs = new Schema({
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

module.exports = schemas;
