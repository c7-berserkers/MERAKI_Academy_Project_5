import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function ChatsPage() {
  const BACKEND = process.env.REACT_APP_BACKEND;
  const { token } = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });
  const [show, setShow] = useState(false);
  const [chatRooms, setChatRooms] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    axios
      .get(
        `${BACKEND}/chats`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((result) => {
        setChatRooms(result.data.result);
      })
      .catch((err) => {
        setNoResults(true);
      });
  }, []);
  return (
    <div>
      <Fab
        onClick={handleShow}
        style={{ margin: "20px" }}
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
      <Container style={{ marginTop: "20px" }}>
        <div>x</div>
      </Container>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Chat Room</Modal.Title>
          </Modal.Header>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              axios
                .post(
                  `${BACKEND}/chats`,
                  {
                    chat_name: e.target[0].value,
                  },
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                )
                .then((result) => {
                  console.log(result.data);
                })
                .catch((err) => console.log(err.response.data.message));
            }}
          >
            <Modal.Body>
              {" "}
              <Form.Label htmlFor="room-name">Room Name</Form.Label>
              <Form.Control
                type="text"
                id="room-name"
                aria-describedby="passwordHelpBlock"
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Create Room
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </>
    </div>
  );
}
