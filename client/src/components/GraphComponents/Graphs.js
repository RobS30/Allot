import React from "react";
import axios from "axios";
import "./graphs.css";
import AmortizationChart from "./amort_time_series/studentloanamortization";
import KeyMetricsChart from "./key_metrics/keyMetricsComponent";

class GraphComponent extends React.Component {
  state = {
    incomes: [],
    expenses: []
  };

  componentDidMount() {
    let user = {};
    if (localStorage.getItem("user")) {
      user = JSON.parse(localStorage.getItem("user"));
    }
    axios.get("/api/expenes/" + user.email).then(res => {
      console.log(res.data.length);
      this.setState({
        expenses: res.data
      });
    });

    axios.get("/api/incomes/" + user.email).then(res => {
      console.log(res.data.length);
      this.setState({
        incomes: res.data
      });
    });
  }

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
        <div className="container">
          <div className="row">
            <div className="col-lg-3 mr-2 graph-components">
              
              Key Metrics Goes here
            
            </div>
            <div className="col-lg-8 graph-components">
              
              Graph one goes here
            
            </div>

          </div>
          <div className="row">
            <div className="col-lg-3 mr-2 mt-4 graph-components">
              
              Pie Chart Goes Here
              
              </div>

              <div className="col-lg-8 mt-4 graph-components">
              
              <AmortizationChart />
              
              </div>
          </div>
        </div>
      </>
    );
  }
}

export default GraphComponent;
