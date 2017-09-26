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

  addLocation() {
    
  }
  
  optimize() {
    
  }

  

  render() {
    return (
      <div>
        <Search />
        <PlacesList places={this.state.places}/>
        <Container places={this.state.places}/>
        <Maps />
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('app'));

