import React, { useContext, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import validator from 'validator';
import "./index.css";
import axios from 'axios';

const Popup_Edit_Data = (props) => {


    const user_test = {
        name: undefined,
        age: undefined,
        country: undefined,
    }
    const [userData, setUserData] = useState(user_test)
    const { name, age, country } = userData
    const [errors, setErrors] = useState({})
    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData((preData) => ({ ...preData, [name]: value }))
    }

    const validateData = () => {
        let errors = {};
        if (!name) {

            errors.name = "Name is required";
        }
        if (!country) {

            errors.country = "country is required";
        }
        if (!validator.isDate(age)) {

            errors.age = "Date is required";
        }

        return errors
    }


    const submitNewData = () => {
        const errors = validateData();
        if (Object.keys(errors).length) {
            setErrors(errors);
            return;
        }
        const token = JSON.parse(localStorage.getItem('user')).token
        const idUser = JSON.parse(localStorage.getItem('user')).user._id

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
                    <label htmlFor="name" >name: </label>
                    <input name="name" required placeholder="your full name" onChange={handleChange}></input>
                    <div style={{ color: "red" }}>{errors.name}</div>
                    <label htmlFor="country" >country:</label>
                    <input name="country" required placeholder="your country" onChange={handleChange}></input>
                    <div style={{ color: "red" }}>{errors.country}</div>
                    <label htmlFor="age" >age:</label>
                    <input name="age" type="date" required placeholder="your age" onChange={handleChange}></input>
                    <div style={{ color: "red" }}>{errors.age}</div>
                </form>


            </Modal.Body>
            <Modal.Footer>
                <div className='submitNewButton' >
                    <Button className="shadowButton" onClick={submitNewData}>submit</Button>
                </div>
                <Button className="shadowButton" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Popup_Edit_Data



