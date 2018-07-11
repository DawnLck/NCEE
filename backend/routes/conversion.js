/* Conversion route */

const express = require('express'),
    mongoModel = require('../lib/mongooseModel'),
    router = express.Router(),
    config = require('../../config');

router.get('/getScore2Rank', async function (req, res) {
    console.log("GET : Get Score to Rank .....");
    console.log(req.query);
    let rank = await mongoModel.getRankingAsync(req.query.score, config.score2rank);
    // await console.log(rank);
    await res.send({
        rank: rank[0].grandTotal
    });
});

module.exports = router;