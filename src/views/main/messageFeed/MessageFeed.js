import React, { Component } from "react";
import {
  socketReceiveMessagesUpdate,
} from "../../../redux/actions";
import { connect } from "react-redux";
// import CoreApi from "../../../coreApi/CoreApi";
import Header from "../../components/header/Header";
// import config from "../../../config/config";
// import store from "../../../redux/store";
// // import Api from "../../../api/Api";
// import { NavLink } from "react-bootstrap";
const env = process.env.REACT_APP_ENV || "qa";

class MessageFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      show: false,
      settings: {},
      isActive: ''
    };
  }

  async componentDidMount() {
    // get account settings
  }
  addItem = () => {
    this.setState({ showModal: true });
  };

  handleModal() {
    this.setState({ showModal: false });
  }

  navigate = (type) => {
    if (type === 'upcoming') {
      this.props.history.push('/upcoming');
    } else {
      // CoreApi.call('sso/validate?token=' + store.getState().token).then(response => {
      //   if (response && response.userName) {
      //     const url = config[env].VALIDATE_URL + "?type=" + type + "&accessToken=" + store.getState().token;
      // window.open('https://wesportstech.com/', "_blank");
      //   } else {
      //     this.props.history.push('/login');
      //   }
      // }).catch(() => {
      //   this.props.history.push('/login');
      // });
    }
  }

  render() {
    return (
      <>
        <Header props={this.props} />
        <div className="tile-container">
          <ul className="suite-tile row">
            <li className="col-lg-4 col-md-6 col-sm-12" onClick={() => this.navigate('tms')}>
              <div className="tile_outer">
                <div className="tile_header">
                  <div className="IconRound">
                    <img alt="creatives" src='../../../../images/Outsourcing.svg' />
                  </div>
                </div>
                <div className="tile_inner">
                  <p>WS Sport Tech</p>
                  <span className="">Tournament Mangenent System</span>
                </div>
                <div className="tile_more">
                  <img src='../../../../images/Vector.svg' alt='arrow' />
                </div>
              </div>
            </li>
            <li className="col-lg-4 col-md-6 col-sm-12" onClick={() => this.navigate("upcoming")}>
              <div className="tile_outer">
                <div className="tile_header">
                  <div className="IconRound">
                    <img alt="scoring" src="../../../../images/Fixtures.svg" />
                  </div>
                </div>
                <div className="tile_inner">
                  <p>Creatives</p>
                  <span>Generate Match Posters</span>
                </div>
                <div className="tile_more">
                  <img src='../../../../images/Vector.svg' alt='arrow' />
                </div>
              </div>
            </li>
            {/* <li className="col-lg-4 col-md-6 col-sm-12" onClick={() => this.navigate("certificates")}>
              <div className="tile_outer">
                <div className="tile_header">
                  <div className="IconRound">
                    <img src="../../../../images/Scoreboard.svg" alt="certificates" />
                  </div>
                </div>
                <div className="tile_inner">
                  <p>Scoring System</p>
                  <span>Live Scoring of Tournament</span>
                </div>
                <div className="tile_more">
                  <img src='../../../../images/Vector.svg' alt='arrow' />
                </div>
              </div>
            </li>
            <li className="col-lg-4 col-md-6 col-sm-12" onClick={() => this.navigate("TMS")}>
              <div className="tile_outer">
                <div className="tile_header">
                  <div className="IconRound">
                    <img src="../../../../images/Winner.svg" alt="tms" />
                  </div>
                </div>
                <div className="tile_inner">
                  <p>Certificates</p>
                  <span>Genrate Certificates in Just One Click</span>
                </div>
                <div className="tile_more">
                  <img src='../../../../images/Vector.svg' alt='arrow' />
                </div>
              </div>
            </li> */}
            <li className="col-lg-4 col-md-6 col-sm-12" onClick={() => this.navigate("album")}>
              <div className="tile_outer">
                <div className="tile_header">
                  <div className="IconRound">
                    <img src="../../../../images/gallery.svg" alt="album" />
                  </div>
                </div>
                <div className="tile_inner">
                  <p>Creative's Gallery</p>
                  <span>Generate Posters and Certificates</span>

                </div>
                <div className="tile_more">
                  <img src='../../../../images/Vector.svg' alt='arrow' />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  socketReceiveMessagesUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageFeed);