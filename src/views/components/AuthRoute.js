import React from "react";
import {Link, Route} from "react-router-dom";
import Login from "../auth/login/Login";
import {Navbar} from "react-bootstrap";

const AuthRoute = ({ component: Component }) => {
  const hasToken = window.location.href.includes('ssotoken');
  return (
    <Route
      render={(props) => (
        <div >
          { !hasToken && 
            <header className={"header show d-none"} >
                <div className="pcMenu">
                    <Navbar
                        bg="transparent"
                        variant="light"
                        className="justify-content-between  align-items-center"
                    >
                        <div className="all-screens-head">
                            <img
                                className="zingitlogo"
                                src="../../../images/plan-zingit.svg"
                                alt="logo"
                            />
                            <span className="screen-name">SUITE </span>
                            {/* <div className="beta-text">
                                
                            </div> */}
                        </div>
                        <div className="new-head-right">
                            <img src='../../../images/support-contact.svg' alt="contact"/>
                            <Link to="/support">Contact Support</Link>
                        </div>
                    </Navbar>
                </div>
            </header>  
          }
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Login} />
        </div>
      )}
    />
  );
};

export default AuthRoute;
