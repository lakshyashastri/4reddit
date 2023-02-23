import express from "express";
import loginController from "../controllers/login.js";
import CASAuthentication from "node-cas-authentication";

const cas = new CASAuthentication({
    cas_url: "https://login.iiit.ac.in/cas",
    service_url: "http://localhost:3001/4reddit/api/login/",
    cas_version: "3.0",
    renew: true,
    is_dev_mode: false,
    dev_mode_user: "",
    dev_mode_info: {},
    session_name: "cas_user",
    session_info: "cas_userinfo",
    destroy_session: true,
    return_to: "http://localhost:3001/4reddit/api/login/cas"
});

const router = express.Router();

router.post("/", loginController.login);
router.post("/auth", loginController.authenticate);
router.get("/cas", cas.bounce, loginController.casAuth);
router.post("/cas/verify", loginController.verify);

export default router;
