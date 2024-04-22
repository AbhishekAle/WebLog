import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UpdateUser = () => {
  const { userData } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.user);
  const id = userData._id;

  const [formData, setFormdata] = useState({
    username: "",
    password: "",
  });
  const username = formData.username;
  const password = formData.password;

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
      const data = res.data;
      setFormdata(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleChange = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:8000/api/update-user/${id}`,
        { username, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {}
  };

  return (
    <div className="px-20 py-10 w-full">
      <form
        className="flex flex-col items-center justify-center "
        onSubmit={handleSubmit}>
        <div className="flex flex-col w-1/2 gap-1 font-medium">
          <h2 className="pb-5 font-semibold text-xl">
            Update Your Login Information.
          </h2>
          <label className="pt-2">Username:</label>
          <input
            name="username"
            type="text"
            className="border p-2 rounded-lg font-medium bg-white border-black outline-none"
            onChange={handleChange}
            value={formData.username}
          />
          <label className="pt-2">Password:</label>
          <input
            name="password"
            type="text"
            className="border p-2 rounded-lg font-medium bg-white border-black outline-none"
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

export default UpdateUser;
