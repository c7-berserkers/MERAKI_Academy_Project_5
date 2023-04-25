import Modal from "react-bootstrap/Modal";
import axios from "axios";
import "./style.css";
import validator from "validator";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import { useDispatch, useSelector } from "react-redux";
import { addPosts } from "../../redux/reducers/posts/index";
import { Container, Alert } from "react-bootstrap";

//===============================================================

//===============================================================

const Popup_Add_New_Post = (props) => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  const [img_Select, setImg_Select] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [tag_id, setTag_id] = useState("");
  const [tags, setTags] = useState("");

  const { token, post, pfp, userId, userName } = useSelector((state) => {
    return {
      userId: state.auth.userId,
      token: state.auth.token,
      userLikes: state.auth.userLikes,
      pfp: state.auth.pfp,
      post: state.posts.posts,
      userName: state.auth.userName,
    };
  });

  //===============================================================

  const dispatch = useDispatch();

  //===============================================================

  let TestValue = {
    img: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg",
  };

  const [userData, setUserData] = useState(TestValue);
  const { img } = userData;

  const [errors, setErrors] = useState({});

  const validateData = () => {
    let errors = {};
    if (!validator.isURL(img)) {
      errors.img = "Url is required";
    }
    return errors;
  };

  //===============================================================

  const add_post = () => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND}/posts`,
        { img: imgURL, description, tag_id },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then(function (response) {
        props.set(false);
        const addPost = response.data.result[0];
        addPost.user_first_name = userName;
        addPost.user_id = userId;
        addPost.user_img = pfp;
        addPost.likes_count = "0";

        dispatch(addPosts(response.data.result[0]));
        props.set(false);
        setMessage("");
        setStatus(false);
        setImg_Select("");
        setImgURL("");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //==============================================================
  const imgUpload = () => {
    if (img_Select) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", img_Select);
      formData.append("upload_preset", "vledn3tb");
      axios
        .post(
          "https://api.cloudinary.com/v1_1/dy9hkpipf/image/upload",
          formData
        )
        .then((result) => {
          if (result.data.url) {
            setLoading(false);
            setImgURL(result.data.url);
          }
        })
        .catch((err) => {
          setMessage(err);
          setStatus(true);
          setLoading(false);
          console.log(err);
        });
    } else {
      setMessage("Please upload an image first");
      setStatus(true);
    }
  };

  //===============================================================

  useEffect(() => {
    if (!tags) {
      axios
        .get(`${process.env.REACT_APP_BACKEND}/tags`, {
          headers: {
            Authorization: `${localStorage.getItem("userId")}`,
          },
        })
        .then((result) => {
          setTags(result.data.result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [tags]);

  const tagsFunction = () => {
    return tags.length > 0
      ? tags.map((tag, i) => {
          return (
            <option value={tag.id} key={tag.id}>
              {tag.tag}
            </option>
          );
        })
      : "";
  };
  //===============================================================

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add New post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingTextarea2" label="Description">
            <Form.Control
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              as="textarea"
              placeholder="Leave a Description here"
              style={{ height: "100px" }}
            />
          </FloatingLabel>
          <br></br>
          {imgURL ? <Image src={imgURL} fluid /> : ""}
          <br></br>

          <Row className="g-2">
            <Col md>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Button
                  variant="primary"
                  disabled={isLoading}
                  onClick={!isLoading ? imgUpload : null}
                >
                  {isLoading ? "Loading…" : "Upload"}
                </Button>
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(e) => {
                      setImg_Select(e.target.files[0]);
                    }}
                  />
                  <PhotoCamera />
                </IconButton>
              </Stack>
            </Col>
            <Col md>
              <FloatingLabel
                controlId="floatingSelectGrid"
                label="Works with selects"
              >
                <Form.Select
                  aria-label="Floating label select example"
                  onChange={(e) => {
                    setTag_id(e.target.value);
                  }}
                >
                  <option>Open this select menu</option>
                  {tagsFunction()}
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button
              type="submit"
              variant="primary"
              className="login-button"
              onClick={add_post}
              disabled={isLoading}
            >
              submit
            </Button>
          </Stack>
        </Modal.Footer>

        <Container>
          {status && <Alert variant="danger">{message}</Alert>}
        </Container>
      </Modal>
    </div>
  );
};

export default Popup_Add_New_Post;
