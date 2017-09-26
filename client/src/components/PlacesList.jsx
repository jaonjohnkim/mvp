import PlacesListEntry from './PlacesListEntry.jsx';
import React from 'react';

const PlacesList = (props) => {
  var style = {
    height: '75%',
    width: '225px',
    position: 'absolute',
    overflow: 'auto',
    border: '1px solid black',
    listStyleType: 'none',
    padding: 0
  }
  return(
  <div><button onClick={props.optimize}>Optimize!</button>
    <ul style={style}>
      {props.places.map((location, i) => {
        return <PlacesListEntry 
                  place={location} 
                  order={i} 
                  key={i} 
                  del={props.del} 
                  moveUp={props.moveUp} 
                  moveDown={props.moveDown}/>
      })}
    </ul>
    <button onClick={props.save}>Save Trip</button>
  </div>
)
}

export default PlacesList;