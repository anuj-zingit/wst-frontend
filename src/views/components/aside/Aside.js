import React, {Component} from "react";
import {Link} from "react-router-dom";
import classNames from "classnames";
import AsideList from "./components/AsideList";
import {logout} from "../../../redux/actions";
import {connect} from "react-redux";
// import Api from "../../../api/Api";
import {updateUser} from "../../../redux/actions";
import ReactTooltip from "react-tooltip";
import LogoutModal from "../modals/Logout-modal";
import {Modal} from "react-bootstrap";
import MobileMenu from "../MobileMenu/MobileMenu";
import history from "../../../Utilities/history";
class Aside extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            showLogoutModal: false,
        };
    }

    componentDidMount() {
        // Api.call("/authentication/profile", "GET").then(
        //     (response) => {
        //         this.props.updateUser(response);
        //         // in your authentication promise handler or callback
        //         const user=response;
        //         if(process.env.REACT_APP_ENV === 'production' && user){
        //             window.pendo.initialize({
        //                 visitor: {
        //                     id:              user.user_guid,   // Required if user is logged in
        //                     email:        user.email,
        //                     full_name:    `${user.firstname} ${user.lastname}`.trim()
        //                     // role:         // Optional
        //                     // You can add any additional visitor level key-values here,
        //                     // as long as it's not one of the above reserved names.
        //                 },
        //                 account: {
        //                     id:           user.id // Highly recommended
        //                     // name:         // Optional
        //                     // is_paying:    // Recommended if using Pendo Feedback
        //                     // monthly_value:// Recommended if using Pendo Feedback
        //                     // planLevel:    // Optional
        //                     // planPrice:    // Optional
        //                     // creationDate: // Optional
        //                     // You can add any additional account level key-values here,
        //                     // as long as it's not one of the above reserved names.
        //                 }
        //             });
        //         }
        //     }

        // );
    }


    toggleClass = () => {
        const { showSidebar, setShowSidebar  } = this.props
        setShowSidebar(!showSidebar)
    };
    toggleClassIfMobile = () => {
        var width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;
        if(width <= 600){
            this.toggleClass();
        }
    };

    getClassNames = (defaultClass, tabName) => {
        let active = false;
        let url = window.location.pathname;

        if (tabName === "ReceivedMessages") {
            active = url.includes("/feed");
        }
        if (tabName === "SendMessages") {
            active = url.includes("/sent");
        }

        return classNames(defaultClass, {active: active});
    };

    closeHandler = () => {
        this.setState({
            showLogoutModal: false
        })
    }

    onDelete = async () => {
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

    render() {
        const {showLogoutModal} = this.state;
        const { showSidebar } = this.props
        return (
            <div className={!showSidebar ? "aside mini " : "aside "}>
                <MobileMenu />
                <ul className="sidebar navbar-nav">
                    <li className="logo">
                        <Link onClick={this.toggleClass}>
                            <img
                                className="logoImage"
                                src="../../../../images/white-logo-sidebar.svg"
                                alt="logo"
                            />
                        </Link>
                        <Link onClick={this.toggleClass}>
                            <img
                                className="logoImage1 new-logo"
                                src="../../../../images/mini-logo.svg"
                                alt="logo"
                            />
                        </Link>
                    </li>
                    <li data-tip data-for="Received Messages"
                        className={this.getClassNames("nav-item", "ReceivedMessages")}>
                        <ReactTooltip id="Received Messages" place="right" type="dark" effect="solid">Received
                            Messages</ReactTooltip>
                        <AsideList
                            onClick={this.toggleClassIfMobile}
                            classlink="nav-link"
                            iconActive={"../../../../images/new-icons/received-blue.svg"}
                            data-toggle="dropdown"
                            link="/feed"
                            iconInactive={"../../../../images/new-icons/receive-white.svg"}
                            tabName="Broadcaster"
                        />
                    </li> 
                    <li data-tip data-for="Logout" className={this.getClassNames("nav-item", "login")}>
                        <ReactTooltip id="Logout" place="right" type="dark" effect="solid">Logout</ReactTooltip>
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
                </ul>
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
                            onDelete={() => this.onDelete()}
                        />
                    </Modal>
                )}
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(Aside);
