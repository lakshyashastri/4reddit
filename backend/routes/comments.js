import express from "express";
import commentController from "../controllers/comments.js";
import {authenticateToken} from "../helpers.js";

const router = express.Router();
router.use(authenticateToken);

router.get("/", commentController.getAll);
router.post("/", commentController.createComment);
router.get("/:commentID", commentController.getOne);
router.get("/post/:postID", commentController.getPostComments);

export default router;
