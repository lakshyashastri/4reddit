// imports
import express from "express";
import cors from "cors";
import session from "express-session";

// route imports
import boardits from "./routes/boardits.js";
import users from "./routes/users.js";
import posts from "./routes/posts.js";
import comments from "./routes/comments.js";
import reports from "./routes/reports.js";
import login from "./routes/login.js";

// vars
const app = express(); // express app
const router = express.Router();
const corsOptions = {origin: "http://localhost:3000"};
const PORT = 8000; // app port

// middleware
app.use(cors(corsOptions));

app.use(express.urlencoded({extended: true}));
app.use(express.json()); // request parser
app.use(
    session({
        secret: "c39c986808c189b563b1f8914afebe6e984265bbd9df6a429c11607250d3b28b00bdaa0e85622dbff49aadb45ac532a501c576f16a2e6d5ff55c98d90748dc03",
        resave: false,
        saveUninitialized: true
    })
);

app.use("/4reddit/api", router); // base url

// routes
router.use("/boardits", boardits);
router.use("/users", users);
router.use("/posts", posts);
router.use("/comments", comments);
router.use("/reports", reports);
router.use("/login", login);

// start app
app.listen(PORT);
