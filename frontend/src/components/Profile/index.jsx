import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
//=============================posts=================================
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { MdComment } from "react-icons/md";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Collapse from "@mui/material/Collapse";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled } from "@mui/material/styles";
import ButtonGroup from "@mui/material/ButtonGroup";
import Skeleton from "@mui/material/Skeleton";

import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Tooltip from "@mui/material/Tooltip";
import SettingsIcon from "@mui/icons-material/Settings";
import { MdDelete, MdEdit } from "react-icons/md";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import List from "@mui/material/List";
import Modal from "react-bootstrap/Modal";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import SendIcon from "@mui/icons-material/Send";

//==============================================================
import Popup_Image_Edit from "./PopupImageChange/index";
import Popup_Edit_Data from "./PopupEditMyData/index";
import Popup_Delete_Profile from "./PopupDeleteAccount/index";
import Popup_Edit_MyPassword from "./PopupEditMyPassword/index";
import Popup_Add_New_Post from "./PopupAddNewPost/index";

//===============================================================

import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import PeopleIcon from "@mui/icons-material/People";
import MenuItem from "@mui/material/MenuItem";
import BurstModeIcon from "@mui/icons-material/BurstMode";

//===============================================================

import { useDispatch, useSelector } from "react-redux";
import {
  setUserData,
  setFollowing_plus1,
  setFollowing_minus1,
  setFollowingData,
  setFollowerData,
} from "../redux/reducers/profile/index";

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

//=========================posts======================================
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

//===============================================================

