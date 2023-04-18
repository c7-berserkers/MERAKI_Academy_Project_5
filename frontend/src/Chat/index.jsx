import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const BACKEND = process.env.REACT_APP_BACKEND;
  const navigate = useNavigate();

  return (
    <div style={{ height: "80vh" }}>
      <Container>
        <Card style={{ height: "80vh" }}>
          <Card.Header>
            <h2>ChatName</h2>
          </Card.Header>
          <Card.Body
            style={{ display: "flex", flexDirection: "column-reverse" }}
          >
            <div>
              {" "}
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
