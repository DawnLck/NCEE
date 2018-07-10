/* Conversion route */

const express = require('express'),
    mongoModel = require('../lib/mongooseModel'),
    router = express.Router(),
    config = require('../../config');

router.get('/getScore2Rank', async function (req, res) {
    console.log("GET : Get Score to Rank .....");
    console.log(req);
    return mongoModel.getRanking(req.score, config.score2rank);
});

module.exports = router;