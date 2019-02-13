import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";
import axios from "axios"; /* I got it from https://github.com/axios/axios */
import SideBar from "./components/SideBar";

//import { library } from "@fortawesome/fontawesome-svg-core";
class App extends Component {
  state = {
    venues: []
  }; /*stored places */

  componentDidMount() {
    this.getVenues();
    //this.loadMap();
  }

  loadMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCyzrGZk2XCYhmGbAEqNWqnAvzQfP5bn9U&v=3&callback=initMap"
    );
    window.initMap = this.initMap;
  };

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?";
    const param = {
      client_id: "LHZQPZ34RU142UYBJEWNFBZQPC2D4YTK2DQP1MILFTA1AKKQ",
      client_secret: "QMMM05UD3NFBBWABYW30LXKO2YO4ZP2005X4PURMNJRN4TDK",
      query: "food",
      near: "San Francisco",
      v: "20180323"
    };
    // using Axios
    axios
      .get(endPoint + new URLSearchParams(param))
      .then(response => {
        // set state to store the information
        this.setState(
          {
            venues: response.data.response.groups[0].items
          },
          this.loadMap()
        );
      })
      .catch(error => {
        console.log("ERROR! " + error);
      });
  };
  // Initialize google map with location & zoom
  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 37.773972, lng: -122.431297 },
      zoom: 8
    });

    // info
    var infowindow = new window.google.maps.InfoWindow();
    //display markers
    this.state.venues.map(myVenue => {
      var contentString = `${myVenue.venue.name}`;

      // marker
      var marker = new window.google.maps.Marker({
        position: {
          lat: myVenue.venue.location.lat,
          lng: myVenue.venue.location.lng
        },
        map: map,
        title: myVenue.venue.name
      });
      // click marker
      marker.addListener("click", function() {
        //change the content
        infowindow.setContent(contentString);
        // open info
        infowindow.open(map, marker);
      });
    });
  };

  render() {
    return (
      <main>
        <SideBar {...this.state} />
        <div id="map" />
      </main>
    );
  }
}
/*
 <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
    async defer></script>
*/
function loadScript(url) {
  var index = window.document.getElementsByTagName(
    "script"
  )[0]; /* window is global object of my document*/
  var script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default App;
/* Client Id: LHZQPZ34RU142UYBJEWNFBZQPC2D4YTK2DQP1MILFTA1AKKQ */
/* Client Secret
QMMM05UD3NFBBWABYW30LXKO2YO4ZP2005X4PURMNJRN4TDK */
