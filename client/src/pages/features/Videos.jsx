import React, { useEffect, useState } from "react";
import { useFirebase } from "../../context/firebase";

const Videos = () => {
  const firebase = useFirebase();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videosData = await firebase.listAllVideos();
        console.log("Fetched videos data:", videosData);
        setVideos(videosData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [firebase]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Videos</h1>
      {videos.length === 0 ? (
        <p>No videos available</p>
      ) : (
        videos.map((video) => (
          <div
            key={video.id}
            className="bg-white p-4 m-2 shadow-md w-full max-w-4xl"
          >
            <h2 className="text-lg font-bold mb-2 text-center">
              {video.title}
            </h2>
            <div className="flex justify-center mb-2">
              <video
                controls
                className="w-[45rem] h-[25rem] object-contain rounded-lg"
              >
                <source src={video.videoURL} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="flex items-center justify-center mb-2">
              <img
                src={video.avataURL}
                alt="default avatar"
                className="w-10 h-10 rounded-full mr-2"
              />

              <p className="text-sm text-center">{video.username}</p>
            </div>
            <p className="text-sm text-center">User ID: {video.userId}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Videos;
