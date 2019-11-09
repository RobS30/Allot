import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Link } from "react-router-dom";

class Create extends Component {
  constructor() {
    super();
    this.state = {
      expenseName: "",
      expenseAmount: "",
      expenseCategory: "",
      expenseFrequency: ""
    };
  }
  onChange = e => {
    const state = this.state;
    state[e.targetexpenseName] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    e.preventDefault();

    const { expenseName, expenseAmount, expenseCategory, expenseFrequency } = this.state;

    axios.post("/api/addExpense", { expenseName, expenseAmount, expenseCategory, expenseFrequency }).then(result => {
      this.props.history.push("/login");
    }).catch(err => {
      console.log(err);
    })
  };

  render() {
    const { name, email, password, college } = this.state;
    return (
      <div className="container">
        <form className="form-inline" onSubmit={this.onSubmit}>
          <h3 className="form-signin-heading">Add Expense</h3>
          <label htmlFor="inputName" className="sr-only">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Expense Name"
            name="expenseName"
            value={expenseName}
            onChange={this.onChange}
            required
          />
          <label htmlFor="inputAmount" className="sr-only">
            Expense Amount
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="$3,000"
            name="expenseAmount"
            value={expenseAmount}
            onChange={this.onChange}
            required
          />
          <label htmlFor="inputCategory" className="sr-only">
            Category
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Housing"
            name="expenseCategory"
            value={expenseCategory}
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
            name="expenseFrequency"
            value={expenseFrequency}
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
