import {getModelCon} from "../config/connections.js";
import {getID} from "../helpers.js";

const reportController = {
    getAll: async (req, res) => {
        const [client, Reports] = await getModelCon("reports");
        let data = await Reports.find();
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
            content: req.body.content
        });
        await newReport.save();

        res.sendStatus(200);
    }
};

export default reportController;
