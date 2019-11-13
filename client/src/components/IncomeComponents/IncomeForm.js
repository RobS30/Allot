import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Link } from "react-router-dom";

class IncomeForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      value: "",
      frequency: "",
      expenses: []
    };
  }
  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  render() {
    const { name, value, category, frequency } = this.state;
    return (
      <div className="container">
        <form className="form-inline" onSubmit={this.props.handleSubmit}>
          <h3 className="form-signin-heading">Add Income</h3>
          <label htmlFor="inputName" className="sr-only">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Income Name"
            name="name"
            value={name}
            onChange={this.onChange}
            required
          />
          <label htmlFor="inputAmount" className="sr-only">
            Income Amount
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Income Amount"
            name="value"
            value={value}
            onChange={this.onChange}
            required
          />
          <label htmlFor="inputCategory" className="sr-only">
            Category
          </label>          
          <select 
            value={frequency} 
            onChange={this.onChange}
            name="frequency"
            className="form-control" id="sel1">
              <option value="monthly">Monthly</option>
              <option value="bi-monthly">Bi-Monthly</option>
              <option value="annual">Annual</option>
              <option value="semi-annual"> Semi-Annual</option>
      
            </select>
          
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            +
          </button>
        </form>
      </div>
    );
  }
}

export default IncomeForm;
