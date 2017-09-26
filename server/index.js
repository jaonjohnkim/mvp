var express = require('express');
var bodyParser = require('body-parser');
var items = require('../db');
var request = require('request');
var Promise = require('bluebird');
// var api = require('./config.js');
var googleMaps = require('@google/maps').createClient({
  key: 'AIzaSyAjaH64iexZfc15tcqoIMCRcz0Yt_7e-3Y'
});

var app = express();
app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Loading');
});

app.post('/optimize', (req, res) => {
  console.log('request', req.body);
  var reg = /\s/g;
  var placesStr = req.body.map(place => place.formatted_address.replace(reg, '+')).join('|');
  console.log(placesStr);
  var apiReq = {
    units: 'imperial',
    origins: placesStr,
    destinations: placesStr
  };

  // googleMaps.distanceMatrix(apiReq, (err, response) => {
  //   if (err) res.status(400).send(err);
  //   console.log(response.json.rows);
  //   distanceResult = response.json.rows;

  //   var min = 

  //   distanceResult[0]

  //   res.status(200).send(response);
  // })
  var places = req.body.map(place => place.formatted_address.replace(reg, '+'));
  console.log('Places array', places);
  Promise.all(places.map((value, i) => {
    var copyPlaces = places.slice();
    var start = copyPlaces.splice(i, 1);
    var apiReq = {
      units: 'imperial',
      origin: start,
      destination: start,
      waypoints: 'optimize:true|' + copyPlaces.join('|')
      
    };
    var promDir = Promise.promisify(googleMaps.directions);
    return promDir(apiReq);
  }))
  .then((result) => {
    console.log('route results:', result);
    var times = result.map((trip) => {
      return trip.json.routes[0].legs.reduce((acc, leg) => acc + leg.duration.value, 0);
    });
    console.log(times);
    // res.status(200).send(times);
    res.status(200).send([1, result[1].json.routes[0]]);
  })
  

  // request({
  //   method: 'GET',
  //   uri: 'https://maps.googleapis.com/maps/api/distancematrix/json?',
  //   data: apiReq
  // }, (error, response, body) => {
  //   if (error) {
  //     console.log("error", error);
  //     res.status(404).send(error);
  //   }
  //   console.log('response', response);
  //   console.log('body', body);
  //   res.status(200).send(response);
  // });
});

app.post('/places', (req, res) => {
  
});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});

