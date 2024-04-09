import React, { useState } from "react";
import Layout from "../components/Layout";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { MdSpaceDashboard } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { FaNewspaper } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";
import { MdOndemandVideo } from "react-icons/md";
import { BiSolidMessageDetail } from "react-icons/bi";
import { Link } from "react-router-dom";

const data = [
  {
    title: "Banner 1",
    imageMobile:
      "https://laz-img-cdn.alicdn.com/images/ims-web/TB1LLFTsljTBKNjSZFuXXb0HFXa.jpg_1200x1200.jpg",
    imageDesktop:
      "https://laz-img-cdn.alicdn.com/images/ims-web/TB1LLFTsljTBKNjSZFuXXb0HFXa.jpg_1200x1200.jpg",
  },
  {
    title: "Banner 2",
    imageMobile:
      "https://laz-img-cdn.alicdn.com/images/ims-web/TB1LLFTsljTBKNjSZFuXXb0HFXa.jpg_1200x1200.jpg",
    imageDesktop:
      "https://laz-img-cdn.alicdn.com/images/ims-web/TB1LLFTsljTBKNjSZFuXXb0HFXa.jpg_1200x1200.jpg",
  },
  {
    title: "Banner 3",
    imageMobile:
      "https://laz-img-cdn.alicdn.com/images/ims-web/TB1LLFTsljTBKNjSZFuXXb0HFXa.jpg_1200x1200.jpg",
    imageDesktop:
      "https://laz-img-cdn.alicdn.com/images/ims-web/TB1LLFTsljTBKNjSZFuXXb0HFXa.jpg_1200x1200.jpg",
  },
  {
    title: "Banner 4",
    imageMobile:
      "https://laz-img-cdn.alicdn.com/images/ims-web/TB1LLFTsljTBKNjSZFuXXb0HFXa.jpg_1200x1200.jpg",
    imageDesktop:
      "https://laz-img-cdn.alicdn.com/images/ims-web/TB1LLFTsljTBKNjSZFuXXb0HFXa.jpg_1200x1200.jpg",
  },
  {
    title: "Banner 5",
    imageMobile:
      "https://laz-img-cdn.alicdn.com/images/ims-web/TB1LLFTsljTBKNjSZFuXXb0HFXa.jpg_1200x1200.jpg",
    imageDesktop:
      "https://laz-img-cdn.alicdn.com/images/ims-web/TB1LLFTsljTBKNjSZFuXXb0HFXa.jpg_1200x1200.jpg",
  },
];

