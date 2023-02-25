import React, {useState, useEffect} from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";

import jwt_decode from "jwt-decode";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import AddIcon from "@mui/icons-material/Add";

import {getFrom, postTo, modalStyling} from "../helpers";
import NewCommentModal from "./BoarditPage/NewCommentModal";
import ViewCommentsModal from "./BoarditPage/ViewCommentsModal";
import VoteButton from "./VoteButton";
import SavePost from "./SavePost";
import Loading from "./Loading";

function ReportButton(props) {
    const handleClick = event => {
        event.stopPropagation();
        props.modalFunc(props.postData);
    };

    return (
        <React.Fragment>
            <Button sx={{padding: 0}} onClick={handleClick}>
                <OutlinedFlagIcon />
            </Button>
        </React.Fragment>
    );
}

function ReportModal(props) {
    const [text, setText] = useState(null);
    const [posted, setPosted] = useState(null);

    const inputFieldProps = {
        style: {m: 0.5, input: {color: "rgb(51, 118, 204)"}},
        variant: "filled"
    };

    const handlePostClick = async () => {
        if (posted) {
            return;
        }

        await postTo("/reports", {
            reportedBy: jwt_decode(window.localStorage.getItem("token"))
                .username,
            reportedUser: props.postData.postedBy,
            reportedPost: props.postData.id,
            reportedIn: props.postData.postedIn,
            content: text
        });

        setPosted(true);
        setTimeout(() => window.location.reload(), 300);
    };

    return (
        <React.Fragment>
            <Typography variant="h2" sx={{m: 1}} align="center">
                Report post
            </Typography>
            <Grid marginTop={2} container>
                <TextField
                    {...inputFieldProps}
                    label="Reason for report"
                    multiline
                    rows={4}
                    fullWidth
                    onChange={event => setText(event.target.value)}
                    required
                />
            </Grid>
            <Grid
                marginTop={2}
                sx={{display: "flex", justifyContent: "center"}}
                container
            >
                <Button
                    variant="contained"
                    size="large"
                    type="submit"
                    color={posted ? "success" : "primary"}
                    sx={{mt: 1}}
                    onClick={handlePostClick}
                >
                    <Box marginRight={0.8} paddingTop={0.6}>
                        {posted ? <DoneOutlineIcon /> : <AddIcon />}
                    </Box>
                    {posted ? "Post reported!" : "Report"}
                </Button>
            </Grid>
            {posted ? (
                <Typography textAlign="center" mt={1} color="green">
                    Success!
                </Typography>
            ) : null}
        </React.Fragment>
    );
}

