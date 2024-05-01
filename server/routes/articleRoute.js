import express from "express";
import { verifyToken } from "../middleware/verifyUser.js";
import {
  getAllArticles,
  getArticlesByUser,
  postArticle,
} from "../controllers/articleController.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/thumbnail"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/createarticle/:id",
  upload.fields([{ name: "thumbnail", maxCount: 1 }]),
  verifyToken,
  postArticle
);
router.get("/getarticlesbyuser/:id", verifyToken, getArticlesByUser);
router.get("/articles", getAllArticles);

export default router;
