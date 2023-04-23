import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

export default function Stats() {
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
      .get(`${BACKEND}/users/mostfollowed/count`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => setUsersCount(result.data.result.count))
      .catch((err) => setUsersCount(null));
  };
  const getPostsCount = () => {
    axios
      .get(`${BACKEND}/posts/count/post`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => setPostsCount(result.data.result.count))
      .catch((err) => setPostsCount(null));
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
    getUsersCount();
    getPostsCount();
    getMostLikedPost();
    getMostCommentsPost();
  }, []);
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {" "}
      <Card style={{ width: "18rem" }}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Total Users:</strong> {usersCount}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Total posts:</strong> {postsCount}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
}
