import React from "react";

class IncomeInput extends React.Component {
  render() {
    return (
      <div>
        <div>
          <span>{this.props.name}</span>
          <span>{this.props.value}</span>
          <span>{this.props.category}</span>
          <span>{this.props.frequency}</span>
        </div>
      </div>
    );
  }
}

export default IncomeInput;
