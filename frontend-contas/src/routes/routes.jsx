import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";

import Login from "../pages/Login/Login";
import Register from './../pages/Register/Register';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Login/> }></Route>
        <Route path="/home" element={ <Home/> }></Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

