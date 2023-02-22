// imports
import express from "express";
import cors from "cors";

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
const PORT = 3001; // app port

// middleware
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true}));
app.use(express.json()); // request parser
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
