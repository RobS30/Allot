import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";


class StudentLoanForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      value: "",
      interest: "",
      studentLoans: []
    };
  }
  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  render() {
    const { name, value, interest } = this.state;
    return (
      <Form onSubmit={this.props.handleSubmit}>
        <Row className="mb-2">
          <Col>
            <Form.Label>Loan Name</Form.Label>
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
          <Form.Label>Interest</Form.Label>
            <Form.Control 
           size="sm"
           type="text"
           className="form-control"
           placeholder="12"
           name="interest"
           value={interest}
           onChange={this.onChange}
           required
         
          />
            
          </Col>
        </Row>
        <Button className="d-flex justify-content-center" variant="primary" type="submit">
          Add Loan
        </Button>
      </Form>
    );
  }
}

export default StudentLoanForm;
