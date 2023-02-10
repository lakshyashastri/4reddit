import React, {useState, useEffect} from "react";
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

import Fuse from "fuse.js";

import Loading from "../Loading";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SearchIcon from "@mui/icons-material/Search";

function Row(props) {
    const [open, setOpen] = useState(false);

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
                    prop !== "createdAt" ? (
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
                        </Box>
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
                    createdBy={parsedRowData.createdBy}
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
