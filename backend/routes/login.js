import express from "express";
import loginController from "../controllers/login.js";

const router = express.Router();

router.post("/", loginController.login);
router.post("/auth", loginController.authenticate);

export default router;
