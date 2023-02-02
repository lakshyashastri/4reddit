import mongoose from "mongoose";

import {userSchema} from "../models/users.js";
import {boarditSchema} from "../models/boardits.js";
import {postSchema} from "../models/posts.js";
import {reportSchema} from "../models/reports.js";

export const uri = "mongodb://localhost:27017/4reddit";
const nameToSchema = {
    users: userSchema,
    boardits: boarditSchema,
    posts: postSchema,
    reports: reportSchema
};

export async function getDBCon(schemaName) {
    if (!nameToSchema[schemaName]) {
        console.log(`Unknown schema ${schemaName}`);
        return null;
    }
    mongoose.set("strictQuery", false);
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const connection = mongoose.connection;

    const model = mongoose.model(schemaName, nameToSchema[schemaName]);
    return [connection, model];
}
