import React from "react";
import "./MainPage.css";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="mainPage">
      <p className="mainPage_header">WELCOME</p>
      <p className="mainPage_subTitle">TO FACE DETECTION</p>
      <p className="mainPage_details">
        This is the app that detect the face on a given picture by machine
        learning models and draws a box around the face
      </p>
      <div className="hoveringEffect">
        <Link to="register">
          <button className="MainPageButton">Register</button>
        </Link>
        <Link to="login">
          <button className="MainPageButton">Login</button>
        </Link>
      </div>
    </div>
  );
};
export default MainPage;
