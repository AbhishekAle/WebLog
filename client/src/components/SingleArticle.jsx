import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const SingleArticle = () => {
  const [article, setArticle] = useState(null);
  const { articleId } = useParams();
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    fetchArticle();
  }, []);

  const fetchArticle = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/articles/${articleId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setArticle(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-4 md:px-10 lg:px-56 py-4 bg-[#efecd3] min-h-screen">
      <div className="mx-auto">
        {article && (
          <div>
            <h2 className="font-medium text-xl mb-2 flex items-center justify-center border-b border-black">
              "{article.title}"
            </h2>
            <div
              dangerouslySetInnerHTML={{
                __html: article.description,
              }}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleArticle;
