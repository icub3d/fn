import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Navbar } from "react-bootstrap/";

export default class Header extends Component {
  render() {
    return (
      <Navbar sticky="top" variant="dark" bg="dark">
        <Navbar.Brand as={Link} to="/">
          Fn
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
      </Navbar>
    );
  }
}
