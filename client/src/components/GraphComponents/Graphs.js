import React from "react";
import axios from "axios";

class GraphComponent extends React.Component {
  state = {
    incomes: [],
    expenses: []
  };

  componentDidMount() {
    let user = {};
    if (localStorage.getItem("user")) {
      user = JSON.parse(localStorage.getItem("user"));
    }
    axios.get("/api/expenes/" + user.email).then(res => {
      console.log(res.data.length);
      this.setState({
        expenses: res.data
      });
    });

    axios.get("/api/incomes/" + user.email).then(res => {
      console.log(res.data.length);
      this.setState({
        incomes: res.data
      });
    });
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
            <div className="col-lg-12">Graph One Goes Here</div>
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
