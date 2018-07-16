/** Data Interaction
 * */
const {score2ranksModel, finalsModel} = require('../mongoose');
const YEAR_PAST = 2017;

async function getRankingAsync(score) {
    return score2ranksModel.find({'score': score}).exec();
}

async function getConformedData(query, fields, sorts) {
    return finalsModel.find(query, fields, sorts).exec();
}

async function addClass(result, className) {
    console.log('AddClass: ' + className);
    let resultLength = result.length;
    for (let i = 0; i < resultLength; i++) {
        result[i].class = className;
        result[i].checked = true;
    }

    return result;
}

async function addLck(item){
    item.Liangck = 'Hello';
    return item;
}

async function autoRecommendPartByScore(preferences, score, floatRange, provinceQuery, schoolLevelQuery, subjectsQuery) {
    console.log('Get auto recommend by score ### ');
    /* 先从一段一份表里获得自己的分数对应的名次 */
    // score = score > 686 ? 686 : parseInt(score);
    console.log(score);
    let rank = await getRankingAsync(score),
        rankingNum = rank[0].grandTotal,
        ltLimit = rankingNum + floatRange,
        gtLimit = rankingNum > floatRange ? (rankingNum - floatRange) : 0;

    console.log('[Query]  Score: ' + score);
    console.log('[GetRanking] ' + score + ' -  ' + rankingNum + ' Range: ' + gtLimit + ' ~ ' + ltLimit);

    let fields = null;
    let sorts = {sort: {pastRankingNumber: -1}};


    console.log(provinceQuery);
    console.log(schoolLevelQuery);
    console.log(subjectsQuery);


    let result = {
        preference_1:  await getConformedData({
            $and: [
                {"past.2017.ranking": {$gte: gtLimit}},
                {"past.2017.ranking": {$lt: ltLimit}},
                {professionCategory: new RegExp(preferences.preference1)},
                provinceQuery,
                schoolLevelQuery,
                subjectsQuery
            ]
        }, fields, sorts),
        preference_2: await getConformedData({
                $and: [
                    {"past.2017.ranking": {$gte: gtLimit}},
                    {"past.2017.ranking": {$lt: ltLimit}},
                    {professionCategory: new RegExp(preferences.preference2)},
                    provinceQuery,
                    schoolLevelQuery,
                    subjectsQuery
                ]
            }, fields, sorts),
        preference_3: await getConformedData({
            $and: [
                {"past.2017.ranking": {$gte: gtLimit}},
                {"past.2017.ranking": {$lt: ltLimit}},
                {professionCategory: new RegExp(preferences.preference3)},
                provinceQuery,
                schoolLevelQuery,
                subjectsQuery
            ]
        }, fields, sorts)
    };

    // docs => {
    //     let resultLength = docs.length;
    //     console.log('#### Length: ' + resultLength);
    //     for (let i = 0; i < resultLength; i++) {
    //         docs[i].lckClass = 'preference_1';
    //         docs[i].checked = true;
    //     }
    //     return docs;
    // }, err=>{
    //     console.log(err);
    // }
    console.log('Result Length:' + result.length);

    return result;
}

module.exports.getAutoRecommend = async (params) => {
    let preferences = {
            preference1: params.preference1,
            preference2: params.preference2,
            preference3: params.preference3
        },
        bias = parseInt(params.bias),
        score = parseInt(params.score),
        floatRange = parseInt(params.floatRange),
        province = params.province,
        is985 = params.schoolLevel_985.toString() === 'true' ? '985' : '0',
        is211 = params.schoolLevel_211.toString() === 'true' ? '211' : '0';

    let schoolLevelQuery = {},
        provincesRegArray = [],
        provinceQuery,
        subjectsArr = [],
        subjectsQuery;

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
        if (parseInt(is211) === 211) {
            schoolLevelQuery = {
                Is211: is211
            }
        }
        else {
            schoolLevelQuery = {}
        }
    }

    for (let i = 0; i < province.length; i++) {
        provincesRegArray.push({province: new RegExp(province[i])});
    }
    provinceQuery = {
        $or: provincesRegArray
    };

    for (let i = 0; i < params.subjects.length; i++) {
        if (params.subjects[i].selected === 'true') {
            subjectsArr.push({subjects: new RegExp(params.subjects[i].subject)});
        }
    }
    subjectsQuery = {
        $and: subjectsArr
    };

    let result = [];
    result = result.concat(await autoRecommendPartByScore(preferences, (score + bias), floatRange, provinceQuery, schoolLevelQuery, subjectsQuery));
    result = result.concat(await autoRecommendPartByScore(preferences, (score), floatRange, provinceQuery, schoolLevelQuery, subjectsQuery));
    result = result.concat(await autoRecommendPartByScore(preferences, (score - bias), floatRange, provinceQuery, schoolLevelQuery, subjectsQuery));
    return result;
};

module.exports.getRankingAsync = getRankingAsync;
let test =
    {
        '$and':
            [
                {"past.2017.ranking": {$gte: 22648}},
                {"past.2017.ranking": {$lt: 32648}},
                {professionCategory: /计算机类/},
                {'$or': [{province: /浙江/}]},
                {},
                {'$and': [{subjects: /不限/}]}
            ]
    }
;