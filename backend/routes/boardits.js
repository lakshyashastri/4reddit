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
router.get("/:boarditName/reject/:username", boarditController.rejectUser);
router.get("/:boarditName/leave/:username", boarditController.leaveUser);

router.get("/:boarditName/noblock", boarditController.noblock);
router.get("/:boarditName/prop/:prop", boarditController.prop);

router.post("/:boarditName/block", boarditController.block);

router.post("/:boarditName/visit", boarditController.visit);
router.get("/:boarditName/temp", boarditController.temp);

export default router;
