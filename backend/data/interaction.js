/** Data Interaction
 * */
const {score2ranksModel} = require('../mongoose');

module.exports.getRankingAsync = async function(score){
    return score2ranksModel.find({'score': score}).exec();
};