import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

import Grid from "@mui/material/Grid";

import FourBar from "../components/FourBar";
import ProfileCard from "../components/Profile/ProfileCard";
import MyPosts from "../components/Profile/MyPosts";
import FolloweringList from "../components/Profile/FolloweringList";

import {getFrom} from "../helpers";
import NotFound from "./notFound";

import TrollFace from "../assets/defaultIcon.jpg";

export default function ProfilePage(props) {
    const {username} = useParams();

    const [userData, setUserData] = useState([]);
    const [followerData, setFollowerData] = useState([]);
    const [followingData, setFollowingData] = useState([]);

    useEffect(() => {
        (async () => {
            let data = await getFrom("/users/" + username);
            setUserData(data);

            if (userData.length != 1) {
                return;
            }

            for (let follower of userData[0].followers) {
                data = await getFrom("/users" + follower);
                setFollowerData([
                    ...followerData,
                    [data.username, `${data.firstName} ${data.lastName}`]
                ]);
            }
            for (let following of userData[0].following) {
                data = await getFrom("/users" + following);
                setFollowingData([
                    ...followingData,
                    [data.username, `${data.firstName} ${data.lastName}`]
                ]);
            }
        })();
    }, []);

    if (userData.length === 0) {
        return <NotFound message={"User not found"} />;
    } else if (username != JSON.parse(localStorage.getItem("username"))) {
        return <NotFound message={"This is not your user page"} />;
    }

    let formatFollowers = data => {
        let formattedData = {};
        for (let follower of data) {
            formattedData[follower[0]] = {
                avatar: TrollFace,
                fullName: follower[1]
            };
        }
        return formattedData;
    };

    return userData.length === 1 ? (
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
                    <ProfileCard user={userData[0]} />
                    <FolloweringList users={formatFollowers(followerData)} />
                    <FolloweringList
                        users={formatFollowers(followingData)}
                        following
                    />
                </Grid>
                {/* make vertical grid containing profile card and other
                stats (on Paper component)? */}
            </Grid>
        </React.Fragment>
    ) : (
        <h1>User not found</h1>
    );
}
