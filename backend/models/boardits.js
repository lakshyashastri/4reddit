import {Schema} from "mongoose";

const dateSchema = new Schema({
    visits: Number,
    posts: Number,
    membersJoined: Number
});

const statSchema = new Schema({
    date: {
        type: Map,
        of: dateSchema
    }
});

const statSchemaNew = new Schema({}, {strict: false});

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
        mods: {
            type: [String],
            required: true
        },
        followers: {
            type: [String],
            required: true
        },
        blockedUsers: {
            type: [String],
            required: true
        },
        pendingRequests: {
            type: [String],
            required: true
        },
        left: {
            type: [String],
            required: true
        },
        createdBy: {
            type: String,
            required: true
        },
        reportedPosts: {
            type: Number,
            required: true
        },
        deletedPosts: {
            type: Number,
            required: true
        },
        stats: {
            type: statSchemaNew,
            default: {}
        }
    },
    {timestamps: true}
);
