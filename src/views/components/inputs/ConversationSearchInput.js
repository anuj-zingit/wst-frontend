import React, {Component} from 'react';
import {Form,} from "react-bootstrap";

class ConversationSearchInput extends Component {

    render() {
        const props = this.props;
        return (

            <Form.Group controlId="formGroupEmail" className={props.class}>
                {props.label &&
                <Form.Label>{props.label}</Form.Label>
                }
                <Form.Control autoComplete={'off'} onChange={props.onChange} value={this.props.value} placeholder={props.placeholder}/>
                

                {props.searching &&
                <span className="loadingfor-contact">
                    <img src='../../../images/icons/loading1.gif'/>
                </span>}
                {props.error &&
                <span className="err-input">{props.error}</span>
                }
            </Form.Group>
        );
    }
}

export default ConversationSearchInput;
