import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import CopyrightIcon from "@mui/icons-material/Copyright";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:8000/api/register",
      formData
    );
    if (res) {
      navigate("/login");
    }
  };
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="intro">
        WebLog <span>Create your profile.</span>
      </h1>
      <div className="login-cont">
        <div className="form-cont">
          <form className="form" onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter Username"
              required
              onChange={handleChange}
            />
            <label>Email/Phone Number</label>
            <input
              id="email"
              type="text"
              placeholder="Enter Email/Phone Number"
              required
              onChange={handleChange}
            />
            <label>New Password</label>
            <input
              id="password"
              type="text"
              placeholder="Enter New Password"
              required
              onChange={handleChange}
            />
            <button className="login-btn">Register</button>
            <p className="login-text">
              Already have account?
              <span onClick={() => navigate("/login")}>Login</span>
            </p>
          </form>
        </div>
      </div>
      <div className="auth-footer">
        <p className="footer1">
          For any queries.
          <span onClick={() => navigate("/contact")}>Contact Us</span>
        </p>
        <h3 className="footer2">
          <CopyrightIcon />
          all rights reserved.
        </h3>
      </div>
    </div>
  );
};

export default Register;
