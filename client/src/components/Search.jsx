import React from 'react';

const Search = (props) => (
  <div>
    <input style={{width: '400px'}} id="searchBox" type="text"/>
    <button onClick={props.addLocation}>Add Location</button>
  </div>
);

export default Search;