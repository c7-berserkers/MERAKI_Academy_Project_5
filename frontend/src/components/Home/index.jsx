import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Container from "@mui/material/Container";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setComments } from "../redux/reducers/posts";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { MdComment } from "react-icons/md";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Form from "react-bootstrap/Form";

// ----------------------------------------------
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(0deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Home() {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const { token, posts, pfp, userId } = useSelector((state) => {
    return {
      token: state.auth.token,
      userId: state.auth.userId,
      pfp: state.auth.pfp,
      posts: state.posts.posts,
    };
  });
  const [expanded, setExpanded] = useState(false);
  const BACKEND = process.env.REACT_APP_BACKEND;

  // ---------------------------------------
  const getPosts = async () => {
    try {
      const result = await axios.get(`${BACKEND}/posts/following/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (result.data.success) {
        dispatch(setPosts(result.data.result));
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return console.log(error.response.data.message);
      }
      console.log("Error happened while Get Data, please try again");
    }
  };

  const getCommentsForPost = async (id) => {
    try {
      const result = await axios.get(`${BACKEND}/comments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (result.data.success) {
        const comments = result.data.result;
        console.log(comments);
        dispatch(
          setComments({
            comments,
            post_id: id,
          })
        );
      } else throw Error;
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const handleExpandClick = (id) => {
    return () => {
      if (expanded) {
        setExpanded(false);
      } else {
        setExpanded(id);
        getCommentsForPost(id);
      }
    };
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {" "}
      <div className="new-post">x</div>
      <div className="feed">
        <Container>
          {posts.map((post) => {
            return (
              <Card key={post.id} sx={{ margin: "10px 0" }}>
                <CardHeader
                  avatar={
                    <Avatar
                      sx={{ bgcolor: red[500] }}
                      src={post.user_img}
                      aria-label="recipe"
                    ></Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={post.user_first_name}
                  subheader={post.created_at}
                />

                <CardMedia
                  component="img"
                  // height="194"
                  image={post.img}
                  alt="post"
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

                  <ExpandMore
                    expand={expanded === post.id}
                    onClick={handleExpandClick(post.id)}
                    aria-expanded={expanded === post.id}
                    aria-label="show more"
                  >
                    <MdComment />
                  </ExpandMore>
                </CardActions>
                <Collapse
                  in={expanded === post.id}
                  timeout="auto"
                  unmountOnExit
                >
                  <CardContent>
                    <div style={{ display: "flex", marginBottom: "20px" }}>
                      <Avatar
                        style={{ height: "55px", width: "55px" }}
                        alt="user"
                        src={pfp}
                      />
                      <Form
                        style={{ display: "flex", width: "100%" }}
                        onSubmit={async (e) => {
                          e.preventDefault();
                          try {
                            const result = await axios.post(
                              `${BACKEND}/comments/${post.id}`,
                              { comment: e.target[0].value },
                              {
                                headers: { Authorization: `Bearer ${token}` },
                              }
                            );
                            if (result.data.success) {
                              console.log(result.data.result);
                            } else throw Error;
                          } catch (err) {
                            console.log(err);
                          }
                        }}
                      >
                        <Form.Control
                          style={{ margin: "0 10px", width: "95%" }}
                          type="text"
                          placeholder="Add a comment.."
                        />
                        <Button
                          type="submit"
                          variant="contained"
                          endIcon={<SendIcon />}
                        >
                          Send
                        </Button>
                      </Form>
                    </div>
                    <div>
                      {" "}
                      <List
                        sx={{
                          width: "100%",
                          maxWidth: 360,
                          bgcolor: "background.paper",
                        }}
                      >
                        {post.comments ? (
                          post.comments.map((comment) => {
                            return (
                              <ListItem key={comment.id}>
                                <ListItemAvatar>
                                  <Avatar src={comment.img} />
                                </ListItemAvatar>
                                <ListItemText
                                  primary={comment.comment}
                                  secondary={`By ${comment.first_name}`}
                                />
                              </ListItem>
                            );
                          })
                        ) : (
                          <></>
                        )}
                      </List>
                    </div>
                  </CardContent>
                </Collapse>
              </Card>
            );
          })}
        </Container>
      </div>
    </div>
  );
}
