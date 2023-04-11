import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';
import "./index.css"

export default function Profile() {

    const [dataUser, setDataUser] = useState(undefined)
    const [dataUserPost, setDataUserPost] = useState(undefined)


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

                <div className="flex">
                    <div id="wrapper">
                        <div id="image_div">
                            <p className="img_wrapper">
                                <img className="MyProfileImg" src={dataUser.img}/>
                                <span><input onClick={() => {}} type="button" value="+" /></span>
                            </p>
                        </div>
                    </div>
                    <div className="userData">
                    <h3> Name : {dataUser.first_name}  {dataUser.last_name}  </h3>
                    <h3>Email : {dataUser.email}</h3>
                    <h3>Age : {dataUser.age}</h3>
                    <h3>Country : {dataUser.country}</h3>
                    </div>
                </div>
            </> : <p>noData</p>}


        </div>
    )
}
