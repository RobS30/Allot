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
            <td id={this.props.id} onClick={() => this.props.handleClick(this.props.id)} className="icon-style"><FaTrash /></td>
          </tr>
        </tbody>        
      </React.Fragment>
    );
  }
}

export default ExpenseComponent;
