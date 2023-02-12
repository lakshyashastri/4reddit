import React, {useState, useEffect} from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";

import {getFrom} from "../helpers";
import VoteButton from "./VoteButton";
import Loading from "../components/Loading";

export default function Posts(props) {
    const [expanded, setExpanded] = useState(false);
    const [postData, setPostData] = useState(null);

    useEffect(() => {
        (async () => {
            let data;
            if (props.user) {
                data = await getFrom(`/posts/user/${props.user}`);
            } else if (props.boardit) {
                data = await getFrom(`/posts/boardit/${props.boardit}`);
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
                postData.map(post => {
                    return (
                        <Accordion
                            expanded={expanded === post.id}
                            onChange={handleChange(post.id)}
                            sx={{
                                maxWidth: 1000,
                                minWidth: 800
                            }}
                            key={post.id}
                        >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography sx={{width: "27%", flexShrink: 0}}>
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
                                    {props.boardit
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
                            </AccordionDetails>
                        </Accordion>
                    );
                })
            ) : (
                <Loading />
            )}
        </div>
    );
}
