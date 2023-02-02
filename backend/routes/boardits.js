import express from "express";
import boarditController from "../controllers/boardits.js";
import cors from "cors";

const router = express.Router();

router.get("/", cors(), boarditController.getAll);
router.post("/", cors(), boarditController.create);

export default router;
