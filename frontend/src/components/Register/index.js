import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import validator from 'validator';
import { useState } from "react";
import React from 'react';
import axios from 'axios';



export default function Register() {

  useStateTestValue={
    first_name: undefined ,
    last_name: undefined,
    age: undefined,
    country: undefined,
    email: undefined,
    password: undefined,
    img: undefined,
    role_id: "1",
    urlMyPhoto: "",
  }



  return (<>
  <div>Register</div>
  <div> 
  </div>

  </>);
}
