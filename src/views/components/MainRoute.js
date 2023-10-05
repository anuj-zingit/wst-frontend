import React from "react";
import { Route } from "react-router-dom";
import MessageFeed from "../main/messageFeed/MessageFeed";
import TokenValidator from "../auth/auth-HOC/auth-hoc";
import ComingSoon from "../main/ComingSoon/ComingSoon";

const MainRoute = ({ component: Component }) => {
  return (
    <Route
      render={(props) => (
        <div className="content-container">
          <TokenValidator>
            <div className="screens">
              {/* <Header /> */}
              <Route exact path="/feed" component={MessageFeed} />
              <Route exact path="/comingsoon" component={ComingSoon} />
            </div>
          </TokenValidator>
        </div>
      )}
    />
  );
};

export default MainRoute;
