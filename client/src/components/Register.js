import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Link } from "react-router-dom";

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

    axios.post("/api/register", { name, email, password, college }).then(result => {
      this.props.history.push("/login");
    }).catch(err => {
      console.log(err);
    })
  };

  render() {
    const { name, email, password, college } = this.state;
    return (
      <div className="container">
        <form className="form-signin" onSubmit={this.onSubmit}>
          <h2 className="form-signin-heading">Register</h2>
          <label htmlFor="inputName" className="sr-only">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Full Name"
            name="name"
            value={name}
            onChange={this.onChange}
            required
          />
          <label htmlFor="inputEmail" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="Email address"
            name="email"
            value={email}
            onChange={this.onChange}
            required
          />
          <label htmlFor="inputPassword" className="sr-only">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            value={password}
            onChange={this.onChange}
            required
          />
          <label htmlFor="inputCollege" className="sr-only">
            College
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="College"
            name="college"
            value={college}
            onChange={this.onChange}

          />
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default Create;
