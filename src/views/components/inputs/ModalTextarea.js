import React, {Component} from 'react';
import {Form} from "react-bootstrap";

class ModalTextarea extends Component {

    render() {
        return (
            <Form.Group controlId={this.props.id}>
                <Form.Label>{this.props.label}</Form.Label>
                <Form.Control as="textarea" rows="3"/>
            </Form.Group>
        );
    }
}

export default ModalTextarea;
