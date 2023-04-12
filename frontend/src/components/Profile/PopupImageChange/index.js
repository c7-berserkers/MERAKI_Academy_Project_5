import Button from 'react-bootstrap/Button';
import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import "./style.css"
import validator from 'validator';
//===============================================================


import { useDispatch  } from "react-redux";
import { updateUserImage} from "../../redux/reducers/profile/index";

//=========================posts======================================

const Popup_Image_Edit = (props) => {

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
    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData((preData) => ({ ...preData, [name]: value }))
    }
    //===============================================================

    const add_image = () => {
        const errors = validateData();
        if (Object.keys(errors).length) {
            setErrors(errors);
            return;
        }
        axios.put(`${process.env.REACT_APP_BACKEND}/users/${localStorage.getItem("userId")}`,userData, {
            headers: {
                'Authorization': `${localStorage.getItem("userId")}`
            }
        })
            .then(function (response) {
                console.log(response.data.user.img, "my data")
                dispatch(updateUserImage(response.data.user.img))


            })
            .catch(function (error) {
                console.log(error);
            });

    }

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

                    <Form.Label>Image:</Form.Label>
                    <Form.Control name="img" onChange={handleChange} placeholder="img url" />
                </Modal.Body>

                <Modal.Footer>
                    <div className="addSubmit">
                        <Button variant="primary" onClick={add_image}>submit</Button>
                    </div>
                    <Button className="shadowButton" onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Popup_Image_Edit