import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { SlCalender } from "react-icons/sl";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  const handleReadMore = (articleId) => {
    navigate(`/single-article/${articleId}`);
  };
  const handleProfileClick = (articleIndex) => {
    if (articles.length > articleIndex && articleIndex >= 0) {
      const userId = articles[articleIndex].user._id;
      navigate(`/account/${userId}`);
    } else {
      console.error("Invalid article index");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/articles`);
      const data = res.data.map((article) => ({
        ...article,
      }));
      setArticles(data);
    } catch (error) {
      console.log(error);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="px-4 md:px-10 lg:px-64 bg-[#efecd3] min-h-screen">
      <div className="mx-auto flex flex-col-reverse">
        {articles.map((article, index) => (
          <div key={index}>
            <div className="flex md:flex-row py-4 md:py-4">
              <div className="md:w-1/2 flex flex-col gap-2">
                <img
                  src={`http://localhost:8000/thumbnail/${article.thumbnail}`}
                  alt="Article Image"
                  className="w-3/4 h-[16rem] rounded-xl"
                />
              </div>
              <div className="md:w-1/2">
                <div className="font-medium text-xl mb-2">
                  "{article.title}"{" "}
                  <div className="flex items-center">
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => handleProfileClick(index)}>
                      {/* Wrap avatar and username in Link */}
                      <img
                        src={`http://localhost:8000/userProfile/${article.user.avatar}`}
                        className="lg:w-5 w-10 lg:h-5 h-10 rounded-full object-cover mb-2"
                      />
                      <h2 className="text-base pb-2">
                        {article.user.username}
                      </h2>
                    </div>
                    <p className="mb-2 pl-3 flex items-center gap-1 text-sm text-red-500 ">
                      <SlCalender className="" />
                      {formatDate(article.createdAt)}
                    </p>
                  </div>
                </div>

                <div
                  dangerouslySetInnerHTML={{
                    __html: article.showFullContent
                      ? article.description
                      : `${article.description.slice(0, 500)}...`,
                  }}
                  style={{ textAlign: "justify" }}
                />

                {article.description.length > 500 && (
                  <button
                    className="text-blue-500 font-medium mt-2 cursor-pointer"
                    onClick={() => handleReadMore(article._id)}>
                    Read more...
                  </button>
                )}
              </div>
            </div>
            <hr className="border-black my-4" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;
