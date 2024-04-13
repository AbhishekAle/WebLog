import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ArticleIcon from "@mui/icons-material/Article";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonIcon from "@mui/icons-material/Person";
import { HiCog, HiViewGrid } from "react-icons/hi";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ExploreIcon from "@mui/icons-material/Explore";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../slices/userSlice";
import { FiHelpCircle } from "react-icons/fi";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeButton, setActiveButton] = useState("");
  const dropdownRef = useRef(null);
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };
  const handleClick = (button) => {
    setActiveButton(button);
  };

  const handleLogout = async () => {
    await axios.post("http://localhost:8000/api/logout");
    dispatch(setUser());
    setShowDropdown(false);
  };

  return (
    <div className="w-full sticky top-0 z-20">
      <div className="flex justify-between items-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white py-2 px-40">
        <div className="font-semibold text-3xl">
          <Link to="/home">
            <h1>
              <span className="text-[#DC143C]">W</span>-Log
            </h1>
          </Link>
        </div>
        {userData && (
          <div className="text-medium font-medium text-black relative">
            <input
              title="search"
              type="text"
              placeholder="Search WebLog..."
              className="py-2 px-2 rounded lg:w-80 border-blue-900 outline-none"
            />
            <span className="absolute right-0 top-0 bottom-0 flex items-center pr-2 text-[#DC143C]">
              <ExploreIcon />
            </span>
          </div>
        )}

        <div className="flex items-center justify-between gap-20 ">
          <Link to="/articles" title="Articles">
            <span className="hover:text-[#DC143C] transition duration-300 ease-in-out">
              <ArticleIcon fontSize="large" />
            </span>
          </Link>

          {userData ? (
            <>
              <div className="w-full">
                <div className="flex gap-20" ref={dropdownRef}>
                  <Link to="/about" title="Notification">
                    <span className="hover:text-[#DC143C]">
                      <NotificationsNoneIcon fontSize="large" />
                    </span>
                  </Link>
                  {showDropdown && (
                    <div className="absolute text-black top-[50px] text-[1.1rem] bg-white border border-gray-300 rounded-md shadow-lg p-5 ">
                      <Link
                        to="/account"
                        onClick={() => handleClick("dashboard")}>
                        <button
                          className={`flex items-center py-2 hover:text-[#DC143C] transition duration-300 ease-in-out ${
                            activeButton === "dashboard" ? "text-[#DC143C]" : ""
                          }`}>
                          <HiViewGrid />
                          Dashboard
                          {activeButton === "dashboard" && (
                            <div className="absolute top-[3.2rem]  bottom-0 left-16 sm:block hidden bg-[#DC143C] w-1/5 h-1 rounded-full"></div>
                          )}
                        </button>
                        <hr />
                      </Link>
                      <Link to="/settings-privacy">
                        <button
                          onClick={() => handleClick("settings")}
                          className={`flex items-center py-2 hover:text-[#DC143C] transition duration-300 ease-in-out ${
                            activeButton === "settings" ? "text-[#DC143C]" : ""
                          }`}>
                          <HiCog />
                          Settings & Privacy
                          {activeButton === "settings" && (
                            <div className="absolute left-16 top-[6rem] bg-[#DC143C] w-1/5 h-1 rounded-full"></div>
                          )}
                        </button>
                      </Link>
                      <hr />

                      <div>
                        <button
                          onClick={() => handleClick("privacy-policy")}
                          className={`flex items-center py-2 hover:text-[#DC143C] transition duration-300 ease-in-out ${
                            activeButton === "privacy-policy"
                              ? "text-[#DC143C]"
                              : ""
                          }`}>
                          {" "}
                          <FiHelpCircle />
                          Help & Support
                          {activeButton === "privacy-policy" && (
                            <div className="absolute left-16 top-[8.7rem] bg-[#DC143C] w-1/5 h-1 rounded-full"></div>
                          )}
                        </button>
                      </div>
                      <hr />

                      <h3
                        onClick={handleLogout}
                        className="flex items-center py-2 cursor-pointer hover:text-[#DC143C] transition duration-300 ease-in-out">
                        <LogoutOutlinedIcon />
                        Sign out
                        <hr />
                      </h3>
                    </div>
                  )}
                  <div
                    className="cursor-pointer hover:text-[#DC143C] transition duration-300 ease-in-out"
                    onClick={handleDropdownToggle}
                    title="Account">
                    <PersonIcon fontSize="large" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="w-">
                <span className="hover:text-[#DC143C] transition duration-300 ease-in-out font-semibold">
                  Login/Register
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
