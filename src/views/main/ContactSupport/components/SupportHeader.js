import React from 'react';
import {Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

const SupportHeader =(props)=> {

    return (
        <>
            <header className={"header show"}>
                <div className="pcMenu">
                    <Navbar
                        bg="transparent"
                        variant="light"
                        className="justify-content-between  align-items-center"
                    >
                        <div className="all-screens-head">
                            <img
                                className="zingitlogo"
                                src="../../../../images/plan-zingit.svg"
                                alt="logo"
                            />
                            <span className="screen-name">SUITE </span>
                        </div>
                        <div className="new-head-right">
                            <Link to="/">Sign In</Link>
                        </div>
                    </Navbar>
                </div>
            </header>
        </>
    );
}

export default SupportHeader;