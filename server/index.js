var express = require('express');
var bodyParser = require('body-parser');
var items = require('../db');
// var api = require('./config.js');
var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyAjaH64iexZfc15tcqoIMCRcz0Yt_7e-3Y'
});

var app = express();
app.use(express.static(__dirname + '/../client/dist'));

app.get('/', function (req, res) {

});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});

