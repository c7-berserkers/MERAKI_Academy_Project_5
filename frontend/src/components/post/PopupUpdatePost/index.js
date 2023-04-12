import Button from 'react-bootstrap/Button';
import React, { useContext } from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import "./style.css"

const Popup_Comment_Edit = (props) => {
    

  //===============================================================
    const handleChange = (e) => {
        const { name, value } = e.target
        // setUser((preData) => ({ ...preData, [name]: value }))
    }
  //===============================================================

    const add_image = () => {

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

export default Popup_Comment_Edit