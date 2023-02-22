import express from "express";
import userController from "../controllers/users.js";
import cors from "cors";
import {authenticateToken} from "../helpers.js";

const router = express.Router();
router.use(authenticateToken);

router.get("/", userController.getAll);
router.post("/", userController.create);

router.get("/:username", userController.getOne);

router.post("/:username/update", userController.update);
router.get("/:username/saved", userController.saved);
router.get("/:username/boardits", userController.getBoards);
router.post("/:username/follow", userController.follow);
router.post("/:username/unfollow", userController.unfollow);

export default router;
