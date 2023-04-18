import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate, useParams } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { io } from "socket.io-client";

export default function Chat() {
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
  const [chat, setChat] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState(null);
  const sendMessage = () => {
    const messageData = {
      room: chat.chat_name,
      content: {
        sender: userName,
        sender_id: userId,
        sender_pfp: pfp,
        message,
      },
    };
    socket.emit("SEND_MESSAGE", messageData);
    // setMessages([...messages, messageData.content]);
    setMessage(``);
  };
  useEffect(() => {
    axios
      .get(`${BACKEND}/chats/${name}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        setChat(result.data.result);
        setMessages(result.data.result.messages);
        console.log(chat);
        socket.emit("JOIN_ROOM", chat.chat_name);
      })
      .catch((err) => console.log(err.response.data.message));
  }, []);
  useEffect(() => {
    socket.on("RECEIVE_MESSAGE", (data) => {
      // setMessages([...messages, data]);
      console.log(data);
    });
  }, []);
  return (
    <div style={{ height: "80vh" }}>
      <Container>
        <Card style={{ height: "80vh" }}>
          <Card.Header>
            <h2>{chat.chat_name}</h2>
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
                <div>
                  {messages.map((element, i) => {
                    return <li key={i}>{element.message}</li>;
                  })}
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
