import React from "react";
import axios from 'axios';
import Chart from 'react-google-charts';
import {amort} from "./loanamortization/index";

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
    axios.get('/api/studentLoans/' + user.id).then(res => {
      // balances
      // avg interest rate

      let data = amort(res.data.balances, res.data.rate, 20);
      this.setState({
        chartDtata: data
      });

    })

  }

  render() {
    //const initialState={{ chartEditor: null, chartWrapper: null, google: null }}

    return (
      <div>
        <Chart
          width={"600px"}
          height={"350px"}
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
            this.setState({ chartEditor, chartWrapper, google });
            console.log("Get Chart Editor");
          }}
          chartPackages={["corechart", "controls", "charteditor"]}
        />
      </div>
    );
  }
}

export default AmortizationChart;