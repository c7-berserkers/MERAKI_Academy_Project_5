import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';
import "./index.css"

export default function Profile() {
    const BACKEND = process.env.REACT_APP_BACKEND;
    const [dataUser, setDataUser] = useState(undefined)
    const [dataUserPost, setDataUserPost] = useState(undefined)


    useEffect(() => {
        axios.get(`${BACKEND}/${localStorage.getItem("userId")}`, {
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

                <div className="flex">
                    <div id="wrapper">
                        <div id="image_div">
                            <p className="img_wrapper">
                                <img className="MyProfileImg" src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?cs=srgb&dl=pexels-mohamed-abdelghaffar-771742.jpg&fm=jpg" alt="no photo found" />
                                <span><input onClick={() => {}} type="button" value="+" /></span>
                            </p>
                        </div>
                    </div>
                </div>
            </> : <p>noData</p>}


        </div>
    )
}
