import React from "react";
import {Route} from "react-router-dom";
import ApplicationTool from "../main/Tools/ApplicationTool";

const ApplicationRoute = ({ component: Component }) => {
    return (
        <Route
            render={(props) => (
                <div >
                    <Route exact path="/applicationtool" component={ApplicationTool} />
                </div>
            )}
        />
    );
};

export default ApplicationRoute;
