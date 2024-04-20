import React, { useEffect, useState } from "react";
import pasupatinath from "../assets/pasupatinath.jpg";
import { useSelector } from "react-redux";
import axios from "axios";

const Account = () => {
  const { userData } = useSelector((state) => state.user);
  const [profileData, setProfileData] = useState("");
  console.log(profileData);
  const token = userData.token;
  const id = userData._id;
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `http://localhost:8000/userProfile-/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        console.log(data);
        setProfileData(data.avatar);
      };
    } catch (error) {}
  }, [id]);
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

        <div className="absolute top-96 left-40">
          <img
            src={`http://localhost:8000/userProfile/${profileData}`}
            className="w-[18rem] h-[18rem] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Account;
