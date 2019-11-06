import React from "react";
import ExpenseInput from "./ExpenseInput";
import ExpenseButton from "./AddExpenseInputButton";

class ExpenseInputs extends React.Component {
  state = {
    expenses: []
  };

  componentDidMount() {
    // get all expenses from DB
  }

  render() {
    return (
      <>
        <div className="row">
          <div className="col-lg-12">
            {this.expenses.map(expense => {
              // add other props here
              return (
                <ExpenseInput
                  name={expense.name}
                  category={expense.category}
                  value={expense.value}
                />
              );
            })}
          </div>
        </div>

        <div>
          <ExpenseButton />
        </div>
      </>
    );
  }
}

export default ExpenseInputs;
