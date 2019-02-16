import React, { Component } from "react";
import ListItem from "./ListItem";
/*import "./VenueList.css";*/
//import "../App.css";

 class VenueList extends Component {
  render() {
    return (
      <ol className="venueList" aria-label="List Of Restaurant" tabIndex='0'>
        {this.props.markers &&
          this.props.markers
            //filters list items
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

export default VenueList;