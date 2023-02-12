import express from "express";
import postController from "../controllers/posts.js";

const router = express.Router();

router.get("/", postController.getAll);
router.get("/:postID", postController.getOne);

router.post("/:postID/upvote", postController.upvote);
router.post("/:postID/downvote", postController.downvote);

router.get("/user/:username", postController.getUserPosts);
router.get("/boardit/:boardit", postController.getBoarditPosts);

export default router;
