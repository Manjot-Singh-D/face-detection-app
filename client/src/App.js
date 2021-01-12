import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage/LoginPage";
import RegisterPage from "./Components/RegisterPage/RegisterPage";
import DashboardPage from "./Components/DashboardPage/DashboardPage";
import MainPage from "./Components/MainPage/MainPage";
import jwt_decode from "jwt-decode";
import { handleAuthToken } from "./Components/Authentication/auth";
import { handleLogout } from "./Components/Authentication/auth";

// if (localStorage.jwtToken) {
//   const token = localStorage.jwtToken;
//   handleAuthToken(token);
//   const decoded = jwt_decode(token);
//   const currentTime = Date.now() / 1000;
//   if (decoded.exp < currentTime) {
//     handleLogout();
//     window.location.href = "./login";
//   }
// }
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/dashboard/:id">
            <DashboardPage />
          </Route>
          <Route exact path="/">
            <MainPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
