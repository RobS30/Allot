import React from "react";
import ExpenseIncomeDisplay from "./ExpenseIncomeDisplay";
import GraphComponent from "./GraphComponents/Graphs";

function MainDisplay(props) {
  return (
    <div className="main-display">
      <div className="container-fluid mt-4 ml-2">
        <div className="row">
          <div className="col-lg-4">
            <ExpenseIncomeDisplay />
          </div>
          <div className="col-lg-8">
            <GraphComponent />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            
          </div>
          <div className="col-md-6">
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainDisplay;
