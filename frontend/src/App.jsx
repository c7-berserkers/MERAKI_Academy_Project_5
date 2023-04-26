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
import SearchPage from "./components/SearchPage";
import ChatsPage from "./components/ChatsPage";
import Chat from "./components/Chat";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";

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
              <Footer />
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
              <Post /> <Footer />
            </>
          }
        />
        <Route
          path="/tag/:id"
          element={
            <>
              <NavBar />
              <Tag /> <Footer />
            </>
          }
        />
        <Route
          path="/Profile/:id"
          element={
            <>
              {" "}
              <NavBar /> <Profile /> <Footer />{" "}
            </>
          }
        />
        <Route
          path="/dashboard/*"
          element={
            <>
              <NavBar />
              <Dashboard /> <Footer />
            </>
          }
        />
        <Route
          path="/search/:name"
          element={
            <>
              <NavBar />
              <SearchPage /> <Footer />
            </>
          }
        />
        <Route
          path="/chat"
          element={
            <>
              <NavBar />
              <ChatsPage /> <Footer />
            </>
          }
        />
        <Route
          path="/chat/:name"
          element={
            <>
              <NavBar />
              <Chat />
            </>
          }
        />

        {/* Handling Undefined Routes */}
        <Route
          path="*"
          element={
            <>
              <NavBar />
              <NotFound /> <Footer />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
