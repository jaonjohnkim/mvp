import PlacesListEntry from './PlacesListEntry.jsx';
import React from 'react';

const PlacesList = (props) => {
  var style = {
    height: '75%',
    width: '200px',
    position: 'absolute',
    overflow: 'auto',
    border: '1px solid black'
  }
  return(
  <div style={style}>
    <PlacesListEntry />
  </div>
)
}

export default PlacesList;