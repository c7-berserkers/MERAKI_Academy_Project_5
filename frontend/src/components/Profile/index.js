import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./index.css"
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useDispatch, useSelector } from "react-redux";

export default function Profile() {

    const [dataUser, setDataUser] = useState(undefined)
    const [dataUserPost, setDataUserPost] = useState(undefined)

    const dispatch = useDispatch();
    const state = useSelector((state) => {
        
        return {
        
        };
    });


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND}/users/${localStorage.getItem("userId")}`, {
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
    }, []);




    return (

        <div>


            {dataUser ? <>
                <CardContent>
                    <div className="flex">
                        <div id="wrapper">
                            <div id="image_div">
                                <p className="img_wrapper">
                                    <img className="MyProfileImg" src={dataUser.img} />
                                    
                                        <span  className="MyProfileImgButton">
                                            <Button onClick={()=>{console.log("a")}} variant="contained">
                                                    <EditNoteIcon />
                                            </Button>
                                        </span>
                                
                                </p>
                            </div>
                        </div>
                        <div className="userData">
                            <h4> {dataUser.first_name}  {dataUser.last_name}  </h4>
                            <h4>Email : {dataUser.email}</h4>
                            <h4>Age : {dataUser.age}</h4>
                            <h4>Country : {dataUser.country}</h4>
                        </div>
                        <div className="userDataEdit">
                            <Stack direction="row" spacing={2}>
                                <Button variant="contained" onClick={()=>{console.log("z")}}  endIcon={<EditNoteIcon />}>
                                    Edit
                                </Button>
                            </Stack>
                        </div>
                    </div>
                </CardContent>
            </> : <p>noData</p>}

            <hr style={{ backgroundColor: "black", fontSize: "2em" }} />


        </div>
    )
}
