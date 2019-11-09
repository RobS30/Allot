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
    if (localStorage.getItem("user")) {
      user = JSON.parse(localStorage.getItem("user"));
    }
    this.setState({
      user: user
    });

  }

  logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    window.location.reload();
  };

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              allot <small>is here!</small>
              {localStorage.getItem("user") && (
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
              )}
            </h3>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
