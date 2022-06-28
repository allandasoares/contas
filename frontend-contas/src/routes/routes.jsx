import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";

import Login from "../pages/Login/Login";
import Register from '../pages/Register/Register';
import ListBank from '../pages/Bank/ListBank';
import ListExpense from "../pages/Transation/ListTransations";
import Calendar from "../pages/Calendar/Calendar";
import Card from "../pages/Card/Card";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Login/> }></Route>
        <Route path="/home" element={ <Home/> }></Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/banks" element={ <ListBank/> }></Route>
        <Route path="/expenses" element={ <ListExpense/> }></Route>
        <Route path="/calendar" element={ <Calendar/> }></Route>
        <Route path="/cards" element={ <Card/> }></Route>
      </Routes>
    </BrowserRouter>
  );
}

