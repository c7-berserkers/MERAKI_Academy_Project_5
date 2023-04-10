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
    img: undefined,
    role_id: "1",
  }

  const [userData, setUserData] = useState(useStateTestValue)
  const { first_name, last_name, age, country ,email, password, img } = userData

  const [errors, setErrors] = useState({})
  
  const validateData = () => {
    let errors = {};

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
      
      errors.first_name = "first name is required";
    }
    if(!validator.isURL(img)){
      errors.urlMyPhoto = "Url is required";
    }
    return errors
  }




  return (<>
  <div>Register</div>
  <div> 

    <label >first_name: </label>
    <input name="first_name"  className=''  ></input><br/>
    <label >last_name: </label>
    <input name="last_name"  className=''  ></input><br/>
    <label >age: </label>
    <input name="age"  className=''  ></input><br/>
    <label >country: </label>
    <input name="country"  className=''  ></input><br/>
    <label >Email: </label>
    <input name="email"  className=''  ></input><br/>
    <label >password: </label>
    <input name="password"  className=''  ></input><br/>
    <label >img: </label>
    <input name="img"  className=''  ></input><br/>
    <Button variant="primary" className='' >submit</Button>
  
  </div>

  </>);
}
