import {getModelCon} from "../config/connections.js";
import {getID} from "../helpers.js";

const boarditController = {
    getAll: async (req, res) => {
        const [client, Boardits] = await getModelCon("boardits");
        let data = await Boardits.find();
        res.send(data);
    },
    getOne: async (req, res) => {
        const [client, Boardits] = await getModelCon("boardits");
        let data = await Boardits.find({name: req.params.boarditName});
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
            createdBy: req.body.createdBy,
            blockedUsers: [],
            pendingRequests: [],
            followers: [req.body.createdBy]
        });
        await newBoardit.save();

        res.sendStatus(200);
    },
    createPost: async (req, res) => {
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
            text: req.body.text,
            postedBy: req.body.postedBy,
            postedIn: boardit.name,
            upvotes: 0,
            downvotes: 0
        });
        await newPost.save();

        await Boardits.updateOne(
            {name: boardit.name},
            {$push: {posts: postID}}
        );

        res.send(postID);
    },
    deleteBoardit: async (req, res) => {
        const [client, Boardits] = await getModelCon("boardits");
        let data = await Boardits.deleteOne({name: req.params.boarditName});
        res.send(data);
    }
};

export default boarditController;
