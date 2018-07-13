import React, { Component } from 'react';
import museums from './museums.json';


class LocationList extends Component {


  render() {
    //let museums = this.props.museums
    return (
      <div>
      <h2 id="list-title">best museums</h2>
        <svg className="line" xmlns="http://www.w3.org/2000/svg" height="3px">
          <path class="path" d="M0 0 1200 0"/>
        </svg>
        <ul
          aria-label = 'List of museums'>
          {this.props.filteredLocations.map( location =>
            <li 
              className="location"
              data-key={location.id} 
              key={location.id} 
              role="button"
              onClick={(event)=> this.props.trigger(event.currentTarget.dataset.id )}>
       
              {location.name} 
            </li>
          )}

        </ul>
        </div>
      );
    
    }
}

export default LocationList