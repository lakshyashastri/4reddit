import React, {useState} from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import {postTo} from "../../helpers";

import jwt_decode from "jwt-decode";

import AddIcon from "@mui/icons-material/Add";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

function HeadingText() {
    return (
        <Typography variant="h2" sx={{m: 1}} align="center">
            Add a comment
        </Typography>
    );
}

export default function NewCommentModal(props) {
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

        let res = await postTo("/comments", {
            text,
            postedBy: jwt_decode(window.localStorage.getItem("token")).username,
            postID: props.postID
        });

        setPosted(true);
        setTimeout(() => window.location.reload(), 300);
    };

    return (
        <React.Fragment>
            <HeadingText name={props.name} />
            <Grid marginTop={2} container>
                <TextField
                    {...inputFieldProps}
                    label="Comment content"
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
                    {posted ? "Posted!" : "Post"}
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
