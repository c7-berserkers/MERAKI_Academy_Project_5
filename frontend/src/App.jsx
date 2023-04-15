import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Post from "./components/post";
import Profile from "./components/Profile/index";
import Tag from "./components/Tag";
import NotFound from "./components/NotFound";

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

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/post/:id"
          element={
            <>
              <NavBar />
              <Post />
            </>
          }
        />
        <Route
          path="/tag/:id"
          element={
            <>
              <NavBar />
              <Tag />
            </>
          }
        />
        <Route
          path="/Profile/:id"
          element={
            <>
              {" "}
              <NavBar /> <Profile />{" "}
            </>
          }
        />

        {/* Handling Undefined Routes */}
        <Route
          path="*"
          element={
            <>
              <NavBar />
              <NotFound />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
