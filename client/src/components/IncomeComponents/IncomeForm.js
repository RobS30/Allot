import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import "./Income.css";

class IncomeForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      value: "",
      frequency: "",
      incomes: []
    };
  }
  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  render() {
    const { name, value, frequency } = this.state;
    return (
      <Form onSubmit={this.props.handleSubmit}>
        <Row className="mb-2 mt-2">
          <Col className="mr-1">
            <Form.Label>Income Name</Form.Label>
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
          <Col className="mr-1">
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
          <Col className="mr-1">
            <Form.Label>Frequency</Form.Label>
            <Form.Control
              size="sm"
              as="select"
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
        <Button
          className="d-flex justify-content-center mt-2"
          variant="primary"
          type="submit"
        >
          Add Income
        </Button>
      </Form>
    );
  }
}

export default IncomeForm;
