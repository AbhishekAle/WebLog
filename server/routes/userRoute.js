import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  getAllUser,
  getUserById,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/update-user/:id", verifyToken, updateUser);
router.get("/users", verifyToken, getAllUser);
router.get("/users/:id", verifyToken, getUserById);

export default router;
