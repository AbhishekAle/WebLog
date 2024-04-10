import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CopyrightIcon from "@mui/icons-material/Copyright";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactPattern =
      /^(?:[^<>()[\]\\.,;:\s@"]+@\w+(?:\.\w+)+)|(?:\+\d{1,3}\s*)?\d{10}$/;
    if (!contactPattern.test(contact)) {
      setError("Invalid email or phone number format");
      return;
    }
    try {
      const res = await axios.post("http://localhost:8000/api/register", {
        username,
        contact,
        password,
      });
      if (res) {
        navigate("/login");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Registration failed. Please try again later.");
    }
  };

  const navigate = useNavigate();

  const handleContactChange = (e) => {
    setContact(e.target.value);
    setError(null);
  };

  return (
    <div className="px-20 py-10 h-[95vh] bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white">
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="rounded p-1.5 text-black"
              />
            </div>
            <div className="flex flex-col">
              <label>Email/Phone Number</label>
              <input
                id="contact"
                type="text"
                placeholder="Enter Email/Phone Number"
                value={contact}
                onChange={handleContactChange}
                className="rounded p-1.5 text-black"
              />
            </div>

            <div className="flex flex-col">
              <label>Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded p-1.5 text-black"
              />
            </div>
            <button className="mt-6 h-fit bg-[#DC143C] hover:bg-red-700 p-1.5 px-3 rounded">
              Register
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
          <div className="flex gap-1 flex-col">
            <p className="flex gap-1">
              Already have an account?
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
