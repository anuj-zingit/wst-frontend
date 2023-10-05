import React, {Component} from 'react';
import {Form} from "react-bootstrap";

class DefaultSelectBox extends Component {

    render() {
        return (
            <Form.Group controlId={this.props.id} className={this.props.class}>
                <Form.Control as="select">
                    <option>{this.props.opt1}</option>
                    <option>{this.props.opt2}</option>
                </Form.Control>
            </Form.Group>
        );
    }
}

export default DefaultSelectBox;
