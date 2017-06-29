var express = require('express');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false});
var mongoInit = require('./backend/init/mongoInit');

var app = express();
app.use(express.static('front'));
app.use(express.static('front/dist'));

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
    mongoInit.getCandidates(req.body.preferences, parseInt(req.body.rankingNum), parseInt(req.body.floatRange), function (data) {
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

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

var dbMake = function () {
    mongoInit.readSchoolsExcel('plan.xlsx', 'schools', function (data) {
        console.log(data);
    });
    mongoInit.readAdmissionExcel('test.xlsx', 'admissions', function (data) {
        console.log(data);
    })
};

var init = function () {
    // dbMake();
};
init();

console.log("liangck");

// var data = [];
// for(var i in excelObj){
//     var arr=[];
//     var value=excelObj[i];
//     for(var j in value){
//         arr.push(value[j]);
//     }
//     data.push(arr);
// }
// var buffer = xlsx.build([
//     {
//         name:'sheet1',
//         data:data
//     }
// ]);
