import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ArticleIcon from "@mui/icons-material/Article";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ExploreIcon from "@mui/icons-material/Explore";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../slices/userSlice";
import { FiHelpCircle } from "react-icons/fi";
import { HiCog } from "react-icons/hi";
import { persistor } from "../store";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeButton, setActiveButton] = useState("");
  const dropdownRef = useRef(null);
  const { userData } = useSelector((state) => state.user);
  const userId = userData ? userData._id : null;
  const navigate = useNavigate();
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
    setActiveButton("");
  };
  const handleClick = (button) => {
    setActiveButton(button);
    setShowDropdown(false);
  };

  const handleLogout = async () => {
    await axios.post("http://localhost:8000/api/logout");
    dispatch(setUser());
    navigate("/login");
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
                <div className="flex gap-20 items-center" ref={dropdownRef}>
                  <Link to="/about" title="Notification">
                    <span className="hover:text-[#DC143C]">
                      <NotificationsNoneIcon fontSize="large" />
                    </span>
                  </Link>
                  {showDropdown && (
                    <div className="absolute text-black top-[60px] text-[1.1rem] bg-white border border-gray-300 rounded-md shadow-lg px-8 py-4 ">
                      <Link
                        to={`/account/${userId}`}
                        onClick={() => handleClick("dashboard")}>
                        <button
                          className={`flex items-center py-2 hover:text-[#DC143C] transition duration-300 ease-in-out gap-3 ${
                            activeButton === "dashboard" ? "text-[#DC143C]" : ""
                          }`}>
                          <img
                            src={`http://localhost:8000/userProfile/${userData.avatar}`}
                            alt="a"
                            className="h-10 w-10 rounded-full bg-cover"
                          />
                          {userData.username}
                        </button>
                        <hr />
                      </Link>
                      <Link to={`/settings-privacy/${userId}`}>
                        <button
                          onClick={() => handleClick("settings")}
                          className={`flex items-center py-2 mt-4 hover:text-[#DC143C] transition duration-300 ease-in-out gap-2 ${
                            activeButton === "settings" ? "text-[#DC143C]" : ""
                          }`}>
                          <HiCog />
                          Settings & Privacy
                        </button>
                      </Link>
                      <hr />

                      <div>
                        <button
                          onClick={() => handleClick("privacy-policy")}
                          className={`flex items-center py-2 mt-2 hover:text-[#DC143C] transition duration-300 ease-in-out gap-2 ${
                            activeButton === "privacy-policy"
                              ? "text-[#DC143C]"
                              : ""
                          }`}>
                          {" "}
                          <FiHelpCircle />
                          Help & Support
                        </button>
                      </div>
                      <hr />

                      <h3
                        onClick={handleLogout}
                        className="flex items-center mt-5 cursor-pointer hover:text-[#DC143C] transition duration-300 ease-in-out gap-2">
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
                    <img
                      src={`http://localhost:8000/userProfile/${userData.avatar}`}
                      alt="a"
                      className="h-10 w-10 rounded-full bg-cover"
                    />
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
