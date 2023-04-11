import React, { useContext, useState, useEffect } from "react";
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

  const postFunction = async () => {
    try {
      const result = await axios.get("http://localhost:5000/posts/2", {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      if (result.data.success) {
        console.log(result.data)
        setMessage("");
        setStatus(false)
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        setStatus(true)
        return setMessage(error.response.data.message);
      }
      setStatus(true)
      setMessage("Error happened while Get Data, please try again");
    }
  };



  useEffect( postFunction(),[])
    

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











