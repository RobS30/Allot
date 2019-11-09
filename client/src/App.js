import React, { Component } from "react";
import axios from "axios";
import "./App.css";

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

  addExpense = () => {

    let user = {};
    if (localStorage.getItem("user")) {
      user = JSON.parse(localStorage.getItem("user"));
    }

    const expense = {
      name: "NetFlix",
      category: "Entertainment",
      value: 15.99,
      frequency: "monthly",
      email: user.email
    };
    
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    axios
      .post("/api/expenses", expense)
      .then(res => {
        console.log({res})
        console.log(res.data)
      })
      .catch(error => {
        console.log('error', error)
        if (error.response.status === 401) {
          this.props.history.push("/login");
        }
      });
  };

  addIncome = () => {
    const expense = {
      name: "Dad",
      category: "Obligation",
      value: 300,
      email: this.state.user.email
    };
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    axios
      .post("/api/incomes", expense)
      .then(res => {
        console.log("incomes:", res.data.incomes);
      })
      .catch(error => {
        if (error.response.status === 401) {
          this.props.history.push("/login");
        }
      });
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

                  <div>
                    <h2 className="panel-title">Expenses</h2>
                    <button
                      className="btn btn-primary"
                      onClick={this.addExpense}
                    >
                      Add Expense
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
