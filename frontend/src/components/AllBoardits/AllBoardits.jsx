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
import TextField from "@mui/material/TextField";

import PropTypes from "prop-types";
import {Autocomplete} from "@mui/material";

import Fuse from "fuse.js";
import moment from "moment";

import Loading from "../Loading";
import ConfirmationDialog from "../Confirmation";
import {getFrom, postTo} from "../../helpers";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SearchIcon from "@mui/icons-material/Search";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LoginIcon from "@mui/icons-material/Login";
import {spacing} from "@mui/system";

function Row(props) {
    const [open, setOpen] = useState(false);
    const [left, setLeft] = useState(false);
    const [joined, setJoined] = useState(false);
    const [joinSentAlready, setJoinSentAlready] = useState(false);
    // const [notMember, setNotMember] = useState(false);

    const navigate = useNavigate();

    const handleVisit = async boardit => {
        await postTo(`/boardits/${boardit}/visit`, {
            user: window.localStorage.getItem("username")
        });
        navigate(`/r/${props.name.slice(2)}`);
    };

    const handleLeave = async () => {
        if (left) {
            return;
        }

        let res = await getFrom(
            `/boardits/${props.name.slice(
                2
            )}/leave/${window.localStorage.getItem("username")}`
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
            `/boardits/${props.name.slice(
                2
            )}/join/${window.localStorage.getItem("username")}`
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
        <TextField
            placeholder="Filter by name"
            onChange={event => props.changeFunc(event.target.value)}
            sx={{
                paddingLeft: 1,
                paddingTop: 0.5,
                paddingBottom: 0.5,
                paddingRight: 5,
                "& input::placeholder": {
                    color: "white"
                },
                width: 300
            }}
        />
    );
}

function SortBox(props) {
    return (
        <Autocomplete
            multiple
            options={props.options}
            getOptionLabel={option => option.value}
            renderInput={params => (
                <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Sort by parameter"
                    sx={{
                        paddingLeft: 1,
                        paddingTop: 0.5,
                        paddingBottom: 0.5,
                        paddingRight: 5,
                        width: 500,
                        "& input::placeholder": {
                            color: "white"
                        }
                    }}
                />
            )}
            onChange={props.handleSelectionChange}
            value={props.selectedOptions}
        />
    );
}

function TagBox(props) {
    return (
        <Autocomplete
            multiple
            options={props.options}
            getOptionLabel={option => option.value}
            renderInput={params => (
                <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Sort by tags"
                    sx={{
                        paddingLeft: 1,
                        paddingTop: 0.5,
                        paddingBottom: 0.5,
                        paddingRight: 5,
                        width: 500,
                        "& input::placeholder": {
                            color: "white"
                        }
                    }}
                />
            )}
            onChange={props.handleTagChange}
            value={props.selectedFilters}
        />
    );
}

export default function AllBoarditsTable(props) {
    const [tableData, setTableData] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);

    useEffect(() => {
        (async () => {
            let res = await fetch(
                "http://localhost:3001/4reddit/api/boardits",
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            let data = await res.json();

            setTimeout(() => setTableData(data), 500);
        })();
    }, []);

    const handleSelectionChange = (event, newValue) => {
        setSelectedOptions(newValue);
    };
    const handleTagChange = (event, newValue) => {
        setSelectedFilters(newValue);
    };

    const headings = ["S. No.", "Boardit name", "Posts", "Followers", "Owner"];
    const sortOptions = [
        {value: "Name (Ascending)"},
        {value: "Name (Descending)"},
        {value: "Followers (Descending)"},
        {value: "Creation date (Descending)"}
    ];

    let tagOptions = [];
    if (tableData) {
        for (let boarditData of tableData) {
            for (let tag of boarditData.tags) {
                if (tag.length > 0) {
                    tagOptions.push({value: tag});
                }
            }
        }
    }

    const getRows = () => {
        // fuzzy search
        const fuzzyOptions = {
            includeScore: true,
            keys: ["name"]
        };

        const fuse = new Fuse(tableData, fuzzyOptions);
        const filtered = fuse.search(searchTerm);

        let _finalData;
        if (searchTerm == "") {
            _finalData = tableData;
        } else {
            _finalData = filtered;
        }

        // tag filter
        let finalData;
        if (selectedFilters.length) {
            finalData = [];
            for (let data of _finalData) {
                let boarditData = data.item ? data.item : data;

                let match = 0;
                for (let tag of boarditData.tags) {
                    if (!tag.length) {
                        continue;
                    }

                    console.log(tag, selectedFilters);
                    if (selectedFilters.some(filter => filter.value == tag)) {
                        match = 1;
                        break;
                    }
                }

                if (match) {
                    finalData.push(data);
                }
            }
        } else {
            finalData = _finalData;
        }

        // sorting
        for (let option of selectedOptions) {
            if (option.value == sortOptions[0].value) {
                finalData.sort((a, b) =>
                    a.item
                        ? a.item.name.localeCompare(b.item.name)
                        : a.name.localeCompare(b.name)
                );
            } else if (option.value == sortOptions[1].value) {
                finalData.sort((a, b) =>
                    b.item
                        ? b.item.name.localeCompare(a.item.name)
                        : b.name.localeCompare(a.name)
                );
            } else if (option.value == sortOptions[2].value) {
                finalData.sort((a, b) =>
                    b.item
                        ? b.item.followers.length - a.item.followers.length
                        : b.followers.length - a.followers.length
                );
            } else if (option.value == sortOptions[3].value) {
                finalData.sort((a, b) =>
                    a.item
                        ? moment(a.item.createdAt).diff(
                              moment(b.item.createdAt)
                          )
                        : moment(a.createdAt).diff(moment(b.createdAt))
                );
            }
        }

        // compute rows
        let rows = [];
        let username = localStorage.getItem("username");
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
            <Grid
                sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    m: 1
                }}
            >
                <Grid item>
                    <SearchBox changeFunc={setSearchTerm} />
                </Grid>
                <Grid item>
                    <SortBox
                        handleSelectionChange={handleSelectionChange}
                        selectedOptions={selectedOptions}
                        options={sortOptions}
                    />
                </Grid>
                <Grid item>
                    <TagBox
                        selectedFilters={selectedFilters}
                        handleTagChange={handleTagChange}
                        options={tagOptions}
                    />
                </Grid>
            </Grid>
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
