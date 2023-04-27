import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./style.css";

//===============================================================

import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../redux/reducers/profile/index";
import { setUser_first_name } from "../../redux/reducers/auth/index";
//=================================================================

const Popup_Edit_Data = (props) => {
  //===============================================================
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //===============================================================
  const state = useSelector((state) => {
    return {
      dataUser: state.profile.UserData,
      postsUser: state.posts.posts,
      allFollower: state.profile.allFollower,
      allFollowing: state.profile.allFollowing,
    };
  });

  const user_test = {
    email: state.dataUser.email,
    first_name: state.dataUser.first_name,
    last_name: state.dataUser.last_name,
    age: state.dataUser.age,
    country: state.dataUser.country,
  };
  const [userDataHolder, setUserDataHolder] = useState(user_test);

  //===================================================

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDataHolder((preData) => ({ ...preData, [name]: value }));
  };

  const submitNewData = () => {
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
        dispatch(setUser_first_name(response.data.user));
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
        <label htmlFor="email">email:</label>
          <Form.Control
          name="email"
          defaultValue={user_test.email}
          placeholder="your email"
          onChange={handleChange}
          />
          <label htmlFor="first_name">first_name: </label>
          <Form.Control
            defaultValue={user_test.first_name}
            name="first_name"
            placeholder="your first_name"
            onChange={handleChange}
          />
          <label htmlFor="last_name">last_name:</label>
          <Form.Control
            defaultValue={user_test.last_name}
            name="last_name"
            placeholder="your last_name"
            onChange={handleChange}
          />
          <label htmlFor="age">age:</label>
          <Form.Control
            defaultValue={user_test.age}
            name="age"
            placeholder="your age"
            type="number"
            onChange={handleChange}
          />
          <label htmlFor="country">country:</label>
          <Form.Control
            defaultValue={user_test.country}
            name="country"
            placeholder="your country"
            onChange={handleChange}
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <div className="submitNewButton">
          <Button className="shadowButton" onClick={submitNewData}>
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

export default Popup_Edit_Data;
