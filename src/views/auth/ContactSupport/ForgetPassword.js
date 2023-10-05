import React, { useEffect } from 'react'
import { useState } from 'react';
// import Api from '../../../api/Api';
import CoreApi from '../../../coreApi/CoreApi';
import DefaultInput from './DefaultInput';
import ForgetButton from './DefaultButton';
import { Link } from 'react-router-dom';
function ForgetPassword() {


  const [values, setValues] = useState({});
  const [errors, setErrors] = useState('');
  const [notValid, setNotValid] = useState(false);
  
  

  //handle Change Function
  const handleChange = (event) => {
    let i = { ...values };
    i[event.target.name] = event.target.value;
    console.log(i)
    setValues(i);
  }

  //Form Submit
  
   const handleSubmit = (event) => {
    event.preventDefault();
    let data = {
      email: values.username
    }
    console.log(values.username, "values")
    CoreApi.call("forgotpassword", "POST", data)
      .then((response) => {
       console.log(response)
       window.location.assign(`/getverificationCode?email=${values["username"]}`);
      })
      .catch((error) => {
        setErrors(error.message)
        console.log(setErrors)
        setNotValid(true)
      })
  }

  const validate = () => {
      let errors = {};
      let isValid = true;
      if (!values["username"]) {
          isValid = false;
          errors["username"] = "Username not found. Please try again or contact customer support.";
      }
      setErrors(errors);
      return isValid;
  }
  return (
    <>
      <div className="forgot-screen">
        <div className="forgot-boxes" style={{ marginBottom: 10 }}>
          <div className="forgot-content-box">
            <img src='../../../images/WST%20logo.svg' alt="Logo" />
            <span>Forgot Password</span>
          </div>
          {notValid && <div class="alert alert-danger">{errors}</div>}
          {errors.username &&
            <div class="alert alert-danger">{errors.message}</div>
          }
          <div className="forgot-form">
            <label >Enter Your Username</label>
            <DefaultInput
              className="form-control"
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={values.username}
            />
            <ForgetButton
              butonClass="blue-button"
              name="Get Verification Code"
              onClick={handleSubmit}
            />
          </div>
        </div>
        <div className="backto-login">
          <Link to="/"><img src='../../../images/leftarrow.svg' alt="icon" /> Back To User Login</Link>
        </div>
        <div className="bottom-reserve-text">
          © 2023 . All Rights Reserved | We Sport Technology Services LLC
        </div>
      </div>
    </>
  )
}

export default ForgetPassword