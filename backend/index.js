// imports
import express from "express";
import {getModelCon} from "./config/connections.js";
import bodyParser from "body-parser";
import cors from "cors";

// route imports
import boardits from "./routes/boardits.js";
import users from "./routes/users.js";

// vars
const app = express(); // express app
const router = express.Router();
const corsOptions = {origin: "http://localhost:3000"};
const PORT = 3001; // app port

// middleware
app.use(cors(corsOptions));
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json()); // request parser
app.use("/4reddit/api", router); // base url

// routes
router.use("/boardits", boardits);
router.use("/users", users);

// start app
app.listen(PORT);
