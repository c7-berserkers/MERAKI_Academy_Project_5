import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useEffect,useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
    setPosts,
    updatePosts
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

      const [ref, setRef] = useState(false);

      
      //===============================================================

      const getPostsFunction =()=>{
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
      }
    useEffect(() => {
        getPostsFunction()
    }, []);

    //===============================================================
    const deletePosts=(e)=>{
axios.delete(`${process.env.REACT_APP_BACKEND}/posts/${e.target.value}`, {
                headers: {
                    Authorization: `${token}`,
                },
            })
            .then(function (response) {
                console.log(response.data)
                getPostsFunction()
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //===============================================================

    const unDeletePosts=(e)=>{
        axios.delete(`${process.env.REACT_APP_BACKEND}/posts/undelete/${e.target.value}`, {
            headers: {
                Authorization: `${token}`,
            },
        })
        .then(function (response) {
            getPostsFunction()
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    //===============================================================

    const postFunction =()=>{
        return posts.length>0?posts.map((e,i)=>{
            return (
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
                key={e.id}
            >
                <div className="ms-2 me-auto">
                    <div className="fw-bold">{e.user_first_name}</div>
                    {e.description}
                <br></br>
                <hr></hr>
                {e.is_deleted?<Button value={e.id} variant="warning" onClick={(e)=>{
                    unDeletePosts(e)
                }}>disband</Button>:<Button value={e.id} variant="danger"  onClick={(e)=>{
                    deletePosts(e)
                }}>band</Button>}
                </div>
                <Image src={e.img} width="180" height="150" rounded />
            </ListGroup.Item>
            
            )
        }):<p>no post yet</p>
    }


    //===============================================================



    return (<>
    <ListGroup as="ul" >
        {postFunction()}
        </ListGroup>
        </>
    )
}

export default Post