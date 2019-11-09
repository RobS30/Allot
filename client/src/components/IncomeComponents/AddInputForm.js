import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Link } from "react-router-dom";

class Create extends Component {
  constructor() {
    super();
    this.state = {
      incomeName: "",
      incomeAmount: "",
      incomeCategory: "",
      incomeFrequency: ""
    };
  }
  onChange = e => {
    const state = this.state;
    state[e.target.incomeName] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    e.preventDefault();

    const { incomeName, incomeAmount, incomeCategory, incomeFrequency } = this.state;

    axios.post("/api/addExpense", { incomeName, incomeAmount, incomeCategory, incomeFrequency }).then(result => {
      this.props.history.push("/login");
    }).catch(err => {
      console.log(err);
    })
  };

  render() {
    const { incomeName, incomeAmount, incomeCategory, incomeFrequency } = this.state;
    return (
      <div className="container">
        <form className="form-inline" onSubmit={this.onSubmit}>
          <h3 className="form-signin-heading">Add Income</h3>
          <label htmlFor="inputName" className="sr-only">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Income Name"
            name="incomeName"
            value={incomeName}
            onChange={this.onChange}
            required
          />
          <label htmlFor="inputAmount" className="sr-only">
            Income Amount
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="$3,000"
            name="incomeAmount"
            value={incomeAmount}
            onChange={this.onChange}
            required
          />
          <label htmlFor="inputCategory" className="sr-only">
            Category
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Job"
            name="incomeCategory"
            value={incomeCategory}
            onChange={this.onChange}
            required
          />
          <label htmlFor="inputFrequency" className="sr-only">
            Frequency By Month
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="1 (this would be every month) "
            name="incomeFrequency"
            value={incomeFrequency}
            onChange={this.onChange}

          />
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            +
          </button>
        </form>
      </div>
    );
  }
}

export default Create;
