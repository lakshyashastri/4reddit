import express from "express";
import boarditController from "../controllers/boardits.js";

const router = express.Router();

router.get("/", boarditController.getAll);
router.post("/", boarditController.createBoardit);
router.get("/:boarditName", boarditController.getOne);
router.post("/:boarditName", boarditController.createPost);
router.get("/:boarditName/delete", boarditController.deleteBoardit);

router.get("/:boarditName/join/:username", boarditController.joinUser);
router.get("/:boarditName/accept/:username", boarditController.acceptUser);
router.get("/:boarditName/leave/:username", boarditController.leaveUser);

export default router;
