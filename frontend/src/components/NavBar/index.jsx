import React, { useEffect } from "react";
import {
  Button,
  NavDropdown,
  Navbar,
  Nav,
  Container,
  Form,
  InputGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { setLogout } from "../redux/reducers/auth";
export default function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accountFunc = () => console.log("x");
  const logOutFunc = (e) => {
    e.preventDefault();
    dispatch(setLogout());
    navigate("/login");
  };
  const { userName, role, isLoggedIn } = useSelector((state) => {
    return {
      userName: state.auth.userName,
      isLoggedIn: state.auth.isLoggedIn,
      role: state.auth.role,
    };
  });
  useEffect(() => {
    !isLoggedIn && navigate("/login");
    console.log(userName, role);
  });
  return (
    <>
      <Navbar
        bg="light"
        className="py-2 fixed-top"
        expand="lg"
        style={{ boxShadow: `0 2px 4px 0 rgba(0,0,0,.2)` }}
      >
        <Container>
          <Navbar.Brand
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              navigate("/");
            }}
          >
            {/* <img
              style={{ width: "36px", margin: "auto" }}
              src="logo.png"
              alt="logo"
            /> */}
            <strong>LOGO</strong>
          </Navbar.Brand>{" "}
          <Navbar.Toggle className="my-2" aria-controls="nav-menu" />
          <Navbar.Collapse id="nav-menu">
            <Nav className="ms-auto">
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (e.target[0].value !== "") {
                    navigate(`/search/${e.target[0].value}`);
                  }
                }}
              >
                <InputGroup className="mb-auto">
                  <Form.Control
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                  />
                  <Button
                    type="submit"
                    variant="outline-secondary"
                    id="button-addon2"
                  >
                    <BsSearch style={{ marginBottom: "2px" }} />
                  </Button>
                </InputGroup>
              </Form>
              <NavDropdown
                title={userName || "UserName"}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item onClick={accountFunc}>
                  Profile
                </NavDropdown.Item>
                {role === "admin" && (
                  <NavDropdown.Item
                    onClick={(e) => {
                      navigate("/dashboard");
                      console.log("x");
                    }}
                  >
                    Admin Dashboard
                  </NavDropdown.Item>
                )}

                <NavDropdown.Item
                  onClick={(e) => {
                    // navigate("/profile");
                    console.log("x");
                  }}
                >
                  Account Settings
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logOutFunc}>
                  Sign out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
