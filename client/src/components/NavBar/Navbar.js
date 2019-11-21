import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./navbar.css";

class Nav extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }


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
    window.location.assign("/login");
  };

  render() {
    return (
      <div className="top-nav">
        {sessionStorage.getItem("user") ? (
          <Navbar className="myNav">
            <Navbar.Brand href="#home" className="navBrand">
              allot
            </Navbar.Brand>
            <span className="mt-3 mr-2 debt-text">student debt planning</span>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Signed in as:{" "}
                <span className="mr-3 this-user-name">
                  {this.state.user.name}
                </span>
                <span>
                  <button
                    className="btn btn-primary mr-2 navBtn"
                    onClick={this.logout}
                  >
                    Logout
                  </button>
                </span>
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default Nav;
