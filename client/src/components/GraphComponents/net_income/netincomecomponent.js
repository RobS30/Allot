import React from "react";
import axios from 'axios';
import Chart from 'react-google-charts';

class netincomebar extends React.Component {
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
    
    axios.get('/api/expensechart/' + id).then(res => {
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
  chartType="BarChart"
  loader={<div>Loading Chart</div>}
  data={[
    this.state.chartData
    //   data needs to be in this for
    // ['City', '2010 Population', '2000 Population'],
    // ['New York City, NY', 8175000, 8008000],
    // ['Los Angeles, CA', 3792000, 3694000],
    // ['Chicago, IL', 2695000, 2896000],
    // ['Houston, TX', 2099000, 1953000],
    // ['Philadelphia, PA', 1526000, 1517000],
  ]}
  options={{
    title: 'Monthly Cash Flow',
    chartArea: { width: '50%' },
    hAxis: {
      title: 'Income',
      minValue: 0,
    },
    vAxis: {
      title: 'Expenses',
    },
  }}
  // For tests
  rootProps={{ 'data-testid': '1' }}
/>
</div>
    );
  }
}

