import React, { useEffect,useState } from "react";
import { useFormik } from "formik";
import {Col, Dropdown, Row} from "react-bootstrap";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import DefaultButton from "../buttons/DefaultButton";
import { EDIT } from "../../../constants/modes";
import ReactTooltip from "react-tooltip";
import TemplatesDropdown from "../dropdowns/TemplatesDropdown";
import ContactDetialDropdown from "../dropdowns/ContactDetialDropdown";
import ReactDOM from "react-dom";

const placeholders = [
  { label: "~firstname~", key: "firstname" },
  { label: "~lastname~", key: "lastname" },
  { label: "~mobile~", key: "mobile" },
  { label: "~email~", key: "email" },
  { label: "~dob~", key: "dob" },
];

let textFormControlRef = null;

const AddContactModal = (props) => {
  const {
    modalHeading,
    saving,
    onSave,
    onClose,
    modalError,
    mode,
    values,
  } = props;
  const formik = useFormik({
    initialValues: {
      active: 1,
      name: "",
      text: "",
    },
    onSubmit: (values) => {},
  });



  const [showPopup, setShowPopup] = useState(false);

  const validateForm = () => {
    if (!formik.values.name.length) {
      formik.setFieldError("name", "Please enter name.");
    }
    if (!formik.values.text.length) {
      formik.setFieldError("text", "Please enter text.");
    }
    if (formik.values.name.length && formik.values.text.length) {
      onSave(formik.values);
    }
  };



  useEffect(() => {
    if (mode === EDIT && values) {
      formik.setFieldValue("active", values.active);
      formik.setFieldValue("name", values.name);
      formik.setFieldValue("text", values.text);
      formik.setFieldValue("template_guid", values.template_guid);
    }
  }, []);

  const onSelectPlaceholder = (placeholder) => {
    formik.setFieldValue("text", formik.values.text+"" + placeholder.label);
    setShowPopup(null);
        focusOnTextInput();
  };
  const focusOnTextInput = () => {
    ReactDOM.findDOMNode(textFormControlRef).focus();
  };

  const togglePopup = (type) => {
    if (showPopup === type) {
      setShowPopup(null)
    } else {
      setShowPopup(type)
    }
  };

  const handleChange = (e) => {


    formik.setFieldValue("active", parseInt(e.target.value));
  };
  let value = "male";
  return (
    <div className="dark d-flex flex-column justify-content-between align-items-center">
      <div className="modal-header border-0 d-flex flex-column justify-content-between align-items-center px-4 text-center">
        <h4 className="mb-2">{modalHeading ? modalHeading : "Add Template"}</h4>
      </div>
      <div className="modal-body w-100 px-4 template-forms">
        <form onSubmit={formik.handleSubmit}>
          <Row>
            <Col>
              <label htmlFor="status">Status</label>
            </Col>
          </Row>
          <Row>
            <RadioGroup
              aria-label="active"
              name="active"
              value={formik.values.active}
              onChange={handleChange}
            >
              <Col>
                <FormControlLabel
                  value={1}
                  control={<Radio disabled={saving} color="primary" />}
                  label="Active"
                />
                <FormControlLabel
                  value={0}
                  control={<Radio disabled={saving} color="primary" />}
                  label="Inactive"
                />
              </Col>
            </RadioGroup>
          </Row>
          <Row>
            <Col>
              <label htmlFor="status">Name</label>
            </Col>
          </Row>
          <Row>
            <Col>
              <TextField
                disabled={saving}
                onChange={formik.handleChange}
                value={formik.values.name}
                fullWidth
                name="name"
                id="outlined-basic"
                
                variant="outlined"
                className={formik.errors.name ? "error" : ''}
              />
              {formik.errors.name && (
                <label style={{ color: "red" }}>{formik.errors.name}</label>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <label htmlFor="status">Text</label>
            </Col>
          </Row>
          <Row>
            <Col>
              <TextField
                  ref={(c) => (textFormControlRef = c)}
                disabled={saving}
                value={formik.values.text}
                onChange={formik.handleChange}
                id="outlined-multiline-static"
                fullWidth
                name="text"
                
                multiline
                rows={4}
                cols={50}
                variant="outlined"
                className={formik.errors.name ? "error" : ''}
              />
              {formik.errors.text && (
                <label style={{ color: "red" }}>{formik.errors.text}</label>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <p
                style={{ color: "red", padding: "10px" }}
                className="align-center"
              >
                {modalError ? modalError : ""}
              </p>
            </Col>
          </Row>
        </form>
        <div className="float-left w-100 d-flex flex-row justify-content-between">
          <ul className="d-flex flex-row template-ul">
            <li
                data-tip
                data-for="Add Placeholders"
                className="emoji-drop contact-drop template-drop-edit"
            >
              <span className="placeholder-label">Add Placeholder</span>
              <ReactTooltip
                  id="Add Placeholders"
                  place="top"
                  type="dark"
                  effect="solid"
              >
                Add Placeholders
              </ReactTooltip>
              <Dropdown
                  show={showPopup === "placeholders"}
                  onToggle={() => togglePopup("placeholders")}
              >
                <Dropdown.Toggle variant="success" id="placeholders">
                  <img class="addplace" src="../../../../../images/icons/box.svg" alt="icon" />
                </Dropdown.Toggle>

                <Dropdown.Menu show={showPopup === "placeholders"}>
                  <ContactDetialDropdown
                      placeholders={placeholders}
                      onSelectPlaceholder={onSelectPlaceholder}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </div>
      <div className="modal-footer  template-foot border-0">
        <DefaultButton
          type={"button"}
          onClick={() => onClose()}
          name={"Cancel"}
          class={"close-button"}
          loading={false}
        />
        <DefaultButton
          type={"submit"}
          loading={false}
          onClick={() => validateForm()}
          loading={saving}
          name={"Save"}
          class={"save-button"}
        />
      </div>
    </div>
  );
};

export default AddContactModal;
