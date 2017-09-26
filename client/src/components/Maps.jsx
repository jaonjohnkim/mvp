import $ from 'jquery'
import React from 'react';
import ReactDOM from 'react-dom';

class Maps extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
  }
  componentDidMount() {
    this.loadMap();
  }
  
  loadMap() {
    if (this.props && this.props.google) {
      // google is available
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let zoom = 14;
      let lat = 37.774929;
      let lng = -122.419416;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      window.map = new maps.Map(document.getElementById('map'), mapConfig);
      var input = document.getElementById('searchBox');
      var searchBox = new google.maps.places.SearchBox(input);
      var context = this;
      searchBox.addListener('places_changed', () => {
        var places = searchBox.getPlaces();
        context.props.addLoc(places);
      })
      // if (this.props.markers) {
      //   this.props.markers.forEach((marker) => {
      //     marker.setMap(null);
      //   })
      // }
      // this.props.places.forEach((place, i) => {
      //   var loc = place.geometry.location;
      //   var lat = loc.lat();
      //   var lng = loc.lng();
      //   var marker = new google.maps.Marker({
      //     position: {lat: lat, lng: lng},
      //     label: i+1 + '',
      //     map: window.map
      //   });
      // });
      this.props.setMarker();
      var bounds = map.getBounds()
      window.map.fitBounds(bounds);

      this.props.rerenderPolylines(this.props.polylines);
    }
  }

  // renderPolylines(poly) {
  //   var polyline = new google.maps.Polyline({
  //     path: google.maps.geometry.encoding.decodePath(poly),
  //     map: window.map
  //   });
  //   var bounds = new google.maps.LatLngBounds();
  //   for (var i = 0; i < polyline.getPath().getLength(); i++) {
  //     bounds.extend(polyline.getPath().getAt(i));
  //   }
  //   window.map.fitBounds(bounds);
    
  // }
  
  render () {
    return (
      <div ref='map' ></div>
    );
  }
}

export default Maps;