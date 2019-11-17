import React from "react";
import axios from 'axios';
import Chart from 'react-google-charts';
import amort from "../../../loanamortization/index";

class AmortizationChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      balances: 0,
      rate: 0
    };
  }

  componentDidMount() {
    
    let user = {};
    if (sessionStorage.getItem("user")) {
      user = JSON.parse(sessionStorage.getItem("user"));
    }
    axios.defaults.headers.common["Authorization"] = sessionStorage.getItem(
      "jwtToken"
    );

    axios.get('/api/studentLoans' + id).then(function(res){
      // balances
      // avg interest rate
      
      let data = amort(res.data.balances, res.data.rate, years);
      this.setState({
        chartData: data
      });

    })

  }

  render() {
    //const initialState={{ chartEditor: null, chartWrapper: null, google: null }}

    return (
      <div>
        <button
          onClick={() => {
            const { google, chartEditor, chartWrapper } = component.state;
            if (
              chartWrapper === null ||
              google === null ||
              chartEditor === null
            )
              return;
            chartEditor.openDialog(chartWrapper);
            google.visualization.events.addListener(chartEditor, "ok", () => {
              const newChartWrapper = chartEditor.getChartWrapper();
              newChartWrapper.draw();
              const newChartOptions = newChartWrapper.getOptions();
              const newChartType = newChartWrapper.getChartType();
              console.log("Chart type changed to ", newChartType);
              console.log("Chart options changed to ", newChartOptions);
            });
          }}
        >
      Edit data
        </button>
        <Chart
          width={"600px"}
          height={"400px"}
          chartType="ScatterChart"
          loader={<div>Loading Chart</div>}
          data={this.state.chartData}
          options={{
            title: "Loan Amortization",
            hAxis: { title: "months", minValue: 0, maxValue: 15 },
            vAxis: { title: "loan balance", minValue: 0, maxValue: 15 },
            legend: "none"
          }}
          rootProps={{ "data-testid": "1" }}
          getChartEditor={({ chartEditor, chartWrapper, google }) => {
            component.setState({ chartEditor, chartWrapper, google });
            console.log("Get Chart Editor");
          }}
          chartPackages={["corechart", "controls", "charteditor"]}
        />
      </div>
    );
  }
}