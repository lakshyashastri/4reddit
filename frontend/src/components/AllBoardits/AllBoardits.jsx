import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Zoom from "@mui/material/Zoom";
import Tooltip from "@mui/material/Tooltip";
import InputBase from "@mui/material/InputBase";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";

import Fuse from "fuse.js";

import Loading from "../Loading";
import ConfirmationDialog from "../Confirmation";
import {getFrom} from "../../helpers";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SearchIcon from "@mui/icons-material/Search";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LoginIcon from "@mui/icons-material/Login";

function Row(props) {
    const [open, setOpen] = useState(false);
    const [left, setLeft] = useState(false);
    const [joined, setJoined] = useState(false);
    const [joinSentAlready, setJoinSentAlready] = useState(false);
    // const [notMember, setNotMember] = useState(false);

    const navigate = useNavigate();

    const handleVisit = boardit => {
        navigate(`/r/${props.name.slice(2)}`);
    };

    const handleLeave = async () => {
        if (left) {
            return;
        }

        let res = await getFrom(
            `/boardits/${props.name.slice(2)}/leave/${JSON.parse(
                window.localStorage.getItem("username")
            )}`
        );

        if (res.ok) {
            setLeft(true);
            setTimeout(() => window.location.reload(), 800);
        }
        // } else if (res.status == 404) {
        //     setNotMember(true);
        // }
    };

    const handleJoin = async () => {
        if (joined) {
            return;
        }

        let res = await getFrom(
            `/boardits/${props.name.slice(2)}/join/${JSON.parse(
                window.localStorage.getItem("username")
            )}`
        );

        if (res.ok) {
            setJoined(true);
            setTimeout(() => window.location.reload(), 800);
        } else if (res.status == 409) {
            setJoinSentAlready(true);
        }
    };

    return (
        <React.Fragment>
            <TableRow sx={{"& > *": {borderBottom: "unset"}}}>
                <TableCell align="center">
                    <IconButton onClick={() => setOpen(!open)}>
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                    {props.index + 1}
                </TableCell>
                {Object.keys(props).map(prop =>
                    ![
                        "description",
                        "tags",
                        "index",
                        "createdAt",
                        "bannedKeywords"
                    ].includes(prop) ? (
                        <TableCell align="center">
                            <Typography variant="subtitle1">
                                {prop !== "name" ? (
                                    props[prop]
                                ) : (
                                    <Tooltip
                                        title={"Created at " + props.createdAt}
                                        TransitionComponent={Zoom}
                                        arrow
                                    >
                                        <Grid
                                            container
                                            // spacing={1}
                                            display="flex"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Button
                                                    variant="text"
                                                    sx={{
                                                        textTransform:
                                                            "lowercase",
                                                        fontSize: 16
                                                    }}
                                                    onClick={() =>
                                                        handleVisit(
                                                            props.name.slice(2)
                                                        )
                                                    }
                                                >
                                                    {props[prop]}
                                                </Button>
                                            </Grid>

                                            {props.joined ? (
                                                <Grid item marginTop={0.6}>
                                                    <Chip
                                                        label="Joined"
                                                        color="primary"
                                                        size="small"
                                                    />
                                                </Grid>
                                            ) : null}
                                        </Grid>
                                    </Tooltip>
                                )}
                            </Typography>
                        </TableCell>
                    ) : null
                )}
            </TableRow>
            <TableRow>
                <TableCell
                    style={{paddingBottom: 0, paddingTop: 0}}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Grid display="flex" justifyContent="space-between">
                            <Box sx={{margin: 1}}>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    component="div"
                                >
                                    Description
                                </Typography>
                                <Typography
                                    color="text.primary"
                                    gutterBottom
                                    component="div"
                                >
                                    {props.description}
                                </Typography>
                                {props.tags[0] != "" ? (
                                    <React.Fragment>
                                        <Typography
                                            variant="h6"
                                            gutterBottom
                                            component="div"
                                        >
                                            Tags
                                        </Typography>
                                        <Typography
                                            color="text.primary"
                                            gutterBottom
                                            component="div"
                                        >
                                            {props.tags.join(", ")}
                                        </Typography>
                                    </React.Fragment>
                                ) : null}
                                {props.bannedKeywords[0] != "" ? (
                                    <React.Fragment>
                                        <Typography
                                            variant="h6"
                                            gutterBottom
                                            component="div"
                                        >
                                            Banned keywords
                                        </Typography>
                                        <Typography
                                            color="text.primary"
                                            gutterBottom
                                            component="div"
                                        >
                                            {props.bannedKeywords.join(", ")}
                                        </Typography>
                                    </React.Fragment>
                                ) : null}
                            </Box>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignContent="center"
                                justifyContent="center"
                                margin="auto"
                            >
                                {props.joined || props.left ? (
                                    <Button
                                        color={left ? "success" : "error"}
                                        variant="contained"
                                        sx={{margin: 2}}
                                        onClick={handleLeave}
                                        disabled={props.isMod || props.left}
                                    >
                                        <Box mt={0.8} mr={1}>
                                            {left ? (
                                                <DoneOutlineIcon />
                                            ) : (
                                                <ExitToAppIcon />
                                            )}
                                        </Box>
                                        {props.left
                                            ? "You cannot send a join request again"
                                            : left
                                            ? "Boardit unfollowed!"
                                            : `Leave ${props.name.slice(2)}`}
                                    </Button>
                                ) : (
                                    <Button
                                        color={joined ? "success" : "primary"}
                                        variant="contained"
                                        sx={{margin: 2}}
                                        onClick={handleJoin}
                                        disabled={
                                            props.isMod ||
                                            joinSentAlready ||
                                            props.reqPending
                                        }
                                    >
                                        <Box mt={0.8} mr={1}>
                                            {left ? (
                                                <DoneOutlineIcon />
                                            ) : (
                                                <LoginIcon />
                                            )}
                                        </Box>
                                        {props.reqPending ||
                                        joinSentAlready ||
                                        joined
                                            ? "Request already pending"
                                            : left
                                            ? "Join request sent!"
                                            : `Join ${props.name.slice(2)}`}
                                    </Button>
                                )}
                            </Box>
                        </Grid>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function SearchBox(props) {
    return (
        <Grid
            sx={{
                m: 1,
                mr: 0,
                display: "flex",
                justifyContent: "right"
            }}
            contianer
        >
            <Grid item>
                <InputBase
                    placeholder="Filter by name"
                    // value={searchTerm}
                    onChange={event => props.changeFunc(event.target.value)}
                    sx={{
                        backgroundColor: "white",
                        paddingLeft: 1,
                        paddingTop: 0.5,
                        paddingBottom: 0.5,
                        paddingRight: 5
                    }}
                />
            </Grid>
        </Grid>
    );
}

export default function AllBoarditsTable(props) {
    const [tableData, setTableData] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        (async () => {
            let res = await fetch("http://localhost:3001/4reddit/api/boardits");
            let data = await res.json();

            setTimeout(() => setTableData(data), 500);
        })();
    }, []);

    const headings = ["S. No.", "Boardit name", "Posts", "Followers", "Owner"];

    const getRows = () => {
        const options = {
            includeScore: true,
            keys: ["name"]
        };

        const fuse = new Fuse(tableData, options);
        const filtered = fuse.search(searchTerm);

        let finalData;
        if (searchTerm == "") {
            finalData = tableData;
        } else {
            finalData = filtered;
        }

        let rows = [];
        let username = JSON.parse(localStorage.getItem("username"));
        for (let [index, rowData] of finalData.entries()) {
            let parsedRowData = rowData.item ? rowData.item : rowData;

            rows.push(
                <Row
                    key={index}
                    index={index}
                    name={"r/" + parsedRowData.name}
                    numPosts={parsedRowData.posts.length}
                    numFollowers={parsedRowData.followers.length}
                    description={parsedRowData.description}
                    tags={parsedRowData.tags}
                    bannedKeywords={parsedRowData.bannedKeywords}
                    createdAt={parsedRowData.createdAt}
                    createdBy={parsedRowData.createdBy}
                    joined={parsedRowData.followers.includes(username)}
                    reqPending={parsedRowData.pendingRequests.includes(
                        username
                    )}
                    left={parsedRowData.left.includes(username)}
                    isMod={parsedRowData.mods.includes(username)}
                />
            );
        }

        return rows
            .sort((a, b) => b.props.joined - a.props.joined)
            .map((element, index) => React.cloneElement(element, {index}));
    };

    return tableData ? (
        <React.Fragment>
            <SearchBox changeFunc={setSearchTerm} />
            <TableContainer component={Paper}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {headings.map(heading => (
                                <TableCell align="center" key={heading}>
                                    <Typography variant="h5">
                                        {heading}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>{getRows()}</TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    ) : (
        <Loading />
    );
}
