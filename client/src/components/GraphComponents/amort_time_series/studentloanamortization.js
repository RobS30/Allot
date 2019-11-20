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
    console.log('chartDtata', this.state.chartDtata)
    return (
      <div>
        <Chart
          width={"920px"}
          height={"380px"}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={this.state.chartDtata}
          options={{
            title: "Loan Payoff Schedule",
            titleTextStyle: {color: '#fff', fontSize: 20},
            chartArea: { width: "50%" },
            legendTextStyle: {color: '#fff'},
            textStyle: { color: "white", fontsize: 40, bold: true },
            lineWidth: 2,
            hAxis: {
              //scaleType: 'log',
              title: "Months",
              minValue: 0,
              //maxValue: 239,
              textStyle: { color: "#FFFFFF", fontsize: 20, bold: true },
              titleTextStyle: {color: '#fff', fontSize: 14}
            },
            vAxis: {
              title: "Balance",
              minValue: 0,
              //maxValue: 50000,
              titleTextStyle: {color: '#fff', fontSize: 14},
              textStyle: { color: "#FFFFFF", fontsize: 18, bold: true }
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
