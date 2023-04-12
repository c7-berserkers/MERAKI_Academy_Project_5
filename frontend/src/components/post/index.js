import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
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
          {e.user_id == state.userId?<Button variant="outlined" startIcon={<DeleteIcon />}onClick={(e) => {
              deleteCommentFunction(e);
            }} value={e.id}>
  Delete
</Button>:""}
        </CardContent>
      </Card>
        )
    }):<p>no comment yet</p>
 }
   //===============================================================

   const addCommentFunction = async(e)=>{

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

   const deleteCommentFunction =(e)=>{
    console.log(e.target.value)
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
            <MoreVertIcon />
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
          <Form style={{maxWidth: "400px",alignSelf: "center"}}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Comment</Form.Label>
        <Form.Control type="text" placeholder="Enter you'r comment"  onChange={(e) => setAddComment(e.target.value)}/>
      </Form.Group>
      <Button variant="contained" endIcon={<SendIcon />} value={post.id} onClick={(e) => {
              addCommentFunction(e);
            }}>
        Send
      </Button>
    </Form>
        </CardContent>
      </Collapse>
    </Card>
      </Container>
    </div>    
  );
};

export default Post;











