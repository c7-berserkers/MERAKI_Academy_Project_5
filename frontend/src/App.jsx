import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Post from "./components/post";
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
        <Route path="/post" element={<Post />} />
      </Routes>
    </>
  );
}

export default App;
