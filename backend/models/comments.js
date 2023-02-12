import {Schema} from "mongoose";

export const commentSchema = new Schema(
    {
        id: {
            type: String,
            required: true
        },
        children: {
            type: [String],
            required: true
        },
        text: {
            type: String,
            required: true
        },
        postedBy: {
            type: String,
            required: true
        },
        postID: {
            type: String,
            required: true
        }
    },
    {timestamps: true}
);
