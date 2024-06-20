import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CopyrightIcon from "@mui/icons-material/Copyright";
import axios from "axios";
import { setUser } from "../slices/userSlice";
import { setToken } from "../slices/userSlice";
import { useDispatch } from "react-redux";
import profileImg from "../assets/Defaultprofile.jpg"

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/login", formData);
      const data = await res.data;
      dispatch(setUser(data));
      dispatch(setToken(data.token));

      if (res) {
        navigate("/home");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-[95vh]  px-20 py-10 bg-[#130F40] shadow-lg shadow-blue-500/200 ">
    <div className="flex flex-col justify-center gap-5 bg-gradient-to-br from-black to-[#130F40] shadow-lg shadow-blue-500/200 p-10 rounded-xl z-50 border-[#130F60] border-b-2 border-r-2 ">
      <h1 className="flex gap-1 font-semibold text-l items-center text-white">
        <span className="text-[#DC143C] text-2xl">WebLog</span> Connect with everyone.
      </h1>

      <div className="flex flex-col">
        <form
          className="flex flex-col gap-4 text-white text-l font-semibold my-5"
          onSubmit={handleSubmit}
        >
          
            <label>Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter Username"
              onChange={handleChange}
              className="rounded p-2 text-black"
            />
       
        
            <label>Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter Password"
              onChange={handleChange}
              className="rounded p-2 text-black"
            />
            <p className="underline text-red-500 cursor-pointer">
              forget password
            </p>
         
          <button className="mt-6 h-fit bg-[#DC143C] hover:bg-red-700 p-2 px-3 rounded text-white">
            Login
          </button>
        </form>
        <div className="flex gap-1 flex-col mt-3">
          {/* Add error handling here */}
          <div className="flex gap-1 text-white">
            Don't have an account?
            <span onClick={() => navigate("/register")}>
              <p className="underline text-red-500 cursor-pointer">
                Register
              </p>
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <h3 className="flex gap-1 text-white">
          For any queries.
          <span onClick={() => navigate("/contact")}>
            <p className="underline cursor-pointer hover:text-[#DC143C]">
              Contact Us
            </p>
          </span>
        </h3>
        <h3 className="text-white">
          <CopyrightIcon />
          all rights reserved.
        </h3>
      </div>
    </div>
  </div>
  );
};

export default Login;
