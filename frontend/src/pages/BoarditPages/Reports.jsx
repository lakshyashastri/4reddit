import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import AddIcon from "@mui/icons-material/Add";

import FourBar from "../../components/FourBar";
import {getFrom} from "../../helpers";
import Loading from "../../components/Loading";

function ReportedPosts(props) {
    const [expanded, setExpanded] = useState(false);
    const [postData, setPostData] = useState(null);

    useEffect(() => {
        (async () => {
            let data;
            let _postData = {};
            for (let report of props.reports) {
                data = await getFrom(`/posts/${report.reportedPost}`);
                _postData[report.id] = data[0];
            }
            setPostData(_postData);
        })();
    }, []);

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleIgnore = async (reportID, reportAction) => {
        await getFrom(
            `/reports/${reportID}/action/${
                reportAction == "ignore" ? "none" : "ignore"
            }`
        );
        window.location.reload();
    };

    const reports = Object.assign([], props.reports);

    return postData ? (
        props.reports.length == 0 ? (
            <Grid
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{minHeight: "10vh"}}
                container
            >
                <Grid item>
                    <Typography variant="h3" align="center">
                        No reports
                    </Typography>
                </Grid>
            </Grid>
        ) : (
            reports.map(report => {
                return (
                    <Accordion
                        expanded={expanded === report.id}
                        onChange={handleChange(report.id)}
                        sx={{
                            maxWidth: 1500,
                            minWidth: 1200
                        }}
                        key={report.id}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography
                                sx={{
                                    color: "text.secondary",
                                    width: "76%"
                                }}
                            >
                                {postData[report.id].title}: Reported by u/
                                {report.reportedBy}
                            </Typography>
                            <Typography
                                sx={{
                                    color: "text.secondary",
                                    flexShrink: 0
                                }}
                            >
                                {`Posted by ${
                                    postData[report.id].postedBy
                                } on `}
                                {postData[report.id].createdAt
                                    .split("T")[0]
                                    .split("-")
                                    .reverse()
                                    .join("-")}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="h4" gutterBottom>
                                Report reason
                            </Typography>
                            <Typography>{report.content}</Typography>
                            <Divider sx={{marginTop: 3, marginBottom: 3}} />
                            <Typography variant="h4" gutterBottom>
                                Post content
                            </Typography>
                            <Typography>{postData[report.id].text}</Typography>
                            <Grid
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-evenly"
                                }}
                                spacing={1}
                                container
                            >
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        style={{marginTop: 20}}
                                        disabled={report.action == "ignore"}
                                    >
                                        Block user
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        style={{marginTop: 20}}
                                        disabled={report.action == "ignore"}
                                    >
                                        Delete post
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="info"
                                        style={{marginTop: 20}}
                                        onClick={() =>
                                            handleIgnore(
                                                report.id,
                                                report.action
                                            )
                                        }
                                    >
                                        {report.action == "ignore"
                                            ? "Unignore"
                                            : "Ignore"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                );
            })
        )
    ) : (
        <Loading />
    );
}

export default function ReportsPage(props) {
    const [reports, setReports] = useState(null);
    const {boarditName} = useParams();

    useEffect(() => {
        (async () => {
            let data = await getFrom(`/reports/boardit/${boarditName}`);
            setReports(data);
        })();
    }, []);

    return reports ? (
        <React.Fragment>
            <FourBar />
            <Grid
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{minHeight: "50vh"}}
                container
            >
                <Grid item>
                    <Typography align="center" variant="h2">
                        Reports
                    </Typography>
                    <Typography align="center" variant="h4" gutterBottom>
                        in r/{boarditName}
                    </Typography>
                </Grid>
                <Grid item>
                    <ReportedPosts reports={reports} />
                </Grid>
            </Grid>
        </React.Fragment>
    ) : (
        <Loading />
    );
}
