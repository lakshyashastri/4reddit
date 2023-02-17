import {getModelCon} from "../config/connections.js";
import {getID, sendMail} from "../helpers.js";
import moment from "moment";

const ACTION_DEFAULT = "none";
const REPORT_EXPIRY = 240; // unit = REPORT_EXPIRY_UNIT
const REPORT_EXPIRY_UNIT = "hours";

async function getReportCon() {
    const [client, Reports] = await getModelCon("reports");
    let reports = await Reports.find();

    let toRemove = [];
    for (let report of reports) {
        let createdAt = moment(report.createdAt);
        if (moment().diff(createdAt, REPORT_EXPIRY_UNIT) > REPORT_EXPIRY) {
            toRemove.push(report.id);
        }
    }

    await Reports.deleteMany({id: {$in: toRemove}});

    return [client, Reports];
}

const reportController = {
    getAll: async (req, res) => {
        const [client, Reports] = await getReportCon();
        let data = await Reports.find();
        res.send(data);
    },
    getOne: async (req, res) => {
        const [client, Reports] = await getReportCon();
        let data = await Reports.find({id: req.params.reportID});
        res.send(data);
    },
    createReport: async (req, res) => {
        const [client, Reports] = await getReportCon();

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
        const [client, Reports] = await getReportCon();
        let data = await Reports.find({reportedPost: req.params.postID});
        res.send(data);
    },
    boarditReports: async (req, res) => {
        const [client, Reports] = await getReportCon();
        let data = await Reports.find({reportedIn: req.params.boarditName});
        res.send(data);
    },
    action: async (req, res) => {
        const [client, Reports] = await getReportCon();
        if (!["ignore", "block", ACTION_DEFAULT].includes(req.params.action)) {
            res.sendStatus(405);
            return;
        }

        const [userClient, Users] = await getModelCon("users");
        let user = await Users.find({username: req.body.reportedBy});
        await sendMail(
            user[0].email,
            `The post you reported has been ${
                req.params.action == "ignore" ? "ignored" : "unignored"
            }`
        );

        await Reports.updateOne(
            {id: req.params.reportID},
            {action: req.params.action}
        );
        res.sendStatus(200);
    }
};

export default reportController;
