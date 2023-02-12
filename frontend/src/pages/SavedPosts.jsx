import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

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
                        {JSON.parse(window.localStorage.getItem("username"))}
                    </Typography>
                </Grid>
                <Grid item>
                    <Posts
                        saved={JSON.parse(
                            window.localStorage.getItem("username")
                        )}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
