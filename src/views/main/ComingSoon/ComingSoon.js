import React, { } from "react";
import { Navbar } from "react-bootstrap";


const ComingSoon = () => {

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
                            <span class="screen-name">Mobile Application</span>
                        </div>
                    </Navbar>
                </div>
            </header>
            <div className="page-content message-feed">
                <div className="float-left w-100 h-100">
                    <div className="container d-flex align-items-center justify-content-center h-100">
                        <div className="row">
                            <div className="tools-content-new">
                                <div className="coming-soon-content">
                                    <h5>Zingit Solutions </h5>
                                    <span>Coming soon with Mobile Application for Inbox.</span>
                                    <p>We’re coming soon with Mobile Application for both IOS and Android platforms, It will make it easy to communicate
                                         and schedule messages.</p>
                                </div>
                                <div className="aplications-images-new">
                                    <img src="../../../images/coming.svg" alt="Ios" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}



export default ComingSoon;