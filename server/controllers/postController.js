import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";
import { errorHandler } from "../middleware/error.js";

// Create post controller
export const createPost = async (req, res) => {
  try {
    // Check if the authenticated user is authorized to create the post
    if (req.user.id !== req.params.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const { description } = req.body;

    // Extract filenames from uploaded files
    const posts = req.files.map((file) => file.filename);

    const newPost = new postModel({
      user: req.user.id, // Set the user field
      description,
      posts,
    });

    // Save the new post
    const savedPost = await newPost.save();

    res
      .status(200)
      .json({ message: "Post Created Successfully", post: savedPost });
  } catch (error) {
    // Handle error
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Failed to create post" });
  }
};

//get posts by user controller
export const getPostsByUser = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const postsByUser = await postModel.find({ user: req.params.id });
      res.status(200).json(postsByUser);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "error fetching data"));
  }
};
