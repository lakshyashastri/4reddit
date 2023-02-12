import React, {useState, useEffect} from "react";
import Button from "@mui/material/Button";

import {getFrom, postTo} from "../helpers";

import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpSharpIcon from "@mui/icons-material/ThumbUpSharp";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbDownSharpIcon from "@mui/icons-material/ThumbDownSharp";

export default function VoteButton(props) {
    const username = JSON.parse(window.localStorage.getItem("username"));
    const alreadyVoted = props.upvote
        ? props.postData.upvotedBy.includes(username)
        : props.postData.downvotedBy.includes(username);

    let handleClick = async event => {
        event.stopPropagation();

        console.log(
            `/posts/${props.postData.id}/${
                props.upvote ? "upvote" : "downvote"
            }`
        );
        let res = await postTo(
            `/posts/${props.postData.id}/${
                props.upvote ? "upvote" : "downvote"
            }`,
            {
                inc: alreadyVoted ? 0 : 1,
                user: username
            }
        );
    };

    return (
        <React.Fragment>
            <Button
                size="large"
                variant="text"
                endIcon={
                    props.upvote ? (
                        alreadyVoted ? (
                            <ThumbUpSharpIcon />
                        ) : (
                            <ThumbUpOutlinedIcon />
                        )
                    ) : alreadyVoted ? (
                        <ThumbDownSharpIcon />
                    ) : (
                        <ThumbDownOutlinedIcon />
                    )
                }
                sx={{padding: 0}}
                type="submit"
                onClick={handleClick}
            >
                {props.upvote
                    ? props.postData.upvotes
                    : props.postData.downvotes}
            </Button>
        </React.Fragment>
    );
}
