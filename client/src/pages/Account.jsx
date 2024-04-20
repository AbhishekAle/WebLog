import React, { useEffect, useState } from "react";
import pasupatinath from "../assets/pasupatinath.jpg";
import { useSelector } from "react-redux";
import axios from "axios";

const Account = () => {
  const { userData } = useSelector((state) => state.user);
  const [profileData, setProfileData] = useState({});
  const avatar = profileData.avatar;
  const token = userData.token;
  const id = userData._id;

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
      setProfileData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  return (
    <div className="w-full px-20 py-1">
      <div className="flex flex-col">
        <div>
          <img
            src={pasupatinath}
            alt="cover photo"
            title="Cover Photo"
            className="w-full h-[50vh] border-slate-200 border-2 rounded-xl"
          />
        </div>

        <div className=" flex justify-between items-center px-36">
          <div className="flex items-center gap-10">
            <img
              src={`http://localhost:8000/userProfile/${avatar}`}
              className="relative top-[-3rem] w-[16rem] h-[16rem] rounded-full border-t-[5px] border-r-[5px] border-l-[5px] border-white"
            />
            <div className="flex flex-col">
              <h2 className="relative top-[-3rem] font-semibold text-2xl">
                {profileData.username}
              </h2>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <button>Add Story</button>
            <button>Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
