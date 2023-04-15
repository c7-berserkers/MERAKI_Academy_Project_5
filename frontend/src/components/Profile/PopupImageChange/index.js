import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import "./style.css"
import validator from 'validator';
import  React,{ useEffect,useState,createContext } from "react";
import { useNavigate } from "react-router-dom";

// import Img from './Img';

//===============================================================


import { useDispatch } from "react-redux";
import { updateUserImage } from "../../redux/reducers/profile/index";

//===============================================================

const Popup_Image_Edit = (props) => {


    const [img_Select,setImg_Select]=useState("")
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


            })
            .catch(function (error) {
                console.log(error);
            });

    }

    //==============================================================
    const imgUpload=()=>{
        console.log(img_Select)
        const formData = new FormData();
        formData.append("file" ,img_Select )
        formData.append("upload_preset" ,"vledn3tb" )
        axios.post("https://api.cloudinary.com/v1_1/dy9hkpipf/image/upload",formData).then((result)=>{
        // console.log(result.data.url,"url_img")
        // console.log("img", result.data.url ,"eeeee")
        setUserData({ "img": result.data.url })
        //===============================================================
        // console.log(userData)
            add_image()
    }).catch((err)=>{
            console.log(err)
            
        })
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
                    {/* <Form.Control name="img" onChange={handleChange} placeholder="img url" /> */}
                        <Form.Control  type="file" onChange={(e)=>{setImg_Select(e.target.files[0])}}/>
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

export default Popup_Image_Edit