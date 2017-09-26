
import React from 'react';

const PlacesListEntry = (props) => {
  
  const deleteEntry = () => {
    props.del(props.order);
  }

  return (
    <li>
      {props.order + 1}: {props.place.name}<button onClick={deleteEntry}>X</button>
    </li>
  );
}

export default PlacesListEntry;