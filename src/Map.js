import React, { Component } from 'react';
import museums from './museums.json';
import scriptLoader from 'react-async-script-loader';
import * as FoursquareAPI from './FoursquareAPI';

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
        // Set boune animation foe selected marker
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
          FoursquareAPI.getVenues(marker.id)
            .then(venue => {
                const vDetails = venue.response.venue
                const infoContent = this.buildInfoWindowContent(vDetails);
          infowindow.setContent(infoContent);
          infowindow.open(map, marker);
          })
            .catch(err => {
                infowindow.setContent(`<div><span>There was an error loading Foursquare API</span><p>Error: ${err}</p></div>`)
                infowindow.open(map, marker);
            })
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick',function(){
            infowindow.setMarker = null;
          });
        }
      }

// Created the HTML to be used on the info content if it exists on the response
    buildInfoWindowContent (details) {
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
    };

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