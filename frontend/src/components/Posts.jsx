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

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {getFrom, modalStyling} from "../helpers";
import NewCommentModal from "./BoarditPage/NewCommentModal";
import VoteButton from "./VoteButton";
import SavePost from "./SavePost";
import Loading from "./Loading";

export default function Posts(props) {
    const [expanded, setExpanded] = useState(false);
    const [postData, setPostData] = useState(null);
    const [showAddCommentModal, setShowAddCommentModal] = useState(false);

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
                                        sx={{width: "27%", flexShrink: 0}}
                                    >
                                        <VoteButton postData={post} upvote />
                                        <VoteButton postData={post} downvote />
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
                                                    setShowAddCommentModal(true)
                                                }
                                            >
                                                Add comment
                                            </Button>
                                        </Grid>
                                        <Modal
                                            sx={{marginTop: 3}}
                                            open={showAddCommentModal}
                                            onClose={() =>
                                                setShowAddCommentModal(false)
                                            }
                                        >
                                            <Fade in={showAddCommentModal}>
                                                <Box sx={modalStyling}>
                                                    <NewCommentModal
                                                        modalFunc={
                                                            setShowAddCommentModal
                                                        }
                                                        postID={post.id}
                                                    />
                                                </Box>
                                            </Fade>
                                        </Modal>
                                        <Grid item>
                                            <SavePost post={post} />
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                color="info"
                                                style={{marginTop: 10}}
                                                // onClick={}
                                            >
                                                View comments (
                                                {post.comments.length})
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
            )}
        </div>
    );
}
