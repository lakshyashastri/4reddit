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
    }
};

export default postController;
