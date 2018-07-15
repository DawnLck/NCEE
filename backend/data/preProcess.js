/** Data PreProcess
 * */
const xlsx = require('node-xlsx'),
    {devsModel, finalsModel} = require('../mongoose');

/* 整合招生计划与数据表 */
async function mergePlan() {
    let plan_xlsx = xlsx.parse(`${__dirname}/2018/2018_plan.xlsx`)[0].data;
    devsModel.find({}).then(docs => {
        console.log('Dev Docs Length: ' + docs.length);
        for (let i = 0; i < docs.length; i++) {
            let doc = docs[i];
            let doc_school = doc.schoolName;
            let doc_profession = doc.professionName;
            let select = plan_xlsx.filter(function (item) {
                return item[5] === doc_school && item[11] === doc_profession;
            });
            if (select.length) {
                console.log('Find Index: ' + i);
                console.log(doc_school + ' ' + doc_profession + ' old: ' + doc.subjectsCode + ' ' + doc.subjects);
                console.log('New2018 : ' + select[0][25] + ' ' + select[0][26]);
                if (doc.subjects === select[0][26]) {
                    continue;
                } else {
                    devsModel.update({schoolName: doc_school,professionName: doc_profession },{ $set: {subject: select[0][26], subjectsCode: select[0][25]}}).exec();
                }
            }

            doc = null;
            doc_school = null;
            doc_profession = null;
            select = null;
        }
    }, err => {
        console.log(err);
    });
}

/* 整合往年数据 */
async function mergePast(){
    devsModel.find({}).then(docs => {
        console.log('Dev Docs Length: ' + docs.length);
        for(let i=0;i<docs.length;i++){
            let doc = docs[i];
            let finalDoc = new finalsModel({
                itemIndex: doc.itemIndex, /* 序号 */
                schoolCode: doc.schoolCode, /* 院校代码 */
                schoolName: doc.schoolName, /* 院校名称 */
                schoolCategoryCode: doc.schoolCategoryCode, /* 院校类别代码 */
                schoolCategory: doc.schoolCategory, /* 院校类别（专科或者是本科）*/
                Is985: doc.Is985, /* 是否是985 */
                Is211: doc.Is211, /* 是否是211 */
                schoolLevel: doc.schoolLevel, /* 院校层次 */

                // professionId: Number,
                professionCode: doc.professionCode, /* 专业代码 */
                professionCategory: doc.professionCategory, /* 专业类别 */
                professionName: doc.professionName, /* 专业名称 */
                professionYear: doc.professionYear, /* 专业学年 */
                professionCost: doc.professionCost, /* 专业学费（每年） */
                professionIntro: doc.professionIntro, /* 专业介绍 */

                subjectsCode: doc.subjectsCode, /* 需修科目代码 */
                subjects: doc.subjects, /* 需修科目 */

                plansNum: doc.plansNum, /* 计划数 */

                city: doc.city, /* 城市 */
                province: doc.province, /* 省份 */
                IsNormal: doc.IsNormal, /* 是否师范类学校 */
                IsPrivate: doc.IsPrivate, /* 是否是民办学校 */

                schoolIndex: doc.schoolIndex, /* 院校代号 */

                past: [
                    {
                        year: '2017',/* 以往平均分 */
                        average: doc.pastAverageScore,/* 以往最低分 */
                        ranking: doc.pastRankingNumber,/* 以往最低名次号 */
                        batch: doc.pastBatch,/* 以往批次 */
                        admission: doc.pastAdmissionCount  /* 以往录取人数 */
                    }
                ]
            });

            finalDoc.save().then(suc => {
                console.log('Success ... ' + suc);
            }, err =>{
                console.log('Error ...' + err);
            })
        }
    }, err=>{
        console.log(err);
    });
}
module.exports = async function () {
    console.log('Data process ...');
    /* 已将18年的招生计划的最新专业限制合并到了总表中 */
    /* 已经转换成了final格式 */
    // await mergePlan();
    // await mergePast();
};