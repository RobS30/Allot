import React from "react";

class StudentLoanComponent extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col">{this.props.name}</div>
          <div className="col">{this.props.value}</div>
          <div className="col">{this.props.interest}</div>
        </div>
      </div>
    );
  }
}

export default StudentLoanComponent;
