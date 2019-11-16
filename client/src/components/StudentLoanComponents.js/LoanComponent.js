import React from "react";

class StudentLoanComponent extends React.Component {
  render() {
    return (
      <React.Fragment>
        <tr className="table-data">
          <td>{this.props.name}</td>
          <td>{this.props.value}</td>
          <td>{this.props.interest}</td>
        </tr>
      </React.Fragment>
    );
  }
}

export default StudentLoanComponent;
