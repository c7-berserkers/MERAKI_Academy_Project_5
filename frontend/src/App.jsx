import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Post from "./components/post";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <Home />
            </>
          }
        />
        {/* <Route
          path="/post/:id"
          element={
            <>
              <NavBar />
            </>
          }
        />
         <Route
          path="/profile/:id"
          element={
            <>
              <NavBar />
            </>
          }
        />
        <Route
          path="/user/:id"
          element={
            <>
              <NavBar />
            </>
          }
        /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/post" element={<Post />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
