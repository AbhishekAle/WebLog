import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";
import { errorHandler } from "../middleware/error.js";

// Create post controller
export const createPost = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const posts = req.files.map((file) => file.filename);

    if (!req.body.description && !posts.length) {
      return res
        .status(400)
        .json({ message: "Either description or posts is required" });
    }

    const newPost = new postModel({
      user: req.user.id,
      description: req.body.description,
      posts,
    });

    const savedPost = await newPost.save();

    res
      .status(200)
      .json({ message: "Post Created Successfully", post: savedPost });
  } catch (error) {
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

//get All posts controller
export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await postModel.find();
    res.status(200).json(posts);
    if (!posts) {
      return res.status(404).json({ message: "No posts found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//post edit controller
export const editPost = async (req, res, next) => {
  const post = await postModel.findById(req.params.id);
  if (!post) {
    return next(errorHandler(401, "post not found"));
  }
  if (req.user.id !== post.user) {
    return next(errorHandler(401, "you can only update your post"));
  }
  try {
    const editPost = await postModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          description: req.body.description,
        },
      },
      { new: true }
    );
    const { description } = editPost._doc;
    res.status(200).json(description);
  } catch (error) {
    next(error);
  }
};

//delete post controller
export const deletePost = async (req, res, next) => {
  const post = await postModel.findById(req.params.id);
  if (!post) {
    return next(errorHandler(404, "post not found"));
  }
  try {
    await postModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};
