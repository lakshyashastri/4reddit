import {getModelCon} from "../config/connections.js";
import {getID, sendMail} from "../helpers.js";
import moment from "moment";
import jwt from "jsonwebtoken";

const handleBlocked = data => {
    // temp: sometimes data[0] is undefined: fix later
    if (!data[0]) {
        return data;
    }

    data[0].followers = data[0].followers.map(follower =>
        data[0].blockedUsers.includes(follower) ? "BLOCKED_USER" : follower
    );
    return data;
};

// ensures there are stats objects for each day every day including today
const handleStats = async boarditName => {
    const [client, Boardits] = await getModelCon("boardits");
    let boarditStats = await Boardits.find({name: boarditName}, "stats").lean();
    boarditStats = boarditStats[0].stats;

    let dateNow = moment().format("DD/MM/YYYY");
    if (!boarditStats[dateNow]) {
        boarditStats[dateNow] = {
            visits: [],
            posts: 0,
            membersJoined: 0
        };
    }

    await Boardits.updateOne(
        {name: boarditName},
        {$set: {stats: boarditStats}}
    );

    return dateNow;
};

const boarditController = {
    getAll: async (req, res) => {
        const [client, Boardits] = await getModelCon("boardits");
        let data = await Boardits.find();
        data = handleBlocked(data);
        res.send(data);
    },
    getOne: async (req, res) => {
        const [client, Boardits] = await getModelCon("boardits");
        let data = await Boardits.find({name: req.params.boarditName});
        data = handleBlocked(data);
        res.send(data);
    },
    createBoardit: async (req, res) => {
        const [client, Boardits] = await getModelCon("boardits");

        let data = await Boardits.find({name: req.body.name});
        if (data.length != 0) {
            res.sendStatus(409);
            return;
        }

        let newBoardit = new Boardits({
            name: req.body.name.replace(/\s/g, "_"),
            description: req.body.description,
            tags: req.body.tags.split(", "),
            bannedKeywords: req.body.bannedKeywords.split(", "),
            posts: [],
            mods: [req.body.createdBy],
            createdBy: req.body.createdBy,
            blockedUsers: [],
            pendingRequests: [],
            left: [],
            followers: [req.body.createdBy],
            reportedPosts: 0,
            deletedPosts: 0,
            stats: {}
        });
        await newBoardit.save();

        res.sendStatus(200);
    },
    createPost: async (req, res) => {
        const dateNow = await handleStats(req.params.boarditName);
        const [client, Boardits] = await getModelCon("boardits");

        let boardit = await Boardits.find({name: req.params.boarditName});
        if (boardit.length == 0) {
            res.send({message: "No such boardit exists"});
            return;
        }
        boardit = boardit[0];

        const [postClient, Posts] = await getModelCon("posts");

        // get unique post ID
        let postID = getID();
        let match = await Posts.find({id: postID});
        while (match.length != 0) {
            postID = getID();
            match = await Posts.find({id: postID});
        }

        let newPost = new Posts({
            id: postID,
            title: req.body.title,
            text: req.body.text,
            postedBy: req.body.postedBy,
            postedIn: boardit.name,
            upvotes: 0,
            downvotes: 0,
            comments: []
        });
        await newPost.save();

        await Boardits.updateOne(
            {name: boardit.name},
            {$push: {posts: postID}}
        );

        let stats = await Boardits.find(
            {name: req.params.boarditName},
            "stats"
        );
        stats = stats[0].stats;

        stats[dateNow].posts += 1;

        await Boardits.updateOne(
            {name: req.params.boarditName},
            {$set: {stats}}
        );

        res.send(postID);
    },
    deleteBoardit: async (req, res) => {
        const [client, Boardits] = await getModelCon("boardits");
        let data = await Boardits.deleteOne({name: req.params.boarditName});

        const [postClient, Posts] = await getModelCon("posts");
        await Posts.deleteMany({postedIn: req.params.boarditName});

        res.send(data);
    },
    joinUser: async (req, res) => {
        const dateNow = await handleStats(req.params.boarditName);
        const [client, Boardits] = await getModelCon("boardits");

        let data = await Boardits.findOne({
            name: req.params.boarditName,
            pendingRequests: {$in: [req.params.username]}
        });

        if (data != null) {
            res.sendStatus(409); // request already sent, pending
            return;
        }

        await Boardits.updateOne(
            {name: req.params.boarditName},
            {$push: {pendingRequests: req.params.username}}
        );

        let stats = await Boardits.find(
            {name: req.params.boarditName},
            "stats"
        );
        stats = stats[0].stats;

        stats[dateNow].membersJoined += 1;

        await Boardits.updateOne(
            {name: req.params.boarditName},
            {$set: {stats}}
        );

        res.sendStatus(200);
    },
    acceptUser: async (req, res) => {
        const [client, Boardits] = await getModelCon("boardits");
        let mods = await Boardits.find({name: req.params.boarditName}, "mods");
        mods = mods[0].mods;
        if (!mods.includes(jwt.decode(req.token).username)) {
            return res.sendStatus(403);
        }

        let reqPending = await Boardits.findOne({
            name: req.params.boarditName,
            pendingRequests: {$in: [req.params.username]}
        });

        if (reqPending == null) {
            res.sendStatus(404);
            return;
        }

        await Boardits.updateOne(
            {name: req.params.boarditName},
            {$pull: {pendingRequests: req.params.username}}
        );
        await Boardits.updateOne(
            {name: req.params.boarditName},
            {$push: {followers: req.params.username}}
        );

        res.sendStatus(200);
    },
    rejectUser: async (req, res) => {
        const [client, Boardits] = await getModelCon("boardits");
        let mods = await Boardits.find({name: req.params.boarditName}, "mods");
        mods = mods[0].mods;
        if (!mods.includes(jwt.decode(req.token).username)) {
            return res.sendStatus(403);
        }

        let reqPending = await Boardits.findOne({
            name: req.params.boarditName,
            pendingRequests: {$in: [req.params.username]}
        });

        if (reqPending == null) {
            res.sendStatus(404);
            return;
        }

        await Boardits.updateOne(
            {name: req.params.boarditName},
            {$pull: {pendingRequests: req.params.username}}
        );

        res.sendStatus(200);
    },
    leaveUser: async (req, res) => {
        const [client, Boardits] = await getModelCon("boardits");

        let data = await Boardits.findOne({
            name: req.params.boarditName,
            followers: {$in: [req.params.username]}
        });

        if (data == null) {
            res.sendStatus(404); // not a member
            return;
        }

        await Boardits.updateOne(
            {name: req.params.boarditName},
            {$pull: {followers: req.params.username}}
        );

        await Boardits.updateOne(
            {name: req.params.boarditName},
            {$push: {left: req.params.username}}
        );

        res.sendStatus(200);
    },
    prop: async (req, res) => {
        const [client, Boardits] = await getModelCon("boardits");
        let data = await Boardits.find(
            {name: req.params.boarditName},
            req.params.prop
        );

        if (req.params.prop == "followers") {
            let blockedUsers = await Boardits.find(
                {name: req.params.boarditName},
                "blockedUsers"
            );
            data[0].followers = data[0].followers.map(follower =>
                blockedUsers[0].blockedUsers.includes(follower)
                    ? "BLOCKED_USER"
                    : follower
            );
        } else if (req.params.prop == "pendingRequests" && data.length) {
            const [client, Users] = await getModelCon("users");
            data = await Users.find({username: {$in: data[0].pendingRequests}});
        } else if (req.params.prop == "stats") {
            const sortedStats = {};
            Object.keys(data[0].stats)
                .sort((a, b) =>
                    moment(a, "DD/MM/YYYY").diff(moment(b, "DD/MM/YYYY"))
                )
                .forEach(key => {
                    if (/^\d{2}\/\d{2}\/\d{4}$/.test(key)) {
                        // some hidden bullshit gets added to keys because of .find() (could use .lean() for this instead)
                        sortedStats[key] = data[0].stats[key];
                    }
                });
            data = Object.assign({}, sortedStats);
        }

        res.send(data);
    },
    block: async (req, res) => {
        const [client, Boardits] = await getModelCon("boardits");
        let mods = await Boardits.find({name: req.params.boarditName}, "mods");
        mods = mods[0].mods;
        if (!mods.includes(jwt.decode(req.token).username)) {
            return res.sendStatus(403);
        }

        await Boardits.updateOne(
            {name: req.params.boarditName},
            {$push: {blockedUsers: req.body.user}}
        );

        const [userClient, Users] = await getModelCon("users");
        let reporter = await Users.find({username: req.body.reportedBy});
        await sendMail(
            reporter[0].email,
            `A user you reported (u/${req.body.user}) has been blocked`
        );
        let reportee = await Users.find({username: req.body.user});
        await sendMail(
            reportee[0].email,
            `You have been blocked from r/${req.body.blockBoard}`
        );

        res.sendStatus(200);
    },
    noblock: async (req, res) => {
        const [client, Boardits] = await getModelCon("boardits");
        let data = await Boardits.find({name: req.params.boarditName});
        res.send(data);
    },
    visit: async (req, res) => {
        const dateNow = await handleStats(req.params.boarditName);
        const [client, Boardits] = await getModelCon("boardits");

        let stats = await Boardits.find(
            {name: req.params.boarditName},
            "stats"
        );
        stats = stats[0].stats;

        if (!stats[dateNow].visits.includes(jwt.decode(req.token).username)) {
            stats[dateNow].visits.push(jwt.decode(req.token).username);
        }

        await Boardits.updateOne(
            {name: req.params.boarditName},
            {$set: {stats}}
        );
        res.sendStatus(200);
    },
    temp: async (req, res) => {
        const [client, Boardits] = await getModelCon("boardits");
        let stats = await Boardits.find(
            {name: req.params.boarditName},
            "stats"
        );
        stats = stats[0].stats;
        console.log(stats);
        res.send(stats);
    }
};

export default boarditController;
