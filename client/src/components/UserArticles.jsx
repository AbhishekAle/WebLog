import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const UserArticles = () => {
  const { userData } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.user);
  const [articles, setArticles] = useState([]);
  const id = userData._id;
  const navigate = useNavigate();

  const handleReadMore = (articleId) => {
    navigate(`/single-article/${articleId}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/getarticlesbyuser/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data.map((article) => ({
        ...article,
        showFullContent: false,
      }));
      setArticles(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-4 md:px-10 lg:px-56 py-4 bg-[#efecd3] min-h-screen">
      <div className="mx-auto flex  flex-col-reverse">
        {articles.map((article, index) => (
          <div key={index}>
            <div className="flex md:flex-row  py-4 md:py-8">
              <div className="md:w-1/2 flex flex-col gap-2">
                <img
                  src={`http://localhost:8000/thumbnail/${article.thumbnail}`}
                  alt="Article Image"
                  className="w-5/6 h-[16rem] rounded-xl"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="font-medium text-xl mb-2">"{article.title}"</h2>
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

export default UserArticles;
