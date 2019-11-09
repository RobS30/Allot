import React from "react";

import IncomeInput from "./IncomeInput";
import IncomeButton from "./AddIncomeInputButton";

class IncomeInputs extends React.Component {

  state = {
    incomes: []
  }

  componentDidMount() {
    // get all expenses from DB
  }

  render() {
    return (
      <>
      <div className="row">
        <div className="col-lg-12">
          {
            this.incomes.map(income => {
              // add other props here
              return <IncomeInput name = {income.name} category={income.category} value={income.value}  />
            })
          }
        </div>
      </div>
      <div>
        <IncomeButton />
      </div>
      </>
    )
  }
}

export default IncomeInputs;
