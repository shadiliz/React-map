import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";
import axios from "axios"; /* I got it from https://github.com/axios/axios */
import SideBar from "./components/SideBar";
import ListItem from "./components/ListItem";

//import { library } from "@fortawesome/fontawesome-svg-core";

class App extends Component {
  state = {
    map: undefined,
    venues: [],
    markers: []
  }; /*stored places */

  /* listitem click   */
  handleListItemClick = venue => {
    const marker = this.state.markers.find(
      marker => marker.title === venue.name
    );
    window.google.maps.event.trigger(marker, "click");
    marker.setAnimation(window.google.maps.Animation.BOUNCE);
    setTimeout(() => {
      marker.setAnimation(null);
    }, 2100);
  }; /* set animate to marker */

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

  //Filter venues search bar

  filterVenues = query => {
    let newQuery = query.toLowerCase();
    this.setState(prevState => ({
      markers: prevState.markers.map(each => {
        if (each.title.toLowerCase().includes(newQuery)) {
          each.setMap(this.state.map);
        } else {
          each.setMap(null);
        }
        return each;
      })
    }));
  };

  // Initialize google map with location & zoom
  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 37.773972, lng: -122.431297 },
      zoom: 10
    });

    // info
    var infowindow = new window.google.maps.InfoWindow();
    //display markers
    let markers = [];
    /* console.log(this.state.venues[0]); */
    let boundaries = new window.google.maps.LatLngBounds();
    this.state.venues.map(myVenue => {
      /* got venue name addresses and city */
      var contentString =
        `<h3>${myVenue.venue.name}<h3>` +
        `<p>${myVenue.venue.location.formattedAddress[0]}</p>` +
        `<p>${myVenue.venue.location.formattedAddress[1]}</p>`;

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
      marker.addListener("click", () => {
        //change the content
        infowindow.setContent(contentString);
        // open info
        infowindow.open(map, marker);
      });
      boundaries.extend(marker.position);
      markers.push(marker);
    });
    this.setState(() => ({ markers, map }));
    map.fitBounds(boundaries);
  };

  render() {
    return (
      //main has predefined label and role
      <main>
        <SideBar		
          {...this.state}
          handleListItemClick={this.handleListItemClick}
          filterVenues={this.filterVenues}
        />
        <div id="map" aria-label="Google Map" tabIndex='0'/>
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

