import {getModelCon} from "../config/connections.js";

const userController = {
    getAll: async (req, res) => {
        const [client, Users] = await getModelCon("users");
        let data = await Users.find();
        res.send(data);
    },
    getOne: async (req, res) => {
        const [client, Users] = await getModelCon("users");
        const foundUser = await Users.find({username: req.params.username});
        res.send(foundUser);
    },
    create: async (req, res) => {
        const [client, Users] = await getModelCon("users");
        if (Object.keys(req.body).length == 0) {
            console.log("Empty request body");
            return;
        }

        let newUser = new Users({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            number: req.body.number,
            dob: req.body.dob,
            followers: [],
            following: [],
            savedPosts: []
        });
        await newUser.save();

        res.sendStatus(200);
    },
    getBoards: async (req, res) => {
        const [client, Boardits] = await getModelCon("boardits");
        let data = await Boardits.find({followers: req.params.username});
        res.send(data);
    },
    saved: async (req, res) => {
        const [client, Users] = await getModelCon("users");
        const [postClient, Posts] = await getModelCon("posts");

        let userData = await Users.find({username: req.params.username});
        let saved = userData[0].savedPosts;

        let data = await Posts.find({id: {$in: saved}});
        res.send(data);
    }
};

export default userController;
