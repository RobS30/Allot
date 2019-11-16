import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./register.css";

class Create extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      college: ""
    };
  }
  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, email, password, college } = this.state;

    axios
      .post("/api/register", { name, email, password, college })
      .then(result => {
        this.props.history.push("/login");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { name, email, password, college } = this.state;
    return (
      <div className="main-body-reg">
        <div className="container">
          <form className="form-signin" onSubmit={this.onSubmit}>
            <h2 className="form-signin-heading form-thing">Register</h2>
            <label htmlFor="inputName" className="form-thing1">Name</label>
            <input
              type="text"
              className="form-control form-thing1"
              placeholder="Full Name"
              name="name"
              value={name}
              onChange={this.onChange}
              required
            />
            <label htmlFor="inputEmail" className="form-thing1">Email address</label>
            <input
              type="email"
              className="form-control form-thing1"
              placeholder="Email address"
              name="email"
              value={email}
              onChange={this.onChange}
              required
            />
            <label htmlFor="inputPassword" className="form-thing1">
              Password
            </label>
            <input
              type="password"
              className="form-control form-thing1"
              placeholder="Password"
              name="password"
              value={password}
              onChange={this.onChange}
              required
            />
            <label htmlFor="inputCollege" className="form-thing1">
              College
            </label>
            <input
              type="text"
              className="form-control form-thing"
              placeholder="College"
              name="college"
              value={college}
              onChange={this.onChange}
            />
            <button className="btn btn-lg btn-primary btn-block form-thing1" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Create;
