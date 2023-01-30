import React from "react";

import Grid from "@mui/material/Grid";

import FourBar from "../components/FourBar";
import ProfileCard from "../components/ProfileCard";
import MyPosts from "../components/MyPosts";
import FolloweringList from "../components/FolloweringList";

import TrollFace from "../assets/defaultIcon.jpg";

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
                <Grid sx={{display: "flex", flexDirection: "column"}}>
                    <ProfileCard />
                    <FolloweringList
                        users={{
                            test: {avatar: TrollFace, date: "26/01/2023"},
                            test2: {avatar: TrollFace, date: "25/01/2023"},
                            test3: {avatar: TrollFace, date: "25/01/2023"}
                        }}
                    />
                    <FolloweringList
                        users={{
                            test3: {avatar: TrollFace, date: "22/01/2023"},
                            test4: {avatar: TrollFace, date: "23/01/2023"},
                            test5: {avatar: TrollFace, date: "20/01/2023"},
                            test6: {avatar: TrollFace, date: "19/01/2023"}
                        }}
                        following
                    />
                </Grid>
                {/* make vertical grid containing profile card and other
                stats (on Paper component)? */}
            </Grid>
        </React.Fragment>
    );
}
