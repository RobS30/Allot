import React from "react";
import "./Income.css";

class IncomeInput extends React.Component {
  render() {
    return (
      <React.Fragment>
        <tr className="table-data">
          <td>{this.props.name}</td>
          <td>{this.props.value}</td>
          <td>{this.props.frequency}</td>
        </tr>
      </React.Fragment>
    );
  }
}

export default IncomeInput;
