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
            <div className="col-lg">
              
            <div className="card" style={ {width: "18rem"} }>
               <div className="card-body">
                  <h5 className="card-title">Debt To Income Ratio</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                  <p className="card-text">
                   .4
                  </p>
                  <a href="#" className="card-link">
                    Link??
                  </a>
                </div>
              </div>

            </div>
            <div className="col-lg">

            <div className="card" style={ {width: "18rem"} }>
                <div className="card-body">
                  <h5 className="card-title">Expected Debt Short-Term</h5>
                  <h6 className="card-subtitle mb-2 text-muted">$35,000</h6>
                  <p className="card-text">
                   .4
                  </p>
                  <a href="#" className="card-link">
                    Link??
                  </a>
                </div>
              </div>

            </div>
            <div className="col-lg">

            <div className="card" style={ {width: "18rem"} }>
                <div className="card-body">
                  <h5 className="card-title">Expected Income Short-Term</h5>
                  <h6 className="card-subtitle mb-2 text-muted">$45,000</h6>
                  <p className="card-text">
                   .4
                  </p>
                  <a href="#" className="card-link">
                    Link??
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </>
    );
  }
}

export default GraphComponent;
