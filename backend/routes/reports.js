import express from "express";
import reportController from "../controllers/reports.js";

const router = express.Router();

router.get("/", reportController.getAll);
router.post("/", reportController.createReport);

export default router;
