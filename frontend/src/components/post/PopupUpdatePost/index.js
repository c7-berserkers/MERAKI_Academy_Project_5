import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import "./style.css"
import { useDispatch, useSelector } from "react-redux";
import { Container,Alert } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { setPosts, setComments, addComment,updatePosts } from "../../redux/reducers/posts/index";


const Popup_Post_Edit = (props) => {
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(false);
    const [post, setPost] = useState(props.post);
    const [updatePost, setUpdatePost] = useState("");
    const [postId, setPostId] = useState(props.id);


    const dispatch = useDispatch();

    const state = useSelector((state) => {
      
        return {
          userId: state.auth.userId,
          token: state.auth.token,
          userLikes: state.auth.userLikes,
          pfp: state.auth.pfp,
          
        };
      });
    
  //===============================================================

    const updateComment = async(e) => {
        try {
          const result = await axios.put(`${process.env.REACT_APP_BACKEND}/posts/${e.target.value}`,{description:updatePost},{
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          });
          if (result.data.success) {
            dispatch(updatePosts(result.data.result));
            setMessage("");
            setStatus(false)
            try {
              const result = await axios.get(`${process.env.REACT_APP_BACKEND}/posts/${e.target.value}`, {
                headers: {
                  Authorization: `Bearer ${state.token}`,
                },
              });
              if (result.data.success) {
                dispatch(setPosts([result.data.post]));
                dispatch(setComments({post_id:result.data.post.id,comments:result.data.comments}));
                props.set(false)
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
          } else throw Error;
        } catch (error) {
          if (!error.response.data.success) {
            setStatus(true)
            return setMessage(error.response.data.message);
          }
          setStatus(true)
          setMessage("Error happened while update post, please try again");
        }
    }

  //===============================================================

    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        update you'r post
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>new post description:</Form.Label>
                    <Form.Control defaultValue={post} name="img" onChange={(e) =>{setUpdatePost(e.target.value)}} />
                </Modal.Body>
                <Modal.Footer>
                    <div className="addSubmit">
                        <Button value={postId} variant="primary" onClick={(e) => {updateComment(e)}}>submit</Button>
                    </div>
                    <Button className="shadowButton" onClick={props.onHide}>Close</Button>
                </Modal.Footer>
                
        <Container>
                  {status && <Alert variant="danger">{message}</Alert>}
        </Container>
            </Modal>
        </div>
    )
}

export default Popup_Post_Edit