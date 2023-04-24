import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import ListGroup from "react-bootstrap/ListGroup";

export default function Stats() {
  const navigate = useNavigate();
  const BACKEND = process.env.REACT_APP_BACKEND;
  const [mostFollowedUser, setMostFollowedUser] = useState({});
  const [mostLikedPost, setMostLikedPost] = useState({});
  const [mostCommentsPost, setMostCommentsPost] = useState({});
  const [usersCount, setUsersCount] = useState(null);
  const [postsCount, setPostsCount] = useState(null);
  const { token } = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });
  //
  const getMostFollowedUser = () => {
    axios
      .get(`${BACKEND}/users/mostfollowed/user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => setMostFollowedUser(result.data.result))
      .catch((err) => setMostFollowedUser(null));
  };

  const getUsersCount = () => {
    axios
      .get(`${BACKEND}/posts/count/post`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        setUsersCount(result.data.result.user_count);
        setPostsCount(result.data.result.post_count);
      })
      .catch((err) => setUsersCount(null));
  };

  const getMostLikedPost = () => {
    axios
      .get(`${BACKEND}/posts/mostlikes/post`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => setMostLikedPost(result.data.result))
      .catch((err) => setMostLikedPost(null));
  };

  const getMostCommentsPost = () => {
    axios
      .get(`${BACKEND}/posts/mostcomments/post`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => setMostCommentsPost(result.data.result))
      .catch((err) => setMostCommentsPost(null));
  };

  useEffect(() => {
    getMostFollowedUser();
    getMostCommentsPost();
    getMostLikedPost();
    getUsersCount();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        alignItems: "center",
        justifyContent: "center",
        margin: "20px",
      }}
    >
      {!mostFollowedUser || !mostLikedPost || !mostCommentsPost ? (
        <>
          <Stack spacing={1}>
            {/* For variant="text", adjust the height via font-size */}
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            {/* For other variants, adjust the size with `width` and `height` */}
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={210} height={60} />
            <Skeleton variant="rounded" width={210} height={60} />
          </Stack>
          <Stack spacing={1}>
            {/* For variant="text", adjust the height via font-size */}
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            {/* For other variants, adjust the size with `width` and `height` */}
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={210} height={60} />
            <Skeleton variant="rounded" width={210} height={60} />
          </Stack>
          <Stack spacing={1}>
            {/* For variant="text", adjust the height via font-size */}
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            {/* For other variants, adjust the size with `width` and `height` */}
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={210} height={60} />
            <Skeleton variant="rounded" width={210} height={60} />
          </Stack>
        </>
      ) : (
        <>
          {" "}
          <Card style={{ width: "90%" }}>
            <ListGroup>
              <ListGroup.Item>
                <strong>Total Users:</strong> {usersCount}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Total posts:</strong> {postsCount}
              </ListGroup.Item>
            </ListGroup>
          </Card>{" "}
          <Card
            sx={{ width: "30%" }}
            onClick={(e) => navigate(`/profile/${mostFollowedUser.id}`)}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={mostFollowedUser.img}
                alt="green iguana"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                ></Typography>
                {mostFollowedUser.first_name} {mostFollowedUser.last_name}
                <Typography variant="body2" color="text.secondary">
                  Most Followed User <br />
                  <strong>Total Follower:</strong>{" "}
                  {mostFollowedUser.followers_count}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card
            onClick={(e) => navigate(`/post/${mostLikedPost.id}`)}
            sx={{ maxWidth: 345 }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={mostLikedPost.img}
                alt="green iguana"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                ></Typography>
                {mostLikedPost.description}
                <Typography variant="body2" color="text.secondary">
                  Most liked Post <br />
                  <strong>Total Likes:</strong> {mostLikedPost.total_likes}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card
            onClick={(e) => navigate(`/post/${mostCommentsPost.id}`)}
            sx={{ maxWidth: 345 }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={mostCommentsPost.img}
                alt="green iguana"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                ></Typography>
                {mostCommentsPost.description}
                <Typography variant="body2" color="text.secondary">
                  The Post With The Most Comments <br />
                  <strong>Total Comments:</strong>{" "}
                  {mostCommentsPost.comment_count}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </>
      )}
    </div>
  );
}
