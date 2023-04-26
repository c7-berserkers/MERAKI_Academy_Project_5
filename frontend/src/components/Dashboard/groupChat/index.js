import ListGroup from "react-bootstrap/ListGroup";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import axios from "axios";

function GroupChat() {
  let token = localStorage.getItem("token");
  //===============================================================
  const [allChat, setAllChat] = useState(false);

  const getAllChatsFunction = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/chats/`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then(function (response) {
        setAllChat(response.data.result);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //===============================================================
  useEffect(() => {
    getAllChatsFunction();
  }, []);
  //===============================================================

  const deleteChatGroup = (e) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND}/chats/${e.target.value}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then(function (response) {
        getAllChatsFunction();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Container>
      <ListGroup as="ol" numbered>
        {allChat ? (
          <>
            {allChat.map((chat) => {
              return (
                <ListGroup.Item
                  key={chat._id}
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{chat.chat_name}</div>
                  </div>
                  <div>
                    <Stack spacing={2} direction="column">
                      <Button
                        variant="outlined"
                        value={chat._id}
                        onClick={(e) => {
                          deleteChatGroup(e);
                        }}
                      >
                        Delete Chat
                      </Button>
                    </Stack>
                  </div>
                </ListGroup.Item>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </ListGroup>
    </Container>
  );
}

export default GroupChat;
