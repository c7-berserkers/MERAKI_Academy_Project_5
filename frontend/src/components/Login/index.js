import React, { useState, useEffect } from "react";
import "./style.css";

import axios from "axios";

import {
  setLogin,
  setUserInfo,
  setUserLikes,
} from "../redux/reducers/auth/index";
import { useDispatch, useSelector } from "react-redux";

import { Button, Container, Form, Alert, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
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
    e.preventDefault();
    try {
      const result = await axios.post(`${process.env.REACT_APP_BACKEND}/users/login`, {
        email,
        password,
      });
      if (result.data) {
        setMessage("");
        dispatch(setLogin(result.data.token));
        dispatch(setUserLikes(result.data.likes));
        dispatch(setUserInfo(result.data));
        setStatus(false);
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        setStatus(true);
        return setMessage(error.response.data.message);
      }
      setStatus(true);
      setMessage("Error happened while Login, please try again");
    }
  };

  //===============================================================

  useEffect(() => {
    if (state.isLoggedIn) {
      navigate("/");
    }
  });

  //===============================================================

  return (
    <div className="log-box">
      <div className="login" style={{ marginTop: "100px" }}>
        <Container style={{ minWidth: "400px" }}>
          <Card style={{ padding: "10px" }}>
            {" "}
            <Container
              style={{
                padding: "10px 50px",
                marginBottom: "10px",
              }}
            >
              <img
                style={{ width: "150px", margin: "auto" }}
                src="/logo.png"
                alt="logo"
              />
              <Card.Title style={{ fontSize: "50px" }}>Sign In</Card.Title>
            </Container>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              {status && <Alert variant="danger">{message}</Alert>}
              <Button
                type="submit"
                onClick={(e) => {
                  login(e);
                }}
              >
                Sign In
              </Button>{" "}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "10px",
                }}
              ></div>
              <Card.Text
                style={{ fontSize: "15px", padding: "5px", margin: "5px" }}
              >
                Don't have an account ? <Link to="/register">Register</Link>
              </Card.Text>
            </Form>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default Login;
