import express from "express";
import userController from "../controllers/users.js";
import cors from "cors";
import {authenticateToken} from "../helpers.js";

const router = express.Router();

router.get("/", authenticateToken, userController.getAll);
router.post("/", userController.create);

router.get("/:username", authenticateToken, userController.getOne);

router.post("/:username/update", authenticateToken, userController.update);
router.get("/:username/saved", authenticateToken, userController.saved);
router.get("/:username/boardits", authenticateToken, userController.getBoards);
router.post("/:username/follow", authenticateToken, userController.follow);
router.post("/:username/unfollow", authenticateToken, userController.unfollow);

export default router;
