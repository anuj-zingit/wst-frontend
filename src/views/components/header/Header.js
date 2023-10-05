import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateUser } from "../../../redux/actions";
import Utils from "../../../helpers/Utils";
import OutsideAlerter from '../OutsideAlerter';
import CoreApi from "../../../coreApi/CoreApi";
import store from "../../../redux/store";
class Header extends Component {
  token=store.getState().token;
  
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      userName: "-",
      showLogout: false,
    };
    
    // this.handleUnload = this.handleUnload.bind(this);
  }
  
  componentDidMount() {
    this.setState({
      userName: this.props.user.name,
    });
  }

  logout = () => {
    const request ={
      token :this.token
    }
    CoreApi.CoreApiToken("logout",'POST')
      .then((response) => {
        window.location.href = `/login`;
      }).catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <header className={"header show"}>
        <div className="pcMenu">
          <Navbar bg="transparent"  variant="light" className="justify-content-between  align-items-center">
            <div className="all-screens-head">
              <img className="wstlogo" src="../../../../images/wst-logo.png" alt="logo"/>
            </div>
            {this.props.user && (
              <div className="d-flex flex-row align-items-center  header-user">
                <span className="text-white">WST SUITE</span>
                <div className="short-container">
                  <span>{Utils.getInitials(this.state.userName)}</span>
                  <img onClick={() => this.setState({ showLogout: !this.state.showLogout })} src='../../../../images/foword-arrow.svg' alt="logout"/>
                </div>
                <OutsideAlerter
                  onClickOutside={() => {
                    this.setState({ showLogout: false });
                  }}
                >
                  {this.state.showLogout &&
                    <div className="logout-drop">
                      <div className="user-info">
                        <span>{Utils.getInitials(this.state.userName)}</span>
                        <div className="user-box">
                          <h4>{this.state.userName}</h4>
                          <p>{this.props.user.email}</p>
                        </div>
                      </div>
                      <Link onClick={this.logout} className="logout-text">Logout</Link>
                    </div>
                  }
                </OutsideAlerter>
              </div>
            )}
          </Navbar>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    user: state.user,
    sidebar: state.showSidebar,
  };
};

const mapDispatchToProps = {
  updateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
