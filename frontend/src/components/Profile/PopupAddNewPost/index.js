import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import "./style.css"
import validator from 'validator';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

// import Img from './Img';

//===============================================================


import { useDispatch } from "react-redux";
import { updateUserImage } from "../../redux/reducers/profile/index";
import { setUserImg } from "../../redux/reducers/auth/index";

//===============================================================

const Popup_Add_New_Post = (props) => {


    const [img_Select,setImg_Select]=useState("")
    const [isLoading, setLoading] = useState(false);
    const [description, setDescription] = useState('');
    const [tag_id, setTag_id] = useState('');
    const [tags, setTags] = useState('');

    //===============================================================

    const dispatch = useDispatch();

    //===============================================================


    let TestValue = {
        img: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg",
    }

    const [userData, setUserData] = useState(TestValue)
    const { img } = userData

    const [errors, setErrors] = useState({})


    const validateData = () => {
        let errors = {};
        if (!validator.isURL(img)) {
            errors.img = "Url is required";
        }
        return errors
    }

    //===============================================================

    const add_image = () => {
        console.log(userData)
        const errors = validateData();
        if (Object.keys(errors).length) {
            setErrors(errors);
            return;
        }
        axios.put(`${process.env.REACT_APP_BACKEND}/users/${localStorage.getItem("userId")}`, userData, {
            headers: {
                'Authorization': `${localStorage.getItem("userId")}`
            }
        })
            .then(function (response) {
                console.log(response.data.user.img, "my data")
                dispatch(updateUserImage(response.data.user.img))
                dispatch(setUserImg({img:response.data.user.img}))
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    //==============================================================
    const imgUpload=()=>{
        setLoading(true)
        const formData = new FormData();
        formData.append("file" ,img_Select )
        formData.append("upload_preset" ,"vledn3tb" )
        axios.post("https://api.cloudinary.com/v1_1/dy9hkpipf/image/upload",formData).then((result)=>{
        console.log(result.data.url,"url_img")
        if(result.data.url){
            setLoading(false)
        // setUserData({ "img": result.data.url })
            // add_image()
        }
        
    }).catch((err)=>{
        setLoading(false)
        console.log(err)
            
        })
    }

    //===============================================================

    useEffect(()=>{
        if(!tags){
            axios.get(`${process.env.REACT_APP_BACKEND}/tags`, {
            headers: {
                'Authorization': `${localStorage.getItem("userId")}`
            }
        }).then((result)=>{
            console.log(result.data.result)
            setTags(result.data.result)
    }).catch((err)=>{
        console.log(err)
        })
        }
        
    },[tags])
    //===============================================================



    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add New Image
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                
      <FloatingLabel controlId="floatingTextarea2" label="Comments">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '100px' }}
        />
      </FloatingLabel>
      <br></br>
      {img_Select?<Image src="http://res.cloudinary.com/dy9hkpipf/image/upload/v1681677603/km7pc2xtxbb4z5bjsd5w.png" />:""}
      <br></br>

      <Row className="g-2">
      <Col md>
      <Stack direction="row" alignItems="center" spacing={2}>
                        <Button
            variant="primary"
            disabled={isLoading}
            onClick={!isLoading ? imgUpload : null}
          >
            {isLoading ? 'Loading…' : 'Upload'}
          </Button>
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" type="file" onChange={(e)=>{setImg_Select(e.target.files[0])}} />
        <PhotoCamera />
      </IconButton>
    </Stack>
      </Col>
      <Col md>
        <FloatingLabel
          controlId="floatingSelectGrid"
          label="Works with selects"
        >
          <Form.Select aria-label="Floating label select example">
            <option>Open this select menu</option>
            {tagsFunction}
          </Form.Select>
        </FloatingLabel>
      </Col>
    </Row>
                        
                </Modal.Body>

                <Modal.Footer>
                    <div className="addSubmit">
                        {/* <Img/> */}
                        <Button type="submit"  variant="primary"  className="login-button" onClick={imgUpload}>submit</Button>
                        {/* <Button variant="primary" onClick={add_image}>submit</Button> */}
                    </div>
                    <Button className="shadowButton" onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Popup_Add_New_Post