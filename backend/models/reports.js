import {Schema} from "mongoose";

export const reportSchema = new Schema(
    {
        reportedBy: {
            type: String,
            required: true
        },
        reportedUser: {
            type: String,
            required: true
        },
        concern: {
            type: String,
            required: true
        },
        associatedPost: {
            type: String,
            required: true
        }
    },
    {timestamps: true}
);
