import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <div className="ui inverted menu fixed top">
        <div className="item">
          <Link to="/">Fn</Link>
        </div>
      </div>
    );
  }
}
