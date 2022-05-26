import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { setCookie } from "../helpers/localStorage";
import SitePaths from "../helpers/path";
import Button from "./Button";
import InputFeild from "./InputFeild";

const SignupForm = ({ setIsLoggedIn }) => {
  const [signupFormData, setSignupFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [signupLoading, setSignupLoading] = useState(false);
  const { name, email, password } = signupFormData;

  const handleInputChange = (e) => {
    setSignupFormData({ ...signupFormData, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    setSignupLoading(true);
    axios
      .post(`${SitePaths.BASE_PATH}/user/signup`, signupFormData)
      .then(function (response) {
        setCookie(response.data);
        setSignupLoading(false);
        setSignupFormData({
          name: "",
          email: "",
          password: "",
        });
        setIsLoggedIn(true);
      })
      .catch(function (error) {
        console.log("error:", error);
        setSignupLoading(false);
      });
  };

  return (
    <div className="login-signup">
      <div className="c-form">
        <InputFeild
          label="Enter your name"
          onChange={handleInputChange}
          type="text"
          name="name"
          value={name}
        />
        <InputFeild
          label="Enter your email"
          onChange={handleInputChange}
          type="text"
          name="email"
          value={email}
        />
        <InputFeild
          label="Password"
          onChange={handleInputChange}
          type="password"
          name="password"
          value={password}
        />
        <div>
          <Button
            label="Sign up"
            loading={signupLoading}
            onClick={handleSignup}
          />
          <Link className="link-button c-button" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
