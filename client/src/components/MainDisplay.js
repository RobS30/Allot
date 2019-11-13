import React from "react";
import ExpenseIncomeDisplay from "./ExpenseIncomeDisplay";
import GraphComponent from "./GraphComponents/Graphs";

function MainDisplay(props) {
    return (
     
        <div className="container mt-4">
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
            Additional Information if we want will display here.
          </div>
          <div className="col-md-6">
          Additional Information if we want will display here.
          </div>
          
        </div>
      </div>  
      
    );
  }

  export default MainDisplay;