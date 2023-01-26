import React from "react";

import Grid from "@mui/material/Grid";

import FourBar from "../components/FourBar";
import ProfileCard from "../components/ProfileCard";
import MyPosts from "../components/MyPosts";

export default function ProfilePage(props) {
    return (
        <React.Fragment>
            <FourBar />
            <Grid
                sx={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "space-between"
                }}
                container
            >
                <MyPosts />
                <ProfileCard />
                {/* vertical grid containing profile card and other
                stats (on Paper component) */}
            </Grid>
        </React.Fragment>
    );
}
