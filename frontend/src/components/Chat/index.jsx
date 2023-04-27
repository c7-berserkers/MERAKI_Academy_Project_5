import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate, useParams } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import { io } from "socket.io-client";

export default function Chat() {
  const mainRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const { token, userId, userName, pfp } = useSelector((state) => {
    return {
      token: state.auth.token,
      pfp: state.auth.pfp,
      userId: state.auth.userId,
      userName: state.auth.userName,
    };
  });
  const BACKEND = process.env.REACT_APP_BACKEND;
  const socket = io(BACKEND);
  const navigate = useNavigate();
  const { name } = useParams();

  const sendMessage = () => {
    const messageData = {
      room: name,
      content: {
        sender: userName,
        sender_id: userId,
        sender_pfp: pfp,
        message,
        createdAt: new Date(),
      },
    };
    axios
      .post(
        `${BACKEND}/chats/${name}`,
        { content: messageData.content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(messageData);
        socket.emit("SEND_MESSAGE", messageData);
        window.scrollTo({
          top: mainRef.offsetTop,
          left: 0,
          behavior: "smooth",
        });
        // setMessages((preMess) => [...preMess, messageData.content]);

        setMessage(``);
      })
      .catch((err) => console.log(err.response.data.message));
  };
  useEffect(() => {
    axios
      .get(`${BACKEND}/chats/${name}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        console.log(result.data.result.messages);
        setMessages(result.data.result.messages);
        socket.emit("JOIN_ROOM", name);
      })
      .catch((err) => console.log(err.response.data.message));
  }, []);
  useEffect(() => {
    socket.on("RECEIVE_MESSAGE", (data) => {
      setMessages((oldMes) => [...oldMes, data]);
    });
    window.scrollTo({
      top: mainRef.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  }, [messages]);
  return (
    <div style={{ height: "80vh" }}>
      <Container>
        <Card style={{ height: "700px" }}>
          <Card.Header>
            <h2>{name}</h2>
          </Card.Header>
          <Card.Body
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {messages.length === 0 ? (
              <>
                <div style={{ marginTop: "100px" }}>
                  <h4>No messages yet</h4>
                </div>
              </>
            ) : (
              <>
                <div
                  id="message-body"
                  style={{
                    overflowX: "auto",
                    height: "520px",
                    display: "flex",
                    flexDirection: "column-reverse",
                  }}
                >
                  <ListGroup>
                    {messages.map((element, i) => {
                      return (
                        <ListGroup.Item
                          variant={
                            Number(userId) === Number(element.sender_id)
                              ? `primary`
                              : ""
                          }
                          ref={mainRef}
                          key={i}
                          style={{
                            display: "flex",
                          }}
                        >
                          <ListItem>
                            <ListItemAvatar
                              onClick={(e) =>
                                navigate(`/profile/${element.sender_id}`)
                              }
                            >
                              <Avatar src={element.sender_pfp} />
                            </ListItemAvatar>
                            <ListItemText
                              primary={element.message}
                              secondary={`By ${element.sender} at ${
                                element.createdAt.split("T")[0]
                              }`}
                            />
                          </ListItem>
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup>
                </div>
              </>
            )}
            <div style={{ display: "flex", width: "100%" }}>
              {" "}
              <FloatingLabel
                style={{ width: "90%", margin: "10px" }}
                controlId="floatingTextarea"
                label="Chat"
                className="mb-3"
              >
                <Form.Control
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  as="textarea"
                  placeholder="Start Chatting"
                  style={{ height: "70px" }}
                />
              </FloatingLabel>
              <Button
                onClick={sendMessage}
                style={{ height: "70px", margin: "10px" }}
                variant="primary"
              >
                Send message
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
