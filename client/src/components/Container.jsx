import React from 'react';
import {GoogleApiWrapper} from 'google-maps-react';
import Maps from './Maps.jsx';

export const Container = (props) => {
  var style = {
    height: '75%',
    width: '75%',
    position: 'absolute',
    overflow: 'auto',
    left: '250px'
  }
  if (!props.loaded) {
    return <div>Loading...</div>
  }
  return (
    <span id='map' style={style}>
      <Maps 
        google={props.google} 
        places={props.places} 
        addLoc={props.addLoc} 
        polylines={props.polylines} 
        rerenderPolylines={props.rerenderPolylines}
        setMarker={props.setMarker}/>
    </span>
  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAjaH64iexZfc15tcqoIMCRcz0Yt_7e-3Y',
  libraries: ['places', 'geometry']
})(Container)