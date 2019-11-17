import React from "react";
import axios from "axios";
import StudentLoanForm from "./LoanForm";
import StudentLoanComponent from "./LoanComponent";
import "./studentloan.css";

class StudentLoansComponent extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      studentLoans: []
    };
  }

  componentDidMount() {
    this._isMounted = true;

    let user = {};
    if (sessionStorage.getItem("user")) {
      user = JSON.parse(sessionStorage.getItem("user"));
    }
    axios.defaults.headers.common["Authorization"] = sessionStorage.getItem(
      "jwtToken"
    );
    axios.get("/api/studentLoans/" + user.id).then(res => {
      if (this._isMounted && Array.isArray(res.data)) {
        console.log("studentLoans:", res.data);
        this.setState({
          studentLoans: res.data
        });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleSubmit = e => {
    e.preventDefault();

    const { name, value, interest } = e.target;

    let user = {};
    if (sessionStorage.getItem("user")) {
      user = JSON.parse(sessionStorage.getItem("user"));
    }
    const studentLoans = {
      name: name.value,
      value: value.value,
      interest: interest.value,
      id: user.id
    };
    axios.defaults.headers.common["Authorization"] = sessionStorage.getItem(
      "jwtToken"
    );
    axios
      .post("/api/studentLoans", studentLoans)
      .then(res => {
        if (this._isMounted && Array.isArray(res.data)) {
          this.setState({
            studentLoans: res.data
          });
        }
      })
      .catch(error => {
        console.log("error", error);
        if (error.response.status === 401) {
          this.props.history.push("/login");
        }
      });
  };

  render() {
    return (
      <>
        <div className="row">
          <div className="col-lg-12">
            <h2>Add Student Loan</h2>
            <div>
              <div className="row">
                <table className="mb-2 loan-table">
                  <thead>
                    <tr>
                      <th>Loan</th>
                      <th>Amount</th>
                      <th>Interest</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  {this.state.studentLoans.map((studentLoans, index) => {
                    return (
                      <StudentLoanComponent
                        key={index}
                        name={studentLoans.name}
                        value={studentLoans.value}
                        interest={studentLoans.interest}
                      />
                    );
                  })}
                </table>
              </div>
            </div>
          </div>

          <div>
            <StudentLoanForm handleSubmit={this.handleSubmit} />
          </div>
        </div>
      </>
    );
  }
}

export default StudentLoansComponent;
