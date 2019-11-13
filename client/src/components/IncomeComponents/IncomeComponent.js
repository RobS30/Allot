import React from "react";

class IncomeInput extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col">{this.props.name}</div>
          <div className="col">{this.props.value}</div>
          <div className="col">{this.props.frequency}</div>
        </div>
      </div>
    );
  }
}

export default IncomeInput;
