import express from "express";
import boarditController from "../controllers/boardits.js";

const router = express.Router();

router.get("/", boarditController.getAll);
router.post("/", boarditController.create);

export default router;
