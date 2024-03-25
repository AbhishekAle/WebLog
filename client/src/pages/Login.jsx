import React, { useState } from "react";
import "./LoginRegister.css";
import { useNavigate } from "react-router-dom";
import CopyrightIcon from "@mui/icons-material/Copyright";
import axios from "axios";
import { setUser } from "../slices/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  console.log(error);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const username = formData.username;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/login", formData);

      const data = await res.data;

      dispatch(setUser(data));
      console.log(data);
      if (data.success === false) {
        setError(data.error);
      }
      if (res) {
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className='intro'>
        WebLog <span>Connect with everyone.</span>
      </h1>
      <div className='login-cont'>
        <div className='form-cont'>
          <form className='form' onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              id='username'
              type='text'
              placeholder='Enter Username'
              onChange={handleChange}
            />
            <label>Password</label>
            <input
              id='password'
              type='password'
              placeholder='Enter Password'
              onChange={handleChange}
            />

            <button className='login-btn'>Login</button>
            <p className='pw'>forget password</p>
          </form>
          {error && (
            <h1 className='text-red-500 transition-opacity duration-500'>
              {error}
            </h1>
          )}
          <p className='login-text'>
            Don't have account?
            <span onClick={() => navigate("/register")}>Register</span>
          </p>
        </div>
      </div>
      <div className='auth-footer'>
        <h3 className='footer1'>
          For any queries.
          <span onClick={() => navigate("/contact")}>Contact Us</span>
        </h3>
        <h3 className='footer2'>
          <CopyrightIcon />
          all rights reserved.
        </h3>
      </div>
    </div>
  );
};

export default Login;
