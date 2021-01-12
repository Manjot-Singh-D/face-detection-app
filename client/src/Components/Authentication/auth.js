import axios from "axios";

export const handleAuthToken = (token) => {
  if (token) axios.defaults.headers.common["Authorization"] = token;
  else delete axios.defaults.headers.common["Authorization"];
};

export const handleLogout = () => {
  localStorage.removeItem("jwtToken");
  handleAuthToken(false);
  window.location.href = "/";
};
