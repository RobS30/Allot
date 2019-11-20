import React from "react";
import axios from "axios";
import Chart from "react-google-charts";
import { amort } from "./loanamortization/index";

class AmortizationChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartDtata: [],
      balances: 0,
      rate: 0
    };
  }

  componentDidMount() {
    window.addEventListener("loans-changed", e => {
      console.log("loans changed! Update AmortizationChart", e);
      this.getAmortizationChart();
    });

    this.getAmortizationChart();
  }

  getAmortizationChart() {
    let user = {};
    if (sessionStorage.getItem("user")) {
      user = JSON.parse(sessionStorage.getItem("user"));
    }
    axios.defaults.headers.common["Authorization"] = sessionStorage.getItem(
      "jwtToken"
    );
    axios.get("/api/studentLoansChart/" + user.id).then(res => {
      this.setState({
        chartDtata: res.data
      });
    });
  }

  render() {
    //const initialState={{ chartEditor: null, chartWrapper: null, google: null }}
    console.log('chartDtata', this.state.chartDtata.length)
    return (
      <div>
        <Chart
          width={"100%"}
          height={"100%"}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={this.state.chartData}
          options={{
            title: "Loan Payoff Schedule",
            textStyle: { color: "white", fontsize: 40, bold: true },
            hAxis: {
              title: "Months",
              // minValue: 0,
              // maxValue: 240,
              textStyle: { color: "#FFFFFF", fontsize: 20, bold: true }
            },
            vAxis: {
              title: "Balance",
              // minValue: 0,
              // maxValue: 50000,
              textStyle: { color: "#FFFFFF", fontsize: 18, bold: true }
            },
            series: {
              1: { curveType: "function" }
            },
            legend: "none",
            // background color for payoff schedule goes here
            backgroundColor: "#181818"
            // colors: ['#255']
          }}
          rootProps={{ "data-testid": "1" }}
          // getChartEditor={({ chartEditor, chartWrapper, google }) => {
          //   this.setState({ chartEditor, chartWrapper, google });
          //   console.log("Get Chart Editor");
          // }}
          // chartPackages={["corechart", "controls", "charteditor"]}
        />
        
      </div>
    );
  }
}

export default AmortizationChart;
