import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function SearchPage() {
  const BACKEND = process.env.REACT_APP_BACKEND;

  const { name } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BACKEND}/search/${name}`)
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, [name]);

  return <div>index</div>;
}
