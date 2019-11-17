import React from "react";
import axios from 'axios';
import Chart from 'react-google-charts';

class NetIncomeBarComponent extends React.Component {
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

    axios.get('/api/cashflow/' + user.id).then(res => {
      // this needs to be updated to pull categories along with the number of times they occur       
      let temp = [['Month', 'Income', 'Expenses']];
      for (let i=0; i<res.data.length; i++){
        temp.push(res.data[i]);
      }
      console.log('cashflow', temp)
      this.setState({
        chartData: temp
      });
    })
  }

  render() {
    return (
      <div>
        <Chart
          width={'500px'}
          height={'300px'}
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={this.state.chartData
            // ['City', '2010 Population', '2000 Population'],
            // ['New York City, NY', 8175000, 8008000],
            // ['Los Angeles, CA', 3792000, 3694000],
            // ['Chicago, IL', 2695000, 2896000],
            // ['Houston, TX', 2099000, 1953000],
            // ['Philadelphia, PA', 1526000, 1517000],
          }
            //   data needs to be in this for
          // }
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

export default NetIncomeBarComponent;