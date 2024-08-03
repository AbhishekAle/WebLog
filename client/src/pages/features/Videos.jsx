import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useFirebase } from "../../context/firebase";
import { SlLike } from "react-icons/sl";
import { FaRegComment } from "react-icons/fa";
import { TbShare3 } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { setVideoData } from "../../slices/postSlice";

const Videos = () => {
  const firebase = useFirebase();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videosData = await firebase.listAllVideos();
        console.log("Fetched videos data:", videosData); // Log fetched data
        setVideos(videosData);
        dispatch(setVideoData(videosData));
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [firebase, dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 5000); // Update currentTime every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const handlePlay = (videoId) => {
    if (currentPlaying && currentPlaying !== videoId) {
      const player = document.getElementById(`player-${currentPlaying}`);
      if (player) {
        player.seekTo(player.getCurrentTime(), "seconds");
      }
    }
    setCurrentPlaying(videoId);
  };

  const postDate = (createdAt) => {
    if (!createdAt) {
      console.error("createdAt is undefined or null for video");
      return "Unknown time";
    }

    const postTime = new Date(createdAt);
    if (isNaN(postTime.getTime())) {
      console.error("Invalid date:", createdAt);
      return "Invalid date";
    }

    const timeDifference = Math.abs(currentTime - postTime);
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);
    const weeksDifference = Math.floor(daysDifference / 7);
    const monthsDifference = Math.floor(daysDifference / 30);
    const yearsDifference = Math.floor(daysDifference / 365);

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
      return `${minutesDifference} ${
        minutesDifference === 1 ? "minute" : "minutes"
      } ago`;
    } else {
      return `${secondsDifference} ${
        secondsDifference === 1 ? "second" : "seconds"
      } ago`;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {videos.length === 0 ? (
        <div className="text-center text-gray-500">No videos available</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white/45 shadow-xl backdrop-blur-lg rounded-custom border border-white/2 rounded-lg overflow-hidden"
            >
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
              </div>
              <div className="relative w-full h-64">
                <ReactPlayer
                  id={`player-${video.id}`}
                  url={video.videoURL}
                  width="100%"
                  height="100%"
                  controls
                  playing={currentPlaying === video.id}
                  onPlay={() => handlePlay(video.id)}
                  config={{
                    file: {
                      attributes: {
                        controlsList: "nodownload nofullscreen",
                      },
                    },
                  }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
              <div className="p-4 text-gray-700 font-semibold text-xl">
                <p>Uploaded by: {video.username}</p>
                <p className="text-sm text-gray-500">
                  {postDate(video.createdAt)}
                </p>
              </div>
              <hr className="border-slate-300 mb-1"></hr>
              <div className="flex justify-evenly">
                <button className="rounded-lg text-[#DC143C] font-bold hover:bg-[#e6e1b9] mx-auto p-2 mb-2 flex items-center jus gap-2 ">
                  <span className="text-black font-medium">100K</span>
                  <SlLike size={28} />
                </button>
                <span className="border-r-2 border-slate-300 mb-1"></span>
                <button className=" text-[#DC143C] font-bold  hover:bg-[#e6e1b9]  mx-auto p-2 mb-2 rounded-lg flex items-center gap-2 ">
                  <span className="text-black font-medium">1K</span>
                  <FaRegComment size={28} />
                </button>
                <span className="border-r-2 border-slate-300 mb-1"></span>
                <button className=" text-[#DC143C] font-bold hover:bg-[#e6e1b9] mx-auto p-2 mb-2 rounded-lg flex items-center gap-2 ">
                  <span className="text-black font-medium">1M</span>
                  <TbShare3 size={28} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Videos;
