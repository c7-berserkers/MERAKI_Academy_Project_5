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

    const getAllUsers = () => {
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
        }
    //===============================================================

    useEffect(() => {getAllUsers()},[toggle]);

    //===============================================================


    


    const deleteUser = (id) => {
        console.log(id);
        axios.delete(`${process.env.REACT_APP_BACKEND}/users/${id}`)
            .then(function (response) {
                console.log(response.data)
                setToggle(!toggle)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const unDeleteUser = (id) => {
        console.log(id);
        axios.put(`${process.env.REACT_APP_BACKEND}/users/unDelete/${id}`)
            .then(function (response) {
                console.log(response.data)
                setToggle(!toggle)
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    const Admin = (e) => {
console.log(e.target.value)
     }
    const NotAdmin = (e) => {
        console.log(e.target.value)

     }
    const disband = (e) => {
        console.log(e.target.value)

     }
    const band = (e) => {
        console.log(e.target.value)

     }


    const allUserFunction=()=>{
        return allUser.length>0?allUser.map((user) => {
            return (
                <ListGroup.Item
                    key={user.id}
                    as="li"
                    className="d-flex justify-content-between align-items-start">
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

                            {user.role_id==1 ? <>
                            <Button variant="outlined" value={user.id} onClick={(e)=>{
                                NotAdmin(e)
                            }}>unAdmin</Button>
                            </> : <>
                            <Button variant="outlined"  value={user.id} onClick={(e)=>{
                                Admin(e)
                            }}>admin</Button></>}

                            {user.is_deleted ? <>
                            <Button variant="outlined"  value={user.id} onClick={(e)=>{
                                disband(e)
                            }}>disband</Button>
                            </> : <>
                            <Button variant="outlined"  value={user.id} onClick={(e)=>{
                                band(e)
                            }}>band</Button></>}

                        </Stack>
                    </div>
                </ListGroup.Item>
            )
                            }):<p>no user yet</p>
                        }

    return (
        <Container>
            <ListGroup.Item action >
                All User
            </ListGroup.Item>
            <ListGroup as="ol" numbered>
                {allUserFunction()}
            </ListGroup>
        </Container>
    )
}

export default Users