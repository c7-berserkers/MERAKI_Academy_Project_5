import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
    setPosts,
    setComments,
    deleteComment,
  } from "../../redux/reducers/posts/index";
  import Image from 'react-bootstrap/Image';
  import Button from 'react-bootstrap/Button';


function Post() {

    const dispatch = useDispatch();


    const { token, posts, pfp, userId, userName, role, likes } = useSelector(
        (state) => {
          return {
            token: state.auth.token,
            role: state.auth.role,
            userId: state.auth.userId,
            pfp: state.auth.pfp,
            posts: state.posts.posts,
            userName: state.auth.userName,
            likes: state.auth.userLikes,
          };
        }
      );    
      
      //===============================================================

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND}/posts/`, {
                headers: {
                    Authorization: `${token}`,
                },
            })
            .then(function (response) {
                dispatch(setPosts(response.data.result));
                console.log(response.data.result,"posts")
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);


    const deletePosts=()=>{}
    const unDeletePosts=()=>{}

    //===============================================================

    const postFunction =()=>{
        return posts.length>0?posts.map((e,i)=>{
            return (
                <ListGroup as="ul" >
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
                <div className="ms-2 me-auto">
                    <div className="fw-bold">{e.user_first_name}</div>
                    {e.description}
                <br></br>
                <hr></hr>
                {e.is_deleted?<Button variant="warning">disband</Button>:<Button variant="danger">band</Button>}
                </div>
                <Image src={e.img} width="180" height="150" rounded />
            </ListGroup.Item>
            
        </ListGroup>
            )
        }):<p>no post yet</p>
    }


    //===============================================================



    return (<>
        {postFunction()}
        </>
    )
}

export default Post