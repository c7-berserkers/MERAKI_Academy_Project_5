import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Container,Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
import Popup_Comment_Edit from './PopupUpdatePost/index'

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

   

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

//===============================================================

const Post = () => {

  const [modalShowEditPopup, setModalShowEditPopup] = useState(false)
 
  const navigate = useNavigate();

  const dispatch = useDispatch();
  
    const state = useSelector((state) => {
      
      return {
        userId: state.auth.userId,
        token: state.auth.token,
        userLikes: state.auth.userLikes,
        pfp: state.auth.pfp,
        
      };
    });

  const [comments, setComments] = useState("");
  const [post, setPost] = useState("");
  const [message, setMessage] = useState("");
  const [addComment, setAddComment] = useState("");
  const [status, setStatus] = useState(false);

  //===============================================================

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  //===============================================================

  const getPostFunction = async () => {
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
        setComments(result.data.comments)
        setPost(result.data.post)
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        setStatus(true)
        return setMessage(error.response.data.message);
      }
      setStatus(true)
      setMessage("Error happened while Get Data, please try again");
    }
  }

  //===============================================================

   useEffect( ()=>{getPostFunction()},[])

  //===============================================================
 const commentFunction= ()=>{

    return comments.length>0? comments.map((e,i)=>{
        return (
          <div key={e.id}>
        <Card key={e.id} sx={{ minWidth: 275 }}>
        <CardContent>
        <CardActions>
        <Avatar alt="Remy Sharp" src={e.user_img} />
          <Button size="small">{e.first_name}</Button>
        </CardActions>
        <Typography variant="body2">
          {e.comment}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {e.created_at}
          </Typography>
          {e.user_id == state.userId?
          <Stack direction="row" spacing={2}>
      <Button value={e.id} variant="outlined" onClick={(e) => {
              deleteCommentFunction(e);
            }} startIcon={<DeleteIcon />}>Delete</Button>
      <Button variant="contained" onClick={(e) => {
              setModalShowEditPopup(!modalShowEditPopup);
            }}>update</Button>
    </Stack>:""}
        </CardContent>
      </Card>
      <br></br>
      </div>
        )
    }):<p>no comment yet</p>
 }
   //===============================================================

   const addCommentFunction = async(e)=>{
    if(!addComment){
      setMessage("please enter you'r comment");
      setStatus(true)
      return
    }
    try {
      const result = await axios.post(`http://localhost:5000/comments/${e.target.value}`, {comment:addComment},{
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
      setMessage("Error happened while Add Comment, please try again");
    }
   }

   const deleteCommentFunction = async(e)=>{
    console.log(e.target.value)
    try {
      const result = await axios.delete(`http://localhost:5000/comments/${e.target.value}`,{
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
      setMessage("Error happened while delete Comment, please try again");
    }
   }

  //===============================================================
  
  return (
    <div className="post" >
      <Container>
       
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <Avatar alt="Remy Sharp" src={post.user_img} />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon/>
          </IconButton>
        }
        title={post.first_name}
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image={post.img}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>comment:</Typography>
          {commentFunction()}
          <br></br>
    <div style={{ display: "flex", marginBottom: "20px" }}>
                      <Avatar
                        style={{ height: "55px", width: "55px" }}
                        alt="user"
                        src={state.pfp}
                      />
                      <TextField
                          onChange={(e) => setAddComment(e.target.value)}
                        style={{ margin: "0 10px", width: "85%" }}
                        id="outlined-basic"
                        label="Add a comment..."
                        variant="outlined"
                      />
                      <Button value={post.id} variant="contained" endIcon={<SendIcon />} onClick={(e) => {
              addCommentFunction(e);
            }}>
                        Send
                      </Button>
                    </div>
        </CardContent>
        <Container>
                  {status && <Alert variant="danger">{message}</Alert>}
        </Container>
      </Collapse>
    </Card>
      </Container>
      <Popup_Comment_Edit show={modalShowEditPopup} onHide={() => setModalShowEditPopup(false)} />
    </div>    
  );
};

export default Post;











