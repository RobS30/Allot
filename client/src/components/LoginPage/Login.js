import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      message: ""
    };
  }
  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    axios
      .post("/api/login", { email, password })
      .then(result => {
        console.log("result", result);
        sessionStorage.setItem("jwtToken", result.data.token);
        this.setState({ message: "" });
        sessionStorage.setItem("user", JSON.stringify(result.data.user));
        window.location.assign("/");
      })
      .catch(error => {
        if (error.response.status === 401) {
          this.setState({
            message: "Login failed. Email or password not match"
          });
        }
      });
  };

  render() {
    const { email, password, message } = this.state;
    return (
      <div className="main-body-reg">
        <div className="container">
          <div>
            <h1 className="main-title">allot</h1>
          </div>
          <form className="form-signin" onSubmit={this.onSubmit}>
            {message !== "" && (
              <div
                className="alert alert-warning alert-dismissible"
                role="alert"
              >
                {message}
              </div>
            )}
            <h2 className="form-signin-heading form-thing">Please Sign In</h2>
            <label htmlFor="inputEmail">Email address</label>
            <input
              type="email"
              className="form-control form-thing1"
              placeholder="Email address"
              name="email"
              value={email}
              onChange={this.onChange}
              required
            />
            <label htmlFor="inputPassword">Password</label>
            <input
              type="password"
              className="form-control form-thing"
              placeholder="Password"
              name="password"
              value={password}
              onChange={this.onChange}
              required
            />
            <button
              className="btn btn-lg btn-primary btn-block form-thing1"
              type="submit"
            >
              Login
            </button>
            <p className="form-thing1">
              Not a member?{" "}
              <Link to="/register">
                <span
                  className="glyphicon glyphicon-plus-sign"
                  aria-hidden="true"
                ></span>{" "}
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
