import React, {useState, useEffect} from "react";
import CircularProgress from "@mui/material/CircularProgress";
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

import Loading from "./Loading";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

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
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function AllBoarditsTable(props) {
    const [tableData, setTableData] = useState(null);

    useEffect(() => {
        (async () => {
            let res = await fetch("http://localhost:3001/4reddit/api/boardits");
            let data = await res.json();
            console.log(data);

            setInterval(() => setTableData(data), 500);
        })();
    }, []);

    const headings = ["S. No.", "Name", "Posts", "Followers"];

    let getRows = () => {
        let rows = [];
        for (let [index, rowData] of tableData.entries()) {
            rows.push(
                <Row
                    key={index}
                    index={index}
                    name={rowData.name}
                    numPosts={rowData.posts.length}
                    numFollowers={rowData.followers.length}
                    description={rowData.description}
                    tags={rowData.tags}
                    createdAt={rowData.createdAt}
                />
            );
        }
        return rows;
    };

    return tableData ? (
        <TableContainer component={Paper}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        {headings.map(heading => (
                            <TableCell align="center">
                                <Typography variant="h5">{heading}</Typography>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>{getRows()}</TableBody>
            </Table>
        </TableContainer>
    ) : (
        <Loading />
    );
}
