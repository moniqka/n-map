import React, { Component } from 'react';

class LocationList extends Component {

  handleKeyPress(event) {
    if (event.charCode === 13) {
      this.props.selectMuseum(event.target.textContent)
    }
  }

  render() {
    return (
      <div>
        <h2 id="list-title">best museums</h2>
        <svg className="line" xmlns="http://www.w3.org/2000/svg" height="3px">
          <path className="path" d="M0 0 1200 0"/>
        </svg>

        <ul tabIndex = "0" aria-label = "List of best museums in Wroclaw">
          {this.props.filteredLocations.map((location, index) =>
            <li tabIndex = "0" aria-label = {`${location.name} , Enter for details`}
              className="location"
              data-key={location.id} 
              key={index} 
              role="button"
              onClick={(event)=> this.props.selectMuseum(event.target.textContent)}
              onKeyPress = {(event) => this.handleKeyPress(event)}>
              {location.name} 
            </li>
          )}
        </ul>
      </div>
    );   
  }
}

export default LocationList