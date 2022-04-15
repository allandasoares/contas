import { useContext, useEffect, useRef, useState } from "react";
import api from "../../services/Api";
import { userProfile } from "../Login/Login";
import "./Home.css";

function Home() {
  return (
    <div className="containerHome">
      <h1>Home</h1>
      <h2>This is my profile: { userProfile }</h2>
    </div>
  );
}

export default Home;
