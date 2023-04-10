import React from "react";
import {
  Button,
  NavDropdown,
  Navbar,
  Nav,
  Container,
  Form,
  InputGroup,
  Offcanvas,
  ListGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
export default function NavBar() {
  const navigate = useNavigate();
  const accountFunc = () => console.log("x");
  const logOutFunc = () => console.log("x");
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
          </Navbar.Brand>
          <>
            {" "}
            <Navbar.Toggle className="my-2" aria-controls="nav-menu" />
            <Navbar.Collapse id="nav-menu">
              <NavDropdown.Item onClick={accountFunc}>Account</NavDropdown.Item>
              <NavDropdown.Item
                onClick={(e) => {
                  // navigate("/dashboard");
                  console.log("x");
                }}
              >
                Admin Dashboard
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logOutFunc}>Sign out</NavDropdown.Item>
            </Navbar.Collapse>
          </>
        </Container>
      </Navbar>
    </>
  );
}
