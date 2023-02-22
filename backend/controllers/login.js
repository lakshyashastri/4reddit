import jwt from "jsonwebtoken";
import {getModelCon} from "../config/connections.js";
import {authenticateToken} from "../helpers.js";

export const ACCESS_TOKEN_SECRET =
    "3051d764f607e5c07fcb8e67921ff9d85b6bc0996aebc40948ad9c54dbd8acaaafca82250457ad3a2bd5b1506ba56367c14284a152b236cb71dd8ffcb7dbf87d";

function getAccessToken(username) {
    return jwt.sign({username}, ACCESS_TOKEN_SECRET, {
        expiresIn: "10s"
    });
}

const loginController = {
    login: async (req, res) => {
        const [client, Users] = await getModelCon("users");

        let userData = await Users.find({username: req.body.username});
        if (!userData.length) {
            return res.sendStatus(403);
        }

        if (
            req.body.username == userData[0].username &&
            req.body.password == userData[0].password
        ) {
            const token = getAccessToken(req.body.username);
            res.json({userData: userData[0], success: true, token});
        } else if (
            req.body.username == userData[0].username &&
            req.body.password != userData[0].password
        ) {
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
            res.json({success: true});
        });
    }
};

export default loginController;
