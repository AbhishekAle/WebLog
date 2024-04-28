import express from "express";
import {
  createPost,
  deletePost,
  editPost,
  getAllPosts,
  getPostsByUser,
} from "../controllers/postController.js";
import { verifyToken } from "../middleware/verifyUser.js";
import multer from "multer";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/userPosts"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/createpost/:id",
  verifyToken, // Verify token first
  upload.array("posts", 5), // Upload images with a maximum count of 5
  createPost
);
router.get("/getposts/:id", verifyToken, getPostsByUser);
router.get("/get-all-posts", verifyToken, getAllPosts);
router.put("/edit-post/:id", verifyToken, editPost);
router.delete("/delete-post/:id", verifyToken, deletePost);

export default router;
