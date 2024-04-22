import React, { useEffect, useState } from "react";
import { FaUserFriends, FaNewspaper } from "react-icons/fa";
import { TbPhoto } from "react-icons/tb";
import { MdCalendarMonth } from "react-icons/md";
import { BiSolidMessageDetail } from "react-icons/bi";
import { IoMdPhotos } from "react-icons/io";
import { useSelector } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
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
    imageMobile: "https://api.slingacademy.com/v1/sample-data/photos",
    imageDesktop:
      "https://laz-img-cdn.alicdn.com/images/ims-web/TB1LLFTsljTBKNjSZFuXXb0HFXa.jpg_1200x1200.jpg",
  },
];

const Posts = () => {
  const [activeButton, setActiveButton] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stories, setStories] = useState(data);
  const { userData } = useSelector((state) => state.user);
  const avatar = userData.avatar;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const options = {
      month: "long",
      weekday: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const handleClick = (button) => {
    setActiveButton(button);
  };

  return (
    <div className="flex flex-col sm:flex-row w-full gap-20 py-2 bg-slate-50">
      <div className="w-full sm:w-auto flex justify-center sm:pl-10">
        <div className="sticky top-20 h-fit bg-gray-200 rounded-2xl p-8 flex flex-col justify-between">
          <div className="flex flex-col ">
            <ul className="flex flex-row lg:flex-col gap-5 px-2">
              <li
                className={`flex items-center gap-1 text-xl font-normal hover:text-[#DC143C] cursor-pointer transition duration-300 ease-in-out ${
                  activeButton === "connections" ? "text-[#DC143C]" : ""
                }`}
                onClick={() => handleClick("connections")}>
                <FaUserFriends className="text-[#DC143C]" />
                <span>Connections</span>
              </li>
              <li
                className={`flex items-center gap-1 text-xl font-normal hover:text-[#DC143C] cursor-pointer transition duration-300 ease-in-out ${
                  activeButton === "photos" ? "text-[#DC143C]" : ""
                }`}
                onClick={() => handleClick("photos")}>
                <TbPhoto className="text-[#DC143C]" />
                <span>Photos</span>
              </li>

              <li
                className={`flex items-center gap-1 text-xl font-normal hover:text-[#DC143C] cursor-pointer transition duration-300 ease-in-out ${
                  activeButton === "messages" ? "text-[#DC143C]" : ""
                }`}
                onClick={() => handleClick("messages")}>
                <BiSolidMessageDetail className="text-[#DC143C]" />
                <span>Messages</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full sm:w-1/2 mx-auto">
        <div className="flex flex-col py-4">
          <div className="border-2 w-full bg-gray-200 rounded-xl">
            <form className="flex items-center justify-center gap-4 p-4">
              <span className=" p-3 rounded-full text-[#DC143C]">
                <img
                  src={`http://localhost:8000/userProfile/${avatar}`}
                  className="lg:w-14 w-2 lg:h-14 h-2 rounded-full border-4 border-white object-cover"
                />
              </span>
              <input
                type="text"
                placeholder="What's on your mind.."
                className="border w-4/5 p-3 rounded-2xl"
              />
            </form>
            <hr className="border border-white" />
            <div className="flex justify-center p-4">
              <ul className="flex gap-20">
                <li className="flex items-center gap-1 hover:text-[#DC143C] cursor-pointer font-medium">
                  <IoMdPhotos />
                  <span>Photo/Video</span>
                </li>
                <li className="flex items-center gap-2 hover:text-[#DC143C] cursor-pointer font-medium">
                  <FaNewspaper />
                  <span>Articles</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="py-4">
          <div className="flex flex-col justify-center items-center gap-2">
            {stories.map((story, index) => (
              <span key={index} className="  rounded-2xl">
                <img
                  src={story.imageDesktop}
                  alt={`Story ${index}`}
                  className="w-full object-cover rounded-2xl h-[60vh]"
                />
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="sticky top-20 h-fit p-2 bg-gray-200 rounded-lg shadow-lg">
        <div className="flex items-center gap-2">
          <span className="text-2xl text-[#DC143C]">
            <MdCalendarMonth />
          </span>
          {formatDate(currentTime)}
        </div>
      </div>
    </div>
  );
};

export default Posts;
