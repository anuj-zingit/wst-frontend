import React from "react";
import {Button} from "@material-ui/core";

const SuccessModal = (props) => {
    const { onClose,message } = props;
    return (

            <>
                    <>
                        <div className="sucess-header">
                            <img src="../../../../images/icons/sucess-icon.png"/>
                        </div>
                        <div className="success-message-text">{message}</div>
                    </>

                <div className="close-buton ">
                    <Button onClick={onClose}>Close</Button>
                </div>
            </>

    );
};

export default SuccessModal;
