import React, {Component} from 'react';
import LogoutModal from "../modals/Logout-modal";
import {Modal} from "react-bootstrap";
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import {Link} from "react-router-dom";
import AsideList from "../aside/components/AsideList";
import { updateUser } from "../../../redux/actions";
import classNames from "classnames";
import {logout} from "../../../redux/actions";
import {connect} from "react-redux";
import history from "../../../Utilities/history"

class MobileMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPaneOpen: false,
            isPaneOpenLeft: false,
            showLogoutModal: false,
        };
    }

    // componentDidMount() {
    //     Modal.setAppElement(this.el);
    // }

    getClassNames = (defaultClass, tabName) => {
        let active = false;
        let url = window.location.pathname;

        if (tabName === "ReceivedMessages") {
            active = url.includes("/feed");
        }
        if (tabName === "autoReplies") {
            active = url.includes("/autoReplies");
        }
        
        if (tabName === "logout") {
            active = url.includes("/login");
        }
    
        return classNames(defaultClass, { active: active });
      };
        closeHandler = () => {
            this.setState({
                showLogoutModal: false
            })
        }
        onLogout = async () => {
            const beamsClient = new window.PusherPushNotifications.Client({
                instanceId: '060c7e06-aac7-439a-afa3-0101a44890a7',
            });
    
            try {
                await beamsClient.start();
                beamsClient.clearDeviceInterests();
    
            }catch (error){
    
            }
            localStorage.clear();
            history.replace("/login")
        };
    // logout = async () => {
    //     localStorage.clear();
    //     window.location.href = '/login';
    // };
    hideSlidingPane = () => {
        this.setState({isPaneOpenLeft: false});
    };
    closeHandler = () => {
        this.setState({
            showLogoutModal: false
        })
    }
    render() {
        const {showLogoutModal} = this.state;
        return (
            <div ref={ref => this.el = ref}>
                <div className="mobile_menu">
                    <button className="ll" onClick={() => this.setState({isPaneOpenLeft: true})}>
                        <div className="logo">
                            <Link onClick={this.toggleClass}>
                                <img className="logoImage" height="40px" src='../../../../images/icons/black-menu.svg'
                                     alt="logo"/>
                            </Link>
                        </div>
                    </button>
                </div>
                <SlidingPane
                    isOpen={this.state.isPaneOpenLeft}
                    title='BACK'
                    from='left'
                    width='600px'
                    onRequestClose={() => this.setState({isPaneOpenLeft: false})}>
                    <section className="slidepaneSection">

                        <ul className="sidebar navbar-nav">
                            <li  className={this.getClassNames("nav-item", "ReceivedMessages")}>
                                <AsideList
                                    onClick={this.hideSlidingPane}
                                    classlink="nav-link"
                                    iconActive={"../../../../images/new-icons/received-blue.svg"}
                                    data-toggle="dropdown"
                                    link="/feed"
                                    iconInactive={"../../../../images/new-icons/receive-white.svg"}
                                    tabName="Received Messages"
                                />
                                
                            </li>
                            <li  className={this.getClassNames("nav-item", "SendMessages")}>
                                <AsideList
                                    onClick={this.hideSlidingPane}
                                    classlink="nav-link"
                                    iconActive={"../../../../images/new-icons/send-blue.svg"}
                                    data-toggle="dropdown"
                                    link="/sent"
                                    iconInactive={"../../../../images/new-icons/send-white.svg"}
                                    tabName="Sent Messages"
                                />          
                            </li>
                            <li   className={this.getClassNames("nav-item", "Contacts")}>
                                <AsideList
                                    onClick={this.hideSlidingPane}
                                    classlink="nav-link"
                                    iconActive={"../../../../images/new-icons/contact-blue.svg"}
                                    data-toggle="dropdown"
                                    link="/contacts"
                                    iconInactive={"../../../../images/new-icons/contact-white.svg"}
                                    tabName="Contacts"
                                />
                            </li>
                            <li className={this.getClassNames("nav-item", "autoReplies")}>
                                <AsideList
                                    onClick={this.hideSlidingPane}
                                    classlink="nav-link"
                                    iconActive={"../../../../images/new-icons/auto-blue.svg"}
                                    data-toggle="dropdown"
                                    link="/autoReplies"
                                    iconInactive={"../../../../images/new-icons/auto-white.svg"}
                                    tabName="Auto replies"
                                />
                            </li>
                            <li  className={this.getClassNames("nav-item", "templates")}>
                                <AsideList
                                    onClick={this.hideSlidingPane}
                                    classlink="nav-link"
                                    iconActive={"../../../../images/new-icons/template-blue.svg"}
                                    data-toggle="dropdown"
                                    link="/templates"
                                    iconInactive={"../../../../images/new-icons/template-white.svg"}
                                    tabName="Templates"
                                />
                            </li>
                            <li  className={this.getClassNames("nav-item", "logout")}>                          
                                <AsideList
                                classlink="nav-link"
                                onClick={() => this.setState({showLogoutModal: true})}
                                iconActive={"../../../../images/new-icons/logout-blue.svg"}
                                data-toggle="dropdown"
                                //   link="/login"
                                iconInactive={"../../../../images/new-icons/logout-white.svg"}
                                tabName="Logout"
                                />
                                
                            </li>
                            <div className="admin-dasboard-link mobile-dash">
                                <a href="https://client.zingitsolutions.com/responsive/default.asp" target="_blank" rel="noopener noreferrer">
                                    <img src="../../../../images/icons/admin-icon.svg" alt="admin"/>
                                    Go to Admin
                                </a>
                            </div>
                        </ul>
                    </section>
                    {showLogoutModal && (
                    <Modal
                        show={true}
                        onHide={() => this.closeHandler()}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        size="sm"
                        className="authModal cardModal logout-modal"
                    >
                        <LogoutModal
                            onClose={() => this.closeHandler()}
                            deleting={false}
                            onDelete={() => this.onLogout()}
                        />
                    </Modal>
                )}
                </SlidingPane>
                
            </div>
        )
    }
}
const mapStateToProps = (state /*, ownProps*/) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = {
    logout,
    updateUser,
};
export default connect(mapStateToProps, mapDispatchToProps) (MobileMenu);