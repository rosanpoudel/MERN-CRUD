import React from "react";
import Button from "../Button";
import { deleteCookie } from "../../helpers/localStorage";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const handleLogout = () => {
    deleteCookie();
    setIsLoggedIn(false);
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
