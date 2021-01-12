import React from "react";
import { Link } from "react-router-dom";
import "tachyons";

const Navigation = (props) => {
  if (props.page === "dashboardPage") {
    return (
      <nav className="flex justify-end">
        <p
          className="dim pointer f4 black underline pa3"
          onClick={props.handleLogout}
        >
          Log Out
        </p>
      </nav>
    );
  }
  if (props.page === "registerPage") {
    return (
      <nav className=" flex justify-end">
        <Link to="login">
          <p className="dim pointer f4 black underline pa3">Sign In</p>
        </Link>
      </nav>
    );
  }
  if (props.page === "loginPage") {
    return (
      <nav className=" flex justify-end">
        <Link to="register">
          <p className="dim pointer f4 black underline pa3">Register</p>
        </Link>
      </nav>
    );
  }
};
export default Navigation;
