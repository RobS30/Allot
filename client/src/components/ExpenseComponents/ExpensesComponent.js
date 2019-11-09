import React from "react";
import ExpenseInput from "./ExpenseComponent";
import ExpenseButton from "./AddExpenseInputButton";

class ExpensesComponent extends React.Component {
  state = {
    expenses: []
  };

  componentDidMount() {
    let user = {};
    if (localStorage.getItem("user")) {
      user = JSON.parse(localStorage.getItem("user"));
    }
    axios
    .get("/api/expenes/" + user.email)
    .then(res => {
      console.log(res.data.length);
      this.setState ({ 
        expenses: res.data
      })
    })

   }

  handleSubmit = e => {

    e.preventDefault();
    
    const {
      expenseName,
      expenseAmount,
      expenseCategory,
      expenseFrequency
    } = e.target;

    let user = {};
    if (localStorage.getItem("user")) {
      user = JSON.parse(localStorage.getItem("user"));
    }
    const expense = {
      name: name.value,
      category: category.value,
      value: value.value,
      frequency: frequency.value,
      email: user.email
    };
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    axios
      .post("/api/expenses", expense)
      .then(res => {
        console.log(res.data.length);
        this.setState ({ 
          expenses: res.data
        })
      })
      .catch(error => {
        console.log("error", error);
        if (error.response.status === 401) {
          this.props.history.push("/login");
        }
      });
  
  }

  render() {
    return (
      <>
        <div className="row">
          <div className="col-lg-12">
            {this.state.expenses.map(expense => {
              
              return (
                <ExpenseComponent
                  name={expense.name}
                  category={expense.category}
                  value={expense.value}
                  frequency={expense.frequency}
                />
              );
            })}
          </div>
        </div>

        <div>
          <ExpenseForm handleSubmit={this.handleSubmit} />
        </div>
      </>
    );
  }
}

export default ExpensesComponent;
