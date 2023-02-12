import React, {useState, useEffect} from "react";
import Button from "@mui/material/Button";

import {getFrom, postTo} from "../helpers";

import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpSharpIcon from "@mui/icons-material/ThumbUpSharp";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbDownSharpIcon from "@mui/icons-material/ThumbDownSharp";

export default function VoteButton(props) {
    const username = JSON.parse(window.localStorage.getItem("username"));

    const [alreadyVoted, setAlreadyVoted] = useState(
        props.upvote
            ? props.postData.upvotedBy.includes(username)
            : props.postData.downvotedBy.includes(username)
    );
    const [count, setCount] = useState(
        props.upvote ? props.postData.upvotes : props.postData.downvotes
    );

    useEffect(() => {
        (async () => {
            let data = await getFrom(`/posts/${props.postData.id}`);
            console.log(
                props.upvote
                    ? data.upvotedBy.includes(username)
                    : data.downvotedBy.includes(username)
            );
            setAlreadyVoted(
                props.upvote
                    ? data.upvotedBy.includes(username)
                    : data.downvotedBy.includes(username)
            );
            setCount(props.upvote ? data.upvotes : data.downvotes);
        })();
    }, []);

    let handleClick = async event => {
        setAlreadyVoted(!alreadyVoted);
        setCount(alreadyVoted ? count - 1 : count + 1);

        event.stopPropagation();

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
                {count}
            </Button>
        </React.Fragment>
    );
}
