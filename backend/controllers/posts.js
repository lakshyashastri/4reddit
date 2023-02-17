import {getModelCon} from "../config/connections.js";
import {sendMail} from "../helpers.js";

const handleBanned = async data => {
    const [client, Boardits] = await getModelCon("boardits");

    for (let post of data) {
        let boardit = await Boardits.find({name: post.postedIn});

        for (let keyword of boardit[0].bannedKeywords) {
            post.text = post.text.replace(
                new RegExp(keyword, "gi"),
                "*".repeat(keyword.length)
            );
            post.title = post.title.replace(
                new RegExp(keyword, "gi"),
                "*".repeat(keyword.length)
            );
        }
    }
    return data;
};

const handleBlocked = async data => {
    if (!data[0]) {
        return data;
    }

    const [client, Boardits] = await getModelCon("boardits");
    const boardit = await Boardits.find({name: data[0].postedIn});

    for (let post of data) {
        post.postedBy = boardit[0].blockedUsers.includes(post.postedBy)
            ? "BLOCKED_USER"
            : post.postedBy;
    }
    return data;
};

const postController = {
    getAll: async (req, res) => {
        const [client, Posts] = await getModelCon("posts");
        let data = await Posts.find();
        data = await handleBanned(data);
        res.send(data);
    },
    getOne: async (req, res) => {
        const [client, Posts] = await getModelCon("posts");
        let data = await Posts.find({id: req.params.postID});
        data = await handleBanned(data);
        res.send(data);
    },
    getUserPosts: async (req, res) => {
        const [client, Posts] = await getModelCon("posts");
        let data = await Posts.find({postedBy: req.params.username});
        data = await handleBanned(data);
        res.send(data);
    },
    getBoarditPosts: async (req, res) => {
        const [client, Posts] = await getModelCon("posts");
        let data = await Posts.find({postedIn: req.params.boardit});
        data = await handleBanned(data);
        data = await handleBlocked(data);
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
    },
    delete: async (req, res) => {
        const [client, Posts] = await getModelCon("posts");
        await Posts.deleteOne({id: req.params.postID});

        const [reportsClient, Reports] = await getModelCon("reports");
        await Reports.deleteOne({reportedPost: req.params.postID});

        const [boarditsClient, Boardits] = await getModelCon("boardits");
        await Boardits.updateOne(
            {name: req.body.boarditName},
            {$pull: {posts: req.params.postID}}
        );

        const [usersClient, Users] = await getModelCon("users");
        let reporter = await Users.find({username: req.body.reportedBy});
        await sendMail(
            reporter[0].email,
            "The post you reported has been deleted"
        );
        let reportee = await Users.find({username: req.body.reportedUser});
        await sendMail(
            reportee[0].email,
            "Your post has been deleted due to a report"
        );
        await res.sendStatus(200);
    }
};

export default postController;
