import React, { Component } from "react";
/*import VenueList from "./VenueList"; */
/*import "../App.css"; */
import "./SideBar.css";
import VenueList from "./VenueList";

 class SideBar extends Component {
  render() {
    return (
      <div className="sideBar">
        <input tabIndex='0' aria-label="The List Filter" role='textbox'
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

export default SideBar;