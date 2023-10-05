import React, { useState } from "react";
import DefaultInput from "./DefaultInput";
import DefaultButton from "./DefaultButton";
import SuccessModal from "./SuccessModal";
import { Modal} from "react-bootstrap";
import CoreApi from "../../../coreApi/CoreApi";
// import Api from '../../../api/Api';
import { Link } from "react-router-dom";

const GetVerificationCode = (props) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const[check,setCheck]=useState(false);
  const [resMessage,setResMessage]=useState('')
// Success Modal
const [sucessModal, setSuccessModal] = useState(false);
const sucessModalClose = () => setSuccessModal(false);
const sucessModalShow = () => setSuccessModal(true);
const [isRevealPwd, setIsRevealPwd] = useState(false);
    const togglePasswordVisibility = () => {
        setIsRevealPwd(!isRevealPwd);
    };
    const [isRevealPwd1, setIsRevealPwd1] = useState(false);
    const togglePasswordVisibility1 = () => {
        setIsRevealPwd1(!isRevealPwd1);
    };

  

  let params = window.location.search.substr(1);
  let  email= params.substring(params.indexOf("=") + 1).split('&')[0];

  console.log(email,'6564')
  // console.log(username,'464646')

  //handle Change Function
  const handleChange = (event) => {
    let i = { ...values };
    i[event.target.name] = event.target.value;
    setValues(i);
    setCheck(false)
  }

  //Form Submit
  const handleSubmit = (event) => {
      event.preventDefault();
      if (validate()) {
    const params = {
        email: email,
      code: values["verificaioncode"],
      password: values["confirmpassword"]
      }
      console.log(props);
      // Api.confirmpassword(params)
      // .then(async (response) => {
      //   if(response && response.name && (response.name.includes("Error") || response.name.includes('Exception'))) {
      //     let errors = {};
      //     errors["confirmpassword"] = response.message
      //     setErrors(errors);
      //   } else {
      //     sucessModalShow();
      //   }
      // })
      // .catch((error) => {
      //   setErrors(error.message);
      // })

      CoreApi.call("updatePassword", "POST", params)
      .then((response) => {
        setSuccessModal(true)
       console.log(response)
      })
      .catch((error) => {
        setResMessage(error.message);
        setCheck(true)
        console.log(error.message, "eror")
      })
    }
  }

  // Validations
  const validate = () => {
    let errors = {};
    let isValid = true;

    //Verification code
    if (!values["verificaioncode"]) {
      isValid = false;
      errors["verificaioncode"] = "Please Enter Verification code";
    }

    //New password
    if (!values["newpassword"]) {
      isValid = false;
      errors["newpassword"] = "Please Enter your password";
    } else if (values.newpassword.length < 6) {
      isValid = false;
      errors["newpassword"] = "Password needs to be 6 characters or more ";
    }

    //Confirm password
    if (!values["confirmpassword"]) {
      isValid = false;
      errors["confirmpassword"] = "Please Enter your password";
    } else if (values["confirmpassword"] !== values["newpassword"]) {
      isValid = false;
      errors["confirmpassword"] = "Password do not match ";
    }

    setErrors(errors);
    return isValid;
 }
 

  return (
    <div className="forgot-screen get-verify">
      <div className="forgot-boxes ">
        <div  className="verification-box">
          <img className="logo" src='../../../images/WST%20logo.svg' alt="Logo" />
          <span>Forgot Password</span>
          <p> <img className="check-square" src="../../../images/select.svg" alt="Icon" />Thank You. An email containing your verification code has been sent to {email}</p>
        </div>
        <div className="warning">
          <p className ="warning"> Note: Password should contain at least 6 characters.</p>
        </div>
        <div className="forgot-form">
          <label className="form-label" for="formBasicEmail"></label>
          <DefaultInput
            className="form-control"
            type="text"
            name="verificaioncode"
            placeholder="Verification Code"
            onChange={handleChange}
            value={values.verificaioncode}
            errors={errors.verificaioncode}
          />
          
          <DefaultInput
            className="form-control"
            type={isRevealPwd ? "text" : "password"}
            placeholder="New Password"
            name="newpassword"
            onChange={handleChange}
            value={values.newpassword}
            errors={errors.newpassword}
            text=
            {isRevealPwd ? <img className="hideshow-pass" src='../../../images/view.svg' alt="icon"/> : <img className="hideshow-pass" src='../../../images/view-hide.svg' alt="icon"/>}
            onClick={togglePasswordVisibility}

          />
          <DefaultInput
            className="form-control"
            type={isRevealPwd1 ? "text" : "password"}
            placeholder="Confirm Password"
            name="confirmpassword"
            onChange={handleChange}
            value={values.confirmpassword}
            errors={errors.confirmpassword}
            text=
            {isRevealPwd1 ? <img className="hideshow-pass" src='../../../images/view.svg' alt="icon"/> : <img className="hideshow-pass" src='../../../images/view-hide.svg' alt="icon"/>}
            onClick={togglePasswordVisibility1}
          />
          {check ?  <p className="validation-error">{resMessage}</p> :' ' }
         
          <DefaultButton
            butonClass="blue-button"
            name="Submit"
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

    {/* Success Modal */}
      <Modal
        show={sucessModal}
        onHide={sucessModalClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="authModal opt-delete cardModal"
        size="sm"
      >
      <SuccessModal onClose={sucessModalClose} />
      </Modal>
    </div>
  )
};

export default GetVerificationCode;