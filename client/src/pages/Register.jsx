import React from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import CopyrightIcon from "@mui/icons-material/Copyright";

const Register = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className='intro'>
        WebLog <span>Create your profile.</span>
      </h1>
      <div className='login-cont'>
        <div className='form-cont'>
          <form className='form'>
            <label>Username</label>
            <input type='text' placeholder='Enter Username' required />
            <label>Email/Phone Number</label>
            <input
              type='text'
              placeholder='Enter Email/Phone Number'
              required
            />
            <label>New Password</label>
            <input type='text' placeholder='Enter New Password' required />
            <label>Confirm Password</label>
            <input type='text' placeholder='Confirm Password' required />
            <button className='login-btn'>Register</button>
            <p className='login-text'>
              Already have account?
              <span onClick={() => navigate("/login")}>Login</span>
            </p>
          </form>
        </div>
      </div>
      <p className='auth-footer'>
        <h3 className='footer1' onClick={() => navigate("/contact")}>
          For any queries.<span>Contact Us</span>
        </h3>
        <h3 className='footer2'>
          <CopyrightIcon />
          all rights reserved.
        </h3>
      </p>
    </div>
  );
};

export default Register;
