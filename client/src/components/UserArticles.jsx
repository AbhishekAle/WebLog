import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { SlCalender } from "react-icons/sl";

const UserArticles = () => {
  const { userData } = useSelector((state) => state.user);
  const [articles, setArticles] = useState([]);
  const [userArticle, setUserArticle]= useState([]);
  const id = userData._id;
  const profileId = useParams();
  const userId = profileId.userId;

  const navigate = useNavigate();

  const handleReadMore = (articleId) => {
    navigate(`/single-article/${articleId}`);
  };

  useEffect(() => {
    fetchData();
    fetchArticleById();
  }, []);

  const fetchArticleById = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/getarticlesbyuser/${userId}`
      );
      const data = res.data.map((article) => ({
        ...article,
        showFullContent: false,
      }));
      setUserArticle(data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/getarticlesbyuser/${id}`
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
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="px-4 md:px-10 lg:px-56 bg-[#efecd3] min-h-screen">
      {id === userId?(<><div className="mx-auto flex flex-col-reverse">
        {articles.map((article, index) => (
          <div key={index}>
            <div className="flex md:flex-row  py-4 md:py-4">
              <div className="md:w-1/2 flex flex-col gap-2">
                <img
                  src={`http://localhost:8000/thumbnail/${article.thumbnail}`}
                  alt="Article Image"
                  className="w-5/6 h-[16rem] rounded-xl"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="font-medium text-xl mb-2">
                  {article.title}
                  <p className="mb-2 flex items-center gap-2 text-sm text-red-500">
                    <SlCalender className="" />
                    {formatDate(article.createdAt)}
                  </p>
                </h2>

                <div
                  dangerouslySetInnerHTML={{
                    __html: article.showFullContent
                      ? article.description
                      : `${article.description.slice(0, 500)}...`,
                  }}
                  style={{ textAlign: "justify" }}
                />
                {/* Display created date */}
                {article.description.length > 500 && (
                  <button
                    className="text-blue-500 font-medium mt-2 cursor-pointer"
                    onClick={() => handleReadMore(article._id)}
                  >
                    Read more...
                  </button>
                )}
              </div>
            </div>
            <hr className="border-black my-4" />
          </div>
        ))}
      </div></>):(<><div className="mx-auto flex flex-col-reverse">
        {userArticle.map((article, index) => (
          <div key={index}>
            <div className="flex md:flex-row  py-4 md:py-4">
              <div className="md:w-1/2 flex flex-col gap-2">
                <img
                  src={`http://localhost:8000/thumbnail/${article.thumbnail}`}
                  alt="Article Image"
                  className="w-5/6 h-[16rem] rounded-xl"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="font-medium text-xl mb-2">
                  {article.title}
                  <p className="mb-2 flex items-center gap-2 text-sm text-red-500">
                    <SlCalender className="" />
                    {formatDate(article.createdAt)}
                  </p>
                </h2>

                <div
                  dangerouslySetInnerHTML={{
                    __html: article.showFullContent
                      ? article.description
                      : `${article.description.slice(0, 500)}...`,
                  }}
                  style={{ textAlign: "justify" }}
                />
                {/* Display created date */}
                {article.description.length > 500 && (
                  <button
                    className="text-blue-500 font-medium mt-2 cursor-pointer"
                    onClick={() => handleReadMore(article._id)}
                  >
                    Read more...
                  </button>
                )}
              </div>
            </div>
            <hr className="border-black my-4" />
          </div>
        ))}
      </div></>)}
      
    </div>
  );
};

export default UserArticles;
