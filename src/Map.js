import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';
import * as FoursquareAPI from './FoursquareAPI';

let map = "";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoWindows: [],
      map: "",
      markers: []
    }
  }

  // Make sure the script is loaded correctly if not - it handles the error and shows an alert
  componentWillReceiveProps({isScriptLoadSucceed}) {
    if (isScriptLoadSucceed) {
      this.initMap();
    } else{
      alert("Google Maps failed to load. Please check your internet connection!")
    }
  }

  // Updates markers based on the search results
  componentDidUpdate() {
    this.populateMarkers(this.props.filteredLocations);
  }

  initMap() {
    // Constructor creates a new map - only center and zoom are required.
    const map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: new window.google.maps.LatLng(51.1079,17.0385),
    });
    this.setState({map:map});
  }

  populateMarkers(locations) {
    // Clears all the markers and infowindows
    this.hideListings();
      
    let infowindow = new window.google.maps.InfoWindow(); 
    let bounds = new window.google.maps.LatLngBounds();
    // The following group uses the filtered locations (passed as props) to create an array of markers on initialize.
    for (let museum of this.props.filteredLocations) {
      // Get the position from the location array.
      let position = museum.location;
      let title = museum.name;
      let id = museum.id
      // Create a marker per location, and put into markers array.
      let marker = new window.google.maps.Marker({
        position: position,
        title: title,
        animation: window.google.maps.Animation.DROP,
        id:id,
        map: this.state.map
      });
      // Creates an onclick event to open an infowindow at each marker.
      marker.addListener('click', () => {
        let data =museum.infoWindowData? museum.infoWindowData.name: "no data";
        this.toggleMarker(marker, infowindow, data);
      });

      bounds.extend(marker.position);
      this.state.map.fitBounds(bounds);
      // Push the marker to our array of markers.
      this.state.markers.push(marker);
      
      // When location on the list is selected refers to binding function   
      if (this.props.selectedMuseum) {
        this.openSelectedInfoWindow(infowindow);
      }
    }
  }

  // This function handles the actions to set on marker
  toggleMarker(marker, infowindow, data) {
    this.populateInfoWindow(marker, infowindow, data);
    this.setBounce(marker);
  }

  // This function animates the marker
  setBounce(marker) {
    marker.setAnimation(window.google.maps.Animation.BOUNCE);
    setTimeout(function(){ marker.setAnimation(null); }, 1500);
  }

  // This function populates the infowindow when the marker is clicked. We'll only allow
  // one infowindow which will open at the marker that is clicked, and populate based
  // on that markers position.
  populateInfoWindow(marker, infowindow, data) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker !== marker) {
      infowindow.marker = marker;
      // Fetches the data from Foursquare 
      FoursquareAPI.getVenues(marker.id)
        .then(venue => {
          const details = venue.response.venue
          const infoContent = this.createInfoWindowContent(details);
      infowindow.setContent(infoContent);
      infowindow.open(map, marker);
      })
        .catch(err => {
            infowindow.setContent(`<div><span>There was an error loading Foursquare API</span><p>Error: ${err}</p></div>`)
            infowindow.open(map, marker);
        })
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick',function(){
        infowindow.close();
      });
    }
    this.state.infoWindows.push(infowindow);
  }

  // Creates the content of info window
  createInfoWindowContent(details) {
    let content = '<div class="info-window">'
    content += details.name ? `<h3>${details.name}</h3>` : '';
    content += details.bestPhoto.prefix && details.bestPhoto.suffix ? `<img src="${details.bestPhoto.prefix}150x90${details.bestPhoto.suffix}" alt="Photo of museum" class="info-window-pic">` : '';
    content += '<p><ul>'
    content += details.location.address ? `<span><li>${details.location.address}</li></span>` : '';
    content += details.contact.formattedPhone ? `<li>Phone: ${details.contact.formattedPhone}</li>` : '';
    content += details.rating && details.likes.summary ? `<li>Rating: <span>${details.rating}</span> with <span>${details.likes.summary}</span></li>` : '';
    content += '</p></ul>'
    content +='</div>'
    return content;
  }

  // This function binds selected location o the list with marker
  openSelectedInfoWindow(infowindow) {
    // Filter within markers and set to selected location
    let targetMarker =  this.state.markers.filter((marker)=>{
      return marker.title === this.props.selectedMuseum
    })
    // Filter within searched locations and set to target location
    let targetLocation =  this.props.filteredLocations.filter((location)=>{
      return location.title === this.props.title
    })
    // Checks if both values are the same and refers to toggleMarker function
    if (targetMarker[0] && targetLocation[0]){
      let data =  targetLocation[0].infoWindowData ? targetLocation[0].infoWindowData.name :"no data";
      this.toggleMarker(targetMarker[0], infowindow, data);
    }
  }

  // Clears array of selected locations to leave it empty for the select target
  clearArray(array) {
    while (array.length > 0) {
      array.pop();
    }
  }

  // This function goes through the markers and info windows to close it
  hideListings() {
    this.state.markers.forEach(function(marker) {
      marker.setVisible(false);
    });
    this.clearArray(this.state.markers)

    this.state.infoWindows.forEach(function(infoWindow) {
      infoWindow.close();
    });
    this.clearArray(this.state.infoWindows)
  }

  render() {
    
    return(
      <div>
        <div id="map"></div>
      </div>
    )
  }
}

export default scriptLoader(
    ["https://maps.googleapis.com/maps/api/js?key=AIzaSyCEXA9Cre0tpvtTB_1oQawVQ_5Hc1jUlE4&v=3"]
)(Map)