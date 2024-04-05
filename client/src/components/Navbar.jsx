import React, { useState } from "react";
import { Link } from "react-router-dom";
import ArticleIcon from "@mui/icons-material/Article";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../slices/userSlice";
import PersonIcon from "@mui/icons-material/Person";
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from "react-icons/hi";
import axios from "axios";

const Navbar = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = async () => {
    await axios.post("http://localhost:8000/api/logout");
    dispatch(setUser());
    setShowDropdown(false); // Close dropdown after logout
  };

  return (
    <div className=" bg-red-500 w-full">
      <div className="">
        <Link to="/">
          <h1>
            <span className="W">W</span>-Log
          </h1>
        </Link>
        <div className="search-bar">
          <input type="text" placeholder="Search WebLog..."></input>
        </div>

        <div className="navigation">
          <Link to="/blogs">
            <h3>
              <span>
                <ArticleIcon />
              </span>
              Articles
            </h3>
          </Link>
          <Link to="/about">
            <h3>
              <span>
                <NotificationsNoneIcon />
              </span>
              Notifications
            </h3>
          </Link>
          {userData ? (
            <>
              <div className="dropdown">
                <div className="profile" onClick={handleDropdownToggle}>
                  <PersonIcon />
                </div>
                {showDropdown && (
                  <div className="dropdown-menu">
                    <Link to="/account">
                      <h3 className="dropdown-items">
                        <HiViewGrid size={30} />
                        Dashboard
                        <hr />
                      </h3>
                    </Link>

                    <h3 className="dropdown-items">
                      <HiCog />
                      Settings
                      <hr />
                    </h3>
                    <h3 className="dropdown-items">
                      <HiCurrencyDollar size={30} />
                      Earnings
                      <hr />
                    </h3>
                    <h3 onClick={handleLogout} className="dropdown-items">
                      <HiLogout size={30} />
                      Sign out
                      <hr />
                    </h3>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <h3>
                  <span>
                    <LoginIcon />
                  </span>
                  Login/Register
                </h3>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
