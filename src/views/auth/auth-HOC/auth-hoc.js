import React, { useEffect } from "react";
import history from "../../../Utilities/history";
import { connect } from "react-redux";

const AuthHOC = (props) => {
  useEffect(() => {
    if (!props.token) {
      history.push("/login");
    }
  }, [props]);
  const { children } = props;
  return <>{children}</>;
};

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    token: state.token,
  };
};

export default connect(mapStateToProps)(AuthHOC);
