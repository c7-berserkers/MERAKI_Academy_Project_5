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

export default function ChatsPage() {
  const BACKEND = process.env.REACT_APP_BACKEND;
  const navigate = useNavigate();

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
        setNoResults(false);
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
        <div>
          {noResults ? (
            <>
              {" "}
              <h2>No Rooms Yet</h2>
            </>
          ) : (
            <>
              {chatRooms.length > 0 ? (
                <>
                  <div>
                    {chatRooms.map((room) => {
                      return (
                        <Card key={room._id} style={{ margin: "20px" }}>
                          <Card.Body
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              flexDirection: "row",
                              margin: "20px",
                              padding: "10px",
                            }}
                          >
                            <Card.Title>{room.chat_name}</Card.Title>

                            <Button
                              onClick={(e) => navigate(`${room.chat_name}`)}
                              variant="primary"
                            >
                              Start Chatting
                            </Button>
                          </Card.Body>
                        </Card>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  <Stack spacing={1}>
                    {/* For variant="text", adjust the height via font-size */}
                    <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                    {/* For other variants, adjust the size with `width` and `height` */}
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="rectangular" width={210} height={60} />
                    <Skeleton variant="rounded" width={210} height={60} />
                  </Stack>
                  <Stack spacing={1}>
                    {/* For variant="text", adjust the height via font-size */}
                    <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                    {/* For other variants, adjust the size with `width` and `height` */}
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="rectangular" width={210} height={60} />
                    <Skeleton variant="rounded" width={210} height={60} />
                  </Stack>
                  <Stack spacing={1}>
                    {/* For variant="text", adjust the height via font-size */}
                    <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                    {/* For other variants, adjust the size with `width` and `height` */}
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="rectangular" width={210} height={60} />
                    <Skeleton variant="rounded" width={210} height={60} />
                  </Stack>
                </>
              )}
            </>
          )}
        </div>
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
                  setChatRooms([...chatRooms, result.data.result]);
                  handleClose();
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
