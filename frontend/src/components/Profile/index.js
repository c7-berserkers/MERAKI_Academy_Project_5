import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';


export default function Profile() {

    const [dataUser, setDataUser] = useState({})
    const [dataUserPost, setDataUserPost] = useState({})


    useEffect(() => {
        axios.get(`http://localhost:5000/users/${localStorage.getItem("userId")}`,{
            headers: {
            'Authorization': `${localStorage.getItem("userId")}`
            }
        })
        .then(function (response) {
        console.log(response.data)
        setDataUser(response.data.user)
        setDataUserPost(response.data.userPosts)
        })
        .catch(function (error) {
        console.log(error);
        });
    },[]);
    



return (

    <div>index</div>
)
}
