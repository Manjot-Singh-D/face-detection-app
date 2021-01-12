import React from "react";
import "tachyons";
import "./Logo.css";
import Tilt from "react-tilt";
import brain from "./brain.png";

const Logo = () => {
  return (
    <Tilt
      className="Tilt shadow-2 ma3 bl bt pa3"
      options={{ max: 30 }}
      style={{ height: 120, width: 120 }}
    >
      <div className="Tilt-inner ">
        <img src={brain} alt="logo" />{" "}
      </div>
    </Tilt>
  );
};
export default Logo;
