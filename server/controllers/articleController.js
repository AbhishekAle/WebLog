import articlesModel from "../models/articlesModel.js";
// import userModel from "../models/userModel";
import { errorHandler } from "../middleware/error.js";

//post article controller
export const postArticle = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return res.status(401).json({ message: "user not authorized" });
  }
  try {
    const newArticle = new articlesModel({
      description: req.body.description,
      title: req.body.title,
      user: req.params.id,
    });
    await newArticle.save();
    res.status(200).json({ message: "Article posted successfully" });
  } catch (error) {
    next(error);
  }
};
