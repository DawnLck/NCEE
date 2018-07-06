const express = require('express'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    mongoInit = require('./backend/init/mongoInit'),
    mongooseModel = require('./backend/lib/mongooseModel'),

    alipayRoute = require('./backend/routes/alipayRoute'),
    recommedRoute = require('./backend/routes/recommend'),

    urlencodedParser = bodyParser.urlencoded({extended: false});

let app = express();
app.use(express.static('front'));
app.use(express.static('front/index'));
app.use('/alipayRoute', alipayRoute);
app.use('/recommend', recommedRoute);

app.get('/', function (req, res) {
    // res.sendFile('./front/login.html');
    // res.sendFile(__dirname + '/front/' + 'login_page.html');
    // res.redirect('/alipayRoute/alipayInit');
    res.sendFile(__dirname + '/front/index/index.html');
});

app.get('/ncee', function (req, res) {
    res.sendFile(__dirname + '/front/' + 'index_page.html');
});

app.post('/getCandidates', urlencodedParser, function (req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }
    let preferences = {
        preference1: req.body.preference1,
        preference2: req.body.preference2,
        preference3: req.body.preference3
    };

    mongoInit.getCandidates(preferences, parseInt(req.body.score), parseInt(req.body.floatRange), function (data) {
        console.log(data.length);
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

let server = app.listen(3001, function () {
    let host = server.address().address;
    let port = server.address().port;
    //
    console.log('Example app listening at http://%s:%s', host, port);
});

async function dbMake() {
    console.log('DB Make ... ');

    // mongoInit.readScore2RankExcel('backend/data/' + config.currentYear + '/score2rank.xlsx', 'score2ranks', function (data) {
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
    // mongoInit.conformDataAsync();
    // mongoInit.readConformedData('backend/data/plans_conformed_final_2017.xlsx', 'plans_conformed_2017', function (data) {
    //     console.log(data);
    // });
    // mongoInit.filterData_2ndBatchAsync('backend/data/2017_2nd_Merged.xlsx', 'plans_conformed_2017', function (data) {
    //     console.log(data);
    // });
    // mongoInit.readConformedData('backend/data/2017_2nd_merged_p.xlsx', 'plans_2nd_conformed_2017', function (data) {
    //     console.log(data);
    // });
    // mongoInit.readConformedData('backend/data/2017/ncee_2017.xlsx', 'ncee_2017', function (data) {
    //     console.log(data);
    // });
}

async function test(){
    console.log('Test the backend ... ');
    // mongooseModel.getConformedData({},null,{});
}

async function init() {
    await test();
    await dbMake();
}

init();