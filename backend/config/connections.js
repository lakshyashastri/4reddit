import mongoose from "mongoose";

import {userSchema} from "../models/users.js";
import {boarditSchema} from "../models/boardits.js";
import {postSchema} from "../models/posts.js";
import {reportSchema} from "../models/reports.js";
import {commentSchema} from "../models/comments.js";

// export const uri = "mongodb://localhost:27017/4reddit";
export const uri =
    "mongodb+srv://lakshyashastri11:zZXeHJ08Jsz2uNPs@4reddit.fr1ahzd.mongodb.net/4reddit?retryWrites=true&w=majority";
const nameToSchema = {
    users: userSchema,
    boardits: boarditSchema,
    posts: postSchema,
    reports: reportSchema,
    comments: commentSchema
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
