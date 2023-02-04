// imports
import express from "express";
import {getModelCon} from "./config/connections.js";
import bodyParser from "body-parser";

// route imports
import boardits from "./routes/boardits.js";

// vars
const app = express(); // express app
const router = express.Router();
const corsOptions = {origin: "http://localhost:3000"};
const PORT = 3001; // app port

// middleware
app.use(bodyParser.urlencoded({extended: true})); // request parser
app.use("/4reddit/api", router); // base url
// app.use(cors());

// routes
router.use("/boardits", boardits);

// start app
app.listen(PORT);
