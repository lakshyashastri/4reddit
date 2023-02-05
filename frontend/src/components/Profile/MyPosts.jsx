import React, {useState} from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpSharpIcon from "@mui/icons-material/ThumbUpSharp";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbDownSharpIcon from "@mui/icons-material/ThumbDownSharp";

// can add from normal to liked inside this function too
function VoteButton(props) {
    let handleClick = event => {
        event.stopPropagation();
    };

    return (
        <React.Fragment>
            <Button
                size="large"
                variant="text"
                endIcon={
                    props.upvote ? (
                        <ThumbUpOutlinedIcon />
                    ) : (
                        <ThumbDownOutlinedIcon />
                    )
                }
                sx={{padding: 0}}
                type="submit"
                onClick={handleClick}
            >
                {props.count}
            </Button>
        </React.Fragment>
    );
}

export default function MyPosts() {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    // store ids of posts made by a user in the user data itself
    let posts = {
        ie49xS: {
            title: "this is a title",
            content: "HELLOW HI HOW ARE YOU",
            postedBy: "admin",
            postedIn: "someBoardIt",
            upvotes: 5,
            downvotes: 3,
            timestamp: 1674705189
        },
        abcdef: {
            title: "bakul nivas 5th floor long long long ",
            content:
                "test test test lorem ipsum test test test hmmmtest test test lorem ipsum test test test hmmmtest test test lorem ipsum test test test hmmmtest test test lorem ipsum test test test hmmmtest test test lorem ipsum test test test hmmm",
            postedBy: "notadmin",
            postedIn: "anotherBoardIt",
            upvotes: 7,
            downvotes: 2,
            timestamp: 1674605189
        }
    };

    return (
        <div>
            {Object.keys(posts).map(post => {
                return (
                    <Accordion
                        expanded={expanded === post}
                        onChange={handleChange(post)}
                        sx={{
                            maxWidth: 796,
                            minWidth: 550
                        }}
                        key={post}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{width: "27%", flexShrink: 0}}>
                                <VoteButton
                                    count={posts[post].upvotes}
                                    upvote
                                />
                                <VoteButton
                                    count={posts[post].downvotes}
                                    downvote
                                />
                            </Typography>
                            <Typography
                                sx={{
                                    color: "text.secondary",
                                    width: "63%"
                                }}
                            >
                                {posts[post].title}
                            </Typography>
                            <Typography
                                sx={{color: "text.secondary", flexShrink: 0}}
                            >
                                26/01/2023
                                {/* parse timestamp to this date format */}
                                {/* put exact timestamp in tooltip text */}
                                {/* will also have to add boardit name (might replace with date) and other details somewhere */}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{posts[post].content}</Typography>
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </div>
    );
}

// export default function MyPosts(props) {
//     return <React.Fragment>Tets</React.Fragment>;
// }
