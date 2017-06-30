var express = require('express');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false});
var mongoInit = require('./backend/init/mongoInit');

var app = express();
app.use(express.static('front'));
// app.use(express.static('front/dist'));

app.get('/', function (req, res) {
    // res.sendFile('./front/login.html');
    res.sendFile(__dirname + '/front/' + 'login_page.html');
});
app.get('/index', function (req, res) {
    res.sendFile(__dirname + '/front/' + 'index_page.html');
});
app.post('/getCandidates', urlencodedParser, function (req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }
    var preferences = {
        preference1: req.body['preferences[preference1]'],
        preference2: req.body['preferences[preference2]'],
        preference3: req.body['preferences[preference3]']
    };
    // var results = [];
    // console.log(preferences);
    mongoInit.getCandidates(preferences, parseInt(req.body.score), parseInt(req.body.floatRange), function (data) {
        console.log(data.length);
        // var part1 = data.slice(0);
        // for (var index in part1) {
        //     part1[index].dataClass = 'range_1';
        //     console.log(part1[index].dataClass);
        // }
        // // console.log(part1[0].dataClass);
        // results.push.apply(results, part1);
        // console.log(data[0]);
        res.send(data);
    });
    console.log('Get new web page item....');
});
app.post('/userLogin', urlencodedParser, function (req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }
    if (req.body.name === 'admin' && req.body.password === 'admin') {
        // res.redirect(__dirname + '/front/' + 'index_page.html');
        // res.redirect('/index_page.html');
        // res.header('Content-Type', 'text/html; charset=utf-8');
        // res.sendFile(__dirname + '/front/' + 'login_page.html');
        res.send({
            permission: true
        })
    }
    else {
        res.send({
            permission: false
        });
    }
    console.log('Get new web page item....');
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    //
    console.log('Example app listening at http://%s:%s', host, port);
});

var dbMake = function () {
    // mongoInit.readScore2RankExcel('backend/data/score2rank.xlsx', 'score2ranks', function (data) {
    //     console.log(data);
    // });
    // mongoInit.readSchoolsExcel('backend/data/schools.xlsx', 'schools', function (data) {
    //     console.log(data);
    // });
    // mongoInit.readAdmissionExcel('test.xlsx', 'admissions', function (data) {
    //     console.log(data);
    // });
    // mongoInit.readPlans2017('backend/data/plans_2017.xlsx', 'plans_2017', function (data) {
    //     console.log(data);
    // });
};

var init = function () {
    dbMake();
};
init();

// console.log("liangck");