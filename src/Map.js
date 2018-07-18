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

  componentWillReceiveProps({isScriptLoadSucceed}) {
    if (isScriptLoadSucceed) {
      this.initMap();
    } else{
        alert("Google Maps failed to load. Please check your internet connection!")
    }
  }

  componentDidUpdate() {
    this.populateMarkers(this.props.filteredLocations);
  }

  initMap() {
  
    const map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 14,

      center: new window.google.maps.LatLng(51.1079,17.0385),
    });
    this.setState({map:map});
  }

  populateMarkers (locations) {
    this.hideListings();
      
    let infowindow = new window.google.maps.InfoWindow(); 
    let bounds = new window.google.maps.LatLngBounds();
    
    for (let museum of this.props.filteredLocations) {

      let position = museum.location;
      let title = museum.name;
      let id = museum.id

      let marker = new window.google.maps.Marker({
        position: position,
        title: title,
        animation: window.google.maps.Animation.DROP,
        id:id,
        map: this.state.map
      });

      marker.addListener('click', () => {
        let data =museum.infoWindowData? museum.infoWindowData.name: "no data";
        this.toggleMarker(marker, infowindow, data);
      });

      bounds.extend(marker.position);
      this.state.markers.push(marker);
        
      if (this.props.selectedMuseum) {
        this.openSelectedInfoWindow(infowindow);
      }
    }
  }

  toggleMarker(marker, infowindow, data) {
    this.populateInfoWindow(marker, infowindow, data);
    this.setBounce(marker);
  }

  setBounce(marker) {
    marker.setAnimation(window.google.maps.Animation.BOUNCE);
    setTimeout(function(){ marker.setAnimation(null); }, 1500);
  }

  populateInfoWindow (marker, infowindow, data) {
    
    if (infowindow.marker !== marker) {
      infowindow.marker = marker;
      FoursquareAPI.getVenues(marker.id)
        .then(venue => {
          const details = venue.response.venue
          const infoContent = this.buildInfoWindowContent(details);
      infowindow.setContent(infoContent);
      infowindow.open(map, marker);
      })
        .catch(err => {
            infowindow.setContent(`<div><span>There was an error loading Foursquare API</span><p>Error: ${err}</p></div>`)
            infowindow.open(map, marker);
        })
  
      infowindow.addListener('closeclick',function(){
        infowindow.close();
      });
    }
    this.state.infoWindows.push(infowindow);
  }

  buildInfoWindowContent(details) {
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

  openSelectedInfoWindow (infowindow) {

    let selectedMarker =  this.state.markers.filter((marker)=>{
      return marker.title === this.props.selectedMuseum
    })

    let selectedLocation =  this.props.filteredLocations.filter((location)=>{
      return location.title === this.props.title
    })

    if(selectedMarker && selectedMarker[0] && selectedLocation && selectedLocation[0]){
      var data =  selectedLocation[0].infoWindowData ? selectedLocation[0].infoWindowData.name :"no data";
      this.toggleMarker(selectedMarker[0], infowindow, data);
    }
  }

  clearArray(array) {
    while (array.length > 0) {
      array.pop();
    }
  }

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