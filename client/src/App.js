import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  componentDidMount() {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    axios
      .get("/api/budget")
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        if (error.response.status === 401) {
          this.props.history.push("/login");
        }
      });
  }

  logout = () => {
    localStorage.removeItem("jwtToken");
    window.location.reload();
  };

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              allot <small>is here</small>
              {localStorage.getItem("jwtToken") && (
                <button className="btn btn-primary" onClick={this.logout}>
                  Logout
                </button>
              )}
            </h3>
          </div>          
        </div>
      </div>
    );
  }
}

export default App;
