import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import {
  setPosts,
  setComments,
  addComment,
  deletePosts,
  deleteComment,
  updateComment,
  addLikePost,
  removeLikePost,
} from "../redux/reducers/posts";
import { removeLike, addLike } from "../redux/reducers/auth";
import SendIcon from "@mui/icons-material/Send";
import { MdComment } from "react-icons/md";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Form from "react-bootstrap/Form";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import Popup_Post_Edit from "./PopupUpdatePost/index";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

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

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

//===============================================================

const Post = () => {
  const navigate = useNavigate();
  const [showUpdate, setShowUpdate] = useState(false);

  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = (id) => setShowUpdate(id);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { token, post, pfp, userId, userName, role, likes } = useSelector(
    (state) => {
      return {
        token: state.auth.token,
        role: state.auth.role,
        userId: state.auth.userId,
        pfp: state.auth.pfp,
        post: state.posts.posts,
        userName: state.auth.userName,
        likes: state.auth.userLikes,
      };
    }
  );
  const [expanded, setExpanded] = useState(false);
  const BACKEND = process.env.REACT_APP_BACKEND;

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  const [modalShowEditPopupPostUpdate, setModalShowEditPopupPostUpdate] =
    useState(false);
  console.log(post);
  //===============================================================

  const [show, setShow] = useState(false);

  // --------------------

  const nwePostId = window.location.pathname.split("/post/")[1];
  //===============================================================

  const getPostFunction = async () => {
    try {
      const result = await axios.get(`${BACKEND}/posts/${nwePostId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result.data.success) {
        setMessage("");
        setStatus(false);
        dispatch(setPosts([result.data.post]));
        dispatch(
          setComments({
            post_id: result.data.post.id,
            comments: result.data.comments,
          })
        );
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        setStatus(true);
        return setMessage(error.response.data.message);
      }
      setStatus(true);
      setMessage("Error happened while Get Data, please try again");
    }
  };

  //===============================================================

  useEffect(() => {
    getPostFunction();
  }, []);

  //===============================================================
  const isLiked = (arr, id) => {
    return arr.findIndex((e) => {
      return e.posts_id === id;
    });
  };
  //===============================================================
  const deletePost = async (id) => {
    try {
      const result = await axios.delete(`${BACKEND}/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (result.data.success) {
        dispatch(deletePosts(id));
        navigate("/");
      } else throw Error;
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const getCommentsForPost = async (id) => {
    try {
      const result = await axios.get(`${BACKEND}/comments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (result.data.success) {
        const comments = result.data.result;
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

  const deleteCommentFunction = async (id, post_id) => {
    try {
      const result = await axios.delete(`${BACKEND}/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result.data.success) {
        dispatch(deleteComment({ id, post_id }));
      } else throw Error;
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const updateCommentFunction = async (id, post_id, comment) => {
    try {
      const result = await axios.put(
        `${BACKEND}/comments/${id}`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.data.success) {
        dispatch(updateComment({ id, post_id, comment }));
      } else throw Error;
    } catch (error) {
      console.log(error.response.data.message);
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

  //===============================================================
  if (post[0]) {
    return (
      <div className="post">
        <Container>
          <Card key={post[0].id} sx={{ margin: "10px 0" }}>
            <CardHeader
              avatar={
                <Avatar
                  onClick={(e) => {
                    navigate(`/profile/${post[0].user_id}`);
                  }}
                  sx={{ bgcolor: red[500] }}
                  src={post[0].user_img}
                  aria-label="recipe"
                ></Avatar>
              }
              action={
                userId == post[0].user_id && (
                  <IconButton
                    aria-controls={open ? "long-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    aria-label="settings"
                  >
                    <MoreVertIcon />
                  </IconButton>
                )
              }
              title={post[0].first_name}
              subheader={post[0].created_at}
            />

            {}
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  width: "20ch",
                },
              }}
            >
              <MenuItem
                onClick={(e) => {
                  deletePost(post[0].id);
                  handleClose();
                }}
              >
                Delete Post
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  setModalShowEditPopupPostUpdate(true);
                  handleClose();
                }}
              >
                Update Post
              </MenuItem>
            </Menu>

            <CardMedia
              component="img"
              // height="194"
              image={post[0].img}
              alt="post"
            />
            <CardContent>
              <p>
                <strong>{post[0].description}</strong>
              </p>
            </CardContent>
            <CardActions disableSpacing>
              {isLiked(likes, post[0].id) !== -1 ? (
                <div style={{ display: "flex" }}>
                  <IconButton
                    onClick={(e) => {
                      axios
                        .delete(`${BACKEND}/likes/${post[0].id}`, {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        })
                        .then((result) => {
                          dispatch(removeLikePost(post[0].id));
                          dispatch(removeLike(post[0].id));
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                    aria-label="add to favorites"
                  >
                    <FavoriteIcon style={{ color: "red" }} />
                  </IconButton>
                  <p style={{ margin: "10px" }}>
                    {parseInt(post[0].likes_count)}
                  </p>
                </div>
              ) : (
                <div style={{ display: "flex" }}>
                  {" "}
                  <IconButton
                    onClick={(e) => {
                      const payload = {
                        posts_id: post[0].id,
                        user_id: userId,
                      };
                      axios
                        .post(
                          `${BACKEND}/likes/${post[0].id}`,
                          {},
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        )
                        .then((result) => {
                          dispatch(addLikePost(post[0].id));
                          dispatch(addLike(payload));
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                    aria-label="add to favorites"
                  >
                    <FavoriteIcon />
                  </IconButton>
                  {console.log(post.likes_count)}
                  <p style={{ margin: "10px" }}>{post.likes_count}</p>
                </div>
              )}

              <ExpandMore
                expand={expanded === post[0].id}
                onClick={handleExpandClick(post[0].id)}
                aria-expanded={expanded === post[0].id}
                aria-label="show more"
              >
                <MdComment />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded === post[0].id} timeout="auto" unmountOnExit>
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
                          `${BACKEND}/comments/${post[0].id}`,
                          { comment: e.target[0].value },
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        );
                        if (result.data.success) {
                          const comment = result.data.result;
                          comment.img = pfp;
                          comment.first_name = userName;
                          dispatch(
                            addComment({
                              post_id: post[0].id,
                              comment,
                            })
                          );
                          e.target[0].value = "";
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

                      bgcolor: "background.paper",
                    }}
                  >
                    <ListGroup>
                      {post[0].comments ? (
                        post[0].comments.map((comment) => {
                          return (
                            <ListGroup.Item
                              key={comment.id}
                              style={{
                                display: "flex",
                              }}
                            >
                              <ListItem>
                                <ListItemAvatar>
                                  <Avatar
                                    onClick={(e) => {
                                      navigate(`/profile/${comment.user_id}`);
                                    }}
                                    src={comment.img}
                                  />
                                </ListItemAvatar>
                                <ListItemText
                                  primary={comment.comment}
                                  secondary={`By ${comment.first_name}`}
                                />
                              </ListItem>
                              {(role === "Admin" ||
                                userId == comment.user_id) && (
                                <>
                                  {userId == comment.user_id && (
                                    <>
                                      <IconButton
                                        onClick={(e) => {
                                          handleShowUpdate(comment.id);
                                        }}
                                        aria-label="edit comment"
                                      >
                                        <MdEdit />
                                      </IconButton>
                                      <Modal
                                        show={showUpdate === comment.id}
                                        onHide={handleCloseUpdate}
                                      >
                                        <Modal.Header closeButton>
                                          <Modal.Title>
                                            Update Comment
                                          </Modal.Title>
                                        </Modal.Header>

                                        <Form
                                          onSubmit={(e) => {
                                            e.preventDefault();
                                            updateCommentFunction(
                                              comment.id,
                                              post[0].id,
                                              e.target[0].value
                                            );
                                            handleCloseUpdate();
                                          }}
                                        >
                                          <Modal.Body>
                                            <Form.Control
                                              type="text"
                                              defaultValue={comment.comment}
                                            />
                                          </Modal.Body>
                                          <Modal.Footer>
                                            <Button type="submit">
                                              Save Changes
                                            </Button>
                                          </Modal.Footer>
                                        </Form>
                                      </Modal>
                                    </>
                                  )}

                                  <IconButton
                                    onClick={(e) => {
                                      deleteCommentFunction(
                                        comment.id,
                                        post[0].id
                                      );
                                    }}
                                    aria-label="delete comment"
                                  >
                                    <MdDelete />
                                  </IconButton>
                                </>
                              )}
                            </ListGroup.Item>
                          );
                        })
                      ) : (
                        <></>
                      )}
                    </ListGroup>
                  </List>
                </div>
              </CardContent>
            </Collapse>
          </Card>
          <Popup_Post_Edit
            set={setModalShowEditPopupPostUpdate}
            id={post[0].id}
            post={post[0].description}
            show={modalShowEditPopupPostUpdate}
            onHide={() => setModalShowEditPopupPostUpdate(false)}
          />
        </Container>
      </div>
    );
  } else {
    return <p>loading</p>;
  }
};

export default Post;
