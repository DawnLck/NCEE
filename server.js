const express = require('express'),
    bodyParser = require('body-parser'),

    alipayRoute = require('./backend/routes/alipayRoute'),
    recommendRoute = require('./backend/routes/recommend'),
    conversionRoute = require('./backend/routes/conversion'),

    preProcess = require('./backend/data/preProcess'),

    urlencodedParser = bodyParser.urlencoded({extended: false});

let app = express();
app.use(express.static('front'));
app.use(express.static('front/index'));
app.use('/alipayRoute', alipayRoute);
app.use('/recommend', recommendRoute);
app.use('/conversion', conversionRoute);

app.get('/', function (req, res) {
    // res.sendFile('./front/login.html');
    // res.sendFile(__dirname + '/front/' + 'login_page.html');
    // res.redirect('/alipayRoute/alipayInit');
    res.sendFile(__dirname + '/front/index/index.html');
});

app.get('/ncee', function (req, res) {
    res.sendFile(__dirname + '/front/' + 'index_page.html');
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

async function init() {
    await preProcess();
}

init();
