import $ from 'jquery'
import React from 'react';
import ReactDOM from 'react-dom';

class Maps extends React.Component {
  constructor() {
    super()
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
      this.map = new maps.Map(document.getElementById('map'), mapConfig);
      var input = document.getElementById('searchBox');
      var searchBox = new google.maps.places.SearchBox(input);
    }
  }
  render () {
    return (
      <div ref='map' ></div>
    );
  }
}

export default Maps;