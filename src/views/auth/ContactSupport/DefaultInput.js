import React from 'react';
import { Form } from "react-bootstrap";

const DefaultInput = (props) => {

    return (
        <Form.Group controlId="formBasicEmail" className="simple-input-box">
            <div className={`simple-input ${props.errors && 'error'}`}>
                <input
                    className={props.className}
                    type={props.type}
                    placeholder={props.placeholder}
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange}
                    id={props.id}
                />
                {props.icon &&
                    <img src={props.icon} alt="Icon" />
                }
                {props.text &&
                    <span onClick={props.onClick}>{props.text}</span>
                }
            </div>
            <span className="validation-error" >{props.errors}</span>
        </Form.Group>
    )
}

export default DefaultInput;