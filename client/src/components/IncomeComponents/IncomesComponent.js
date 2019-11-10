import React from "react";
import axios from "axios";
import IncomeComponent from "./IncomeComponent";
import IncomeForm from "./IncomeForm";

class IncomesComponent extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      incomes: []
    };
  }

  componentDidMount() {
    this._isMounted = true;

    let user = {};
    if (localStorage.getItem("user")) {
      user = JSON.parse(localStorage.getItem("user"));
    }
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    axios.get("/api/incomes/" + user.id).then(res => {
      if (this._isMounted && Array.isArray(res.data)) {
        console.log("incomes:", res.data);
        this.setState({
          incomes: res.data
        });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
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
      value: value.value,
      frequency: frequency.value,
      id: user.id
    };
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    axios
      .post("/api/incomes", income)
      .then(res => {
        if (this._isMounted && Array.isArray(res.data)) {
          this.setState({
            incomes: res.data
          });
        }
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
        <div className="row">
          <div className="col-lg-12">
            {this.state.incomes.map((income, index) => {
              return (
                <IncomeComponent
                  key={index}
                  name={income.name}
                  value={income.value}
                  frequency={income.frequency}
                />
              );
            })}
          </div>
        </div>

        <div>
          <IncomeForm handleSubmit={this.handleSubmit} />
        </div>
      </>
    );
  }
}

export default IncomesComponent;
