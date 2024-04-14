import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/update-user/:id", verifyToken, updateUser);

export default router;
