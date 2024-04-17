import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const SettingsPrivacy = () => {
  const { userData } = useSelector((state) => state.user);
  const token = userData.token;
  const id = userData._id;
  console.log(id);
  const [formData, setFormdata] = useState([
    {
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
  ]);

  useEffect(() => {
    fetchData();
  }, [id]);
  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.data;
      console.log("data", data);
      setFormdata(data);
    } catch (error) {}
  };
  const handleChange = (e) => {
    setFormdata({ ...formData, [e.target.value]: e.target.name });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="px-20 py-10 w-full">
      <form
        className="flex flex-col items-center justify-center "
        onSubmit={handleSubmit}>
        <div className="flex flex-col w-1/2 gap-1 font-semibold">
          {/* <label className="pt-2">Profile Picture</label>
          <input type="file" /> */}
          <label className="pt-2">Username</label>
          <input
            name="username"
            type="text"
            className="border p-2 rounded-lg"
            onChange={handleChange}
          />
          <label className="pt-2">Email</label>
          <input
            name="email"
            type="text"
            className="border p-2 rounded-lg"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col w-1/2 gap-1 font-semibold">
          <label className="pt-2">Phone Number</label>
          <input
            name="phoneNumber"
            type="text"
            className="border p-2 rounded-lg "
            onChange={handleChange}
          />
          <label className="pt-2">Password</label>
          <input
            name="password"
            type="text"
            className="border p-2 rounded-lg"
            onChange={handleChange}
          />
        </div>
        <button className="border p-2 w-1/4 m-5 rounded-lg bg-[#DC143C] hover:bg-[#f05473] text-white font-bold text-xl">
          Update
        </button>
      </form>
    </div>
  );
};

export default SettingsPrivacy;
