import express from "express";
import userController from "../controllers/users.js";
import cors from "cors";

const router = express.Router();

router.get("/", userController.getAll);
router.get("/:username", userController.getOne);
router.post("/", userController.create);

export default router;
