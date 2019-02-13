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
        {this.props.venues &&
          this.props.venues.map((venue, idx) => (
            <ListItem
              key={idx}
              name={venue.venue.name}
              handleListItemClick={this.props.handleListItemClick}
            />
          ))}
      </ol>
    );
  }
}
