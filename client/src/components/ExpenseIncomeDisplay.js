import React from "react";
import ExpensesComponent from "./ExpenseComponents/ExpensesComponent";
import IncomesComponent from "./IncomeComponents/IncomesComponent";
import "./expenseIncome.css";
import StudentLoansComponent from "./StudentLoanComponents.js/LoansComponent";

class ExpenseIncomeDisplay extends React.Component {
  render() {
    return (
      <>
        <div className="income-expense-display">
          <div className="row">
            <div className="col-lg-12">
              <ExpensesComponent />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <IncomesComponent />
            </div>
          </div>
        </div>

        <div className="student-loan-display mt-4 mb-5">
          <div className="row">
            <div className="col-lg-12">
              <StudentLoansComponent />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ExpenseIncomeDisplay;
