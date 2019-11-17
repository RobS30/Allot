import React from "react";
import "./Expense.css";
import { FaTrash } from "react-icons/fa";

class ExpenseComponent extends React.Component {
  render() {
    return (
      <React.Fragment>
        <tbody>
          <tr className="table-data">
            <td>{this.props.name}</td>
            <td>{this.props.value}</td>
            <td>{this.props.category}</td>
            <td>{this.props.frequency}</td>
            <td onClick={this.props.handleClick} className="icon-style"><FaTrash /></td>
          </tr>
        </tbody>
        {/* <div className="col">{this.props.name}</div>
          <div className="col">{this.props.value}</div>
          <div className="col">{this.props.category}</div>
          <div className="col">{this.props.frequency}</div>
        </div> */}
      </React.Fragment>
    );
  }
}

export default ExpenseComponent;
