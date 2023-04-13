import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { Button, Form, Alert, } from "react-bootstrap";

//===============================================================

import { useDispatch, useSelector } from "react-redux";
import { setRandomNumber } from "../../redux/reducers/profile/index";

//===============================================================

const Popup_Delete_Profile = (props) => {

    var randomstring = require("randomstring");
    
    //===============================================================
    const dispatch = useDispatch();

    const state = useSelector((state) => {
        return {
            RandomNumber: state.profile.RandomNumber,
        };
    });

    //===============================================================
    let randomData
    if (!state.RandomNumber) {
        randomData = randomstring.generate({
            length: 15,
            charset: 'alphanumeric'
        });
        dispatch(setRandomNumber(randomData))
    } else {
        randomData = state.RandomNumber
    }
    const [userData, setUserData] = useState(undefined)
    const [alert, setAlert] = useState(false)



    const validateData = () => {
        let errors = {};

        if (userData !== randomData) {
            errors.randomInput = "Please input the above vale correctly";
        }
        return errors
    }

    //===============================================================

    const delete_Function = () => {
        const errors = validateData();
        console.log(errors, "000")
        if (Object.keys(errors).length) {
            setAlert(errors["randomInput"]);
            return;
        }
        setAlert(0)


        
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

                    <Form.Label>Retype {randomData} if you really want to delete account:-   </Form.Label>
                    <Form.Control name="random_Input" onChange={(e) => { setUserData(e.target.value) }} placeholder="" />
                    {alert ? <Alert key="danger" style={{ margin: "12px 0px" }} variant="danger">{alert}</Alert> : <> </>}
                </Modal.Body>

                <Modal.Footer>
                    <div className="addSubmit">
                        <Button variant="primary" onClick={delete_Function}>submit</Button>
                    </div>
                    <Button className="shadowButton" onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Popup_Delete_Profile