import React, { useState } from "react";
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

      if (res) {
        navigate("/home");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="px-20 py-10 h-[95vh]  bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white">
      <div className="flex flex-col justify-center gap-5 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 shadow-lg shadow-blue-500/200 p-10 rounded-xl">
        <h1 className="flex gap-1 font-semibold text-l items-center">
          <span className="text-[#DC143C] text-2xl">WebLog</span> Connect with
          everyone.
        </h1>

        <div className="flex flex-col">
          <form
            className="flex flex-col lg:flex-row md:flex-row gap-4"
            onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label>Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter Username"
                onChange={handleChange}
                className="rounded p-1 text-black"
              />
            </div>
            <div className="flex flex-col">
              <label>Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter Password"
                onChange={handleChange}
                className="rounded p-1 text-black"
              />
              <p className="underline text-red-500 cursor-pointer">
                forget password
              </p>
            </div>
            <button className="mt-6 h-fit bg-[#DC143C] hover:bg-red-700 p-1 px-3 rounded">
              Login
            </button>
          </form>
          <div className=" flex gap-1 flex-col">
            {error && (
              <h1 className="text-red-500 transition-opacity duration-500 font-bold">
                {error}
              </h1>
            )}

            <div className="flex gap-1">
              Don't have account?
              <span onClick={() => navigate("/register")}>
                {" "}
                <p className="underline text-red-500 cursor-pointer">
                  Register
                </p>
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <h3 className="flex gap-1">
            For any queries.
            <span onClick={() => navigate("/contact")}>
              <p className="underline cursor-pointer hover:text-[#DC143C]">
                Contact Us
              </p>
            </span>
          </h3>
          <h3 className="">
            <CopyrightIcon />
            all rights reserved.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Login;
