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
        </Container>
      </Navbar>
    </>
  );
}
