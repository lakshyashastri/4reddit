import jwt from "jsonwebtoken";
import {getModelCon} from "../config/connections.js";
import bcrypt from "bcrypt";

export const ACCESS_TOKEN_SECRET =
    "3051d764f607e5c07fcb8e67921ff9d85b6bc0996aebc40948ad9c54dbd8acaaafca82250457ad3a2bd5b1506ba56367c14284a152b236cb71dd8ffcb7dbf87d";

export function getAccessToken(username) {
    return jwt.sign({username}, ACCESS_TOKEN_SECRET, {
        expiresIn: "120m"
    });
}

const loginController = {
    login: async (req, res) => {
        const [client, Users] = await getModelCon("users");

        let userData = await Users.find({username: req.body.username});
        if (!userData.length) {
            return res.json({username: 1, password: 1});
        }

        const result = await bcrypt.compare(
            req.body.password,
            userData[0].password
        );

        if (req.body.username == userData[0].username && result) {
            const token = getAccessToken(req.body.username);
            res.json({userData: userData[0], success: true, token});
        } else if (req.body.username == userData[0].username && !result) {
            res.json({username: 0, password: 1});
        } else {
            res.json({username: 0, password: 0});
        }
    },
    authenticate: async (req, res) => {
        jwt.verify(req.body.token, ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.json({error: "Invalid token"});
            }
            res.json({success: true, username: user});
        });
    },
    casAuth: async (req, res) => {
        const token = getAccessToken(req.session.cas_userinfo.uid);

        res.redirect(
            `http://localhost:3000?token=${token}&username=${req.session.cas_userinfo.uid}&email=${req.session.cas_userinfo["e-mail"]}`
        );
    },
    verify: async (req, res) => {
        try {
            const user = await jwt.verify(req.body.token, ACCESS_TOKEN_SECRET);
            const [client, Users] = await getModelCon("users");

            const userExists = await Users.find({
                username: user.username,
                email: req.body.email
            });

            if (!userExists.length) {
                let newUser = new Users({
                    username: user.username,
                    password: "IIIT",
                    firstName: req.body.email.split(".")[0],
                    lastName: req.body.email.split(".")[1].split("@")[0],
                    email: req.body.email,
                    number: 1234567890,
                    dob: 0,
                    followers: [],
                    following: [],
                    savedPosts: []
                });
                await newUser.save();

                res.json({
                    username: user.username,
                    success: true
                });
            } else {
                res.json({success: true, username: user});
            }
        } catch (err) {
            console.log(err);
            return res.json({error: "Invalid token"});
        }
    }
};

export default loginController;
