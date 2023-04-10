import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import validator from 'validator';
import { useState } from "react";
import React from 'react';
import axios from 'axios';



export default function Register() {

  let useStateTestValue={
    first_name: undefined ,
    last_name: undefined,
    age: undefined,
    country: undefined,
    email: undefined,
    password: undefined,
    img: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg" ,
    role_id: "1",
  }

  const [userData, setUserData] = useState(useStateTestValue)
  const { first_name, last_name, age, country ,email, password, img } = userData

  const [errors, setErrors] = useState({})
  
  const validateData = () => {
    let errors = {};
    console.log(first_name, last_name, age, country ,email, password, img)
    if(!first_name){
      
      errors.first_name = "first name is required";
    }
    if(!last_name){
      
      errors.last_name = "last name is required";
    }
    if (!validator.isEmail(email)) {
    

      errors.email = "A vialed email is required";
    }
    if (!validator.isStrongPassword(password)) {
    
      errors.password = "A vialed strong password is required";
    }
    
    if(!validator.isDate(age)){
      
      errors.age = "Date is required";
    }
    if(!country){
      
      errors.country = "country is required";
    }
    
    return errors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((preData) => ({ ...preData, [name]: value }))
    console.log(userData)
  }

  const submit = () => {

    const errors = validateData();  
    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }


    }
    


  return (<>
  <div>Register</div>
  <div> 

    <label >first_name: </label>
    <input name="first_name"  className=''  onChange={handleChange} ></input><br/>
    <div style={{ color: "red" }}>{errors.first_name}</div>
    <label >last_name: </label>
    <input name="last_name"  className=''  onChange={handleChange} ></input><br/>
    <div style={{ color: "red" }}>{errors.last_name}</div>
    <label >age: </label>
    <input name="age"  className='' onChange={handleChange}  ></input><br/>
    <div style={{ color: "red" }}>{errors.age}</div>
    <label >country: </label>
    <input name="country"  className=''  onChange={handleChange} ></input><br/>
    <div style={{ color: "red" }}>{errors.country}</div>
    <label >Email: </label>
    <input name="email"  className='' onChange={handleChange}  ></input><br/>
    <div style={{ color: "red" }}>{errors.email}</div>
    <label >password: </label>
    <input name="password"  className=''  onChange={handleChange} ></input><br/>
    <div style={{ color: "red" }}>{errors.password}</div>
    <label >img: </label>
    <input name="img"  className=''  onChange={handleChange} ></input><br/>


    <div>
    <Button variant="primary" className='' onClick={submit}  >submit</Button>
    </div>


  </div>

  </>);
}
