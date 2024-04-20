import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import UpdateUser from "./features/UpdateUser";

const SettingsPrivacy = () => {
  const { userData } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("authentication");

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const tabItemClass = (tabName) =>
    `cursor-pointer ${
      activeTab === tabName
        ? "border-l-2 px-1 border-[#DC143C] text-[#DC143C]"
        : "hover:text-[#DC143C]"
    }`;

  return (
    <div className="px-40 py-10 flex">
      <div className="flex flex-col mt-8 gap-5 font-semibold">
        <button
          onClick={() => handleTabChange("authentication")}
          className={tabItemClass("authentication")}>
          Authentication
        </button>
        <button
          onClick={() => handleTabChange("delete")}
          className={tabItemClass("delete")}>
          Delete Account
        </button>
        <button
          onClick={() => handleTabChange("privacy")}
          className={tabItemClass("privacy")}>
          Privacy & Policy
        </button>
      </div>
      <div className="flex-grow">
        {activeTab === "authentication" && <UpdateUser />}
        {activeTab === "privacy" && <div>Privacy</div>}
        {activeTab === "delete" && <div>Delete Account</div>}
      </div>
    </div>
  );
};

export default SettingsPrivacy;
