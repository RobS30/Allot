import React, { Component } from "react";
import "./App.css";
import MainDisplay from "./components/MainDisplay";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./components/NavBar/Navbar";
import Login from "./components/LoginPage/Login";

class App extends Component {
  state = {
    user: {}
  };

  componentDidMount() {
    window.addEventListener("unauthorized", e => {
      sessionStorage.removeItem("jwtToken");
      sessionStorage.removeItem("user");
      window.location.assign("/login");
    });

    let user = {};
    if (sessionStorage.getItem("user")) {
      user = JSON.parse(sessionStorage.getItem("user"));
    }
    this.setState({
      user: user
    });
  }

  logout = () => {
    window.location.assign("/");
    sessionStorage.removeItem("jwtToken");
    sessionStorage.removeItem("user");
  };

  login = () => {
    sessionStorage.removeItem("jwtToken");
    sessionStorage.removeItem("user");
    window.location.assign("/login");
  };

  render() {
    return (
      <div className="main-body-app">
        <Nav />

        {sessionStorage.getItem("user") ? (
          <>
            <MainDisplay />
          </>
        ) : (
          <>
            <Login />
          </>
        )}
      </div>
    );
  }
}

export default App;
