import {getModelCon} from "../config/connections.js";
import {getID} from "../helpers.js";

const ACTION_DEFAULT = "none";

const reportController = {
    getAll: async (req, res) => {
        const [client, Reports] = await getModelCon("reports");
        let data = await Reports.find();
        res.send(data);
    },
    getOne: async (req, res) => {
        const [client, Reports] = await getModelCon("reports");
        let data = await Reports.find({id: req.params.reportID});
        res.send(data);
    },
    createReport: async (req, res) => {
        const [client, Reports] = await getModelCon("reports");

        // get unique report ID
        let reportID = getID(4);
        let match = await Reports.find({id: reportID});
        while (match.length != 0) {
            reportID = getID(4);
            match = await Reports.find({id: reportID});
        }

        let newReport = new Reports({
            id: reportID,
            reportedBy: req.body.reportedBy,
            reportedUser: req.body.reportedUser,
            reportedPost: req.body.reportedPost,
            reportedIn: req.body.reportedIn,
            content: req.body.content,
            action: ACTION_DEFAULT
        });
        await newReport.save();

        res.sendStatus(200);
    },
    postReports: async (req, res) => {
        const [client, Reports] = await getModelCon("reports");
        let data = await Reports.find({reportedPost: req.params.postID});
        res.send(data);
    },
    boarditReports: async (req, res) => {
        const [client, Reports] = await getModelCon("reports");
        let data = await Reports.find({reportedIn: req.params.boarditName});
        res.send(data);
    },
    action: async (req, res) => {
        const [client, Reports] = await getModelCon("reports");
        if (!["ignore", "block", ACTION_DEFAULT].includes(req.params.action)) {
            res.sendStatus(405);
            return;
        }

        await Reports.updateOne(
            {id: req.params.reportID},
            {action: req.params.action}
        );
        res.sendStatus(200);
    }
};

export default reportController;
