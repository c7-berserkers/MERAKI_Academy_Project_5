import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function Users() {
    //===============================================================
    let token = localStorage.getItem("token");
    //===============================================================
    const [allUser, setAllUser] = useState(false)
    const [toggle, setToggle] = useState(true)

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


    }, [toggle]);


    const deleteUser = (id) => {
        console.log(id);
        axios.delete(`${process.env.REACT_APP_BACKEND}/users/${id}`)
            .then(function (response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
                setToggle(!toggle)
            });
    }

    const unDeleteUser = () => { }
    const Admin = () => { }
    const NotAdmin = () => { }



    return (
        <Container>
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
                                <div className="ms-3 me-auto">
                                    <Stack spacing={2} direction="row">
                                        <Avatar alt="Remy Sharp" src={user.img} />
                                        <Stack spacing={2} direction="column">
                                            <div>{user.first_name} {user.last_name}</div>
                                            <div>{user.created_at?.split("T")[0]}</div>
                                        </Stack>
                                    </Stack>
                                </div>
                                <div >
                                    <Stack spacing={2} direction="column">
                                        {user.is_deleted ? <>
                                        <Button variant="outlined" id={user.id} >unDelete</Button>
                                        </> : <>
                                        <Button variant="outlined" id={user.id} onClick={(e)=>{deleteUser(e.target.id)}} >delete</Button></>}
                                        {user.is_deleted ? <>
                                        <Button variant="outlined">unAdmin</Button>
                                        </> : <>
                                        <Button variant="outlined">admin</Button></>}
                                    </Stack>
                                </div>
                            </ListGroup.Item>

                        )
                    })}

                    { }

                </> : <></>}



            </ListGroup>

        </Container>
    )
}

export default Users