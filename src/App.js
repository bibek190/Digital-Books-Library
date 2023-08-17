import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/home/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
