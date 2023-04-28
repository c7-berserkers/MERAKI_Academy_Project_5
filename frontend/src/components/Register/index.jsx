import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import validator from "validator";
import { useState } from "react";
import React from "react";
import axios from "axios";
import {
  Button,
  Container,
  Form,
  Alert,
  Col,
  Row,
  Card,
} from "react-bootstrap";
import "./index.css";

export default function Register() {
  const navigate = useNavigate();

  let useStateTestValue = {
    first_name: "",
    last_name: "",
    age: "",
    country: "",
    email: "",
    password: "",
    img: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg",
    role_id: "2",
  };

  const [userData, setUserData] = useState(useStateTestValue);
  const { first_name, last_name, age, country, email, password, img } =
    userData;

  const [errors, setErrors] = useState({});

  const validateData = () => {
    let errors = {};
    if (!first_name) {
      errors.first_name = "All fields are required";
    }
    if (!last_name) {
      errors.last_name = "All fields are required";
    }
    if (!validator.isEmail(email)) {
      errors.email = "A valid email is required";
    }
    if (!validator.isStrongPassword(password)) {
      errors.password = "A valid strong password is required";
    }

    if (isNaN(age)) {
      errors.age = "age in number is required";
    }
    if (!country) {
      errors.country = "All fields are required";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((preData) => ({ ...preData, [name]: value }));
  };

  const [oneError, setOneError] = useState(false);
  const [done, setDone] = useState(false);

  const submit = () => {
    const errors = validateData();

    if (Object.keys(errors).length) {
      setOneError(Object.values(errors)[0]);
      setErrors(oneError);
      return;
    }
    axios
      .post(`${process.env.REACT_APP_BACKEND}/users/register`, userData)
      .then(function (response) {
        console.log(response.data.message);
        if (response.data.message == "Account created successfully") {
          setDone("Account created successfully");
          setOneError(false);
          setTimeout(() => {
            navigate("/Login");
          }, 3000);
        } else {
          setOneError("Email is already used");
        }
      })
      .catch(function (error) {
        console.log(error);
        setOneError("Email is already used");
      });
  };

  return (
    <>
      <div className="log-box">
        <div className="register" style={{ marginTop: "15vh" }}>
          {" "}
          <Container>
            <Card style={{ padding: "10px" }}>
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
                <Card.Title style={{ fontSize: "50px" }}>Sign Up</Card.Title>
              </Container>

              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  submit();
                }}
              >
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="registerFName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First name"
                      name="first_name"
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="registerLName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Last name"
                      name="last_name"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="registerrEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={handleChange}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="registerPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    onChange={handleChange}
                  />
                  <Form.Text id="passwordHelpBlock" muted>
                    Your password must be 8-20 characters long, contain letters
                    and numbers, and must not contain spaces, special
                    characters, or emoji.
                  </Form.Text>
                </Form.Group>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="registerAge">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      placeholder="Age"
                      name="age"
                      onChange={handleChange}
                      type="number"
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="registerPhoneNumber">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      placeholder="Qatar"
                      name="country"
                      className=""
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Row>
                {oneError ? <Alert variant="danger">{oneError}</Alert> : <> </>}
                {done ? (
                  <Alert key="success" variant="success">
                    {done}
                  </Alert>
                ) : (
                  <> </>
                )}

                <Button variant="primary" type="submit">
                  Register
                </Button>
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
                  Already Have an account ? <Link to="/login">Login</Link>
                </Card.Text>
              </Form>
            </Card>
          </Container>
        </div>
      </div>
    </>
  );
}
