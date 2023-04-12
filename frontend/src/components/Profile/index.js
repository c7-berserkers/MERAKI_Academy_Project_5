import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./index.css"
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import EditNoteIcon from '@mui/icons-material/EditNote';

  //===============================================================

import Popup_Image_Edit from './PopupImageChange'
import Popup_Edit_Data from './PopupEditMyData/index'

  //===============================================================


import { useDispatch, useSelector } from "react-redux";
import {setUserData, setUserPosts}from "../redux/reducers/profile/index";


  //===============================================================

export default function Profile() {

//===============================================================

    const [modalShowEditPopupImage, setModalShowEditPopupImage] = useState(false)
    const [modalShowEditPopupMyProfile, setModalShowEditPopupMyProfile] = useState(false)

//===============================================================

    const dispatch = useDispatch();
    const state = useSelector((state) => {
        
        return {
            dataUser : state.profile.UserData,
            postsUser : state.profile.UserPosts,
        };
    });

  //===============================================================


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND}/users/${localStorage.getItem("userId")}`, {
            headers: {
                'Authorization': `${localStorage.getItem("userId")}`
            }
        })
            .then(function (response) {
                console.log(response.data,"my data")
                dispatch(setUserData(response.data.user))
                dispatch(setUserPosts(response.data.userPosts))
                
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);


  //===============================================================

    return (

        <div>


            {state.dataUser ? <>
                <CardContent>
                    <div className="flex">
                        <div id="wrapper">
                            <div id="image_div">
                                <p className="img_wrapper">
                                    <img className="MyProfileImg" src={state.dataUser.img} />
                                    
                                        <span  className="MyProfileImgButton">
                                            <Button onClick={() => { setModalShowEditPopupImage(true) }} variant="contained">
                                                    <EditNoteIcon />
                                            </Button>
                                        </span>
                                
                                </p>
                            </div>
                        </div>
                        <div className="userData">
                        <Popup_Image_Edit show={modalShowEditPopupImage} onHide={() => setModalShowEditPopupImage(false)} />
                        <Popup_Edit_Data show={modalShowEditPopupMyProfile} onHide={() => setModalShowEditPopupMyProfile(false)} />
                            <h4> {state.dataUser.first_name}  {state.dataUser.last_name}  </h4>
                            <h4>Email : {state.dataUser.email}</h4>
                            <h4>Age : {state.dataUser.age}</h4>
                            <h4>Country : {state.dataUser.country}</h4>
                        </div>
                        <div className="userDataEdit">
                            <Stack direction="row" spacing={2}>
                                <Button variant="contained" onClick={() => { setModalShowEditPopupMyProfile(true) }}  endIcon={<EditNoteIcon />}>
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

      //===============================================================
}
