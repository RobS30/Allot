import React, { Component } from "react";
import axios from "axios";
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
