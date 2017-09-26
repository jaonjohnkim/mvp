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
      places: []
    }
  }

  addLocation(location) {
    console.log('Location:', location);
    var places = this.state.places.concat(location);
    console.log('Places:', places)
    this.setState({
      places: places
    })
  }

  deleteLocation(index) {
    var places = this.state.places.slice();
    places.splice(index, 1);
    this.setState({
      places: places
    });
  }
  
  optimize() {
    var places = this.state.places.slice();
    $.ajax({
      method: 'POST',
      url: 'optimize',
      data: JSON.stringify(places)
    })
    .done((result) => {
      console.log(result);
    })
    .fail(() => {

    })
  }

  

  render() {
    console.log(this)
    return (
      <div>
        <Search />
        <PlacesList 
          places={this.state.places} 
          del={this.deleteLocation.bind(this)}
          optimize={this.optimize.bind(this)}
        />
        <Container places={this.state.places} addLoc={this.addLocation.bind(this)}/>
        
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('app'));

