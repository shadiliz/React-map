import React, { Component } from "react";
import "../App.css";
import "./ListItem.css";
/*class ListItem extends Component {
  render() {
    return <li className="listItem">{this.props.name}</li>;
  }
}
*/
export default class ListItem extends Component {
  render() {
    return (
      <li
        className="listItem"
        onClick={() => this.props.handleListItemClick(this.props)}
      >
        {console.log(this.props)}
        {this.props.name}
      </li>
    );
  }
}
