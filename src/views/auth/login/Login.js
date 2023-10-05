import React, { Component } from "react";
import { Form } from "react-bootstrap";
import CoreApi from "../../../coreApi/CoreApi";
import SubmitButton from "../../components/inputs/SubmitButton";
import FormError from "../../components/inputs/FormError";
import { connect } from "react-redux";
import { updateToken, updateUser } from "../../../redux/actions";
import { Link } from "react-router-dom";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      hasToken: true,
      fieldError: {
        username: null,
        password: null,
      },
      loading: false,
      ssoloading: false,
      error: null,
      isPasswordShown: false,
    };
  }

  togglePasswordVisiblity = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };

  async componentDidMount() {
    localStorage.clear();
  }
  login = () => {
    const { username, password } = this.state;
    this.setState({ error: null });
    if (username.length && password.length) {
      this.setState({ loading: true, error: null });
      let data = {
        email: this.state.username,
        password: this.state.password,
      };
      CoreApi.call("login", "POST", data)
        .then(async (response) => {
          if (response.token) {
            this.props.updateToken(response.token);
            this.props.updateUser(response);
            this.props.history.push("/feed");
          } else {
            this.setState({ error: "Invalid Username and Password" });
          }
        })
        .catch((error) => {
          this.setState({ error: "Invalid Username and Password" });
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    } else {
      let error = {
        username: null,
        password: null,
      };
      if (!username.length) {
        error.username = "Username is required.";
      }
      if (!password.length) {
        error.password = "Password is required.";
      }
      this.setState({
        fieldError: error,
      });
    }
    const token=localStorage.getItem('token')
    console.log(token);
  };

 
  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.login();
    }
  };

  componentWillUnmount() {
    document.removeEventListener("keypress", this.handleKeyPress);
  }
  
  render() {
    let image_url = "../../../../images/";
    const { fieldError } = this.state;
    const { isPasswordShown } = this.state;
    if (this.state.ssoloading) {
      return (
        <div className="">
          <div className="">
            {" "}
            <div className="defalut-loader-screen">
              <img src={image_url + "icons/loader-new.gif"} alt="Loader" />
            </div>
          </div>
        </div>
      )
    }
    if (!this.state.ssoloading) {
      return (
        // login-items 
        <>
          <section className="wrapper container-fluid">
            <div className="innerRapper row">
              <div className="left-section col-lg-7 col-md-12 col-sm-12 col-12">
                <div className="wstsuite-tool row">
                  <div className="col-xl-6 col-sm-12">
                    <ul className="row">
                      <li className="col-6">
                        <div className="loginIcon">
                          <img src={image_url + "we-TMS.svg"} alt="weSportTech" />
                          <span>We Sports Tech</span>
                        </div>
                      </li>
                      <li className="col-6">
                        <div className="loginIcon">
                          <img src={image_url + "wst_D&C.svg"} alt="Draws&Creatives" />
                          <span>Draws & Creatives</span>
                        </div>
                      </li>
                      <li className="col-6">
                        <div className="loginIcon">
                          <img src={image_url + "wst_score.svg"} alt="scoringSystem" />
                          <span >Scoring System</span>
                        </div>
                      </li>
                      <li className="col-6">
                        <div className="loginIcon">
                          <img src={image_url + "wst_certificate.svg"} alt="certificates" />
                          <span>Certificates</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="login-heading col-xl-6  col-sm-12">
                    <div>
                      <h3>Welcome to</h3>
                      <h1>WST - SUITE</h1>
                      <div className="login-description">
                        <div className="d-flex">
                          <img src={image_url + "list-point.svg"} alt="Points" />
                          <span>Get access to Tournament Management System</span>
                        </div>
                        <div className="d-flex">
                          <img src={image_url + "list-point.svg"} alt="Points" />
                          <span>Create draw and Creatives just in one click</span>
                        </div>
                        <div className="d-flex">
                          <img src={image_url + "list-point.svg"} alt="Points" />
                          <span>Live scoring system for each tournament</span>
                        </div>
                        <div className="d-flex">
                          <img src={image_url + "list-point.svg"} alt="Points" />
                          <span>Generate Certificates for Players</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right-section col-lg-5 col-md-12 col-sm-12 col-12">
                <section className="m-3">
                  <div className="login-logo">
                    <section><img src={image_url + "logo.png"} alt="login" /></section>
                    <h3>User Login</h3>
                  </div>
                  <div className="login-form">
                    <Form>
                      {this.state.error && (
                        <div className="invalid-account-error">
                          <FormError error={this.state.error} />
                        </div>
                      )}
                      <Form.Group controlId="formBasicEmail-username">
                        <Form.Control
                          type="text"
                          value={this.state.username}
                          placeholder="Email"
                          onChange={(e) => {
                            this.setState({ username: e.target.value });
                          }}
                        />
                        {fieldError.username && (
                          <span class="errorMsg">{fieldError.username}</span>
                        )}
                      </Form.Group>
                      <Form.Group controlId="formBasicEmail-password">

                        <div className="pass-showHide">
                          <Form.Control
                            type={isPasswordShown ? "text" : "password"}
                            placeholder="Password"
                            value={this.state.password}
                            onChange={(e) => {
                              this.setState({ password: e.target.value });
                            }}
                            onKeyPress={this.handleKeyPress}
                          />
                          <span onClick={this.togglePasswordVisiblity}>
                            {/* {isPasswordShown ? "Hide" : "Show"} */}
                          </span>
                        </div>
                        {fieldError.password && (
                          <span class="errorMsg">{fieldError.password}</span>
                        )}
                      </Form.Group>
                    
                        <Form.Check
                          className='rememberTest'
                          type='checkbox'
                          label="Remember me"
                        />
                    
                      <SubmitButton
                        onSubmit={this.login}
                        loading={this.state.loading}
                        className={"login-btns"}
                      >
                        <img src={image_url + "loginArrow.svg"} alt="login" />Login to
                      </SubmitButton>
                    </Form>
                    <div className="forgot-box">
                      <Link className='forget-font' to="/forgetpassword">Forgot Password?</Link>
                      {/* <Link className="need-help forget-font" to="/support">Register</Link> */}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </section>

          {/* <section className='container-fluid wrapper'>
            <div className="row innerRapper">
              <div className='left-container left-section grad1   col-7'>


              </div>
              <div className="right-container right-section col-5">
               

              </div>
            </div>
          </section> */}
        </>
      );
    }
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  updateToken,
  updateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);