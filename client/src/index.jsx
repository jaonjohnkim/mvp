import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import PlacesList from './components/PlacesList.jsx';
import PlacesListEntry from './components/PlacesListEntry.jsx';
import Maps from './components/Maps.jsx';
import Container from './components/Container.jsx'
// import map from './components/Map.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [
        {
          formatted_address: "944 Market St, San Francisco, CA 94102, USA",
          name: "944 Market St",
          geometry: {location: {lat: () => 37.7836966, lng: () => -122.4089664}}
        },
        {
          formatted_address: "22 Pacheco St, San Francisco, CA 94116, USA",
          name: "22 Pacheco St",
          geometry: {location: {lat: () =>37.7451692, lng: () =>-122.46104909999997}}
        },
        {
          formatted_address: "24 Geary St, San Francisco, CA 94108, USA",
          name: "24 Geary St",
          geometry: {location: {lat: () =>37.7880414, lng: () =>-122.40395960000001}}
        },
        {
          formatted_address: "2400 Polk St, San Francisco, CA 94109, USA",
          name: "2400 Polk St",
          geometry: {location: {lat: () =>37.7989359, lng: () =>-122.42215110000001}}
        },
        {
          formatted_address: "1199 De Haro St, San Francisco, CA 94107, USA",
          name: "1199 De Haro St",
          geometry: {location: {lat: () =>37.75477619999999, lng: () =>-122.4004438}}
        },
        
      ],
      polylines: '',
      poly: null,
      markers: []
    }
  }
  
  // componentDidMount() {
  //   var markers = this.state.places.map((place, i) => {
  //     var loc = place.geometry.location;
  //     var lat = loc.lat();
  //     var lng = loc.lng();
  //     console.log('lat:', lat, 'lng:', lng);
  //     return new google.maps.Marker({
  //       position: {lat: lat, lng: lng},
  //       label: i+1 + '',
  //       map: window.map
  //     });
  //   });
  //   this.setState({
  //     markers: markers
  //   })
  // }

  addLocation(location) {
    // console.log('Location:', location);
    var places = this.state.places.concat(location);
    console.log('Places:', places)
    console.log('Old Markers', this.state.markers)
    this.state.markers.forEach((marker) => {
      marker.setMap(null);
    })
    console.log('Old Markers', this.state.markers)
    var markers = places.map((place, i) => {
      var loc = place.geometry.location;
      var lat = loc.lat();
      var lng = loc.lng();
      console.log('lat:', lat, 'lng:', lng);
      return new google.maps.Marker({
        position: {lat: lat, lng: lng},
        label: i+1 + '',
        map: window.map
      });
    });
    console.log('Markers', markers)
    this.setState({
      places: places,
      markers: markers
    });
    var bounds = map.getBounds()
    window.map.fitBounds(bounds);
  }

  deleteLocation(index) {
    var places = this.state.places.slice();
    console.log('Old Markers', this.state.markers)
    this.state.markers.forEach((marker) => {
      marker.setMap(null);
    })
    places.splice(index, 1);
    var newMarkers = places.map((place, i) => {
      var loc = place.geometry.location;
      var lat = loc.lat();
      var lng = loc.lng();

      return new google.maps.Marker({
        position: {lat: lat, lng: lng},
        label: i+1 + '',
        map: window.map
      });
    });
    console.log('New Markers', newMarkers)
    this.setState({
      places: places,
      markers: newMarkers
    });
  }

  moveUp(e) {
    console.log(e)
  }
  
  moveDown(e) {
    console.log(e)
  }
  setMarker() {
    // this.state.markers.forEach((marker) => {
    //   marker.setMap(null);
    // });
    var places = this.state.places.slice();
    var newMarkers = places.map((place, i) => {
      var loc = place.geometry.location;
      var lat = loc.lat();
      var lng = loc.lng();

      return new google.maps.Marker({
        position: {lat: lat, lng: lng},
        label: i+1 + '',
        map: window.map
      });
    });
    this.setState({
      markers: newMarkers
    });
  }
  
  optimize() {
    var places = this.state.places.slice();
    console.log(places);
    $.ajax({
      method: 'POST',
      url: 'optimize',
      data: JSON.stringify(places),
      contentType: 'application/json'
    })
    .done((result) => {
      console.log(result);
      console.log(result[1].overview_polyline.points)
      var startIdx = result[0];
      var copy = this.state.places.slice();
      var newPlaces = copy.splice(startIdx, 1);
      var order = result[1].waypoint_order;
      for (var i = 0; i < order.length; i++) {
        newPlaces.push(copy[order[i]]);
      }
      console.log('reordered: ', newPlaces);
      this.setState({
        places: newPlaces,
        polylines: result[1].overview_polyline.points
      }, () => {
        this.rerenderPolylines(this.state.polylines);
      });
      
    })
    .fail(() => {

    })
  }

  rerenderPolylines(poly) {
    
      
    // window.map.setMap(null);
    var polyline = new google.maps.Polyline({
      path: google.maps.geometry.encoding.decodePath(poly),
      map: window.map
    });
    if (this.state.poly) {
      this.state.poly.setMap(null);
    }
    this.setState({poly: polyline});
    
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < polyline.getPath().getLength(); i++) {
      bounds.extend(polyline.getPath().getAt(i));
    }
    window.map.fitBounds(bounds);
  }

  // renderPolylines(poly) {
  //   var polyline = new google.maps.Polyline({
  //     path: google.maps.geometry.encoding.decodePath(poly),
  //     map: this.map
  //   });
  //   var bounds = new google.maps.LatLngBounds();
  //   for (var i = 0; i < polyline.getPath().getLength(); i++) {
  //     bounds.extend(polyline.getPath().getAt(i));
  //   }
  //   this.map.fitBounds(bounds);
    
  // }

  render() {
    console.log(this)
    return (
      <div>
        <Search />
        <PlacesList 
          places={this.state.places} 
          del={this.deleteLocation.bind(this)}
          optimize={this.optimize.bind(this)}
          moveUp={this.moveUp.bind(this)}
          moveDown={this.moveDown.bind(this)}
        />
        <Container 
          places={this.state.places} 
          addLoc={this.addLocation.bind(this)} 
          polylines={this.state.polylines} 
          rerenderPolylines={this.rerenderPolylines.bind(this)}
          setMarker={this.setMarker.bind(this)}/>
        
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('app'));

