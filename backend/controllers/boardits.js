import {getModelCon} from "../config/connections.js";

const boarditController = {
    getAll: async (req, res) => {
        const [client, Boardits] = await getModelCon("boardits");
        let data = await Boardits.find();
        res.send(data);
    },
    create: async (req, res) => {
        const [client, Boardits] = await getModelCon("boardits");

        let newBoardit = new Boardits({
            name: req.body.name,
            description: req.body.description,
            tags: req.body.tags,
            bannedKeywords: req.body.bannedKeywords,
            posts: req.body.posts,
            followers: req.body.followers,
            createdAt: req.body.createdAt,
            createdBy: req.body.createdBy
        });
        await newBoardit.save();

        res.sendStatus(200);
    }
};

export default boarditController;
