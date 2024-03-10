import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import ArticleIcon from "@mui/icons-material/Article";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LoginIcon from "@mui/icons-material/Login";

const Navbar = () => {
  return (
    <div className='nav-bar'>
      <div className='nav-content'>
        <Link to='/'>
          <h1>W-Log</h1>
        </Link>
        <div className='search-bar'>
          <input type='text' placeholder='Search WebLog...'></input>
        </div>

        <div className='navigation'>
          <Link to='/blogs'>
            <h3>
              <span>
                <ArticleIcon />
              </span>
              Articles
            </h3>
          </Link>
          <Link to='/about'>
            <h3>
              <span>
                <NotificationsNoneIcon />
              </span>
              Notifications
            </h3>
          </Link>

          <Link to='/login'>
            <h3>
              <span>
                <LoginIcon />
              </span>
              Login/Register
            </h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
