import React from "react";
import ExpenseInputs from "./ExpenseComponents/ExpenseInputs";
import IncomeInputs from "./IncomeComponents/IncomeInputs";

class ExpenseIncomeDisplay extends React.Component {
  render() {
    return (
      <>
        <div className="row">
          <div className="col-lg-12">Expenses Will Display Here<ExpenseInputs /></div>
        </div>
        <div className="row">
          <div className="col-lg-12">Income will display here <IncomeInputs /></div>
        </div>
      </>
    );
  }
}
