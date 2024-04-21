import React, { useEffect, useState } from "react";
import pasupatinath from "../assets/pasupatinath.jpg";
import { useSelector } from "react-redux";
import axios from "axios";
import { MdAdd } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import Modal from "react-modal";

const Account = () => {
  const { userData } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState();
  const email = formData.email;
  const phoneNumber = formData.phoneNumber;
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const avatar = userData.avatar;
  console.log(avatar);
  const token = userData.token;
  const id = userData._id;

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = res.data;
      setFormData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const handleChange = (e) => {
    if (e.target.type === "file") {
      setImage(e.target.files[0]);
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
      `http://localhost:8000/api/update-user/${id}`,
      { email, phoneNumber },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (image) {
      const images = new FormData();
      images.append("avatar", image);

      await axios.patch(
        `http://localhost:8000/api/update-user-profile/${id}`,
        images,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
    }
    setFormModalOpen(false);
  };

  return (
    <div className="w-full px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 py-1">
      <div className="flex flex-col">
        <div>
          <img
            src={pasupatinath}
            alt="cover photo"
            title="Cover Photo"
            className="w-full h-80 sm:h-96 md:h-[50vh] border-slate-200 border-2 rounded-xl"
          />
        </div>

        <div className=" flex flex-col lg:flex-row justify-between items-center px-4 sm:px-12 md:px-20 lg:px-32 xl:px-40">
          <div className="flex items-center gap-4 sm:gap-10">
            <img
              src={`http://localhost:8000/userProfile/${avatar}`}
              className="relative top-[-2rem] lg:w-52 w-20 lg:h-52 h-20 rounded-full border-4 border-white"
            />
            <div className="flex flex-col">
              <h2 className="relative top-[-2rem] font-semibold text-lg sm:text-2xl">
                {formData.username}
              </h2>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-4 items-center mt-4 sm:mt-20">
            <button className="bg-red-500 p-2 rounded-lg text-white font-medium text-base sm:text-lg hover:bg-red-400 flex items-center justify-center">
              <span>
                <MdAdd />
              </span>
              Add Story
            </button>
            <button
              className="font-medium text-base sm:text-lg hover:text-red-400 flex items-center justify-center gap-1"
              onClick={openFormModal}>
              <span>
                <FiEdit />
              </span>
              Edit
            </button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={formModalOpen}
        onRequestClose={closeFormModal}
        className="modal lg:w-1/2 bg-white p-4 rounded-xl shadow"
        overlayClassName="overlay fixed top-0  w-full right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center px-20 lg:px-10">
        <div className="max-h-[80vh] overflow-y-auto">
          <div onClick={closeFormModal} className="flex items-end justify-end">
            <button className=" text-black flex justify-center items-center p-2 rounded-xl cursor-pointer  font-semibold text-xl hover:text-red-600">
              X{" "}
            </button>
          </div>
          <div className="flex flex-col ">
            <div className="py-4 px-40">
              <form
                className="flex flex-col justify-center items-center gap-5"
                onSubmit={handleSubmit}>
                <label className="gap-1 w-full flex flex-col">
                  <span className="font-medium">Profile Picture:</span>

                  <input
                    type="file"
                    accept="image"
                    className="hidden"
                    onChange={handleChange}
                  />
                  <img
                    src={
                      image
                        ? URL.createObjectURL(image)
                        : `http://localhost:8000/userProfile/${avatar}`
                    }
                    alt=""
                    title="Change profile picture"
                    className="h-60 w-full rounded-lg cursor-pointer"
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
