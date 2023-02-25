import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import jwt_decode from "jwt-decode";

import FourBar from "../components/FourBar";
import Posts from "../components/Posts";

export default function SavePosts(props) {
    return (
        <React.Fragment>
            <FourBar />
            <Grid
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{minHeight: "50vh"}}
                container
            >
                <Grid item>
                    <Typography align="center" variant="h2">
                        Saved Posts
                    </Typography>
                    <Typography align="center" variant="h4" gutterBottom>
                        by u/
                        {
                            jwt_decode(window.localStorage.getItem("token"))
                                .username
                        }
                    </Typography>
                </Grid>
                <Grid item>
                    <Posts
                        saved={
                            jwt_decode(window.localStorage.getItem("token"))
                                .username
                        }
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
