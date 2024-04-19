import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";

const SettingsPrivacy = () => {
  const { userData } = useSelector((state) => state.user);
  console.log(userData.id);
  return (
    <div className="px-40 py-10 gap-2 border">
      <div className="flex flex-col">
        <Link to={`/update-user/${userData._id}`}>Authentication</Link>
        <span>Privacy</span>
      </div>
    </div>
  );
};

export default SettingsPrivacy;
