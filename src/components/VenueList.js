import React, { Component } from "react";
import ListItem from "./ListItem"; /*   */
//import "../App.css";
class VenueList extends Component {
  render() {
    return (
      <ol className="venueList">
        <ListItem />
      </ol> /*   */
    );
  }
}
export default VenueList;
