// Layout component
import React from "react";
import SettingsPrivacy from "../pages/SettingsPrivacy";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <SettingsPrivacy />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Layout;
