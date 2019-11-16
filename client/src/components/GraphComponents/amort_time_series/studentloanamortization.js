import React from "react";
import amort from "../../../loanamortization/index";
import axios from 'axios';

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

    let user = {};
    if (sessionStorage.getItem("user")) {
      user = JSON.parse(sessionStorage.getItem("user"));
    }
    axios.defaults.headers.common["Authorization"] = sessionStorage.getItem(
      "jwtToken"
    );
    axios.get('/api/studentLoans' + user.id).then(function (res) {
      // balances
      // avg interest rate

      let data = amort(res.data.balances, res.data.rate, years);
      this.setState({
        chartDtata: data
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
          data={this.state.chartDtata}
          options={{
            title: "Age vs. Weight comparison",
            hAxis: { title: "Age", minValue: 0, maxValue: 15 },
            vAxis: { title: "Weight", minValue: 0, maxValue: 15 },
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
