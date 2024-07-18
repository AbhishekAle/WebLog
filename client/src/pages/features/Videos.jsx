import React, { useState } from "react";
import { useFirebase } from "../../context/firebase";
import { useSelector } from "react-redux";

const Videos = () => {
  const [title, setTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const { userData } = useSelector((state) => state.user);
  const firebase = useFirebase();

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
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

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <form
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter video title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select Video
          </label>
          <input
            type="file"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default Videos;
