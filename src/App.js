import React, { Component, Suspense } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/noto-sans";
import "@fontsource/noto-sans/400.css";
import "@fontsource/noto-sans/400-italic.css"; 
import "./App.css";
import history from "./Utilities/history";
import UpComing from "./views/main/UpComing/UpComing";
const ComingSoonRoute = React.lazy(() => import('./views/components/ComingSoonRoute'));
const ComingSoon = React.lazy(() => import('./views/main/ComingSoon/ComingSoon'));
const ApplicationRoute = React.lazy(() => import('./views/components/ApplicationRoute'));
const ApplicationTool = React.lazy(() => import('./views/main/Tools/ApplicationTool'));
const AuthRoute = React.lazy(() => import('./views/components/AuthRoute'));
const MainRoute = React.lazy(() => import('./views/components/MainRoute'));
const MessageFeed = React.lazy(() => import('./views/main/messageFeed/MessageFeed'));
const Login = React.lazy(() => import('./views/auth/login/Login'));
const SupportRoute = React.lazy(() => import('./views/components/SupportRoute'));
const ContactSupport = React.lazy(() => import('./views/auth/ContactSupport/ContactSupport'));
const ForgetPassword = React.lazy(()=>import('./views/auth/ContactSupport/ForgetPassword'));
const GetVerificationCode=React.lazy(()=>import('./views/auth/ContactSupport/GetVerificationCode'));
// upcomingTournament





class App extends Component {
  async componentDidMount() {}
  render() {
    return (
      <BrowserRouter history={history}>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <AuthRoute path="/login" name="login" component={Login} />
            <AuthRoute exact path="/" name="login" component={Login} />
            <MainRoute path="/feed" name="MessageFeed" component={MessageFeed} />
            <SupportRoute path="/support" name="ContactSupport" component={ContactSupport} />
            <SupportRoute path="/forgetpassword" name="ForgetPassword" component={ForgetPassword} />
            <SupportRoute path="/getverificationCode" name="GetVerificationCode" component={GetVerificationCode} />
            <ApplicationRoute path="/applicationtool" name="ApplicationTool" component={ApplicationTool}  />
            <ComingSoonRoute path="/comingsoon" name="ComingSoon" component={ComingSoon} />
            <UpComing path="/upcoming" name="ComingSoon" component={UpComing} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
