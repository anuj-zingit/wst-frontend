import React, { Component } from "react";
import { Form } from "react-bootstrap";

class ModalInput extends Component {
  render() {
    return (
      <Form.Group controlId={this.props.id} className={this.props.md}>
        <Form.Label>{this.props.label}</Form.Label>
        <Form.Control 
        className= {!!this.props.error ? "error" : ''}
          readOnly={this.props.readOnly}
          onChange={this.props.handleInputChange}
          value={this.props.value}
          type={this.props.type}
          placeholder={this.props.placeholder}
        />
        {!!this.props.error && (
          
          <span className="error-text">{this.props.error}</span>
          
        )}
      </Form.Group>
    );
  }
}

export default ModalInput;
