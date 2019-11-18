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

  handleSubmit = e => {
    e.preventDefault();

    const { name, value, category, frequency } = e.target;

    let user = {};
    if (localStorage.getItem("user")) {
      user = JSON.parse(localStorage.getItem("user"));
    }
    const income = {
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
      .post("/api/incomes", income)
      .then(res => {
        console.log(res.data.length);
        this.setState({
          incomes: res.data
        });
      })
      .catch(error => {
        console.log("error", error);
        if (error.response.status === 401) {
          this.props.history.push("/login");
        }
      });
  };

  render() {
    return (
      <>
        <div className="graphs-display mb-2">
          <div className="row">
            <div className="col-lg-3 mr-4 graph-components d-flex justify-content-center">
              <KeyMetricsChart />
            </div>
            <div className="col-lg-8 graph-components d-flex justify-content-center">
              <ExpenseCategoryPie />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-11 mt-4 graph-components d-flex justify-content-center">
              <NetIncomeBarComponent />
            </div>
            </div>
            <div className="row">
              <div className="col-lg-11 mt-4 graph-components d-flex justify-content-center mb-4">
                <AmortizationChart />
              </div>
            </div>
          </div>
        
      </>
    );
  }
}

export default GraphComponent;
