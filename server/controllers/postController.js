import postModel from "../models/postModel";

//create post controller

export const createPost = async (req, res) => {
  if (req.user.id !== req.params.id) {
    return res.status(401).json({ message: " user not authorized" });
  }
  const { description, images } = req.body;
  const newPost = { description, images };
  try {
    await newPost.save();
    res.status(200).json({ message: "Post Created Successfully" });
  } catch (error) {
    error;
  }
};
