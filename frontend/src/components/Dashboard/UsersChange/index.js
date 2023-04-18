import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

function Users() {
    //===============================================================
    let token = localStorage.getItem("token");
    //===============================================================
    const [allUser, setAllUser] = useState(false)

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND}/users/`, {
                headers: {
                    Authorization: `${token}`,
                },
            })
            .then(function (response) {

                console.log(response.data.users, "users")
                setAllUser(response.data.users)
            })
            .catch(function (error) {
                console.log(error);
            });
        //===============================================================


    }, []);


    const deleteUser = () => { }
    const unDeleteUser = () => { }
    const Admin = () => { }
    const NotAdmin = () => { }



    return (<>
        <ListGroup.Item action >
            All User
        </ListGroup.Item>
        <ListGroup as="ol" numbered>
            {allUser ? <>

                {allUser.map((user) => {
                    return (
                        <ListGroup.Item 
                            key={user.id}
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{user.first_name} {user.last_name}</div>
                                {/* <Avatar alt="Remy Sharp" src={user.img} /> */}
                                Cras justo odio
                            </div>
                            <Badge bg="primary" pill>
                                14
                            </Badge>
                        </ListGroup.Item>

                    )
                })}

                { }

            </> : <></>}



        </ListGroup>
    </>
    )
}

export default Users