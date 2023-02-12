import express from "express";
import userController from "../controllers/users.js";
import cors from "cors";

const router = express.Router();

router.get("/", userController.getAll);
router.post("/", userController.create);
router.get("/:username", userController.getOne);
router.get("/:username/saved", userController.saved);
router.get("/:username/boardits", userController.getBoards);

export default router;
