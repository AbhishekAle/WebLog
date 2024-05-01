import React from "react";
import sagarmatha from "../assets/sagarmatha.jpg";
import pasupatinath from "../assets/pasupatinath.jpg";
import suklaphata from "../assets/suklaphata.jpeg";
import { useNavigate } from "react-router-dom";

const Articles = () => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate("/single-article");
  };

  return (
    <div className="px-40 py-4 bg-[#efecd3] min-h-screen">
      <div className="w-full">
        <div className="flex gap-10 py-2">
          <div className="flex-col w-[60vh]">
            <img
              src={sagarmatha}
              alt="Article Image"
              className="h-[22vh]  w-[60vh]"
            />
            <h2 className="font-semibold text-xl">
              "Sagarmāthā National Park is a national park in the Himalayas of
              eastern Nepal."
            </h2>
          </div>
          {/* <div className="w-2/3" style={{ textAlign: "justify" }}>
            <label className=" text-lg">
              {text.length > 600 ? text.slice(0, 600) + " " : text}
            </label>
            {text.length > 600 && (
              <button
                className="text-blue-500 font-semibold mt-2 cursor-pointer"
                onClick={handleReadMore}>
                Read More...
              </button>
            )}
          </div> */}
        </div>
        <hr className="border-black py-4" />
        <div className="flex gap-10 pb-5">
          <div className="flex-col w-[60vh]">
            <img
              src={pasupatinath}
              alt="Article Image"
              className="h-[22vh]  w-[60vh]"
            />
            <h2 className="font-semibold text-xl">
              "The exact date of the temple's construction is uncertain"
            </h2>
          </div>
          {/* <div className="w-2/3" style={{ textAlign: "justify" }}>
            <label className=" text-lg">
              {text2.length > 600 ? text2.slice(0, 600) + " " : text2}
            </label>
            {text2.length > 600 && (
              <button
                className="text-blue-500 font-semibold mt-2 cursor-pointer"
                onClick={handleReadMore}>
                Read More...
              </button>
            )}
          </div> */}
        </div>
        <hr className="border-black py-4" />
        <div className="flex gap-10">
          <div className="flex-col w-[60vh]">
            <img
              src={suklaphata}
              alt="Article Image"
              className="h-[22vh]  w-[60vh]"
            />
            <h2 className="font-semibold text-xl">
              "Sagarmāthā National Park is a national park in the Himalayas of
              eastern Nepal. "
            </h2>
          </div>
          {/* <div className="w-2/3" style={{ textAlign: "justify" }}>
            <label className=" text-lg">
              {text.length > 600 ? text.slice(0, 600) + " " : text}
            </label>
            {text.length > 600 && (
              <button
                className="text-blue-500 font-semibold mt-2 cursor-pointer"
                onClick={handleReadMore}>
                Read More...
              </button>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Articles;
