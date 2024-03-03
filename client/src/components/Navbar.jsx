import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

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
            <h3>Blogs</h3>
          </Link>
          <Link to='/about'>
            <h3>About</h3>
          </Link>
          <Link to='/contact'>
            <h3>Contact</h3>
          </Link>
          <Link to='/login'>
            <h3>Login/Register</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
