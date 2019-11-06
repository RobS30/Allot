import React from "react";

class ExpenseInput extends React.Component {
  render() {
    return (
      <div>
        <div>
          <span>{this.props.name}</span>
        </div>
      </div>
    );
  }
}

export default ExpenseInput;
