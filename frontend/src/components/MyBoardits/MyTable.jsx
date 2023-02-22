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
import Button from "@mui/material/Button";

import Fuse from "fuse.js";

import {getFrom} from "../../helpers";
import Loading from "../Loading";
import ConfirmationDialog from "../Confirmation";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

function Row(props) {
    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const navigate = useNavigate();

    const handleDelete = async () => {
        if (deleted) {
            return;
        }

        let res = await getFrom(`/boardits/${props.name.slice(2)}/delete`);
        if (res.deletedCount == 1) {
            setDeleted(true);
            setTimeout(() => window.location.reload(), 1200);
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
                    prop !== "description" &&
                    prop !== "tags" &&
                    prop !== "index" &&
                    prop !== "createdAt" &&
                    prop !== "createdBy" &&
                    prop !== "bannedKeywords" ? (
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
                                        <span>{props[prop]}</span>
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
                            <Box sx={{margin: 1}} maxWidth={700}>
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
                                <Button
                                    variant="contained"
                                    sx={{marginBottom: 2, marginTop: 2}}
                                    onClick={() => navigate("/" + props.name)}
                                >
                                    <Box mt={0.8} mr={1}>
                                        <OpenInNewIcon />
                                    </Box>
                                    Open
                                </Button>
                                <Button
                                    color={deleted ? "success" : "error"}
                                    variant="contained"
                                    sx={{marginBottom: 2}}
                                    onClick={() => setDeleteOpen(true)}
                                >
                                    <Box mt={0.8} mr={1}>
                                        {deleted ? (
                                            <DoneOutlineIcon />
                                        ) : (
                                            <DeleteIcon />
                                        )}
                                    </Box>
                                    {deleted ? "Boardit deleted!" : "Delete"}
                                </Button>
                                <ConfirmationDialog
                                    title={`Delete ${props.name}?`}
                                    description="Are you sure you want to delete this Boardit?"
                                    open={deleteOpen}
                                    setOpen={setDeleteOpen}
                                    action={handleDelete}
                                />
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

export default function MyBoarditsTable(props) {
    const [tableData, setTableData] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        (async () => {
            let data = await getFrom(
                `/users/${localStorage.getItem("username")}/boardits`
            );
            console.log(data);

            setTimeout(() => setTableData(data), 500);
        })();
    }, []);

    const headings = ["S. No.", "Boardit name", "Posts", "Followers"];

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
                    createdAt={parsedRowData.createdAt}
                    bannedKeywords={parsedRowData.bannedKeywords}
                />
            );
        }
        return rows;
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
