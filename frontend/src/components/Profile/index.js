import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import EditNoteIcon from "@mui/icons-material/EditNote";

//=============================posts=================================
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
  setUserPosts,
  setFollowing,
  setFollowing_plus1,
  setFollowing_minus1,
  setFollowingData,
  setFollowerData,
} from "../redux/reducers/profile/index";

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
  let token = localStorage.getItem("token");
  const [follow, setFollow] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showFollower, setShowFollower] = useState(false);
  const [followerOrFollowingHolder, setFollowerOrFollowingHolder] =
    useState(false);

  //===============================================================

  const dispatch = useDispatch();
  const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

  //==========================posts=================================

  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
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

  //===============================================================
  const state = useSelector((state) => {
    return {
      dataUser: state.profile.UserData,
      postsUser: state.profile.UserPosts,
      following: state.profile.following,
      allFollower: state.profile.allFollower,
      allFollowing: state.profile.allFollowing,
    };
  });

  //===============================================================
  const loop = () => {
    state.following.forEach((element) => {
      if (element.id == personPage * 1) {
        setFollow(true);
      }
    });
  };

  //===============================================================

  useEffect(() => {
    setShowFollower(false);
    setShowFollowing(false);
    axios
      .get(`${process.env.REACT_APP_BACKEND}/users/${personPage}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then(function (response) {
        dispatch(setUserData(response.data.user));
        // dispatch(setUserPosts(response.data.userPosts))
        // console.log(response.data.userPosts,"userPosts")
      })
      .catch(function (error) {
        console.log(error);
        navigate("/NotFound");
      });

    //==============================================================
    axios
      .get(`${process.env.REACT_APP_BACKEND}/posts/user/${personPage}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then(function (response) {
        dispatch(setUserPosts(response.data.result));
        console.log(response.data.result, "userPosts  xxxxxxxxxxxxxxxxxxxxx");
      })
      .catch(function (error) {
        console.log(error);
      });

    //===============================================================
    axios
      .get(
        `${process.env.REACT_APP_BACKEND}/users/following/${user_Id_Number}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then(function (response) {
        dispatch(setFollowing(response.data.followers));
        dispatch(setFollowingData(response.data.followers));
        loop();
      })
      .catch(function (error) {
        console.log(error);
      });
    //===============================================================
    axios
      .get(`${process.env.REACT_APP_BACKEND}/users/followers/${personPage}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then(function (response) {
        dispatch(setFollowerData(response.data.followers));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [personPage]);

  //=======================================================

  const followUser = () => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND}/users/follow/${personPage}`,
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
        // getAllUserFollowing()
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const unFollowUser = () => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND}/users/unfollow/${personPage}`,
        {},
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then(function (response) {
        dispatch(setFollowing_minus1());
        setFollow(false);
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
                    show={modalShowEditPopupImage}
                    onHide={() => setModalShowEditPopupImage(false)}
                  />
                  <Popup_Edit_Data
                    show={modalShowEditPopupMyProfile}
                    onHide={() => setModalShowEditPopupMyProfile(false)}
                  />
                  <Popup_Delete_Profile
                    show={modalShowEditPopupDeleteProfile}
                    onHide={() => setModalShowEditPopupDeleteProfile(false)}
                  />
                  <Popup_Edit_MyPassword
                    show={modalShowEditPopupEditMyPassword}
                    onHide={() => setModalShowEditPopupEditMyPassword(false)}
                  />

                  <h4>
                    {" "}
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
                        setFollowerOrFollowingHolder(state.allFollower);
                        setShowFollower(!showFollower);
                      }}
                      label={"followers: " + state.dataUser.followers_count}
                    />
                  </ListItem>
                  <ListItem>
                    <Chip
                      icon={<PeopleIcon />}
                      onClick={() => {
                        setFollowerOrFollowingHolder(state.allFollowing);
                        setShowFollowing(!showFollowing);
                      }}
                      label={"following: " + state.dataUser.following_count}
                    />
                  </ListItem>
                  <ListItem>
                    <Chip
                      icon={<BurstModeIcon />}
                      onClick={() => {
                        setShowFollower(false);
                        setShowFollowing(false);
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
      {showFollower || showFollowing ? (
        <>
          {/* //*************************************************************************** */}
          <Container>
            {followerOrFollowingHolder.length <= 0 ? (
              <>
                <h2>No results in {showFollower ? "Follower" : "Following"}</h2>
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
                            onClick={(e) => navigate(`/profile/${user.id}`)}
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
          {/* //********************************post of user******************************************* */}
          <Container>
            <Button
              style={{ width: "60%" }}
              onClick={() => {
                setModalShowPopupAddNewPost(true);
              }}
            >
              Add New Post
            </Button>
          </Container>
          <Container>
            {state.postsUser.map((post) => {
              return (
                <Card key={post.id} sx={{ margin: "10px 0" }}>
                  <CardHeader
                    avatar={
                      <Avatar
                        sx={{ bgcolor: red[500] }}
                        src={state.dataUser.img}
                        aria-label="recipe"
                      ></Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={post.user_first_name}
                    subheader={post.created_at?.split("T")[0]}
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
                      expand={expanded}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <MdComment />
                    </ExpandMore>
                  </CardActions>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>Method:</Typography>
                      <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add
                        saffron and set aside for 10 minutes.
                      </Typography>
                      <Typography paragraph>
                        Heat oil in a (14- to 16-inch) paella pan or a large,
                        deep skillet over medium-high heat. Add chicken, shrimp
                        and remaining 4 1/2 cups chicken broth; bring to a boil.
                      </Typography>
                      <Typography paragraph>
                        Add rice and stir very gently to distribute. Top with
                        artichokes and peppers, and cook without stirring, until
                        tender, 5 to 7 minutes more. (Discard any mussels that
                        .)
                      </Typography>
                      <Typography>
                        Set aside off of the heat to let rest for 10 minutes,
                        and then serve.
                      </Typography>
                    </CardContent>
                  </Collapse>
                  <Popup_Add_New_Post
                  set={setModalShowPopupAddNewPost}
                    show={modalShowPopupAddNewPost}
                    onHide={() => setModalShowPopupAddNewPost(false)}
                  />
                </Card>
              );
            })}
          </Container>
        </>
      )}
    </div>
  );
}
