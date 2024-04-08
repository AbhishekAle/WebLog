import React, { useState } from "react";
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
    // <div>
    //   <h1 className="intro">
    //     WebLog <span>Create your profile.</span>
    //   </h1>
    //   <div className="login-cont">
    //     <div className="form-cont">
    //       <form className="form" onSubmit={handleSubmit}>
    //         <label>Username</label>
    //         <input
    //           id="username"
    //           type="text"
    //           placeholder="Enter Username"
    //           required
    //           onChange={handleChange}
    //         />
    //         <label>Email/Phone Number</label>
    //         <input
    //           id="email"
    //           type="text"
    //           placeholder="Enter Email/Phone Number"
    //           required
    //           onChange={handleChange}
    //         />
    //         <label>New Password</label>
    //         <input
    //           id="password"
    //           type="text"
    //           placeholder="Enter New Password"
    //           required
    //           onChange={handleChange}
    //         />
    //         <button className="login-btn">Register</button>
    //         <p className="login-text">
    //           Already have account?
    //           <span onClick={() => navigate("/login")}>Login</span>
    //         </p>
    //       </form>
    //     </div>
    //   </div>
    //   <div className="auth-footer">
    //     <p className="footer1">
    //       For any queries.
    //       <span onClick={() => navigate("/contact")}>Contact Us</span>
    //     </p>
    //     <h3 className="footer2">
    //       <CopyrightIcon />
    //       all rights reserved.
    //     </h3>
    //   </div>
    // </div>
    <div className="px-20 py-10 h-[95vh]  bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white">
      <div className="flex flex-col justify-center gap-5 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 shadow-lg shadow-blue-500/200 p-10 rounded-xl">
        <h1 className="flex gap-1 font-semibold text-l items-center">
          Get Registered in
          <span className="text-[#DC143C] text-2xl">WebLog</span>
        </h1>

        <div className="flex gap-10 flex-col">
          <form className="flex flex-col w-1/5 gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label>Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter Username"
                onChange={handleChange}
                className="rounded p-1.5 text-black"
              />
            </div>
            <div className="flex flex-col">
              <label>Email/Phone Number</label>
              <input
                id="username"
                type="text"
                placeholder="Enter Email/Phone Number"
                onChange={handleChange}
                className="rounded p-1.5 text-black"
              />
            </div>

            <div className="flex flex-col">
              <label>Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter Password"
                onChange={handleChange}
                className="rounded p-1.5 text-black"
              />
            </div>
            <button className="mt-6 h-fit bg-[#DC143C] hover:bg-red-700 p-1.5 px-3 rounded">
              Register
            </button>
          </form>
          <div className=" flex gap-1 flex-col">
            <p className="flex gap-1">
              Already have account?
              <span onClick={() => navigate("/login")}>
                {" "}
                <p className="underline text-red-500 cursor-pointer">Login</p>
              </span>
            </p>
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

export default Register;
