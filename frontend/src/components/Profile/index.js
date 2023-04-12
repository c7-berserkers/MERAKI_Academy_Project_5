import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./style.css"
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import EditNoteIcon from '@mui/icons-material/EditNote';

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

//===============================================================

import Popup_Image_Edit from './PopupImageChange'
import Popup_Edit_Data from './PopupEditMyData/index'

//===============================================================


import { useDispatch, useSelector } from "react-redux";
import { setUserData, setUserPosts } from "../redux/reducers/profile/index";

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

    const dispatch = useDispatch();


    //==========================posts=================================


    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    //===============================================================

    const [modalShowEditPopupImage, setModalShowEditPopupImage] = useState(false)
    const [modalShowEditPopupMyProfile, setModalShowEditPopupMyProfile] = useState(false)

    //===============================================================
    const state = useSelector((state) => {

        return {
            dataUser: state.profile.UserData,
            postsUser: state.profile.UserPosts,
        };
    });

    //===============================================================


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND}/users/${localStorage.getItem("userId")}`, {
            headers: {
                'Authorization': `${localStorage.getItem("userId")}`
            }
        })
            .then(function (response) {
                console.log(response.data, "my data")
                dispatch(setUserData(response.data.user))
                dispatch(setUserPosts(response.data.userPosts))

            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);


    //===============================================================

    return (

        <div>


            {state.dataUser ? <>
                <CardContent>
                    <div className="flex">
                        <div id="wrapper">
                            <div id="image_div">
                                <p className="img_wrapper">
                                    <img className="MyProfileImg" src={state.dataUser.img} />

                                    <span className="MyProfileImgButton">
                                        <Button onClick={() => { setModalShowEditPopupImage(true) }} variant="contained">
                                            <EditNoteIcon />
                                        </Button>
                                    </span>

                                </p>
                            </div>
                        </div>
                        <div className="userData">
                            <Popup_Image_Edit show={modalShowEditPopupImage} onHide={() => setModalShowEditPopupImage(false)} />
                            <Popup_Edit_Data show={modalShowEditPopupMyProfile} onHide={() => setModalShowEditPopupMyProfile(false)} />
                            <h4> {state.dataUser.first_name}  {state.dataUser.last_name}  </h4>
                            <h4>Email : {state.dataUser.email}</h4>
                            <h4>Age : {state.dataUser.age}</h4>
                            <h4>Country : {state.dataUser.country}</h4>
                        </div>
                        <div className="userDataEdit">
                            <Stack direction="row" spacing={2}>
                                <Button variant="contained" onClick={() => { setModalShowEditPopupMyProfile(true) }} endIcon={<EditNoteIcon />}>
                                    Edit
                                </Button>
                            </Stack>
                        </div>
                    </div>
                </CardContent>
            </> : <p>noData</p>}

            <hr style={{ backgroundColor: "black", fontSize: "2em" }} />

{/* ******************************************* post of user ************************************************* */}

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
                                title={state.dataUser.first_name}
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
                                        Heat oil in a (14- to 16-inch) paella pan or a large, deep
                                        skillet over medium-high heat. Add chicken, shrimp and
                                        chorizo, and cook, stirring occasionally until lightly
                                        browned, 6 to 8 minutes. Transfer shrimp to a large plate
                                        and set aside, leaving chicken and chorizo in the pan. Add
                                        pimentón, bay leaves, garlic, tomatoes, onion, salt and
                                        pepper, and cook, stirring often until thickened and
                                        fragrant, about 10 minutes. Add saffron broth and
                                        remaining 4 1/2 cups chicken broth; bring to a boil.
                                    </Typography>
                                    <Typography paragraph>
                                        Add rice and stir very gently to distribute. Top with
                                        artichokes and peppers, and cook without stirring, until
                                        most of the liquid is absorbed, 15 to 18 minutes. Reduce
                                        heat to medium-low, add reserved shrimp and mussels,
                                        tucking them down into the rice, and cook again without
                                        stirring, until mussels have opened and rice is just
                                        tender, 5 to 7 minutes more. (Discard any mussels that
                                        don&apos;t open.)
                                    </Typography>
                                    <Typography>
                                        Set aside off of the heat to let rest for 10 minutes, and
                                        then serve.
                                    </Typography>
                                </CardContent>
                            </Collapse>
                        </Card>
                    );
                })}
            </Container>


        </div>
    )

    //===============================================================
}
