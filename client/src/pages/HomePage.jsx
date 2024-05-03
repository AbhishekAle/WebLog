import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { LiaCopyrightSolid } from "react-icons/lia";
import { MdSpaceDashboard } from "react-icons/md";
import { FaRegComment, FaUserFriends } from "react-icons/fa";
import { FaNewspaper } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";
import { MdOndemandVideo } from "react-icons/md";
import { BiSolidMessageDetail } from "react-icons/bi";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { IoMdPhotos } from "react-icons/io";
import { MdCalendarMonth } from "react-icons/md";
import { useSelector } from "react-redux";
import { SlLike } from "react-icons/sl";
import { TbShare3 } from "react-icons/tb";
import axios from "axios";

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

const HomePage = () => {
  const [stories, setStories] = useState(data);
  const [activeButton, setActiveButton] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [postsData, setPostsData] = useState([]);
  const { userData } = useSelector((state) => state.user);
  const username = userData.username;
  const { token } = useSelector((state) => state.user);
  const avatar = userData.avatar;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/get-all-posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data;
      setPostsData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
  const postDate = (createdAt) => {
    const currentTime = new Date();
    const postTime = new Date(createdAt);
    const timeDifference = Math.abs(currentTime - postTime);
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);
    const weeksDifference = Math.floor(daysDifference / 7);
    const monthsDifference = Math.floor(daysDifference / 30); // Approximation for months
    const yearsDifference = Math.floor(daysDifference / 365); // Approximation for years

    if (yearsDifference > 0) {
      return `${yearsDifference} ${
        yearsDifference === 1 ? "year" : "years"
      } ago`;
    } else if (monthsDifference > 0) {
      return `${monthsDifference} ${
        monthsDifference === 1 ? "month" : "months"
      } ago`;
    } else if (weeksDifference > 0) {
      return `${weeksDifference} ${
        weeksDifference === 1 ? "week" : "weeks"
      } ago`;
    } else if (daysDifference > 0) {
      return `${daysDifference} ${daysDifference === 1 ? "day" : "days"} ago`;
    } else if (hoursDifference > 0) {
      return `${hoursDifference} ${
        hoursDifference === 1 ? "hour" : "hours"
      } ago`;
    } else if (minutesDifference > 0) {
      return (
        <>
          {`${minutesDifference} ${
            minutesDifference === 1 ? "minute" : "minutes"
          } ago`}
        </>
      );
    } else {
      return (
        <>
          {`${secondsDifference} ${
            secondsDifference === 1 ? "second" : "seconds"
          } ago`}
        </>
      );
    }
  };

  const handleClick = (button) => {
    setActiveButton(button);
  };

  return (
    <div className="flex flex-row w-full gap-20 py-2 px-36 bg-slate-50">
      <div className="mx-auto">
        <div className="sticky top-20 h-[60vh] bg-[#efecd3] rounded-2xl p-8 flex flex-col justify-between">
          <div className="flex flex-col">
            <ul className="flex flex-col gap-5 px-2 ">
              <Link to="/account" onClick={() => handleClick("dashboard")}>
                <button
                  className={`flex items-center  text-xl font-normal hover:text-[#DC143C] cursor-pointer transition duration-300 ease-in-out gap-3 ${
                    activeButton === "dashboard" ? "text-[#DC143C]" : ""
                  }`}>
                  <span className="flex items-center text-[#DC143C]">
                    <img
                      src={`http://localhost:8000/userProfile/${avatar}`}
                      alt="a"
                      className="h-10 w-10 rounded-full bg-cover"
                    />
                  </span>
                  {username}
                  {activeButton === "dashboard" && (
                    <div className="absolute top-[3.2rem]  bottom-0 left-16 sm:block hidden bg-[#DC143C] w-1/5 h-1 rounded-full"></div>
                  )}
                </button>
                <hr className="border-black mt-2" />
              </Link>

              <li
                className="flex items-center gap-1 text-xl font-normal hover:text-[#DC143C] cursor-pointer "
                onClick={() => handleClick("connections")}>
                <button
                  className={`flex items-center gap-1 text-xl font-normal hover:text-[#DC143C] cursor-pointer transition duration-300 ease-in-out ${
                    activeButton === "connections" ? "text-[#DC143C]" : ""
                  }`}>
                  <span className="flex items-center text-[#DC143C]">
                    <FaUserFriends />
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
                    <MdOndemandVideo />
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
                    <BiSolidMessageDetail />
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
              <li className="text-sm flex items-center gap-1">
                2024
                <LiaCopyrightSolid />
                Web-Log
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
        <div className="flex  justify-center py-4">
          <div className="w-full bg-[#efecd3] rounded-xl">
            <form className="flex items-center justify-center gap-4 p-4">
              <span className="p-1 rounded-full text-[#DC143C] bg-white">
                <img
                  src={`http://localhost:8000/userProfile/${avatar}`}
                  alt="a"
                  className="h-10 w-10 rounded-full bg-cover"
                />
              </span>
              <input
                type="text"
                placeholder="Share Your Thought..."
                className="border w-4/5 p-3 rounded-2xl"
              />
            </form>
            <hr className="border border-white" />
            <div className="flex justify-center p-4">
              <ul className="flex gap-20">
                <li className="flex items-center gap-1 hover:text-[#DC143C] cursor-pointer font-medium">
                  <span className="font-semibold text-2xl text-[#DC143C]">
                    <IoMdPhotos />
                  </span>
                  Photo/Video
                </li>
                <li className="flex items-center gap-2 hover:text-[#DC143C] cursor-pointer font-medium">
                  <span className="font-semibold text-2xl text-[#DC143C]">
                    <FaNewspaper />
                  </span>
                  Articles
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="py-4">
          <div className="flex flex-col-reverse gap-5 ">
            {postsData.map((post) => (
              <div
                key={post._id}
                className="flex flex-col gap-4 p-4 rounded-xl bg-[#efecd3]">
                <div className="flex  items-center gap-2">
                  <div className="flex">
                    <img
                      src={`http://localhost:8000/userProfile/${post.user.avatar}`}
                      className="lg:w-12 w-10 lg:h-12 h-10 rounded-full border-4 border-white object-cover"
                    />
                  </div>
                  <div className="flex flex-col ">
                    <h2 className="font-semibold text-xl">
                      {post.user.username}
                    </h2>
                    <span className="flex items-center text-sm">
                      posted {postDate(post.createdAt)}.
                    </span>
                  </div>
                </div>
                <hr className="border-white"></hr>
                <div className="px-5">
                  <h3 className="font-medium">{post.description}</h3>
                </div>
                <div className="flex gap-5">
                  {post.posts.map((postImage, index) => (
                    <img
                      key={index}
                      src={`http://localhost:8000/userPosts/${postImage}`}
                      alt={`Post ${index + 1}`}
                      className="w-full h-[26rem] rounded-xl object-cover"
                    />
                  ))}
                </div>
                <hr className="border-white"></hr>
                <div className="flex justify-evenly">
                  <button className="   py-2 px-6 rounded-lg text-[#DC143C] font-bold hover:bg-[#e6e1b9] flex items-center jus gap-2 ">
                    <span className="text-black font-medium">100K</span>
                    <SlLike size={28} />
                  </button>
                  <span className="border-r-2 border-white"></span>
                  <button className=" text-[#DC143C] font-bold  hover:bg-[#e6e1b9]  py-2 px-6 rounded-lg flex items-center gap-2 ">
                    <span className="text-black font-medium">1K</span>
                    <FaRegComment size={28} />
                  </button>
                  <span className="border-r-2 border-white"></span>
                  <button className=" text-[#DC143C] font-bold hover:bg-[#e6e1b9] py-2 px-10 rounded-lg flex items-center gap-2 ">
                    <span className="text-black font-medium">1M</span>
                    <TbShare3 size={28} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10 text-xl font-semibold">
            <p>
              <span>&larr;</span>---------- End Of Posts ----------
              <span>&rarr;</span>
            </p>
          </div>
        </div>
      </div>
      <div className=" sticky top-20 h-fit  mx-10 p-2 bg-[#efecd3] rounded-lg shadow-lg">
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

export default HomePage;