const HomePage = () => {
  const [stories, setStories] = useState(data);
  const [activeButton, setActiveButton] = useState("");
  console.log(activeButton);

  const handleClick = (button) => {
    setActiveButton(button);
  };

  return (
    <Layout>
      <div className="flex flex-row w-full gap-4 py-2">
        <div className="w-1/5 flex">
          <div className="sticky top-16 h-[60vh] bg-gray-200 rounded-2xl p-8 flex flex-col justify-between">
            <div className="flex flex-col">
              <ul className="flex flex-col gap-5 px-2 ">
                <Link to="/account" onClick={() => handleClick("dashboard")}>
                  <button
                    className={`flex items-center gap-1 text-xl font-normal hover:text-[#DC143C] cursor-pointer transition duration-300 ease-in-out ${
                      activeButton === "dashboard" ? "text-[#DC143C]" : ""
                    }`}>
                    <span className="flex items-center text-[#DC143C]">
                      <MdSpaceDashboard />
                    </span>
                    Dashboard
                    {activeButton === "dashboard" && (
                      <div className="absolute top-[3.2rem]  bottom-0 left-16 sm:block hidden bg-[#DC143C] w-1/5 h-1 rounded-full"></div>
                    )}
                  </button>
                </Link>

                <li
                  className="flex items-center gap-1 text-xl font-normal hover:text-[#DC143C] cursor-pointer "
                  onClick={() => handleClick("connections")}>
                  <button
                    className={`flex items-center gap-1 text-xl font-normal hover:text-[#DC143C] cursor-pointer transition duration-300 ease-in-out ${
                      activeButton === "connections" ? "text-[#DC143C]" : ""
                    }`}>
                    <span className="flex items-center text-[#DC143C]">
                      <MdSpaceDashboard />
                    </span>
                    Connections
                    {activeButton === "connections" && (
                      <div className="absolute top-[6.5rem]  bottom-0 left-16 sm:block hidden bg-[#DC143C] w-2/6 h-1 rounded-full"></div>
                    )}
                  </button>
                </li>
                <li
                  className="flex items-center gap-1 text-xl font-normal hover:text-[#DC143C] cursor-pointer "
                  onClick={() => handleClick("feeds")}>
                  <button
                    className={`flex items-center gap-1 text-xl font-normal hover:text-[#DC143C] cursor-pointer transition duration-300 ease-in-out ${
                      activeButton === "feeds" ? "text-[#DC143C]" : ""
                    }`}>
                    <span className="flex items-center text-[#DC143C]">
                      <FaNewspaper />
                    </span>
                    Feeds
                    {activeButton === "feeds" && (
                      <div className="absolute top-[9.5rem]  bottom-0 left-16 sm:block hidden bg-[#DC143C] w-1/6 h-1 rounded-full"></div>
                    )}
                  </button>
                </li>
                <li
                  className="flex items-center gap-1 text-xl font-normal hover:text-[#DC143C] cursor-pointer "
                  onClick={() => handleClick("saved")}>
                  <button
                    className={`flex items-center gap-1 text-xl font-normal hover:text-[#DC143C] cursor-pointer transition duration-300 ease-in-out ${
                      activeButton === "saved" ? "text-[#DC143C]" : ""
                    }`}>
                    <span className="flex items-center text-[#DC143C]">
                      <FaBookmark />
                    </span>
                    Saved
                    {activeButton === "saved" && (
                      <div className="absolute top-[12.5rem]  bottom-0 left-16 sm:block hidden bg-[#DC143C] w-1/6 h-1 rounded-full"></div>
                    )}
                  </button>
                </li>
                <li
                  className="flex items-center gap-1 text-xl font-normal hover:text-[#DC143C] cursor-pointer "
                  onClick={() => handleClick("messages")}>
                  <button
                    className={`flex items-center gap-1 text-xl font-normal hover:text-[#DC143C] cursor-pointer transition duration-300 ease-in-out ${
                      activeButton === "messages" ? "text-[#DC143C]" : ""
                    }`}>
                    <span className="flex items-center text-[#DC143C]">
                      <BiSolidMessageDetail />
                    </span>
                    Videos
                    {activeButton === "messages" && (
                      <div className="absolute top-[15.5rem]  bottom-0 left-16 sm:block hidden bg-[#DC143C] w-1/5 h-1 rounded-full"></div>
                    )}
                  </button>
                </li>
                <li
                  className="flex items-center gap-1 text-xl font-normal hover:text-[#DC143C] cursor-pointer "
                  onClick={() => handleClick("videos")}>
                  <button
                    className={`flex items-center gap-1 text-xl font-normal hover:text-[#DC143C] cursor-pointer transition duration-300 ease-in-out ${
                      activeButton === "videos" ? "text-[#DC143C]" : ""
                    }`}>
                    <span className="flex items-center text-[#DC143C]">
                      <MdOndemandVideo />
                    </span>
                    Messages
                    {activeButton === "videos" && (
                      <div className="absolute top-[18.7rem]  bottom-0 left-16 sm:block hidden bg-[#DC143C] w-1/4 h-1 rounded-full"></div>
                    )}
                  </button>
                </li>
              </ul>
            </div>
            <div className="flex items-center justify-center  ">
              <ul className="flex gap-2">
                <li className="hover:text-[#DC143C] cursor-pointer underline text-sm">
                  Privacy
                </li>
                <li className="hover:text-[#DC143C] cursor-pointer underline text-sm">
                  Terms
                </li>
                <li className="text-sm">
                  <CopyrightIcon />
                  all rights reserved.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-1/2 ">
          <div className="flex justify-center gap-2">
            {stories.map((story, index) => (
              <span key={index} className="w-[13rem] h-80 rounded-2xl">
                <img
                  src={story.imageDesktop}
                  alt={`Story ${index}`}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </span>
            ))}
          </div>
          <div className="py-4">
            <div className="flex flex-col justify-center items-center gap-2">
              {stories.map((story, index) => (
                <span key={index} className="  rounded-2xl">
                  <img
                    src={story.imageDesktop}
                    alt={`Story ${index}`}
                    className="w-full object-cover rounded-2xl h-[60vh] "
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
