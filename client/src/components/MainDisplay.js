import React from "react";
import ExpenseIncomeDisplay from "./ExpenseIncomeDisplay";

export function DisplayLayout(props) {
    return (
      
        <div className="container">
        <div className="row">
          <div className="col-lg-3">
            This is where the expense and income info will display.
          </div>
          <div className="col-lg-9">
            This is where the graphs will display.
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