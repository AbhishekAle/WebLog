import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import ArticleIcon from "@mui/icons-material/Article";
import HdrAutoIcon from "@mui/icons-material/HdrAuto";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LoginIcon from "@mui/icons-material/Login";

const Navbar = () => {
  return (
    <div className='nav-bar'>
      <div className='nav-content'>
        <Link to='/'>
          <h1>WebLog</h1>
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
              Blogs
            </h3>
          </Link>
          <Link to='/about'>
            <h3>
              <span>
                <HdrAutoIcon />
              </span>
              About
            </h3>
          </Link>
          <Link to='/contact'>
            <h3>
              <span>
                <AlternateEmailIcon />
              </span>
              Contact
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
