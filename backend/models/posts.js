import {Schema} from "mongoose";

export const postSchema = new Schema(
    {
        id: {
            type: String,
            unique: true
        },
        title: {
            type: String,
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
        postedIn: {
            type: String,
            required: true
        },
        upvotes: {
            type: Number,
            required: true
        },
        downvotes: {
            type: Number,
            required: true
        }
        // reports: {
        //     type: [reportSchema],
        //     required: true
        // }
    },
    {timestamps: true}
);
