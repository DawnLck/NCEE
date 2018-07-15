/** Data PreProcess
 * */
const xlsx = require('node-xlsx'),
    {devsModel} = require('../mongoose');

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

module.exports = async function () {
    console.log('Data process ...');
    /* 已将18年的招生计划的最新专业限制合并到了总表中 */
    // await mergePlan();
};