import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./navbar.css";

class Footer extends Component {
  render() {
    return (
      <div className="top-nav">
        <Navbar sticky="bottom" className="myNav">
          <Navbar.Brand href="#home" className="navBrand">
            allot
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>Student Debt Planning Made Easy</Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Footer;
