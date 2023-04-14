import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import validator from 'validator';
import { Button, Form, Alert } from "react-bootstrap";

//===============================================================


import { useDispatch , useSelector } from "react-redux";
import { setUserData } from "../../redux/reducers/profile/index";

//=================================================================

const Popup_Edit_MyPassword = (props) => {

    //===============================================================

    const dispatch = useDispatch();
    const state = useSelector((state) => {

        return {
            dataUser: state.profile.UserData,
        };
    });


    //===============================================================

    let user_test = {
        email: state.dataUser.email ,
        password: '',
        password_confirmed:'',
    }
    const [userDataHolder, setUserDataHolder] = useState(user_test)
    const [oneError, setOneError] = useState(false)
    const [errors, setErrors] = useState({})
    const [colorMassage, setColorMassage] = useState("danger")
    const { email, password , password_confirmed} = userDataHolder
 

    //==================================================
    const validateData = () => {
        let errors = {};
        console.log(email, password , password_confirmed,'ffff');
        if (email==undefined||!validator.isEmail(email)) {
            console.log(email, password , password_confirmed,'ssss');
            errors.email = "A vialed email is required";
        }
        if (password!==password_confirmed) {
            console.log(email, password , password_confirmed,'wwwww');
            errors.password = "A password not identical";
        }
        if (!validator.isStrongPassword(password)) {
            console.log(email, password , password_confirmed,'zzzz');
            errors.password = "A vialed strong password is required";
        }
        console.log(errors,'errors');
        return errors
    }




    const handleChange = (e) => {
        const { name, value } = e.target
        setUserDataHolder((preData) => ({ ...preData, [name]: value }))
        console.log(userDataHolder);
    }


    const submitNewPassword = () => {
        console.log("tttt");
        const errors = validateData(); 
    console.log("dddd");
        if (Object.keys(errors).length) {
        setOneError(Object.values(errors)[0])

        return;
        }
        setOneError("edit is done")
        setColorMassage("success")


    }

    return (

        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit My profile Data
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>


                <form onSubmit={(event) => event.preventDefault()} className="myProfileAreaEdit">
                    <label htmlFor="email"   >email:</label>
                    <Form.Control name="email" placeholder="your email" onChange={handleChange} />
                    <label htmlFor="password" >password:</label>
                    <Form.Control name="password"  placeholder="your password" onChange={handleChange} />
                    <label htmlFor="password" >password:</label>
                    <Form.Control name="password_confirmed"  placeholder="your password" onChange={handleChange} />
                    {oneError ? <Alert key={colorMassage} style={{ margin: "12px 0px" }} variant={colorMassage}>{oneError}</Alert> : <> </>}

                </form>
            </Modal.Body>
            <Modal.Footer>
                <div className='submitNewButton' >
                    <Button className="shadowButton" onClick={submitNewPassword}>submit</Button>
                </div>
                <Button className="shadowButton" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )

}

export default Popup_Edit_MyPassword



