import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {

  state = {
    user: {}
  }

  componentDidMount() {

    let newUser = JSON.parse(localStorage.getItem("user"));
    
    this.setState({
      user: JSON.parse(localStorage.getItem("user"))
    })
    
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
                <div>
                  <h2 className="panel-title">Welcome {this.state.user.name}</h2>
                  <button className="btn btn-primary" onClick={this.logout}>
                    Logout
                </button>
                </div>
              )}
            </h3>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
