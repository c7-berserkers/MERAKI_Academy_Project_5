import "./App.css";
import React from "react";
import { Routes, Route, Link ,useParams} from "react-router-dom";
import { useEffect,useState,createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AllContext = createContext();
const  Img = () => {
  const navigate = useNavigate();
const [imgselct,setimgselct]=useState("")


  const imgUpload=()=>{
    console.log(imgselct)
    const formData = new FormData();
    formData.append("file" ,imgselct )
    formData.append("upload_preset" ,"vledn3tb" )
    axios.post("https://api.cloudinary.com/v1_1/dy9hkpipf/image/upload",formData).then((result)=>{console.log(result)
}).catch((err)=>{
        console.log(err)
    })
  }

  return (<div className="login-pop">
  <input type="file" onChange={(e)=>{setimgselct(e.target.files[0])}}></input>
  <button type="submit" className="login-button" onClick={imgUpload}>submit</button>
    </div>
  );
}

export default Img;
