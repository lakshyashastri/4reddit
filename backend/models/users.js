import {Schema} from "mongoose";

export const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    number: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    followers: {
        type: [String],
        required: true
    },
    following: {
        type: [String],
        required: true
    },
    savedPosts: {
        type: [String],
        required: true
    }
});
