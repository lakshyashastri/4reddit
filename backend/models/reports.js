import {Schema} from "mongoose";

export const reportSchema = new Schema(
    {
        id: {
            type: String,
            required: true
        },
        reportedBy: {
            type: String,
            required: true
        },
        reportedUser: {
            type: String,
            required: true
        },
        reportedPost: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    },
    {timestamps: true}
);
