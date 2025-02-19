import React, {useState, useEffect} from "react";
import Button from "@mui/material/Button";

import {getFrom, postTo} from "../helpers";

import jwt_decode from "jwt-decode";

import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

export default function SavePost(props) {
    const [saved, setSaved] = useState(null);

    useEffect(() => {
        (async () => {
            let res = await getFrom(
                `/users/${
                    jwt_decode(window.localStorage.getItem("token")).username
                }`
            );
            setSaved(res[0].savedPosts.includes(props.post.id));
        })();
    }, []);

    const handleClick = async () => {
        let res = await postTo(
            `/posts/${props.post.id}/${saved ? "unsave" : "save"}`,
            {
                user: jwt_decode(window.localStorage.getItem("token")).username
            }
        );

        setSaved(!saved);
    };

    return (
        <Button
            variant="contained"
            color="info"
            style={{marginTop: 10}}
            startIcon={saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            onClick={handleClick}
        >
            {saved ? "Unsave" : "Save post"}
        </Button>
    );
}
