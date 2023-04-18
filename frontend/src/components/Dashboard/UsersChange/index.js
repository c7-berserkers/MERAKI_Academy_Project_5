import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useEffect } from "react";
import axios from "axios";


function Users() {
    //===============================================================
    let token = localStorage.getItem("token");
    //===============================================================

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND}/users/`, {
                headers: {
                    Authorization: `${token}`,
                },
            })
            .then(function (response) {
                
                console.log(response.data.users,"users")
            })
            .catch(function (error) {
                console.log(error);
            });
        //===============================================================


    }, []);


    const deleteUser=()=>{}
    const unDeleteUser=()=>{}
    const Admin=()=>{}
    const NotAdmin=()=>{}



    return (<>
            <ListGroup.Item action >
                All User
            </ListGroup.Item>
        <ListGroup as="ol" numbered>
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
                <div className="ms-2 me-auto">
                    <div className="fw-bold">Subheading</div>
                    Cras justo odio
                </div>
                <Badge bg="primary" pill>
                    14
                </Badge>
            </ListGroup.Item>
            
        </ListGroup>
        </>
    )
}

export default Users