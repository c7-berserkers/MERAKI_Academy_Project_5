import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from "react";
import {Container} from "react-bootstrap";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from "axios";



function GroupChat() {


    let token = localStorage.getItem("token");
    //===============================================================
    const [allChat, setAllChat] = useState(false)

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND}/chats/`, {
                headers: {
                    Authorization: `${token}`,
                },
            })
            .then(function (response) {

                console.log(response.data.result, "chats")
                setAllChat(response.data.result)
            })
            .catch(function (error) {
                console.log(error);
            });
        //===============================================================


    }, []);


    const deleteChatGroup = () => { }





    return (<Container>
        <ListGroup.Item action >
            Chat group
        </ListGroup.Item>

        <ListGroup as="ol" numbered>

            {allChat ? <>
                {

                    allChat.map((chat) => {
                        console.log(chat)
                        return (
                            <ListGroup.Item
                                key={chat._id}
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{chat.chat_name}</div>
                                    ********************
                                </div>
                                <div >
                            <Stack spacing={2} direction="column">
                                <Button variant="outlined">Delete Chat</Button>
                            </Stack>
                            </div>

                            </ListGroup.Item>
                        )
                    })

                }

            </> : <></>}
        </ListGroup>
    </Container>

    )
}

export default GroupChat