import React from "react";
import ExpensesComponent from "./ExpenseComponents/ExpensesComponent";
import IncomesComponent from "./IncomeComponents/IncomesComponent";

class ExpenseIncomeDisplay extends React.Component {
  render() {
    return (
      <>
        <div className="row">
          <div className="col-lg-12"><ExpensesComponent /></div>
        </div>
        <div className="row">
          <div className="col-lg-12"><IncomesComponent /></div>
        </div>
      </>
    );
  }
}

export default ExpenseIncomeDisplay;
