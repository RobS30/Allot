import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import MainDisplay from "./components/MainDisplay"

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
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              allot <small>is here!</small>
              {sessionStorage.getItem("user") ? (
                <React.Fragment>
                  <div>
                    <h2 className="panel-title">
                      Welcome {this.state.user.name}
                    </h2>
                    <button className="btn btn-primary" onClick={this.logout}>
                      Logout
                    </button>
                  </div>
                  <MainDisplay />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div>
                    <h2 className="panel-title">
                      Welcome
                    </h2>
                    <button className="btn btn-primary" onClick={this.login}>
                      Login
                    </button>
                  </div>                  
                </React.Fragment>
              )}
            </h3>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
