import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import MainDisplay from "./components/MainDisplay"
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from "./components/NavBar/Navbar";

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
    window.location.assign('/login');
  };

  render() {
    return (
      <div className="main-body">
      <Nav />
            <div className="container">
      
              {sessionStorage.getItem("user") ? (
                
                  <MainDisplay />
                
              ) : (
                <React.Fragment>
                  <div>
                    <h2 className="panel-title">
                      Login To See Your Information
                    </h2>
                    <button className="btn btn-primary" onClick={this.login}>
                      Login
                    </button>
                  </div>                  
                </React.Fragment>
              )}
        
      </div>
      </div>
    );
  }
}

export default App;
