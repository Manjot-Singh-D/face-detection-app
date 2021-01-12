import React, { useState } from "react";
import axios from "axios";
import Navigation from "../Navigation/Navigation";
import { useHistory } from "react-router-dom";
import CautionError from "../CautionError/CautionError";

const RegisterPage = () => {
  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    message: "",
    visible: false,
  });
  const removeError = () => {
    setErrorMessage({ message: "", visible: false });
  };
  const [response, setResponse] = useState({});
  const submitRegister = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/register`, inputValues)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValues((previnputValues) => {
      return {
        ...previnputValues,
        [name]: value,
      };
    });
  };
  const history = useHistory();
  if (response.valid === "User Already Registered") {
    setInputValues({ name: "", email: "", password: "" });
    setErrorMessage({ message: response.valid, visible: true });
    setResponse({});
    return null;
  } else if (response.valid === "success") {
    history.push(`/dashboard/${response.user}`);
    setResponse({});
    return null;
  } else {
    return (
      <div>
        <Navigation page={"registerPage"} />
        <CautionError data={errorMessage} removeError={removeError} />
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l shadow-3 mw5 center">
          <main className="pa4 black-80">
            <div className="measure">
              <form onSubmit={submitRegister}>
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                  <legend className="f4 fw6 ph0 mh0">Register</legend>
                  <div className="mt3">
                    <label
                      className="db fw6 lh-copy f6"
                      htmlFor="email-address"
                    >
                      Name
                    </label>
                    <input
                      className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                      type="text"
                      name="name"
                      value={inputValues.name}
                      onChange={handleOnChange}
                      id="name"
                      required
                    />
                  </div>
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
                      value={inputValues.email}
                      onChange={handleOnChange}
                      id="email-address"
                      required
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
                      value={inputValues.password}
                      onChange={handleOnChange}
                      id="password"
                      required
                    />
                  </div>
                </fieldset>
                <div className="">
                  <input
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                    type="Submit"
                    defaultValue="register"
                  />
                </div>
              </form>
            </div>
          </main>
        </article>
      </div>
    );
  }
};

export default RegisterPage;
