import React from "react";

import IncomeComponent from "./IncomeComponent";
import IncomeForm from "./IncomeForm";

class IncomesComponent extends React.Component {

  state = {
    incomes: []
  };

  componentDidMount() {
    let user = {};
    if (localStorage.getItem("user")) {
      user = JSON.parse(localStorage.getItem("user"));
    }
    axios
    .get("/api/expenes/" + user.email)
    .then(res => {
      console.log(res.data.length);
      this.setState ({ 
        incomes: res.data
      })
    })

   }

  handleSubmit = e => {

    e.preventDefault();
    
    const {
      name,
      value,
      category,
      frequency
    } = e.target;

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
        this.setState ({ 
          incomes: res.data
        })
      })
      .catch(error => {
        console.log("error", error);
        if (error.response.status === 401) {
          this.props.history.push("/login");
        }
      });
  
  }

  render() {
    return (
      <>
        <div className="row">
          <div className="col-lg-12">
            {this.state.incomes.map(income => {
              
              return (
                <IncomeComponent
                  name={income.name}
                  category={income.category}
                  value={income.value}
                  frequency={income.frequency}
                />
              );
            })}
          </div>
        </div>

        <div>
          <ExpenseForm handleSubmit={this.handleSubmit} />
        </div>
      </>
    );
  }
}

export default IncomesComponent;
