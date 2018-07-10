import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';

class Map extends Component{
    /*constructor(props) {
        super(props);
    }*/
    componentWillReceiveProps({isScriptLoadSucceed}){
        if (isScriptLoadSucceed) {
            let markers = [];

            let map = new window.google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: {lat: 51.1079, lng: 17.0385}
            });
        }
        else{
            alert("script not loaded")
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