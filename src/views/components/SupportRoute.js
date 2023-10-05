import React from "react";
import {Route} from "react-router-dom";
import ContactSupport from "../main/ContactSupport/ContactSupport";
import ForgetPassword from "../auth/ContactSupport/ForgetPassword";
import GetVerificationCode from "../auth/ContactSupport/GetVerificationCode";
const SupportRoute = ({ component: Component }) => {
    return (
        <Route
            render={(props) => (
                <div >
                    <Route exact path="/support" component={ContactSupport} />
                    <Route exact path="/forgetpassword" component={ForgetPassword} />
                    <Route exact path="/getverificationCode" component={GetVerificationCode} />
                </div>
            )}
        />
    );
};

export default SupportRoute;
