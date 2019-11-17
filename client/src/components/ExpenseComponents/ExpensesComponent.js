import React from "react";
import axios from "axios";
import ExpenseComponent from "./ExpenseComponent";
import ExpenseForm from "./ExpenseForm";
import "./Expense.css";

class ExpensesComponent extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      expenses: []
    };
  }

  componentDidMount() {
    this._isMounted = true;

    let user = {};
    if (sessionStorage.getItem("user")) {
      user = JSON.parse(sessionStorage.getItem("user"));
    }
    axios.defaults.headers.common["Authorization"] = sessionStorage.getItem(
      "jwtToken"
    );
    axios.get("/api/expenses/" + user.id).then(res => {
      if (this._isMounted && Array.isArray(res.data)) {
        console.log("expenses:", res.data);
        this.setState({
          expenses: res.data
        });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleSubmit = e => {
    e.preventDefault();

    const { name, value, category, frequency } = e.target;

    let user = {};
    if (sessionStorage.getItem("user")) {
      user = JSON.parse(sessionStorage.getItem("user"));
    }
    const expense = {
      name: name.value,
      category: category.value,
      value: value.value,
      frequency: frequency.value,
      id: user.id
    };
    axios.defaults.headers.common["Authorization"] = sessionStorage.getItem(
      "jwtToken"
    );
    axios
      .post("/api/expenses", expense)
      .then(res => {
        if (this._isMounted && Array.isArray(res.data)) {
          console.log(res.data.length);
          this.setState({
            expenses: res.data
          });
        }
      })
      .catch(error => {
        console.log("error", error);
        if (error.response.status === 401) {
          this.props.history.push("/login");
        }
      });
  };

  handleClick = e => {
    e.preventDefault();

    const { name, value, category, frequency } = e.target;

    let user = {};
    if (sessionStorage.getItem("user")) {
      user = JSON.parse(sessionStorage.getItem("user"));
    }
    
    axios.defaults.headers.common["Authorization"] = sessionStorage.getItem(
      "jwtToken"
    );
    axios
      .delete("/api/expenses/" + user.id)
      .then(res => {
        if (this._isMounted && Array.isArray(res.data)) {
          console.log(res.data.length);
          this.setState({
            expenses: res.data
          });
        }
      })
      .catch(error => {
        console.log("error", error);
        if (error.response.status === 401) {
          this.props.history.push("/login");
        }
      });
  };

  render() {
    return (
      <>
        <div className="row">
          <div className="col-lg-12">
            <h2>Add Expenses</h2>
            <div>
              <div className="row">
                <table className="expense-table">
                  <thead>
                    <tr>
                      <th>Expense</th>
                      <th>Amount</th>
                      <th>Category</th>
                      <th>Frequency</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  {this.state.expenses.map((expense, index) => {
                    return (
                      <ExpenseComponent
                        key={index}
                        name={expense.name}
                        category={expense.category}
                        value={expense.value}
                        frequency={expense.frequency}
                        handleClick={this.handleClick}
                      />
                    );
                  })}
                </table>
              </div>
            </div>
          </div>

          <div>
            <ExpenseForm handleSubmit={this.handleSubmit} />
          </div>
        </div>
      </>
    );
  }
}

export default ExpensesComponent;
