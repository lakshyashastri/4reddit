import express from "express";
import commentController from "../controllers/comments.js";

const router = express.Router();

router.get("/", commentController.getAll);
router.post("/", commentController.createComment);
router.get("/:commentID", commentController.getOne);
router.get("/post/:postID", commentController.getPostComments);

export default router;
