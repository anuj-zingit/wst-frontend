import React from 'react';
import { Link } from "react-router-dom";

const SupportHeader = (props) => {

    return (
        <>
            <div className="header-workstation1">
                <div className="all-screens-head">
                    <img
                        className="zingitlogo"
                        src="../../../../images/plan-zingit.svg"
                        alt="Z-logo"
                    />
                    <span className="screen-name">Inbox </span>
                </div>
                <div className="head-right">
                    <Link to="/login">Sign in</Link>
                </div>
            </div>
        </>
    );
}

export default SupportHeader;