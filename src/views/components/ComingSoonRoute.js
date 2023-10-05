import React from "react";
import {Route} from "react-router-dom";
import ComingSoon from "../main/ComingSoon/ComingSoon";

const ComingSoonRoute = ({ component: Component }) => {
    return (
        <Route
            render={(props) => (
                <div >
                    <Route exact path="/comingsoon" component={ComingSoon} />
                </div>
            )}
        />
    );
};

export default ComingSoonRoute;
