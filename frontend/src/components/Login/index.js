import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import {setLogin,setUserInfo,setLogout} from "../redux/reducers/auth/index";
import { useDispatch, useSelector } from "react-redux";


//===============================================================

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  
    const state = useSelector((state) => {
      
      return {
        isLoggedIn: state.auth.isLoggedIn,
      };
    });

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);

  //===============================================================

  const login = async (e) => {
    console.log(email,
      password,)
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      if (result.data) {
        setMessage("");
        dispatch(setLogin(result.data.token))
        dispatch(setUserInfo(result.data))
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Login, please try again");
    }
  };

  //===============================================================

  // useEffect(() => {
  //   if (state.isLoggedIn) {
  //     navigate("/");
  //   }
  // });

  //===============================================================

  return (
    <div className="login" >
      <Card className="text-center" >
      <Card.Header>login</Card.Header>
      <Card.Body>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={(e) => {
              login(e);
            }}>
        Submit
      </Button>
    </Form>
      </Card.Body>
      <Card.Footer className="text-muted">{status
          ? message && <div className="SuccessMessage">{message}</div>
          : message && <div className="ErrorMessage">{message}</div>}</Card.Footer>
    </Card>
    </div>
    
  );
};

export default Login;
