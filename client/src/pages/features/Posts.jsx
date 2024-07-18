import { useEffect, useMemo, useRef, useState } from "react";
import { FaUserFriends, FaNewspaper } from "react-icons/fa";
import { TbPhoto } from "react-icons/tb";
import { MdCalendarMonth, MdOutlineClose } from "react-icons/md";
import { BiSolidMessageDetail } from "react-icons/bi";
import { IoMdPhotos } from "react-icons/io";
import { useSelector } from "react-redux";
import { useFirebase } from "../../context/firebase";
import Modal from "react-modal";
import axios from "axios";
import uploadPhotos from "../../assets/uploadPhotos.png";
import { SlLike } from "react-icons/sl";
import { FaRegComment } from "react-icons/fa";
import { TbShare3 } from "react-icons/tb";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { Dropdown } from "rsuite";
import JoditEditor from "jodit-react";
import { useParams } from "react-router-dom";

const Posts = () => {
  const [activeButton, setActiveButton] = useState("");
  const [activeTab, setActiveTab] = useState("post");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [articleModalOpen, setArticleModalOpen] = useState(false);
  const [articleTitle, setArticleTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [title, setTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const firebase = useFirebase();

  //jodit editor
  const [content, setContent] = useState("");
  const editor = useRef(null);
  const defaultPlaceholder = "Start typing...";

  const config = useMemo(
    () => ({
      placeholder: defaultPlaceholder,
      readonly: false,
      enableDragAndDropFileToEditor: true,
      uploader: {
        insertImageAsBase64URI: true,
      },
      image: {
        move: true, // Enable image movement
      },
    }),
    []
  );

  const [postsData, setPostsData] = useState([]);
  const [createdPost, setCreatedPost] = useState({
    description: "",
    posts: null,
  });
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [userDataById, setUserDataById] = useState([]);
  const [profileData, setProfileData] = useState([]);

  const { userData } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.user);

  const avatar = userData.avatar;
  const username = userData.username;
  const id = userData._id;
  const profileId = useParams();
  const userId = profileId.userId;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchData();
    fetchUser();
    fetchUserData();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/users/${userId}`);
      const data = await res.data;
      setUserDataById(data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUserData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/getposts/${userId}`
      );
      const data = res.data;
      setProfileData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/getposts/${id}`, {
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

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      setCreatedPost((prevPost) => ({ ...prevPost, posts: file }));
    } else {
      const { name, value } = e.target;
      setCreatedPost((prevPost) => ({ ...prevPost, [name]: value }));
    }
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCreatedPost((prevPost) => ({ ...prevPost, [name]: value }));
  };
  const handleTitle = (e) => {
    setArticleTitle(e.target.value);
  };
  const handleThumbnail = (e) => {
    setThumbnail(e.target.files[0]);
  };
  const handleArticleUpload = async (e) => {
    e.preventDefault();
    const articleData = new FormData();
    articleData.append("description", content);
    articleData.append("thumbnail", thumbnail);
    articleData.append("title", articleTitle);
    try {
      await axios.post(
        `http://localhost:8000/api/createarticle/${id}`,
        articleData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setContent("");
      setArticleTitle("");
      setThumbnail("");
      setArticleModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("description", createdPost.description);
      formData.append("posts", createdPost.posts);

      await axios.post(`http://localhost:8000/api/createpost/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setCreatedPost({ description: "", posts: null });
    } catch (error) {
      console.error("Error creating post:", error);
    }
    await fetchData();
    setPostModalOpen(false);
  };

  const editedPost = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("description", createdPost.description);
      // Append the post ID to the form data
      formData.append("postId", selectedPostId);

      await axios.put(
        `http://localhost:8000/api/edit-post/${selectedPostId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error editing post:", error);
    }
    await fetchData();
    setEditModalOpen(false);
  };
  const deletePost = async (id) => {
    await axios.delete(`http://localhost:8000/api/delete-post/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    await fetchData();
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
  };

  const closePostModal = () => {
    setPostModalOpen(false);
  };
  const openEditModal = (post) => {
    setCreatedPost({ description: post.description });
    setSelectedPostId(post._id);
    setEditModalOpen(true);
  };
  const closeEditModal = () => {
    setEditModalOpen(false);
  };
  const openArticleModal = () => {
    setArticleModalOpen(true);
  };
  const closeArticleModal = () => {
    setArticleModalOpen(false);
    setThumbnail("");
  };

  //firebase
  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    if (!title || !videoFile) {
      console.log("Title and video file are required.");
      return;
    }
    try {
      await firebase.handleVideoUpload(title, videoFile, userData._id);
    } catch (error) {
      console.error("Error uploading video:", error);
    }
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

  return (
    <div className="flex flex-col sm:flex-row w-full gap-20 py-2 bg-slate-50">
      {/* Left Sidebar */}
      <div className="w-full sm:w-auto flex justify-center sm:pl-10">
        <div className="sticky top-20 h-fit bg-[#efecd3] rounded-2xl p-8 flex flex-col justify-between">
          <div className="flex flex-col ">
            <ul className="flex flex-row lg:flex-col gap-5 px-2">
              <li
                className={`flex items-center gap-1 text-xl font-normal hover:text-[#DC143C] cursor-pointer transition duration-300 ease-in-out ${
                  activeButton === "connections" ? "text-[#DC143C]" : ""
                }`}
                onClick={() => handleClick("connections")}
              >
                <FaUserFriends className="text-[#DC143C]" />
                <span>Connections</span>
              </li>
              <li
                className={`flex items-center gap-1 text-xl font-normal hover:text-[#DC143C] cursor-pointer transition duration-300 ease-in-out ${
                  activeButton === "photos" ? "text-[#DC143C]" : ""
                }`}
                onClick={() => handleClick("photos")}
              >
                <TbPhoto className="text-[#DC143C]" />
                <span>Photos</span>
              </li>
              <li
                className={`flex items-center gap-1 text-xl font-normal hover:text-[#DC143C] cursor-pointer transition duration-300 ease-in-out ${
                  activeButton === "messages" ? "text-[#DC143C]" : ""
                }`}
                onClick={() => handleClick("messages")}
              >
                <BiSolidMessageDetail className="text-[#DC143C]" />
                <span>Messages</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full sm:w-1/2 mx-auto">
        {id === userId ? (
          <>
            <div className="flex flex-col py-4">
              <div className=" w-full bg-[#efecd3] rounded-xl">
                <form className="flex items-center justify-center gap-4 p-4">
                  <span className=" p-3 rounded-full text-[#DC143C]">
                    <img
                      src={`http://localhost:8000/userProfile/${avatar}`}
                      className="lg:w-14 w-10 lg:h-14 h-10 rounded-full border-4 border-white object-cover"
                    />
                  </span>
                  <input
                    type="text"
                    placeholder="Share Your Thought..."
                    className="border w-4/5 p-3 rounded-2xl cursor-pointer outline-none"
                    onClick={openPostModal}
                  />
                </form>
                <hr className="border border-white" />
                <div className="flex justify-center p-4">
                  <ul className="flex gap-20">
                    <li
                      className="flex items-center gap-1 hover:text-[#DC143C] cursor-pointer font-medium"
                      onClick={openPostModal}
                    >
                      <IoMdPhotos />
                      <span>Photo/Video</span>
                    </li>
                    <li
                      className="flex items-center gap-2 hover:text-[#DC143C] cursor-pointer font-medium"
                      onClick={openArticleModal}
                    >
                      <FaNewspaper />
                      <span>Articles</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}

        <div className="py-4">
          {id === userId ? (
            <>
              <div className="flex flex-col-reverse gap-5 ">
                {postsData.map((post) => (
                  <div
                    key={post._id}
                    className="flex flex-col gap-4 p-4 rounded-xl bg-[#efecd3]"
                  >
                    <div className="flex  items-center gap-2 justify-between">
                      <div className="flex">
                        <img
                          src={`http://localhost:8000/userProfile/${avatar}`}
                          className="lg:w-12 w-10 lg:h-12 h-10 rounded-full border-4 border-white object-cover"
                        />

                        <div className="flex flex-col ">
                          <h2 className="font-semibold text-xl">{username}</h2>
                          <span className="flex items-center text-sm">
                            posted {postDate(post.createdAt)}.
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="flex px-5 items-center">
                          <Dropdown
                            title="..."
                            noCaret
                            className=" absolute w-max font-semibold text-3xl"
                          >
                            <div className="relative right-16 font-medium text-base py-2 px-4 bg-white rounded-xl border-2">
                              <Dropdown.Item
                                className="py-1 hover:text-[#DC143C] cursor-pointer "
                                onClick={() => openEditModal(post)}
                              >
                                <div className="flex items-center gap-1">
                                  <span>
                                    <MdOutlineEdit size={20} />
                                  </span>
                                  <h2>Edit</h2>
                                </div>
                              </Dropdown.Item>
                              <hr className="border-[#efecd3]"></hr>
                              <Dropdown.Item
                                className="py-1 hover:text-[#DC143C] cursor-pointer"
                                onClick={() => {
                                  deletePost(post._id);
                                }}
                              >
                                <div className="flex items-center gap-1">
                                  <span>
                                    <MdDeleteOutline size={20} />
                                  </span>
                                  <h2>Delete</h2>
                                </div>
                              </Dropdown.Item>
                            </div>
                          </Dropdown>
                        </div>
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
                          className="w-full h-[26rem] rounded-xl object-fit"
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
            </>
          ) : (
            <>
              <div className="flex flex-col-reverse gap-5 ">
                {profileData.map((post) => (
                  <div
                    key={post._id}
                    className="flex flex-col gap-4 p-4 rounded-xl bg-[#efecd3]"
                  >
                    <div className="flex  items-center gap-2 justify-between">
                      <div className="flex">
                        <img
                          src={`http://localhost:8000/userProfile/${userDataById.avatar}`}
                          className="lg:w-12 w-10 lg:h-12 h-10 rounded-full border-4 border-white object-cover"
                        />

                        <div className="flex flex-col ">
                          <h2 className="font-semibold text-xl">
                            {userDataById.username}
                          </h2>
                          <span className="flex items-center text-sm">
                            posted {postDate(post.createdAt)}.
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="flex px-5 items-center">
                          <Dropdown
                            title="..."
                            noCaret
                            className=" absolute w-max font-semibold text-3xl"
                          >
                            <div className="relative right-16 font-medium text-base py-2 px-4 bg-white rounded-xl border-2">
                              <Dropdown.Item
                                className="py-1 hover:text-[#DC143C] cursor-pointer "
                                onClick={() => openEditModal(post)}
                              >
                                <div className="flex items-center gap-1">
                                  <span>
                                    <MdOutlineEdit size={20} />
                                  </span>
                                  <h2>Report</h2>
                                </div>
                              </Dropdown.Item>
                            </div>
                          </Dropdown>
                        </div>
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
                          className="w-full h-[26rem] rounded-xl object-fit"
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
            </>
          )}

          <div className="flex justify-center mt-10 text-xl font-semibold">
            <p>
              <span>&larr;</span>---------- End Of Posts ----------
              <span>&rarr;</span>
            </p>
          </div>
        </div>
      </div>
      {/* Right Sidebar */}
      <div className="sticky top-20 h-fit p-2 bg-[#efecd3] rounded-lg shadow-lg">
        <div className="flex items-center gap-2">
          <span className="text-2xl text-[#DC143C]">
            <MdCalendarMonth />
          </span>
          {formatDate(currentTime)}
        </div>
      </div>
      {/* Post Modal */}
      <Modal
        isOpen={postModalOpen}
        onRequestClose={closePostModal}
        className="modal lg:w-1/3 bg-white p-4 rounded-xl shadow"
        overlayClassName="overlay fixed top-0  w-full right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center px-20 lg:px-10"
        contentLabel="Create Post Modal"
      >
        <div className="max-h-[80vh] overflow-y-auto no-scrollbar">
          <div
            onClick={closePostModal}
            className="flex items-end justify-between px-5"
          >
            <span className="font-bold text-xl">Create Post</span>
            <button className=" text-black flex justify-center items-center rounded-xl cursor-pointer font-semibold text-xl hover:text-red-600">
              <MdOutlineClose size={32} />
            </button>
          </div>
          <div className="flex flex-col ">
            <div className="py-4 px-5">
              <div className="flex justify-center py-2 w-full gap-5">
                <button
                  className={`p-2 w-full rounded-lg ${
                    activeTab === "post"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                  onClick={() => setActiveTab("post")}
                >
                  Create Post
                </button>
                <button
                  className={`p-2 w-full rounded-lg ${
                    activeTab === "video"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                  onClick={() => setActiveTab("video")}
                >
                  Upload Video
                </button>
              </div>

              {activeTab === "post" && (
                <>
                  <form
                    className="flex flex-col justify-center items-center gap-5"
                    onSubmit={handleSubmit}
                  >
                    <div className="w-full flex flex-col">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Caption
                      </label>
                      <input
                        name="description"
                        type="text"
                        placeholder="Share Your Thoughts..."
                        className="border-2 border-black p-2 rounded-lg outline-none select-none"
                        onChange={handleChange}
                      />
                    </div>
                    <label className="gap-1 w-full flex flex-col">
                      <span className="block text-gray-700 text-sm font-bold mb-2">
                        Media:
                      </span>

                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleChange}
                      />
                      <img
                        src={uploadPhotos}
                        alt=""
                        title="Upload Photo"
                        className="h-60 rounded-lg cursor-pointer border-2 border-black object-contain"
                      />
                    </label>
                    <div className="">
                      <button className="bg-red-500 text-white flex justify-center items-center  rounded-xl cursor-pointer py-2 px-5 mx-auto font-semibold text-xl hover:bg-red-400">
                        Create Post
                      </button>
                    </div>
                  </form>
                </>
              )}
              {activeTab === "video" && (
                <>
                  {" "}
                  <form
                    className="flex flex-col justify-center items-center gap-5"
                    onSubmit={handleVideoSubmit}
                  >
                    <div className="mb-6 w-full">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        className="border-2 border-black p-2 rounded-lg outline-none select-none w-full"
                        placeholder="Enter video title"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                      />
                    </div>

                    <label className="gap-1 w-full flex flex-col">
                      Select Video<span></span>
                      <input
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <img
                        src={uploadPhotos}
                        alt=""
                        title="Upload Photo/Videos"
                        className="h-60 rounded-lg cursor-pointer border-2 border-black object-contain"
                      />
                    </label>

                    <div className="flex items-center justify-between">
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Upload
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </Modal>
      {/* Edit Post Modal */}
      <Modal
        isOpen={editModalOpen}
        onRequestClose={closeEditModal}
        className="modal lg:w-1/3 bg-white p-4 rounded-xl shadow"
        overlayClassName="overlay fixed top-0  w-full right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center px-20 lg:px-10"
        contentLabel="Create Post Modal"
      >
        <div className="max-h-[80vh] overflow-y-auto no-scrollbar">
          <div
            onClick={closeEditModal}
            className="flex items-end justify-between px-5"
          >
            <span className="font-bold text-xl">Edit Description:</span>
            <button className=" text-black flex justify-center items-center rounded-xl cursor-pointer font-semibold text-xl hover:text-red-600">
              <MdOutlineClose size={32} />
            </button>
          </div>
          <div className="flex flex-col ">
            <div className="py-4 px-5">
              <form
                className="flex flex-col justify-center items-center gap-5"
                onSubmit={editedPost}
              >
                <div className="w-full flex flex-col">
                  <input
                    name="description"
                    type="text"
                    placeholder="Edit Description"
                    className="border-2 border-black p-2 rounded-lg outline-none select-none"
                    onChange={handleEditChange}
                    value={createdPost.description}
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
      {/* create article modal */}
      <Modal
        isOpen={articleModalOpen}
        onRequestClose={closeArticleModal}
        className="modal lg:w-3/5 bg-white p-4 rounded-xl shadow"
        overlayClassName="overlay fixed top-0  w-full right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center px-20 lg:px-10"
        contentLabel="Create Post Modal"
      >
        <div className="max-h-[80vh] overflow-y-auto no-scrollbar">
          <div
            onClick={closeArticleModal}
            className="flex items-end justify-between px-5"
          >
            <span className="font-bold text-xl">Share your writings...</span>
            <button className=" text-black flex justify-center items-center rounded-xl cursor-pointer font-semibold text-xl hover:text-red-600">
              <MdOutlineClose size={32} />
            </button>
          </div>
          <div className="flex flex-col ">
            <div className="py-4 px-5">
              <form
                className="flex flex-col justify-center items-center gap-5"
                onSubmit={handleArticleUpload}
              >
                <div className="w-full flex flex-col gap-4">
                  <input
                    name="description"
                    type="text"
                    placeholder="Title Of Your Writings..."
                    className="border-2 border-black p-2 rounded-lg outline-none select-none"
                    onChange={handleTitle}
                  />
                  <label className="gap-1 w-full flex flex-col">
                    <span className="font-semibold ">Thumbnail</span>

                    <input
                      type="file"
                      accept="image"
                      className="hidden"
                      onChange={handleThumbnail}
                      name="thumbnail"
                    />
                    <img
                      src={
                        thumbnail
                          ? URL.createObjectURL(thumbnail)
                          : `${uploadPhotos}`
                      }
                      alt=""
                      title="Change profile picture"
                      className="h-60 w-full rounded-lg cursor-pointer object-contain border"
                    />
                  </label>
                </div>

                <div className="w-full">
                  <label className="font-semibold ">Content</label>
                  <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                    onChange={(newContent) => {
                      setContent(newContent);
                    }}
                  />
                </div>
                <div className="">
                  <button className="bg-red-500 text-white flex justify-center items-center  rounded-xl cursor-pointer py-2 px-5 mx-auto font-semibold text-xl hover:bg-red-400">
                    Upload Articles
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
