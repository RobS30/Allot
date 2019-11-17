import React from "react";
import axios from "axios";
// import {Chart, Component} from 'react-google-charts';

class GraphComponent extends React.Component {
  state = {
    incomes: [],
    expenses: []
  };

  componentDidMount() {
    
  }

  handleSubmit = e => {
    e.preventDefault();

    const { name, value, category, frequency } = e.target;

    let user = {};
    if (localStorage.getItem("user")) {
      user = JSON.parse(localStorage.getItem("user"));
    }
    const income = {
      name: name.value,
      category: category.value,
      value: value.value,
      frequency: frequency.value,
      email: user.email
    };
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    axios
      .post("/api/incomes", income)
      .then(res => {
        console.log(res.data.length);
        this.setState({
          incomes: res.data
        });
      })
      .catch(error => {
        console.log("error", error);
        if (error.response.status === 401) {
          this.props.history.push("/login");
        }
      });
  };

  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">Graph One Goes Here
              {/* <Component
                initialState={{
                  chartEditor: null,
                  chartWrapper: null,
                  google: null
                }}
              >
                {component => {
                  return (
                    <div>
                      <button
                        onClick={() => {
                          const {
                            google,
                            chartEditor,
                            chartWrapper
                          } = component.state;
                          if (
                            chartWrapper === null ||
                            google === null ||
                            chartEditor === null
                          )
                            return;
                          chartEditor.openDialog(chartWrapper);
                          google.visualization.events.addListener(
                            chartEditor,
                            "ok",
                            () => {
                              const newChartWrapper = chartEditor.getChartWrapper();
                              newChartWrapper.draw();
                              const newChartOptions = newChartWrapper.getOptions();
                              const newChartType = newChartWrapper.getChartType();
                              console.log(
                                "Chart type changed to ",
                                newChartType
                              );
                              console.log(
                                "Chart options changed to ",
                                newChartOptions
                              );
                            }
                          );
                        }}
                      >
                        Edit data
                      </button>
                      <Chart
                        width={"600px"}
                        height={"400px"}
                        chartType="ScatterChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                          ["Age", "Weight"],
                          [8, 12],
                          [4, 5.5],
                          [11, 14],
                          [4, 5],
                          [3, 3.5],
                          [6.5, 7]
                        ]}
                        options={{
                          title: "Age vs. Weight comparison",
                          hAxis: { title: "Age", minValue: 0, maxValue: 15 },
                          vAxis: { title: "Weight", minValue: 0, maxValue: 15 },
                          legend: "none"
                        }}
                        rootProps={{ "data-testid": "1" }}
                        getChartEditor={({
                          chartEditor,
                          chartWrapper,
                          google
                        }) => {
                          component.setState({
                            chartEditor,
                            chartWrapper,
                            google
                          });
                          console.log("Get Chart Editor");
                        }}
                        chartPackages={["corechart", "controls", "charteditor"]}
                      />
                    </div>
                  );
                }}
              </Component> */}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 mt-4">Graph Two Goes Here</div>
          </div>
        </div>
      </>
    );
  }
}

export default GraphComponent;
