import React, { Component } from "react";
import LoggedInAs from "./LoggedInAs";
import { Navbar } from "react-bootstrap";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';


class Nav extends Component {
  state = {
    user: {}
  };

  componentDidMount() {
    
    let user = {};
    if (sessionStorage.getItem("user")) {
      user = JSON.parse(sessionStorage.getItem("user"));
    }
    this.setState({
      user: user
    });

  }

  logout = () => {
    sessionStorage.removeItem("jwtToken");
    sessionStorage.removeItem("user");
    window.location.reload();
  };

  login = () => {
    sessionStorage.removeItem("jwtToken");
    sessionStorage.removeItem("user");
    window.location.assign('/login');
  };

  render() {
    return (
      <div className="top-nav">
              {sessionStorage.getItem("user") ? (
              
                <Navbar className="container">
                <Navbar.Brand href="#home">allot</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text>
                    Signed in as: <span className="mr-2">{this.state.user.name}</span>
                    <span><button className="btn btn-primary mr-2" onClick={this.logout}>Logout</button></span>

                  </Navbar.Text>
                </Navbar.Collapse>
              </Navbar>
               
    ) : (<div>Login</div>)}
    </div>
    )

}}

export default Nav;


