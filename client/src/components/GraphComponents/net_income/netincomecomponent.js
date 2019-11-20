import React from "react";
import axios from "axios";
import Chart from "react-google-charts";

class NetIncomeBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: []
    };
  }

  componentDidMount() {
    window.addEventListener("incomes-changed", e => {
      console.log("incomes changed! Update NetIncomeBarComponent", e);
      this.getCashFlow();
    });

    this.getCashFlow();
  }

   getCashFlow() {

    let user = {};
    if (sessionStorage.getItem("user")) {
      user = JSON.parse(sessionStorage.getItem("user"));
    }
    axios.defaults.headers.common["Authorization"] = sessionStorage.getItem(
      "jwtToken"
    );

    axios.get("/api/cashflow/" + user.id).then(res => {
      // this needs to be updated to pull categories along with the number of times they occur
      if (!res.data) {
        this.setState({
          chartData: []
        });
      }
      if (res.data.length > 0) {
        let temp = [["Month", "Income", "Expenses"]];
        for (let i = 0; i < res.data.length; i++) {
          temp.push(res.data[i]);
        }
        console.log("cashflow", temp);
        this.setState({
          chartData: temp
        });
      } else {
        this.setState({
          chartData: []
        });
      }
    });

  }

  render() {
    return (
      <div>
      {this.state.chartData.length > 0 ? (
        <Chart
          width={"600px"}
          height={"300px"}
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={this.state.chartData ? this.state.chartData : []}
          // data={
            // ['City', '2010 Population', '2000 Population'],
            // ['New York City, NY', 8175000, 8008000],
            // ['Los Angeles, CA', 3792000, 3694000],
            // ['Chicago, IL', 2695000, 2896000],
            // ['Houston, TX', 2099000, 1953000],
            // ['Philadelphia, PA', 1526000, 1517000],
          // }
          options={{
            title: "Monthly Cash Flow",
            textStyle:{color: '#fff'},
            legendTextStyle: {color: '#fff'},
            chartArea: { width: "50%" },
            titleTextStyle: {color: '#fff', fontSize: 20},
            backgroundColor: "#181818",
            hAxis: {
              title: "Income",
              titleTextStyle: {color: '#fff'},
              titleTextStyle: {color: '#fff', fontSize: 14},
              minValue: 0,
              textStyle:{color: '#fff'}
            },
            vAxis: {
              title: "Expenses",
              titleTextStyle: {color: '#fff'},
              titleTextStyle: {color: '#fff', fontSize: 14},
              textStyle:{color: '#fff'}
            }
          }}
          // For tests
          rootProps={{ "data-testid": "1" }}
        />
      ) : (
        <div></div>
      )}
      </div>
    );
  }
}

export default NetIncomeBarComponent;
