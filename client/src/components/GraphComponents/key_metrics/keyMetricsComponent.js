import React from 'react';
import axios from "axios";
// examples from LoanComponent.js
// import StudentLoanForm from "./LoanForm";
// import StudentLoanComponent from "./LoanComponent";

import { emptyStatement } from '@babel/types';
class ExpenseChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            networth: "",
            totalIncome: "",
            totalExpences: "",
            studentLoan: "",

        }
    }
    componentDidMount() {

        let user = {};
        if (sessionStorage.getItem("user")) {
            user = JSON.parse(sessionStorage.getItem("user"));
        }
        axios.defaults.headers.common["Authorization"] = sessionStorage.getItem(
            "jwtToken"
        );
        axios.get('/api/networth' + user.id).then(function (res) {
            this.setState({
                networth: res.data.networth,
                totalIncome: res.data.totalIncome,
                totalExpences: res.data.totalExpences,
                studentLoan: res.data.studentLoan,
            });
        })


    }
    render() {
        return (
            <>
                <p>Networth: {this.state.networth}</p>
                <p>Total income: {this.state.totalIncome}</p>
                <p>Total Expences: {this.state.totalExpences}</p>
                <p>Total Interest: {this.state.studentLoan}</p>

            </>
        );
    }
}