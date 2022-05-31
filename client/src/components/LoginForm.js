import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LocalDB from "../helpers/localStorage";
import Button from "./Button";
import InputFeild from "./InputFeild";
import { useDispatch } from "react-redux";
import { setLoginStatus } from "../redux/actions/authActions";
import { ApiBasePath } from "../helpers/globalConstants";
import CustomizedSnackbars from "./Snackbar";
import { setSnackbarOptions } from "../redux/actions/snackbarActions";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [loginLoading, setLoginLoading] = useState(false);
  const { email, password } = loginFormData;

  const handleInputChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setLoginLoading(true);

    axios
      .post(`${ApiBasePath.BASE_PATH}/user/login`, loginFormData)
      .then(function (response) {
        // on login success
        LocalDB.setSession(response.data);
        dispatch(setLoginStatus(true));
        setLoginLoading(false);
        setLoginFormData({
          email: "",
          password: "",
        });
      })
      .catch(function (error) {
        setLoginLoading(false);

        // error snackbar
        dispatch(
          setSnackbarOptions({
            isOpen: true,
            type: "error",
            message: "Please enter valid credentials",
          })
        );
        setTimeout(() => {
          dispatch(
            setSnackbarOptions({
              isOpen: false,
              type: "",
              message: "",
            })
          );
        }, 3000);
      });
  };

  return (
    <div className="login-signup">
      <CustomizedSnackbars type="success" message="Login successful !" />
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
          <Button
            label="Login"
            disabled={
              loginFormData.email.length === 0 ||
              loginFormData.password.length === 0
            }
            loading={loginLoading}
            onClick={handleLogin}
          />
          <div className="other-option">
            Click{" "}
            <Link className="link-button" to="/signup">
              Sign up
            </Link>{" "}
            to create new account.
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
