import articlesModel from "../models/articlesModel.js";
// import userModel from "../models/userModel";
import { errorHandler } from "../middleware/error.js";

//post article controller
export const postArticle = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return res.status(401).json({ message: "user not authorized" });
  }
  try {
    const thumbnail = req.files.thumbnail[0];
    const newArticle = new articlesModel({
      description: req.body.description,
      title: req.body.title,
      thumbnail: thumbnail.filename,
      user: req.params.id,
    });
    await newArticle.save();
    res.status(200).json({ message: "Article posted successfully" });
  } catch (error) {
    next(error);
  }
};
//get articles by user
export const getArticlesByUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return res.status(401).json({ message: "user not authorized" });
  }
  try {
    const articles = await articlesModel.find({ user: req.params.id });
    res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
};

//get all articles
export const getAllArticles = async (req, res, next) => {
  try {
    const articles = await articlesModel.find();
    res.status(200).json(articles);
    if (!articles) {
      return next(errorHandler(404, "articles not found"));
    }
  } catch (error) {
    next(error);
  }
};
