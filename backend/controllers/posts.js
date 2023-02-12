import {getModelCon} from "../config/connections.js";

const postController = {
    getAll: async (req, res) => {
        const [client, Posts] = await getModelCon("posts");
        let data = await Posts.find();
        res.send(data);
    },
    getOne: async (req, res) => {
        const [client, Posts] = await getModelCon("posts");
        let data = await Posts.find({id: req.params.postID});
        res.send(data);
    },
    getUserPosts: async (req, res) => {
        const [client, Posts] = await getModelCon("posts");
        let data = await Posts.find({postedBy: req.params.username});
        res.send(data);
    },
    getBoarditPosts: async (req, res) => {
        const [client, Posts] = await getModelCon("posts");
        let data = await Posts.find({postedIn: req.params.boardit});
        res.send(data);
    },
    upvote: async (req, res) => {
        const [client, Posts] = await getModelCon("posts");

        let increment = Boolean(+req.body.inc);

        await Posts.updateOne(
            {id: req.params.postID},
            increment
                ? {$push: {upvotedBy: req.body.user}}
                : {$pull: {upvotedBy: req.body.user}}
        );
        await Posts.updateOne(
            {id: req.params.postID},
            {$inc: {upvotes: increment ? 1 : -1}}
        );

        res.sendStatus(200);
    },
    downvote: async (req, res) => {
        const [client, Posts] = await getModelCon("posts");

        let increment = Boolean(+req.body.inc);

        await Posts.updateOne(
            {id: req.params.postID},
            increment
                ? {$push: {downvotedBy: req.body.user}}
                : {$pull: {downvotedBy: req.body.user}}
        );
        await Posts.updateOne(
            {id: req.params.postID},
            {$inc: {downvotes: increment ? 1 : -1}}
        );

        res.sendStatus(200);
    },
    save: async (req, res) => {
        const [client, Posts] = await getModelCon("posts");
        const [userClient, Users] = await getModelCon("users");

        let post_exists = await Posts.find({id: req.params.postID});
        if (post_exists.length == 0) {
            res.sendStatus(404);
        }

        await Users.updateOne(
            {username: req.body.user},
            {$push: {savedPosts: req.params.postID}}
        );

        res.sendStatus(200);
    },
    unsave: async (req, res) => {
        const [client, Posts] = await getModelCon("posts");
        const [userClient, Users] = await getModelCon("users");

        let post_exists = await Posts.find({id: req.params.postID});
        if (post_exists.length == 0) {
            res.sendStatus(404);
        }

        let postSaved = await Users.find({
            savedPosts: {$in: req.params.postID}
        });
        if (postSaved.length == 0) {
            res.sendStatus(404);
        }

        await Users.updateOne(
            {username: req.body.user},
            {$pull: {savedPosts: req.params.postID}}
        );

        res.sendStatus(200);
    }
};

export default postController;
