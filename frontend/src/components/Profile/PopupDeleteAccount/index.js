import { Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import axios from "axios";

//===============================================================

import { useDispatch, useSelector } from "react-redux";
import { setRandomNumber } from "../../redux/reducers/profile/index";

//===============================================================

const Popup_Delete_Profile = (props) => {
  const navigate = useNavigate();

  var randomString = require("randomstring");

  //===============================================================
  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      RandomNumber: state.profile.RandomNumber,
    };
  });

  //===============================================================
  let randomData;
  if (!state.RandomNumber) {
    randomData = randomString.generate({
      length: 15,
      charset: "alphanumeric",
    });
    dispatch(setRandomNumber(randomData));
  } else {
    randomData = state.RandomNumber;
  }
  const [userData, setUserData] = useState(undefined);
  const [alert, setAlert] = useState(false);
  const [colorMassage, setColorMassage] = useState("danger");

  const validateData = () => {
    let errors = {};

    if (userData !== randomData) {
      errors.randomInput = "Please input the above vale correctly";
    }
    return errors;
  };

  //===============================================================

  const delete_Function = () => {
    const errors = validateData();
    if (Object.keys(errors).length) {
      setAlert(errors["randomInput"]);
      return;
    }
    setColorMassage("success");
    setAlert("delete is done");
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND}/users/${localStorage.getItem(
          "userId"
        )}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("userId")}`,
          },
        }
      )
      .then(function (response) {
        localStorage.clear();
        setColorMassage("success");
        setAlert(" deleted successful");
        setTimeout(() => {
          navigate("/register");
        }, 3000);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //===============================================================
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>
            Retype {randomData} if you really want to delete account:{" "}
          </Form.Label>
          <Form.Control
            name="random_Input"
            onChange={(e) => {
              setUserData(e.target.value);
            }}
            placeholder=""
          />
          {alert ? (
            <Alert
              key={colorMassage}
              style={{ margin: "12px 0px" }}
              variant={colorMassage}
            >
              {alert}
            </Alert>
          ) : (
            <> </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="addSubmit">
            <Button variant="danger" onClick={delete_Function}>
              submit
            </Button>
          </div>
          <Button className="shadowButton" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Popup_Delete_Profile;
