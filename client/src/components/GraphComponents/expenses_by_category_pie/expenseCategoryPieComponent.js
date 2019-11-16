import React from "react";
import axios from 'axios';
import Chart from 'react-google-charts';

class expensecategorypie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: []
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
    
    axios.get('/api/expensechart' + id).then(function(res){
    // this needs to be updated to pull categories along with the number of times they occur       
      let data = (res.data.balances, res.data.rate);
      this.setState({
        chartData: data
      });
    })
  }

render() {
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
</button>
<Chart
  width={'500px'}
  height={'300px'}
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={[
    this.state.chartData
    // data needs to be in a category and then total category expense/totalexpenses
    // ['Task', 'Hours per Day'],
    // ['Work', 11],
    // ['Eat', 2],
    // ['Commute', 2],
    // ['Watch TV', 2],
    // ['Sleep', 7],
  ]}
  options={{
    title: 'Expenses by Category',
  }}
  rootProps={{ 'data-testid': '1' }}
/>
</div>
    );
  }
}


