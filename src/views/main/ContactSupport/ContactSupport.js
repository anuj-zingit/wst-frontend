import React from 'react';
import SupportHeader from "./components/SupportHeader";
import {Link} from "@material-ui/core";

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
                                alt={"png"}
                            />
                            <h4 className="mt-4"> Contact Support </h4>
                            <div className="mt-4 Open-ticket-button">
                                <Link href="https://zingitsolutions.freshdesk.com/support/home"  target="_blank" style={{ backgroundColor: "grey" }}>Help Center</Link>
                            </div>
                            <span className="mt-4 ">
                            Every Zingit client can depend on our world-class customer support. We’re here for you, and we’re dedicated to providing you
                             with an exceptional and seamless experience.</span>
                             <span className="mt-3 ">Our ticketing system is the easiest way to get the support you need. You can access self-service support through our Help Center.</span>
                            <div className="mt-4 w-100 ">
                                <span>Please email Zingit support</span>
                                <Link href="mailto:support@zingitsolutions.com">support@zingitsolutions.com </Link>
                                <span>or give a call at</span>
                                <Link href="tel:866-587-5572">866-587-5572</Link>
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