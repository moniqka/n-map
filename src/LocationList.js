import React, { Component } from 'react';

class LocationList extends Component {

  render() {
    return (
      <div>
        <h2 id="list-title">best museums</h2>
        <svg className="line" xmlns="http://www.w3.org/2000/svg" height="3px">
          <path className="path" d="M0 0 1200 0"/>
        </svg>

        <ul>
          {this.props.filteredLocations.map((location, index ) =>
            <li 
              className="location"
              data-key={location.id} 
              key={ index } 
              role="button"
              onClick={(event)=> this.props.selectMuseum(event.target.textContent.trim())}>
              {location.name} 
            </li>
          )}
        </ul>
      </div>
    );   
  }
}

export default LocationList