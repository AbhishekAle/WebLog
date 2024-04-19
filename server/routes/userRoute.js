import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  getAllUser,
  getUserById,
  updateUserProfile,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyUser.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/userProfile"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/update-user/:id", verifyToken, updateUser);
router.put(
  "/update-user-profile/:id",
  upload.single("avatar"),
  verifyToken,
  updateUserProfile
);
router.get("/users", verifyToken, getAllUser);
router.get("/users/:id", verifyToken, getUserById);

export default router;
