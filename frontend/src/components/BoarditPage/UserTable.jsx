import React, {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
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
import Loading from "../../components/Loading";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

function Row(props) {
    return (
        <React.Fragment>
            <TableRow sx={{"& > *": {borderBottom: "unset"}}}>
                <TableCell align="center">{props.index + 1}</TableCell>
                <TableCell align="center">{props.name}</TableCell>
                <TableCell align="center">{props.blocked}</TableCell>
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

export default function UserTable(props) {
    const [tableData, setTableData] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        (async () => {
            let data = await getFrom(`/boardits/${props.boarditName}/noblock`);

            let newData = {};
            for (let follower of data[0].followers) {
                if (!data[0].blockedUsers.includes(follower)) {
                    newData[follower] = 0;
                } else {
                    newData[follower] = 1;
                }
            }

            setTimeout(() => setTableData(newData), 500);
        })();
    }, []);

    const headings = ["S. No.", "Username", "Blocked"];

    const getRows = () => {
        const options = {
            includeScore: true
        };

        const fuse = new Fuse(Object.keys(tableData), options);
        const filtered = fuse.search(searchTerm);

        let finalData;
        if (searchTerm == "") {
            finalData = tableData;
        } else {
            finalData = filtered;
        }

        let rows = [];
        console.log(tableData);
        for (let [index, rowData] of !Array.isArray(finalData)
            ? Object.keys(finalData).entries()
            : finalData.entries()) {
            let name = rowData.item ? rowData.item : rowData;

            rows.push(
                <Row
                    key={index}
                    index={index}
                    name={"u/" + name}
                    blocked={tableData[name] ? "Blocked" : "Not blocked"}
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
