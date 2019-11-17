import React from 'react';
import axios from "axios";


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
                <p>Networth: {this.state.networth}</p>
                <p>Total income: {this.state.totalIncome}</p>
                <p>Total Expenses: {this.state.totalExpenses}</p>
                <p>Total Interest: {this.state.totalInterest}</p>

            </>
        );
    }
}

export default KeyMetricsChart;