import React from 'react';
import axios from "axios";
import "./keymetrics.css";


import { emptyStatement } from '@babel/types';
class KeyMetricsChart extends React.Component {
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
        axios.get('/api/networth/' + user.id).then(res => {
            this.setState({
                networth: res.data.networth,
                totalIncome: res.data.totalIncome,
                totalExpenses: res.data.totalExpenses,
                totalInterest: res.data.totalInterest,
            });
        })


    }
    render() {
        return (
            <>
                <h3 className="key-title">Networth: </h3>
                <p>${this.state.networth}</p>
                <h3 className="key-title">Total income: </h3>
                <p>${this.state.totalIncome}</p>
                <h3 className="key-title">Total Expenses: </h3>
                <p>${this.state.totalExpenses}</p>
                <h3 className="key-title">Total Interest: </h3>
                <p>${this.state.totalInterest}</p>

            </>
        );
    }
}

export default KeyMetricsChart;