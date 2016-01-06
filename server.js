var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

var app = express();
// var routes = require('./routes/routes');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('app'));
app.use(express.static(path.join(__dirname, 'app/src')));
// app.use('/app/js',express.static(path.join(__dirname, 'js')));
app.engine('html', require('ejs').renderFile);
app.use(function (req, res, next){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});
// app.use('/', routes);

app.get('/', function(req, res) {
    res.send("HERE WE GO");
});

app.listen(8000);