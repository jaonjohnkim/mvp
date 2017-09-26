
import React from 'react';

const PlacesListEntry = (props) => {
  
  const deleteEntry = () => {
    props.del(props.order);
  }
  var style = {
    borderBottom: '1px solid black',
    margin: 0,
    textAlign: 'left'
  }
  return (
    <li style={style}>
      {props.order + 1}: {props.place.name}<button onClick={deleteEntry}>X</button>
      <button onClick={props.moveUp}>Up</button><button onClick={props.moveDown}>Down</button>
    </li>
  );
}

export default PlacesListEntry;