import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import axios from "axios";
import CautionError from "../CautionError/CautionError";

const LoginPage = () => {
  const [inputValue, setInputValue] = useState({ email: "", password: "" });
  const [details, setDetails] = useState("");
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState({
    message: "",
    visible: false,
  });
  const removeError = () => {
    setErrorMessage({ message: "", visible: false });
  };
  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setInputValue((prevInputValue) => {
      return {
        ...prevInputValue,
        [name]: value,
      };
    });
  };
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/login`, inputValue)
      .then((res) => {
        setDetails(res.data);
      })
      .catch((err) => console.log(err));
  };
  if (details.found === "success") {
    setInputValue({ email: "", password: "" });
    history.push(`/dashboard/${details.user}`);
    setDetails({});
    return null;
  } else if (details.found === "incorrect password") {
    setInputValue({ email: "", password: "" });
    setErrorMessage({ message: details.found, visible: true });
    setDetails({});
    return null;
  } else if (details.found === "user not found") {
    setInputValue({ email: "", password: "" });
    setErrorMessage({ message: details.found, visible: true });
    setDetails({});
    return null;
  } else {
    return (
      <div>
        <Navigation page={"loginPage"} />
        <CautionError data={errorMessage} removeError={removeError} />
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l shadow-3 mw5 center">
          <main className="pa4 black-80">
            <div className="measure">
              <form onSubmit={handleSubmitLogin}>
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                  <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                  <div className="mt3">
                    <label
                      className="db fw6 lh-copy f6"
                      htmlFor="email-address"
                    >
                      Email
                    </label>
                    <input
                      className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                      type="email"
                      name="email"
                      id="email-address"
                      required
                      onChange={handleChangeValue}
                      value={inputValue.email}
                    />
                  </div>
                  <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">
                      Password
                    </label>
                    <input
                      className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                      type="password"
                      name="password"
                      id="password"
                      required
                      onChange={handleChangeValue}
                      value={inputValue.password}
                    />
                  </div>
                </fieldset>
                <div className="">
                  <input
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                    type="submit"
                    defaultValue="Login"
                  />
                </div>
              </form>
              <div className="lh-copy mt3">
                <Link to="register">
                  <p className="f6 link pointer dim black db">Register</p>
                </Link>
              </div>
            </div>
          </main>
        </article>
      </div>
    );
  }
};
export default LoginPage;
