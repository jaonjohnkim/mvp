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
  <div><button onClick={props.optimize}>Optimize!</button>
    <ul style={style}>
      {props.places.map((location, i) => {
        return <PlacesListEntry place={location} order={i} key={i} del={props.del}/>
      })}
    </ul>
  </div>
)
}

export default PlacesList;