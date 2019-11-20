import React from "react";
import axios from "axios";
import "./graphs.css";
import AmortizationChart from "./amort_time_series/studentloanamortization";
import KeyMetricsChart from "./key_metrics/keyMetricsComponent";
import ExpenseCategoryPie from "./expenses_by_category_pie/expenseCategoryPieComponent";
import NetIncomeBarComponent from "./net_income/netincomecomponent";

class GraphComponent extends React.Component {
  state = {
    incomes: [],
    expenses: []
  };

  componentDidMount() {}

  render() {
    return (
      <>
        <div className="graphs-display mb-2">
          <div className="row">
            <div className="col-lg-3 graph-components d-flex justify-content-center">
              <KeyMetricsChart />
            </div>
            <div className="col-lg-8 graph-components d-flex justify-content-center">
              <ExpenseCategoryPie />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-11 mt-4 mr-2 graph-components d-flex justify-content-center">
              <NetIncomeBarComponent />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-11 mt-4 mr-2 graph-components d-flex justify-content-center mb-4">
              <AmortizationChart />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default GraphComponent;
