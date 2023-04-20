import React, { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Stats() {
  const BACKEND = process.env.REACT_APP_BACKEND;

  const { token } = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });

  useEffect(() => {
    axios
      .get(`${BACKEND}/users/mostfollowed`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => console.log(result.data))
      .catch((err) => console.log(err.response.data.message));
  }, []);
  return <div>Stats</div>;
}
