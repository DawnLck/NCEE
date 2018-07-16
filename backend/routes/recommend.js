/* Recommend route */

const express = require('express'),
    interaction = require('../data/interaction'),
    router = express.Router();

/* AI推荐 */
router.get('/getAutoRecommend',async function (req, res) {
    console.log("GET : Get Auto Recommend .....");
    // console.log(req.query);

    let result = await interaction.getAutoRecommend(req.query);

    res.send(result);
});

/* 人工推荐 */
router.get('/getCandidates', function (req, res) {
    if (!req.query) {
        return res.sendStatus(400);
    }
    let preferences = {
        preference1: req.query.preference1,
        preference2: req.query.preference2,
        preference3: req.query.preference3
    };

    mongoInit.getCandidates(preferences, parseInt(req.query.score), parseInt(req.query.floatRange), function (data) {
        console.log(data.length);
        res.send(data);
    });
    console.log('Get new web page item....');
});

module.exports = router;