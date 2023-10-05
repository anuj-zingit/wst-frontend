import React from 'react';
import {Button} from "react-bootstrap";

const DefaultButton =(props)=> {

        if (props.loading) {
            return (
                <Button className="defalut-loading-button" variant="primary" type="button">
                    <img src="../../../../images/white-loader.gif" alt="Loader" />
                    {props.loaderText}
                </Button>
            )
        }
        return (
            <Button onClick={props.onClick} value={props.value}  className={props.butonClass} variant="primary" type="button">
                {props.name}
            </Button>
        )

};

export default DefaultButton;