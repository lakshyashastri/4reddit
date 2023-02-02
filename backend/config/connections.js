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

export async function getModelCon(modelName) {
    if (!nameToSchema[modelName]) {
        console.log(`Unknown schema ${modelName}`);
        return null;
    }
    mongoose.set("strictQuery", false);
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const connection = mongoose.connection;

    const model = mongoose.model(modelName, nameToSchema[modelName]);
    return [connection, model];
}
