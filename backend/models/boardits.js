import {Schema} from "mongoose";

export const boarditSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        tags: {
            type: [String],
            required: true
        },
        bannedKeywords: {
            type: [String],
            required: true
        },
        posts: {
            type: [String],
            required: true
        },
        followers: {
            type: [String],
            required: true
        },
        createdBy: {
            type: String,
            required: true
        }
    },
    {timestamps: true}
);
