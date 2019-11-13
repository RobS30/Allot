import React from "react";

class ExpenseComponent extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col">{this.props.name}</div>
          <div className="col">${this.props.value}</div>
          <div className="col">{this.props.category}</div>
          <div className="col">{this.props.frequency}</div>
        </div>
      </div>
    );
  }
}

export default ExpenseComponent;
