

import React from 'react';
import ReactDOM from 'react-dom';
import GoogleMapsLoader from 'google-maps'; // only for common js environments 

GoogleMapsLoader.load(function(google) {
    new google.maps.Map(el, {KEY: 'AIzaSyAjaH64iexZfc15tcqoIMCRcz0Yt_7e-3Y'});
});



class Map extends React.Component {