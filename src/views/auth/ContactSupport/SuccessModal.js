import React from "react";
import { Link } from "react-router-dom";

const SuccessModal = (props) => {
    return (

        <>
            <>
                <div class="alert alert-success" role="alert">
                <img alt="success-icon" src="../../../../images/list-point.svg" />
                    Submit Successfull
                </div>
                {/* <div className="sucess-header">
                    <img alt="success-icon" src="../../../../images/list-point.svg" />
                </div>
                <div className="success-message-text">Submit Successfull</div> */}
            </>

            <div className="close-buton for-success">
                <Link to="/" onClick={props.onClose}>Close</Link>
            </div>
        </>

    );
};

export default SuccessModal;