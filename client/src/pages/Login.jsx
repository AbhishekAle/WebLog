import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import CopyrightIcon from "@mui/icons-material/Copyright";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className='intro'>
        WebLog <span>Connect with your everyone.</span>
      </h1>
      <div className='login-cont'>
        <div className='form-cont'>
          <form className='form'>
            <label>Username</label>
            <input type='text' placeholder='Enter Username' required />
            <label>Password</label>
            <input type='text' placeholder='Enter Password' required />
            <button className='login-btn'>Login</button>
            <p className='pw'>forget password</p>
          </form>
          <p className='login-text'>
            Don't have account?
            <span onClick={() => navigate("/register")}>Register</span>
          </p>
        </div>
      </div>
      <p className='auth-footer'>
        <h3 className='footer1'>
          For any queries.
          <span onClick={() => navigate("/contact")}>Contact Us</span>
        </h3>
        <h3 className='footer2'>
          <CopyrightIcon />
          all rights reserved.
        </h3>
      </p>
    </div>
  );
};

export default Login;
