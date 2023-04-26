import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { Container, Alert } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import {
  setPosts,
  setComments,
  updateComment,
} from "..///./../redux/reducers/posts/index";

const Popup_Comment_Edit = (props) => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  const [comment, setComment] = useState(props.comment);
  const [addComment, setAddComment] = useState("");
  const [commentId, setCommentId] = useState(props.id);

  const dispatch = useDispatch();

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

  //===============================================================


    const updateComment = async(e) => {
        try {
          const result = await axios.put(`${process.env.REACT_APP_BACKEND}/comments/${e.target.value}`,{comment:addComment},{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (result.data.success) {
            console.log(result.data.result)
            const comment22=result.data.result
            console.log({post_id:props.post_id,comment:comment22,id:props.id})
            dispatch(updateComment({post_id:props.post_id,comment:comment22,id:props.id}));
            setMessage("")
                  setStatus(false)
          } else{ throw Error};
        } catch (error) {
          if (!error.response.data.success) {
            setStatus(true)
            return setMessage(error.response.data.message);
          }
          setStatus(true)
          setMessage("Error happened while update Comment, please try again");
        }
      );
      if (result.data.success) {
        const comment22 = result.data.result;

        dispatch(
          updateComment({
            post_id: props.post_id,
            comment: comment22,
            id: props.id,
          })
        );
        setMessage("");
        setStatus(false);
      } else {
        throw Error;
      }
    } catch (error) {
      if (!error.response.data.success) {
        setStatus(true);
        return setMessage(error.response.data.message);
      }
      setStatus(true);
      setMessage("Error happened while update Comment, please try again");
    }
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
            update you'r comment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>new comment:</Form.Label>
          <Form.Control
            name="img"
            onChange={(e) => {
              setAddComment(e.target.value);
            }}
            defaultValue={comment}
          />
        </Modal.Body>

        <Modal.Footer>
          <div className="addSubmit">
            <Button
              value={commentId}
              variant="primary"
              onClick={(e) => {
                updateComment(e);
              }}
            >
              submit
            </Button>
          </div>
          <Button className="shadowButton" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>

        <Container>
          {status && <Alert variant="danger">{message}</Alert>}
        </Container>
      </Modal>
    </div>
  );
};

export default Popup_Comment_Edit;
