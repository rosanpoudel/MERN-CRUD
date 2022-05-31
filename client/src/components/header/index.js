import React from "react";
import Button from "../Button";
import { useDispatch } from "react-redux";
import { setLoginStatus } from "../../redux/actions/authActions";
import LocalDB from "../../helpers/localStorage";

const Header = ({ isLoggedIn }) => {
  const dispatch = useDispatch();

  // handle logout
  const handleLogout = () => {
    LocalDB.deleteSession();
    dispatch(setLoginStatus(false));
  };
  return (
    <div className="header">
      <h2>ToDos</h2>
      <div className="navigation">
        {isLoggedIn && <Button label="Log out" onClick={handleLogout} />}
      </div>
    </div>
  );
};

export default Header;
