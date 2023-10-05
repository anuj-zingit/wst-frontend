import React, {Component} from 'react';
import {Button} from "react-bootstrap";

class DefaultButton extends Component {

    render() {
        const props = this.props;
        return (
            <>
                {props.loading === true ?
                    <div className={props.class}>
                        <img width="25px" src="../../../../images/icons/loading1.gif" />
                    </div>
                    :
                    <Button type={props.type} disabled={props.disabled} onClick={props.onClick} className={props.class}>{props.name}</Button>
                }
            </>
        );
    }
}

export default DefaultButton;