export default function Posts(props) {
    const [expanded, setExpanded] = useState(false);
    const [postData, setPostData] = useState(null);
    const [showAddCommentModal, setShowAddCommentModal] = useState(false);
    const [followed, setFollowed] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [showViewCommentsModal, setShowViewCommentsModal] = useState(false);

    useEffect(() => {
        (async () => {
            let data;
            if (props.user) {
                data = await getFrom(`/posts/user/${props.user}`);
            } else if (props.boardit) {
                data = await getFrom(`/posts/boardit/${props.boardit}`);
            } else if (props.saved) {
                data = await getFrom(`/users/${props.saved}/saved`);
            } else {
                return;
            }

            setPostData(data);
        })();
    }, []);

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleFollow = async (follower, follow) => {
        await postTo(`/users/${follow}/follow`, {
            username: follower
        });
        setFollowed(true);
    };

    return (
        <div>
            {postData ? (
                postData.length == 0 ? (
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
                                No posts
                            </Typography>
                        </Grid>
                    </Grid>
                ) : (
                    postData.map(post => {
                        return (
                            <Accordion
                                expanded={expanded === post.id}
                                onChange={handleChange(post.id)}
                                sx={{
                                    maxWidth: props.saved ? 1500 : 1000,
                                    minWidth: props.saved ? 1200 : 800
                                }}
                                key={post.id}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Typography
                                        sx={{
                                            width: "27%",
                                            flexShrink: 0
                                        }}
                                    >
                                        <VoteButton postData={post} upvote />
                                        <VoteButton postData={post} downvote />
                                        <ReportButton
                                            modalFunc={setShowReportModal}
                                            postData={post}
                                        />
                                        <Modal
                                            sx={{marginTop: 3}}
                                            open={Boolean(showReportModal)}
                                            onClose={() =>
                                                setShowReportModal(false)
                                            }
                                        >
                                            <Fade in={Boolean(showReportModal)}>
                                                <Box sx={modalStyling}>
                                                    <ReportModal
                                                        postData={
                                                            showReportModal
                                                        }
                                                    />
                                                </Box>
                                            </Fade>
                                        </Modal>
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: "text.secondary",
                                            width: "63%"
                                        }}
                                    >
                                        {post.title}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: "text.secondary",
                                            flexShrink: 0
                                        }}
                                    >
                                        {props.saved
                                            ? `Posted by ${post.postedBy} in r/${post.postedIn}`
                                            : props.boardit
                                            ? `Posted by ${post.postedBy}`
                                            : props.user
                                            ? `Posted in r/${post.postedIn}`
                                            : null}
                                        {" on "}
                                        {post.createdAt
                                            .split("T")[0]
                                            .split("-")
                                            .reverse()
                                            .join("-")}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>{post.text}</Typography>
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
                                                color="info"
                                                style={{marginTop: 10}}
                                                onClick={() =>
                                                    setShowAddCommentModal(
                                                        post.id
                                                    )
                                                }
                                            >
                                                Add comment
                                            </Button>
                                        </Grid>
                                        <Modal
                                            sx={{marginTop: 3}}
                                            open={Boolean(showAddCommentModal)}
                                            onClose={() =>
                                                setShowAddCommentModal(false)
                                            }
                                        >
                                            <Fade
                                                in={Boolean(
                                                    showAddCommentModal
                                                )}
                                            >
                                                <Box sx={modalStyling}>
                                                    <NewCommentModal
                                                        postID={
                                                            showAddCommentModal
                                                        }
                                                    />
                                                </Box>
                                            </Fade>
                                        </Modal>
                                        <Grid item>
                                            <SavePost post={post} />
                                        </Grid>
                                        {post.postedBy !=
                                        window.localStorage.getItem(
                                            "username"
                                        ) ? (
                                            <Grid item>
                                                <Button
                                                    variant="contained"
                                                    color="info"
                                                    style={{marginTop: 10}}
                                                    disabled={followed}
                                                    onClick={
                                                        (() =>
                                                            handleFollow(
                                                                window.localStorage.getItem(
                                                                    "username"
                                                                )
                                                            ),
                                                        post.postedBy)
                                                    }
                                                >
                                                    {followed
                                                        ? "User already followed"
                                                        : "Follow user"}
                                                </Button>
                                            </Grid>
                                        ) : null}
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                color="info"
                                                style={{marginTop: 10}}
                                                onClick={() =>
                                                    setShowViewCommentsModal(
                                                        post.id
                                                    )
                                                }
                                            >
                                                View comments (
                                                {post.comments.length})
                                            </Button>
                                            <Modal
                                                sx={{marginTop: 3}}
                                                open={Boolean(
                                                    showViewCommentsModal
                                                )}
                                                onClose={() =>
                                                    setShowViewCommentsModal(
                                                        false
                                                    )
                                                }
                                            >
                                                <Fade
                                                    in={Boolean(
                                                        showViewCommentsModal
                                                    )}
                                                >
                                                    <Box sx={modalStyling}>
                                                        <ViewCommentsModal
                                                            postID={
                                                                showViewCommentsModal
                                                            }
                                                        />
                                                    </Box>
                                                </Fade>
                                            </Modal>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        );
                    })
                )
            ) : (
                <Loading />
            )}
        </div>
    );
}
