import express from "express";
import postController from "../controllers/posts.js";

const router = express.Router();

router.get("/", postController.getAll);
router.get("/:postID", postController.getOne);

export default router;
