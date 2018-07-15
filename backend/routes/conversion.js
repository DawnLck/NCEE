/* Conversion route */

const express = require('express'),
    {getRankingAsync} = require('../data/interaction'),
    router = express.Router();

router.get('/getScore2Rank', async function (req, res) {
    console.log("GET : Get Score to Rank .....");
    console.log(req.query);
    let rank = await getRankingAsync(parseInt(req.query.score));
    // await console.log(rank);
    await res.send({
        rank: rank[0].grandTotal
    });
});

module.exports = router;