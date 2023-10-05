import React from 'react';
import SupportHeader from "./components/SupportHeader";
import {Link} from "@material-ui/core";
import {Button} from "react-bootstrap";

const ContactSupport =(props)=> {

    return (
        <>
            <SupportHeader/>
            <div className="contact-support-broadcaste">
                <div className="container d-flex align-items-center justify-content-center h-100">
                    <div className="row">
                        <div className="support-info">
                            <img
                                src="../../../../images/support-icon.svg"
                                alt={"Support Icon"}
                            />
                            <h4 className="mt-4"> Contact Support </h4>
                            <div className="mt-4 Open-ticket-button">
                                <Button>Open Ticket</Button>
                            </div>
                            <span className="mt-4 ">
                              Your account is currently not on the new Z2 integration platform
                              and the Broadcaster is not available. To see if you are eligible
                              for the Z2 update, please contact our Support team. The update may
                              be at no additional cost to you.</span>
                            <div className="mt-4 w-100 ">
                                <span>Please email Zingit support</span>
                                <Link>support@zingitsolutions.com </Link>
                                <span>or give a call at</span>
                                <Link>866-587-5572</Link>
                                <span>for assistance.</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContactSupport;