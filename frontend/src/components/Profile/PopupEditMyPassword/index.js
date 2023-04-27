import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import validator from "validator";
import { Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

//===============================================================

import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../redux/reducers/profile/index";

//=================================================================

const Popup_Edit_MyPassword = (props) => {
  //===============================================================
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      dataUser: state.profile.UserData,
    };
  });

  //===============================================================

  let user_test = {
    password: "",
    password_confirmed: "",
  };
  const [userDataHolder, setUserDataHolder] = useState(user_test);
  const [oneError, setOneError] = useState(false);
  const [colorMassage, setColorMassage] = useState("danger");
  const { email, password, password_confirmed } = userDataHolder;
  //==================================================

  const validateData = () => {
    let errors = {};
    if (password !== password_confirmed) {
      errors.password = "A password not identical";
    }
    if (!validator.isStrongPassword(password)) {
      errors.password = "A vialed strong password is required";
    }
    console.log(errors, "errors");
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDataHolder((preData) => ({ ...preData, [name]: value }));
  };

  const submitNewPassword = () => {
    const errors = validateData();
    if (Object.keys(errors).length) {
      setOneError(Object.values(errors)[0]);
      return;
    }
    axios
      .put(
        `${process.env.REACT_APP_BACKEND}/users/${localStorage.getItem(
          "userId"
        )}`,
        userDataHolder,
        {
          headers: {
            Authorization: `${localStorage.getItem("userId")}`,
          },
        }
      )
      .then(function (response) {
        dispatch(setUserData(response.data.user));
        setOneError("edit is done");
        setColorMassage("success");
        setUserDataHolder("");
        setOneError(false);
        props.set(false);
        document.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit My profile Data
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={(event) => event.preventDefault()}
          className="myProfileAreaEdit"
        >
          <label htmlFor="password">password:</label>
          <Form.Control
            type="password"
            name="password"
            placeholder="your password"
            onChange={handleChange}
          />
          <label htmlFor="password">password:</label>
          <Form.Control
            type="password"
            name="password_confirmed"
            placeholder="your password"
            onChange={handleChange}
          />
          {oneError ? (
            <Alert
              key={colorMassage}
              style={{ margin: "12px 0px" }}
              variant={colorMassage}
            >
              {oneError}
            </Alert>
          ) : (
            <> </>
          )}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <div className="submitNewButton">
          <Button className="shadowButton" onClick={submitNewPassword}>
            submit
          </Button>
        </div>
        <Button className="shadowButton" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Popup_Edit_MyPassword;
