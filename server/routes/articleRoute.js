import express from "express";
import { verifyToken } from "../middleware/verifyUser.js";
import {
  getAllArticles,
  getArticlesByUser,
  postArticle,
} from "../controllers/articleController.js";

const router = express.Router();

router.post("/createarticle/:id", verifyToken, postArticle);
router.get("/getarticlesbyuser/:id", verifyToken, getArticlesByUser);
router.get("/articles", getAllArticles);

export default router;
