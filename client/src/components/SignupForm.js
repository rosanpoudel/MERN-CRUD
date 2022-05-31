import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { setCookie } from "../helpers/localStorage";
import LocalDB from "../helpers/localStorage";
import SitePaths from "../helpers/path";
import Button from "./Button";
import InputFeild from "./InputFeild";
import { setLoginStatus } from "../redux/actions/authActions";
import { useDispatch } from "react-redux";
import { ApiBasePath } from "../helpers/globalConstants";

const SignupForm = () => {
  const dispatch = useDispatch();
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
      .post(`${ApiBasePath.BASE_PATH}/user/signup`, signupFormData)
      .then(function (response) {
        dispatch(setLoginStatus(true));
        LocalDB.setSession(response.data);
        setSignupLoading(false);
        setSignupFormData({
          name: "",
          email: "",
          password: "",
        });
      })
      .catch(function (error) {
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
            disabled={
              signupFormData.name.length === 0 ||
              signupFormData.email.length === 0 ||
              signupFormData.password.length === 0
            }
            loading={signupLoading}
            onClick={handleSignup}
          />
          <div className="other-option">
            Already have account?{" "}
            <Link className="link-button" to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
