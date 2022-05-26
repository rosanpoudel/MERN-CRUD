import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { setCookie } from "../helpers/localStorage";
import SitePaths from "../helpers/path";
import Button from "./Button";
import InputFeild from "./InputFeild";

const LoginForm = ({ setIsLoggedIn }) => {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [loginLoading, setLoginLoading] = useState(false);
  const { email, password } = loginFormData;

  const handleInputChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    setLoginLoading(true);
    axios
      .post(`${SitePaths.BASE_PATH}/user/login`, loginFormData)
      .then(function (response) {
        // on login success
        setCookie(response.data);
        setLoginLoading(false);
        setLoginFormData({
          email: "",
          password: "",
        });
        setIsLoggedIn(true);
      })
      .catch(function (error) {
        setLoginLoading(false);
        console.log("error:", error);
      });
  };

  return (
    <div className="login-signup">
      <div className="c-form">
        <InputFeild
          label="Enter your email"
          type="text"
          name="email"
          value={email}
          onChange={handleInputChange}
        />
        <InputFeild
          label="Password"
          onChange={handleInputChange}
          type="password"
          name="password"
          value={password}
        />
        <div>
          <Button label="Login" loading={loginLoading} onClick={handleLogin} />
          <Link className="link-button c-button" to="/signup">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
