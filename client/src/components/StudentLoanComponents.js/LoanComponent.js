import React from "react";

class StudentLoanComponent extends React.Component {
  render() {
    return (
      <React.Fragment>
        <tbody>
          <tr className="table-data">
            <td>{this.props.name}</td>
            <td>{this.props.value}</td>
            <td>{this.props.interest}</td>
          </tr>
        </tbody>
      </React.Fragment>
    );
  }
}

export default StudentLoanComponent;
