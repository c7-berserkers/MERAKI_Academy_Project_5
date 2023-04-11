import React, { useContext, useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Form, Alert, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
//===============================================================

const Post = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  
    const state = useSelector((state) => {
      
      return {
        userId: state.auth.userId,
        token: state.auth.token,
        userLikes: state.auth.userLikes,
        
      };
    });

  const [comments, setComments] = useState("");
  const [message, setMessage] = useState("");
  const [addComment, setAddComment] = useState("");
  const [status, setStatus] = useState(false);

  //===============================================================

  useEffect( async()=>{
    try {
      const result = await axios.post("http://localhost:5000/users/login");
      if (result.data) {
        console.log(result.data)
        setMessage("")
        setStatus(false)
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        setStatus(true)
        return setMessage(error.response.data.message);
      }
      setStatus(true)
      setMessage("Error happened while Login, please try again");
    }
  },[])
    

  //===============================================================

  

  //===============================================================
  
  return (
    <div className="login" >
      <Container>
        <p>hi i am post</p>
      </Container>
    </div>    
  );
};

export default Post;











