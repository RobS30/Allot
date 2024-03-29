import React from "react";
import axios from "axios";
import Chart from "react-google-charts";

class ExpenseCategoryPie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: []
    };
  }

  componentDidMount() {
    window.addEventListener("expenses-changed", e => {
      console.log("expenses changed! Update ExpenseCategoryPie", e);
      this.getExpenseChart();
    });    

    this.getExpenseChart();
  }

  getExpenseChart() {
    let user = {};
    if (sessionStorage.getItem("user")) {
      user = JSON.parse(sessionStorage.getItem("user"));
    }
    axios.defaults.headers.common["Authorization"] = sessionStorage.getItem(
      "jwtToken"
    );


    axios.get("/api/expensechart/" + user.id).then(res => {
      // this needs to be updated to pull categories along with the number of times they occur
      if (!res.data[1]) {
        this.setState({
          chartData: []
        });
      } else {
        let tempData = [["Expense", "%"]];
        for (let i = 0; i < res.data[1].length; i++) {
          let arr = [];
          arr.push(res.data[1][i][0]);
          arr.push(parseInt(res.data[1][i][1]));
          tempData.push(arr);
        }
        //console.log('tempData:',tempData)
        this.setState({
          chartData: tempData
        });
      }
    }).catch(function (error) {
      // handle error
      // unauthorized
      if (error.response.status === 401) {
        window.dispatchEvent(new CustomEvent("unauthorized"));
      }
    })
  }
  

  render() {
    return (
      <div>
      {this.state.chartData.length > 0 ? (
        <Chart
          width={'600px'}
          height={'300px'}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={this.state.chartData ? this.state.chartData : []}
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
            titleTextStyle: {color: '#fff', fontSize: 20},
            backgroundColor: { fill:'transparent' },
            legend: { textStyle: { color: "white", fontSize: 16 } },
            slices: {
              0: { color: "#4D58FF" },
              1: { color: "#99A0FF" },
              2: { color: "#4D58FF" },
              3: { color: "#4D5080" },
              4: { color: "#3D47CC" },
              5: { color: "#3942BF" },
              6: { color: "#262C80" },
              7: { color: "#131640" },
              8: { color: "#131640" },
              9: { color: "#5D3AE8" }
            }
          }}
          rootProps={{ "data-testid": "1" }}
        />
      ) : (
        <div></div>
      )}
      </div>
    );
  }
}

export default ExpenseCategoryPie;
