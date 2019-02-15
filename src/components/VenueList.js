import React, { Component } from "react";
import ListItem from "./ListItem";
/*import "./VenueList.css";*/
//import "../App.css";
/*class VenueList extends Component {
  render() {
    return (
      <ol className="venueList">
        {this.props.venues.map((venue, i) => (
          <li key={i}>{venue.venue.name}</li>
        ))}
      </ol>
    );
  }
}
*/
export default class VenueList extends Component {
  render() {
    return (
      <ol className="venueList">
        {this.props.markers &&
          this.props.markers
            //filter list items
            .filter(marker => marker.map !== null)
            .map((marker, idx) => (
              <ListItem
                key={idx}
                name={marker.title}
                handleListItemClick={this.props.handleListItemClick}
              />
            ))}
      </ol>
    );
  }
}
