import React, { Component } from 'react';
import museums from './museums.json';
import scriptLoader from 'react-async-script-loader';

let markers = []
let map = "";

class Map extends Component{
   constructor(props) {
        super(props);
        this.state = {
      locations: [],
      
      map: "",
      markers: [],
    }
this.initMap = this.initMap.bind(this)
}
    componentWillReceiveProps({isScriptLoadSucceed}){
        if (isScriptLoadSucceed) {

            this.initMap();
        }

        else{
            alert("Google Maps failed to load. Please check your internet connection!")
        }
}

initMap() {
  const map = new window.google.maps.Map(document.getElementById('map'), {
                zoom: 14,
                center: {lat: 51.1079, lng: 17.0385}
            });

  const infoWindow = new window.google.maps.InfoWindow();

      for (let museum of museums) {
      // Get the position from the location array.
      let position = museum.location;
      let title = museum.name;
      let id = museum.id
      // Create a marker per location, and put into markers array.
      let marker = new window.google.maps.Marker({
        map: map,
        position: position,
        title: title,
        id: id
      });
      // Push the marker to our array of markers.
      markers.push(marker);
      // Create an onClick event to open an infowindow at each marker.
      marker.addListener('click', () => {
        this.populateInfoWindow(marker, infoWindow);
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(function () {
          marker.setAnimation(null);
        }, 800);
    });
  }
}
populateInfoWindow (marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick',function(){
            infowindow.setMarker = null;
          });
        }
      }

    render(){
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