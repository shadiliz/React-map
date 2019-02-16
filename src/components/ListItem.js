import React, { Component } from "react";
import "../App.css";
import "./ListItem.css";

 class ListItem extends Component {
  render() {
    return (
      <li
        className="listItem" 
		aria-label={this.props.name} tabIndex='0'
        onClick={() => this.props.handleListItemClick(this.props)}
      >
	{this.props.name}
	</li>
    );
  }
}
 export default ListItem; 