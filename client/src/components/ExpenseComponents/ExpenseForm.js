import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import "./Expense.css";

class ExpenseForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      value: "",
      category: "",
      frequency: "",
      expenses: []
    };
  }
  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  render() {
    const { name, value, category, frequency } = this.state;
    return (
      <Form onSubmit={this.props.handleSubmit}>
        <Row className="mb-2">
          <Col>
            <Form.Label>Expense Name</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              className="form-control"
              placeholder="Loan"
              name="name"
              value={name}
              onChange={this.onChange}
              required
            />
          </Col>
          <Col>
          <Form.Label>Amount</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              className="form-control"
              placeholder="$4,000"
              name="value"
              value={value}
              onChange={this.onChange}
              required
            />
          </Col>
          <Col>
          <Form.Label>Category</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              className="form-control"
              placeholder="School"
              name="category"
              value={category}
              onChange={this.onChange}
              required
            />
          </Col>
          <Col>
          <Form.Label htmlFor="inputFrequency" >Frequency</Form.Label>
            <Form.Control size="sm" as="select"
             value={frequency} 
             onChange={this.onChange}
             name="frequency"
             id="sel1"
            >
              <option value="monthly">Monthly</option>
              <option value="bi-monthly">Bi-Monthly</option>
              <option value="annual">Annual</option>
              <option value="semi-annual"> Semi-Annual</option>
            </Form.Control>
          </Col>
        </Row>
        <Button className="d-flex justify-content-center" variant="primary" type="submit">
          Add Expense
        </Button>
      </Form>
    );
  }
}

export default ExpenseForm;
