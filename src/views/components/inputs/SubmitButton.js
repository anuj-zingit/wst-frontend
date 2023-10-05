import React from 'react'
import {Button} from "react-bootstrap";

const SubmitButton = (props) => {
    let image_url = "../../../../images/";
    if (props.loading) {
        return (
            <Button className={props.className} variant="primary" type="button">
                Loading...
            </Button>
        )
    }
    return (
        <Button onClick={props.onSubmit}  className={props.className} variant="primary" type="button">
            <div className='d-flex justify-content-center'>
            <img src={image_url + "loginArrow.svg"} alt='loginArrow'/>
           <span>Login</span>
            </div>        
        </Button>
    )
};

export default SubmitButton;
