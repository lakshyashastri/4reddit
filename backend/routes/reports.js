import express from "express";
import reportController from "../controllers/reports.js";

const router = express.Router();

router.get("/", reportController.getAll);
router.post("/", reportController.createReport);
router.get("/:reportID", reportController.getOne);
router.post("/:reportID/action/:action", reportController.action);
router.get("/post/:postID", reportController.postReports);
router.get("/boardit/:boarditName", reportController.boarditReports);

export default router;
