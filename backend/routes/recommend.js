/* Recommend route */

const express = require('express'),
    mongoInit = require('../init/mongoInit'),
    router = express.Router();

router.get('/getAutoRecommend', function (req, res) {
    console.log("GET : Get Auto Recommend .....");
    // console.log(req.query);

    mongoInit.getAutoRecommend(req.query, function (err, data) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            console.log('\nServer: get auto recommend items.');
            res.send(data);
        }
    });
});

module.exports = router;