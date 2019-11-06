import React from "react";

export function DisplayLayout(props) {
    return (
      
        <div className="container">
        <div className="row">
          <div className="col-md-3">
            This is where the expense and income info will display.
          </div>
          <div className="col-md-9">
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