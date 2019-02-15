import React, { Component } from "react";
/*import VenueList from "./VenueList"; */
/*import "../App.css"; */
import "./SideBar.css";
import VenueList from "./VenueList";

export default class SideBar extends Component {
  render() {
    return (
      <div className="sideBar">
        <input
          onChange={event => this.props.filterVenues(event.target.value)}
          type={"search"}
          id={"search"}
          placeholder={"Filter Venues"}
        />
        <VenueList
          {...this.props}
          handleListItemClick={this.props.handleListItemClick}
        />
      </div>
    );
  }
}
