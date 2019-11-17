import React from "react";
import axios from 'axios';
import Chart from 'react-google-charts';

class ExpenseCategoryPie extends React.Component {
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

    axios.get('/api/expensechart/' + user.id).then(res => {
      // this needs to be updated to pull categories along with the number of times they occur       
      
      let tempData = [['Expense', '%']];
      for (let i=0; i<res.data[1].length; i++) {
        let arr = [];
        arr.push(res.data[1][i][0])
        arr.push(parseInt(res.data[1][i][1]))
        
        tempData.push(arr);
      }
      //console.log('tempData:',tempData)
      this.setState({
        chartData: tempData
      });
    })
  }

  render() {
    return (
      <div>

        <Chart
          width={'300px'}
          height={'300px'}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={this.state.chartData}
          //   // data needs to be in a category and then total category expense/totalexpenses
          //   ['Expense', '%'],
          //   ['Work', 11],
          //   ['Eat', 2],
          //   ['Commute', 2],
          //   ['Watch TV', 2],
          //   ['Sleep', 7],
          // // ]}
          options={{
            title: 'Expenses by Category',
          }}
          rootProps={{ 'data-testid': '1' }}
        />
      </div>
    );
  }
}

export default ExpenseCategoryPie;
