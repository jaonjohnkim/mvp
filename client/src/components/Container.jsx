import React from 'react';
import {GoogleApiWrapper} from 'google-maps-react';
import Maps from './Maps.jsx';

export class Container extends React.Component {
  render() {
    var style = {
      height: '75%',
      width: '75%',
      position: 'absolute',
      overflow: 'auto',
      left: '250px'
    }
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    return (
      <span id='map' style={style}>
        <Maps google={this.props.google}/>
      </span>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAjaH64iexZfc15tcqoIMCRcz0Yt_7e-3Y'
})(Container)