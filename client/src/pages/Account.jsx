import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import Modal from "react-modal";
import { MdOutlineClose } from "react-icons/md";
import { setUser } from "../slices/userSlice";
import { useDispatch } from "react-redux";
import Posts from "./features/Posts";
import UserArticles from "../components/UserArticles";
import { useParams } from "react-router-dom";
import Videos from "./features/Videos"; // Assuming you have this component
// import { listUserVideos } from "../context/firebase"; // Replace with your actual import

const Account = () => {
  const { userData } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({});
  const [userDataById, setUserDataById] = useState({});
  const [profilePic, setProfilePic] = useState();
  const [profileCoverPhoto, setProfileCoverPhoto] = useState();
  const [activeTab, setActiveTab] = useState("posts");
  const [videos, setVideos] = useState([]); // State to store videos
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const profileId = useParams();
  const id = profileId.userId;
  const userId = userData._id;
  const dispatch = useDispatch();

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const tabItemClass = (tabName) =>
    `cursor-pointer ${
      activeTab === tabName
        ? "border-b-2 px-1 border-[#DC143C] text-[#DC143C]"
        : "hover:text-[#DC143C]"
    }`;

  useEffect(() => {
    fetchUserById();
    fetchData();
  }, []);

  useEffect(() => {
    if (activeTab === "videos") {
      fetchVideos();
    }
  }, [activeTab]);

  const fetchUserById = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/users/${id}`);
      const data = await res.data;
      setUserDataById(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.data;
      setFormData(data);
      dispatch(setUser(data));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // const fetchVideos = async () => {
  //   try {
  //     let videoList;
  //     if (id && id !== userId) {
  //       videoList = await listUserVideos(id); // Fetch videos by specific user
  //     }
  //     setVideos(videoList);
  //   } catch (error) {
  //     console.error("Error fetching videos:", error);
  //   }
  // };

  const handleChange = (e, type) => {
    if (e.target.type === "file") {
      if (type === "avatar") {
        setProfilePic(e.target.files[0]);
      } else if (type === "coverPhoto") {
        setProfileCoverPhoto(e.target.files[0]);
      }
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const openFormModal = (id) => {
    setFormModalOpen(true);
    setSelectedId(id);
  };

  const closeFormModal = () => {
    setFormModalOpen(false);
    setSelectedId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.patch(
      `http://localhost:8000/api/update-user/${userId}`,
      { email, phoneNumber },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (profilePic || profileCoverPhoto) {
      const images = new FormData();
      images.append("avatar", profilePic);
      images.append("coverPhoto", profileCoverPhoto);

      await axios.patch(
        `http://localhost:8000/api/update-user-profile/${userId}`,
        images,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      window.location.reload();
    }
    setFormModalOpen(false);
  };

  return (
    <div className="w-full px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 py-1 bg-slate-50">
      {userDataById && id !== userId ? (
        <>
          <div className="flex flex-col">
            <div>
              <img
                src={`http://localhost:8000/userProfile/${userDataById.coverPhoto}`}
                alt="cover photo"
                title="Cover Photo"
                className="w-full h-80 sm:h-96 md:h-[50vh] border-slate-200 border-2 rounded-xl object-fit"
              />
            </div>

            <div className=" flex flex-col lg:flex-row justify-between items-center px-4 sm:px-12 md:px-20 lg:px-32 xl:px-40">
              <div className="flex items-center gap-4 sm:gap-10">
                <img
                  src={`http://localhost:8000/userProfile/${userDataById.avatar}`}
                  className="relative top-[-2rem] lg:w-52 w-20 lg:h-52 h-20 rounded-full border-4 border-white object-cover"
                />
                <div className="flex flex-col">
                  <h2 className="relative top-[-2rem] font-semibold text-lg sm:text-2xl">
                    {userDataById.username}
                  </h2>
                </div>
              </div>
            </div>
            <hr className="border-black"></hr>
            <div className="w-full">
              <div className="flex  gap-10 py-3 items-center justify-center bg-white">
                <button
                  onClick={() => handleTabChange("posts")}
                  className={`${tabItemClass("posts")} font-medium text-lg`}
                >
                  Posts
                </button>
                <button
                  onClick={() => handleTabChange("articles")}
                  className={`${tabItemClass("articles")} font-medium text-lg`}
                >
                  Articles
                </button>
                <button
                  onClick={() => handleTabChange("videos")}
                  className={`${tabItemClass("videos")} font-medium text-lg`}
                >
                  Videos
                </button>
              </div>
              <hr className="border-black pb-3"></hr>
              <div className="flex-grow">
                {activeTab === "posts" && (
                  <div>
                    <Posts />
                  </div>
                )}
                {activeTab === "articles" && (
                  <div className="">
                    <UserArticles />
                  </div>
                )}
                {activeTab === "videos" && (
                  <div>
                    <Videos videos={videos} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col">
            <div>
              <img
                src={`http://localhost:8000/userProfile/${coverPhoto}`}
                alt="cover photo"
                title="Cover Photo"
                className="w-full h-80 sm:h-96 md:h-[50vh] border-slate-200 border-2 rounded-xl object-fit"
              />
            </div>

            <div className=" flex flex-col lg:flex-row justify-between items-center px-4 sm:px-12 md:px-20 lg:px-32 xl:px-40">
              <div className="flex items-center gap-4 sm:gap-10">
                <img
                  src={`http://localhost:8000/userProfile/${avatar}`}
                  className="relative top-[-2rem] lg:w-52 w-20 lg:h-52 h-20 rounded-full border-4 border-white object-cover"
                />
                <div className="flex flex-col">
                  <h2 className="relative top-[-2rem] font-semibold text-lg sm:text-2xl">
                    {formData.username}
                  </h2>
                </div>
              </div>
              <div className="flex gap-2 sm:gap-4 items-center mt-4 sm:mt-20">
                <button
                  className="font-medium text-base sm:text-lg hover:text-[#DC143C] flex items-center justify-center gap-1"
                  onClick={openFormModal}
                >
                  <span>
                    <FiEdit />
                  </span>
                  Edit Profile
                </button>
              </div>
            </div>
            <hr className="border-black"></hr>
            <div className="w-full">
              <div className="flex  gap-10 py-3 items-center justify-center bg-white">
                <button
                  onClick={() => handleTabChange("posts")}
                  className={`${tabItemClass("posts")} font-medium text-lg`}
                >
                  Posts
                </button>
                <button
                  onClick={() => handleTabChange("articles")}
                  className={`${tabItemClass("articles")} font-medium text-lg`}
                >
                  Articles
                </button>
                <button
                  onClick={() => handleTabChange("videos")}
                  className={`${tabItemClass("videos")} font-medium text-lg`}
                >
                  Videos
                </button>
              </div>
              <hr className="border-black pb-3"></hr>
              <div className="flex-grow">
                {activeTab === "posts" && (
                  <div>
                    <Posts />
                  </div>
                )}
                {activeTab === "articles" && (
                  <div className="">
                    <UserArticles />
                  </div>
                )}
                {activeTab === "videos" && (
                  <div>
                    <Videos videos={videos} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      <Modal
        isOpen={formModalOpen}
        onRequestClose={closeFormModal}
        className="modal lg:w-1/3 bg-white p-4 rounded-xl shadow"
        overlayClassName="overlay fixed top-0  w-full right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center px-20 lg:px-10"
      >
        <div className="max-h-[80vh] overflow-y-auto no-scrollbar">
          <div
            onClick={closeFormModal}
            className="flex items-end justify-between px-5"
          >
            <span className="font-bold text-xl">Edit Profile</span>
            <button className=" text-black flex justify-center items-center rounded-xl cursor-pointer font-semibold text-xl hover:text-red-600">
              <MdOutlineClose size={32} />
            </button>
          </div>
          <div className="flex flex-col ">
            <div className="py-4 px-5">
              <form
                className="flex flex-col justify-center items-center gap-5"
                onSubmit={handleSubmit}
              >
                <label className="gap-1 w-full flex flex-col">
                  <span className="font-medium">Profile Picture:</span>

                  <input
                    type="file"
                    accept="image"
                    className="hidden"
                    onChange={(e) => handleChange(e, "avatar")}
                  />
                  <img
                    src={
                      profilePic
                        ? URL.createObjectURL(profilePic)
                        : `http://localhost:8000/userProfile/${avatar}`
                    }
                    alt=""
                    title="Change profile picture"
                    className="h-60 w-full rounded-lg cursor-pointer object-cover"
                  />
                </label>
                <label className="gap-1 w-full flex flex-col">
                  <span className="font-medium">Cover Picture:</span>

                  <input
                    type="file"
                    accept="image"
                    className="hidden"
                    onChange={(e) => handleChange(e, "coverPhoto")}
                  />
                  <img
                    src={
                      profileCoverPhoto
                        ? URL.createObjectURL(profileCoverPhoto)
                        : `http://localhost:8000/userProfile/${coverPhoto}`
                    }
                    alt=""
                    title="Change cover picture"
                    className="h-60 w-full rounded-lg cursor-pointer object-cover"
                  />
                </label>

                <div className="w-full flex flex-col">
                  <label className="font-medium">Email:</label>
                  <input
                    id="email"
                    type="text"
                    className="border-2 border-black p-2 rounded-lg outline-none"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full flex flex-col">
                  <label className="font-medium">Phone Number:</label>
                  <input
                    id="phoneNumber"
                    onChange={handleChange}
                    type="text"
                    className="border-2 p-2 rounded-lg border-black outline-none"
                    value={formData.phoneNumber}
                  />
                </div>
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

export default Account;
