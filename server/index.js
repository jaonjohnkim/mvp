var express = require('express');
var bodyParser = require('body-parser');
var items = require('../db');
// var api = require('./config.js');

var app = express();
app.use(express.static(__dirname + '/../client/dist'));

app.get('/', function (req, res) {

});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});

