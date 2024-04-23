import React, { useEffect, useState } from "react";
import { FaUserFriends, FaNewspaper } from "react-icons/fa";
import { TbPhoto } from "react-icons/tb";
import { MdCalendarMonth, MdOutlineClose } from "react-icons/md";
import { BiSolidMessageDetail } from "react-icons/bi";
import { IoMdPhotos } from "react-icons/io";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";

const Posts = () => {
  const [activeButton, setActiveButton] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [profilePic, setProfilePic] = useState();
  const [profileCoverPhoto, setProfileCoverPhoto] = useState();
  const { userData } = useSelector((state) => state.user);
  const avatar = userData.avatar;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
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

  const handleClick = (button) => {
    setActiveButton(button);
  };
  const openPostModal = () => {
    setPostModalOpen(true);
    setSelectedId(id);
  };
  const closePostModal = () => {
    setPostModalOpen(false);
    setSelectedId(null);
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
                className="border w-4/5 p-3 rounded-2xl cursor-pointer outline-none"
                onClick={openPostModal}
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
        <div className="py-4"></div>
      </div>
      <div className="sticky top-20 h-fit p-2 bg-gray-200 rounded-lg shadow-lg">
        <div className="flex items-center gap-2">
          <span className="text-2xl text-[#DC143C]">
            <MdCalendarMonth />
          </span>
          {formatDate(currentTime)}
        </div>
      </div>
      <Modal
        isOpen={postModalOpen}
        onRequestClose={closePostModal}
        className="modal lg:w-1/3 bg-white p-4 rounded-xl shadow"
        overlayClassName="overlay fixed top-0  w-full right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center px-20 lg:px-10">
        <div className="max-h-[80vh] overflow-y-auto no-scrollbar">
          <div
            onClick={closePostModal}
            className="flex items-end justify-between px-5">
            <span className="font-bold text-xl">Edit Profile</span>
            <button className=" text-black flex justify-center items-center rounded-xl cursor-pointer font-semibold text-xl hover:text-red-600">
              <MdOutlineClose size={32} />
            </button>
          </div>
          <div className="flex flex-col ">
            <div className="py-4 px-5">
              <form
                className="flex flex-col justify-center items-center gap-5"
                onSubmit={handleSubmit}>
                <div className="w-full flex flex-col">
                  <label className="font-medium">Caption:</label>
                  <input
                    id="caption"
                    type="text"
                    className="border-2 border-black p-2 rounded-lg outline-none select-none"
                  />
                </div>
                <label className="gap-1 w-full flex flex-col">
                  <span className="font-medium">Photos:</span>

                  <input type="file" accept="image" className="hidden" />
                  <img
                    src={profilePic ? URL.createObjectURL(profilePic) : ``}
                    alt=""
                    title="Upload Photo"
                    className="h-60 w-full rounded-lg cursor-pointer object-cover"
                  />
                </label>
                <div className="">
                  <button className="bg-red-500 text-white flex justify-center items-center  rounded-xl cursor-pointer py-2 px-5 mx-auto font-semibold text-xl hover:bg-red-400">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Posts;
