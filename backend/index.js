//// imports
import express from "express";
import {getDBCon} from "./config/connections.js";
import bodyParser from "body-parser";

//// setup

// vars
const app = express(); // express app
const router = express.Router(); // router
const PORT = 3001; // app port

// middleware
app.use("/4reddit/api", router); // base url
app.use(bodyParser.urlencoded({extended: true})); // request parser

//// routes

/// get

// root
router.get("/", async (req, res) => {
    const [client, Users] = await getDBCon("boardits");
    let data = await Users.find();

    res.send(data);
});

/// post
router.get("/b", async (req, res) => {
    const [client, Boardits] = await getDBCon("boardits");
    let newBoardit = new Boardits({
        name: "a",
        description: "aaa",
        tags: ["a", "b", "c"],
        bannedKeywords: ["x", "y", "z"],
        posts: ["abcde", "ABCDE"],
        followers: ["admin"]
    });
    await newBoardit.save();

    res.sendStatus(200);
});

// start app
app.listen(PORT);
