import {getModelCon} from "../config/connections.js";
import {getID} from "../helpers.js";

const commentController = {
    createComment: async (req, res) => {
        const [client, Comments] = await getModelCon("comments");
        const [postClient, Posts] = await getModelCon("posts");

        // get unique comment ID
        let commentID = getID(4);
        let match = await Comments.find({id: commentID});
        while (match.length != 0) {
            commentID = getID(4);
            match = await Comments.find({id: commentID});
        }

        await Posts.updateOne(
            {id: req.body.postID},
            {$push: {comments: commentID}}
        );

        // get comment boardit

        let newComment = new Comments({
            id: commentID,
            children: [],
            text: req.body.text,
            postedBy: req.body.postedBy,
            postID: req.body.postID
        });
        await newComment.save();

        res.sendStatus(200);
    },
    getAll: async (req, res) => {
        const [client, Comments] = await getModelCon("comments");
        let data = await Comments.find();
        res.send(data);
    },
    getOne: async (req, res) => {
        const [client, Comments] = await getModelCon("comments");
        let data = await Comments.find({id: req.params.commentID});
        res.send(data);
    },
    getPostComments: async (req, res) => {
        const [client, Comments] = await getModelCon("comments");
        let data = await Comments.find({postID: req.params.postID});
        res.send(data);
    }
};

export default commentController;
