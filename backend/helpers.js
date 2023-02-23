import crypto from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import CASAuthentication from "node-cas-authentication";

import {ACCESS_TOKEN_SECRET} from "./controllers/login.js";

export function getID(length = 3) {
    return crypto.randomBytes(length).toString("hex");
}

export async function sendMail(to, message) {
    let res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            service_id: "service_c9f9din",
            template_id: "template_vqvpbes",
            user_id: "C7y0SBYUWwZ-JTYZ3",
            template_params: {
                send_to: to,
                content: message
            },
            accessToken: "cStOPbPpNC124nH0V4XN4"
        })
    });
    return res;
}

export function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader ? authHeader.split(" ")[1] : null;
    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.username = user;
        req.token = token;
        next();
    });
}

export async function hashPW(password) {
    const saltRounds = 10;

    const hashedPW = await bcrypt.hash(password, saltRounds);
    return hashedPW;
}

export function casAuth(req, res, next) {
    // already signed in
    if (req.token) {
        next();
    }

    const cas = new CASAuthentication({
        cas_url: "https://login.iiit.ac.in/cas",
        service_url: "http://localhost:3000",
        cas_version: "3.0",
        renew: true,
        is_dev_mode: false,
        dev_mode_user: "",
        dev_mode_info: {},
        session_name: "cas_user",
        session_info: "cas_userinfo",
        destroy_session: true,
        return_to: "http://localhost:3000/"
    });

    return cas.bounce.bind(cas);
}