export default function Profile() {
  const navigate = useNavigate();
  let personPage =
    window.location.pathname.split("/")[
      window.location.pathname.split("/").length - 1
    ];
  let user_Id_Number = localStorage.getItem("userId");

  //==============================================================
  const [follow, setFollow] = useState(false);
  const [showFollowerOrFollowing, setShowFollowerOrFollowing] = useState(false);
  const [showFollow, setShowFollow] = useState(false);
  const [followerOrFollowingHolder, setFollowerOrFollowingHolder] =
    useState(false);

  //===============================================================

  const dispatch = useDispatch();
  const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

  //=============================posts===============================

  const [show, setShow] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //===============================================================

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [modalShowEditPopupImage, setModalShowEditPopupImage] = useState(false);
  const [modalShowPopupAddNewPost, setModalShowPopupAddNewPost] =
    useState(false);
  const [modalShowEditPopupMyProfile, setModalShowEditPopupMyProfile] =
    useState(false);
  const [modalShowEditPopupDeleteProfile, setModalShowEditPopupDeleteProfile] =
    useState(false);
  const [
    modalShowEditPopupEditMyPassword,
    setModalShowEditPopupEditMyPassword,
  ] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [tags, setTags] = useState([]);
  const [postPicker, setPostPicker] = useState(null);
  const [postDescription, setPostDescription] = useState("");
  let inFollowingState_0 = false;
  //===============================================================
  const state = useSelector((state) => {
    return {
      dataUser: state.profile.UserData,
      postsUser: state.posts.posts,
      allFollower: state.profile.allFollower,
      allFollowing: state.profile.allFollowing,
    };
  });

  //==========================posts=================================
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

  const BACKEND = process.env.REACT_APP_BACKEND;
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleClose22 = () => setShow(false);
  const handleShowUpdate = (id) => setShowUpdate(id);
  // ====================
  const isLiked = (arr, id) => {
    return arr.findIndex((e) => {
      return e.posts_id === id;
    });
  };

  // =====================
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
  // ====================
  const tagsFunction = () => {
    return tags.length > 0
      ? tags.map((tag, i) => {
          return (
            <ListGroup.Item
              key={tag.id}
              id={tag.id}
              onClick={(e) => {
                navigate(`/tag/${tag.id}`);
              }}
              className="list-filter"
            >
              <strong>{tag.tag}</strong>
            </ListGroup.Item>
          );
        })
      : "";
  };

  // ===================
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

  //=====================
  const deletePost = async (id) => {
    try {
      const result = await axios.delete(`${BACKEND}/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (result.data.success) {
        dispatch(deletePosts(id));
      } else throw Error;
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  // ===================
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

  // ===================
  const [expanded, setExpanded] = useState(false);
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
  const all_Following = () => {
    axios
      .get(`${BACKEND}/users/following/${personPage}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then(function (response) {
        dispatch(setFollowingData(response.data.followers));
        setFollowerOrFollowingHolder(response.data.followers);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //=======================================================
  const allFollowers = () => {
    axios
      .get(`${BACKEND}/users/followers/${personPage}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then(function (response) {
        if (showFollow || inFollowingState_0) {
          dispatch(setFollowerData(response.data.followers));
          setFollowerOrFollowingHolder(response.data.followers);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //===============================================================

  useEffect(() => {
    setShowFollowerOrFollowing(false);
    axios
      .get(`${BACKEND}/users/${personPage}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then(function (response) {
        dispatch(setUserData(response?.data?.user));
      })
      .catch(function (error) {
        console.log(error);
        navigate("/NotFound");
      });

    //==============================================================
    axios
      .get(`${BACKEND}/posts/user/${personPage}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then(function (response) {
        if (!response.data.success) {
          dispatch(setPosts([]));
        } else {
          console.log(response?.data?.result, "posts");
          dispatch(setPosts(response?.data?.result));
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    //==============================================================
    axios
      .get(`${BACKEND}/users/followers/${personPage}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then(function (response) {
        dispatch(setFollowingData());
        if (response.data.followers.length === 0) {
          setFollow(false);
        }
        response.data.followers.forEach((element) => {
          if (element.id == user_Id_Number * 1) {
            setFollow(true);
            return;
          }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [personPage]);

  //=======================================================

  const followUser = () => {
    axios
      .post(
        `${BACKEND}/users/follow/${personPage}`,
        {},
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then(function (response) {
        dispatch(setFollowing_plus1());
        setFollow(true);
        allFollowers();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const unFollowUser = () => {
    axios
      .post(
        `${BACKEND}/users/unfollow/${personPage}`,
        {},
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then(function (response) {
        // FollowAndChangeState =true
        dispatch(setFollowing_minus1());
        setFollow(false);
        allFollowers();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //===============================================================

  return (
    <div>
      {state.dataUser ? (
        <>
          <CardContent>
            <div className="flex2">
              <div className="flex">
                <div id="wrapper">
                  <div id="image_div">
                    <p className="img_wrapper">
                      <img className="MyProfileImg" src={state.dataUser.img} />
                      {personPage == user_Id_Number ? (
                        <span className="MyProfileImgButton">
                          <Button
                            onClick={() => {
                              setModalShowEditPopupImage(true);
                            }}
                            variant="contained"
                          >
                            <EditNoteIcon />
                          </Button>
                        </span>
                      ) : (
                        <></>
                      )}
                    </p>
                  </div>
                </div>

                <div className="userData">
                  <Popup_Image_Edit
                    set={setModalShowEditPopupImage}
                    show={modalShowEditPopupImage}
                    onHide={() => setModalShowEditPopupImage(false)}
                  />
                  <Popup_Edit_Data
                    set={setModalShowEditPopupMyProfile}
                    show={modalShowEditPopupMyProfile}
                    onHide={() => setModalShowEditPopupMyProfile(false)}
                  />
                  <Popup_Delete_Profile
                    show={modalShowEditPopupDeleteProfile}
                    onHide={() => setModalShowEditPopupDeleteProfile(false)}
                  />
                  <Popup_Edit_MyPassword
                    set={setModalShowEditPopupEditMyPassword}
                    show={modalShowEditPopupEditMyPassword}
                    onHide={() => setModalShowEditPopupEditMyPassword(false)}
                  />
                  <Popup_Add_New_Post
                    set={setModalShowPopupAddNewPost}
                    show={modalShowPopupAddNewPost}
                    onHide={() => setModalShowPopupAddNewPost(false)}
                  />

                  <h4>
                    {state.dataUser.first_name} {state.dataUser.last_name}{" "}
                  </h4>
                  <h4>{state.dataUser.email}</h4>
                  <h4>Age : {state.dataUser.age}</h4>
                  <h4>Country : {state.dataUser.country}</h4>
                </div>
                <div className="userDataEdit">
                  {/* **************************************setting***************************************** */}
                  {personPage == user_Id_Number ? (
                    <Box sx={{ flexGrow: 0 }}>
                      <Tooltip title="Open settings">
                        <IconButton
                          onClick={(e) => {
                            setAnchorElUser(e.currentTarget);
                          }}
                          sx={{ p: 0 }}
                        >
                          <SettingsIcon sx={{ fontSize: "30px" }} />
                        </IconButton>
                      </Tooltip>
                      <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={() => {
                          setAnchorElUser(null);
                        }}
                      >
                        <MenuItem
                          onClick={() => {
                            setModalShowEditPopupMyProfile(true);
                            setAnchorElUser(null);
                          }}
                        >
                          <Typography textAlign="center">Edit</Typography>
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            setModalShowEditPopupEditMyPassword(true);
                            setAnchorElUser(null);
                          }}
                        >
                          <Typography textAlign="center">
                            Edit Password
                          </Typography>
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            setModalShowEditPopupDeleteProfile(true);
                            setAnchorElUser(null);
                          }}
                        >
                          <Typography textAlign="center">
                            Delete Account
                          </Typography>
                        </MenuItem>
                      </Menu>
                    </Box>
                  ) : (
                    <div>
                      {follow ? (
                        <Button
                          onClick={() => {
                            unFollowUser();
                          }}
                          variant="contained"
                        >
                          unfollow
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            followUser();
                          }}
                          variant="contained"
                        >
                          follow
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex1">
                {/* **************************************counters***************************************** */}
                <Paper
                  sx={{
                    backgroundColor: "#f0f0f0",
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    listStyle: "none",
                    p: 0.5,
                    m: 0,
                    boxShadow: "none",
                  }}
                  className="Paper"
                  component="ul"
                >
                  <ListItem>
                    <Chip
                      icon={<PeopleIcon />}
                      onClick={() => {
                        setShowFollow(true);
                        inFollowingState_0 = true;
                        allFollowers();
                        setShowFollowerOrFollowing(true);
                      }}
                      label={"followers: " + state.dataUser.followers_count}
                    />
                  </ListItem>
                  <ListItem>
                    <Chip
                      icon={<PeopleIcon />}
                      onClick={() => {
                        inFollowingState_0 = false;
                        setShowFollow(false);
                        setShowFollowerOrFollowing(true);
                        all_Following();
                      }}
                      label={"following: " + state.dataUser.following_count}
                    />
                  </ListItem>
                  <ListItem>
                    <Chip
                      icon={<BurstModeIcon />}
                      onClick={() => {
                        setShowFollowerOrFollowing(false);
                      }}
                      label={"posts: " + state.postsUser.length}
                    />
                  </ListItem>
                </Paper>
                {/* ******************************************************************************* */}
              </div>
            </div>
          </CardContent>
        </>
      ) : (
        <p>noData</p>
      )}

      <hr style={{ backgroundColor: "black", fontSize: "2em" }} />

      {/* ******************************* showFollower || showFollowing of user *************************** */}
      {showFollowerOrFollowing ? (
        <>
          {/* //*************************************************************************** */}
          <Container>
            {followerOrFollowingHolder.length <= 0 ? (
              <>
                <h2>No results in {showFollow ? "Follower" : "Following"}</h2>
              </>
            ) : (
              <>
                {followerOrFollowingHolder.length > 0 ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        flexWrap: "wrap",
                      }}
                    >
                      {followerOrFollowingHolder.map((user) => {
                        return (
                          <Card
                            onClick={(e) => {
                              setShowFollowerOrFollowing(false);
                              navigate(`/profile/${user.id}`);
                            }}
                            key={user.id}
                            sx={{
                              width: 275,
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-around",
                              alignItems: "center",
                              height: "200px",
                              margin: "20px",
                              padding: "20px",
                              cursor: "pointer",
                            }}
                          >
                            <Avatar
                              sx={{ height: "100px", width: "100px" }}
                              alt="Remy Sharp"
                              src={user.img}
                            />
                            <h4>
                              {user.first_name} {user.last_name}
                            </h4>
                          </Card>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <>
                    <Stack spacing={1}>
                      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                      <Skeleton variant="circular" width={40} height={40} />
                      <Skeleton variant="rectangular" width={210} height={60} />
                      <Skeleton variant="rounded" width={210} height={60} />
                    </Stack>
                  </>
                )}
              </>
            )}
          </Container>
        </>
      ) : (
        <>
          {/* //********************************add post of user******************************************* */}
          {personPage == user_Id_Number ? (
            <>
              <span style={{ position: "fixed", right: "0", bottom: "0" }}>
                <Fab
                  onClick={(e) => {
                    setModalShowPopupAddNewPost(true);
                  }}
                  style={{ margin: "20px" }}
                  color="primary"
                  aria-label="add"
                >
                  <AddIcon />
                </Fab>
              </span>
            </>
          ) : (
            <></>
          )}

          {/* ******************************************post of user***************************************** */}
          <div className="feed">
            <Container>
              {posts.length > 0 ? (
                <>
                  {posts.map((post) => {
                    return (
                      <Card key={post.id} sx={{ margin: "10px 0" }}>
                        <CardHeader
                          avatar={
                            <Avatar
                              onClick={(e) => {
                                navigate(`/profile/${post.user_id}`);
                              }}
                              sx={{ bgcolor: red[500] }}
                              src={post.user_img}
                              aria-label="recipe"
                            ></Avatar>
                          }
                          action={
                            (role === "Admin" || userId == post.user_id) && (
                              <IconButton
                                aria-controls={open ? "long-menu" : undefined}
                                aria-expanded={open ? "true" : undefined}
                                onClick={(event) => {
                                  handleClick(event);
                                  setPostPicker(post.id);
                                  setPostDescription(post.description);
                                }}
                                aria-label="settings"
                              >
                                <MoreVertIcon />
                              </IconButton>
                            )
                          }
                          title={post.user_first_name}
                          subheader={post.created_at.split("T")[0]}
                        />
                        {personPage == user_Id_Number ? (
                          <>
                            (
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
                                  deletePost(postPicker);
                                  handleClose();
                                }}
                              >
                                Delete Post
                              </MenuItem>
                            </Menu>
                            )
                          </>
                        ) : (
                          <></>
                        )}

                        <CardMedia
                          component="img"
                          // height="194"
                          image={post.img}
                          alt="post"
                        />
                        <CardContent>
                          <p>
                            <strong>{post.description}</strong>
                          </p>
                        </CardContent>
                        <CardActions disableSpacing>
                          {isLiked(likes, post.id) !== -1 ? (
                            <div style={{ display: "flex" }}>
                              <IconButton
                                onClick={(e) => {
                                  axios
                                    .delete(`${BACKEND}/likes/${post.id}`, {
                                      headers: {
                                        Authorization: `Bearer ${token}`,
                                      },
                                    })
                                    .then((result) => {
                                      dispatch(removeLikePost(post.id));
                                      dispatch(removeLike(post.id));
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
                                {parseInt(post.likes_count)}
                              </p>
                            </div>
                          ) : (
                            <div style={{ display: "flex" }}>
                              {" "}
                              <IconButton
                                onClick={(e) => {
                                  const payload = {
                                    posts_id: post.id,
                                    user_id: userId,
                                  };
                                  axios
                                    .post(
                                      `${BACKEND}/likes/${post.id}`,
                                      {},
                                      {
                                        headers: {
                                          Authorization: `Bearer ${token}`,
                                        },
                                      }
                                    )
                                    .then((result) => {
                                      dispatch(addLikePost(post.id));
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
                              <p style={{ margin: "10px" }}>
                                {post.likes_count}
                              </p>
                            </div>
                          )}
                          {/* ************************************** */}
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
                            <div
                              style={{ display: "flex", marginBottom: "20px" }}
                            >
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
                                          post_id: post.id,
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
                                  {post.comments ? (
                                    post.comments.map((comment) => {
                                      return (
                                        <ListGroup.Item
                                          key={comment.id}
                                          style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                          }}
                                        >
                                          <ListItem
                                            style={{
                                              display: "flex",
                                              alignItems: "center",
                                            }}
                                          >
                                            <ListItemAvatar>
                                              <Avatar src={comment.img} />
                                            </ListItemAvatar>
                                            <ListItemText
                                              primary={comment.comment}
                                              secondary={`By ${comment.first_name}`}
                                            />
                                          </ListItem>
                                          <div>
                                            {(role === "Admin" ||
                                              userId == comment.user_id) && (
                                              <>
                                                {userId == comment.user_id && (
                                                  <>
                                                    <IconButton
                                                      onClick={(e) => {
                                                        handleShowUpdate(
                                                          comment.id
                                                        );
                                                      }}
                                                      aria-label="edit comment"
                                                    >
                                                      <MdEdit />
                                                    </IconButton>
                                                    <Modal
                                                      show={
                                                        showUpdate ===
                                                        comment.id
                                                      }
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
                                                            post.id,
                                                            e.target[0].value
                                                          );
                                                          handleCloseUpdate();
                                                        }}
                                                      >
                                                        <Modal.Body>
                                                          <Form.Control
                                                            type="text"
                                                            defaultValue={
                                                              comment.comment
                                                            }
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
                                                      post.id
                                                    );
                                                  }}
                                                  aria-label="delete comment"
                                                >
                                                  <MdDelete />
                                                </IconButton>
                                              </>
                                            )}{" "}
                                          </div>
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
                        <Offcanvas show={show} onHide={handleClose22}>
                          <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Tags</Offcanvas.Title>
                          </Offcanvas.Header>
                          <Offcanvas.Body>
                            <ListGroup>{tagsFunction()}</ListGroup>
                          </Offcanvas.Body>
                        </Offcanvas>
                      </Card>
                    );
                  })}
                </>
              ) : (
                <>
                  <h1 style={{ marginTop: "20px" }}>No Posts Yet</h1>
                </>
              )}
            </Container>
          </div>
        </>
      )}
    </div>
  );
}
