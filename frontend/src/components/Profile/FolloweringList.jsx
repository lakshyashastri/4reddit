import React, {useState, useEffect} from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

import RemoveFollow from "./RemoveFollow";
import {getFrom, postTo} from "../../helpers";
import TrollFace from "../../assets/defaultIcon.jpg";

export default function FolloweringList(props) {
    const [followeringData, setFolloweringData] = useState([]);

    useEffect(() => {
        (async () => {
            let arr = [];
            for (let follower of props.following
                ? props.user.following
                : props.user.followers) {
                let data = await getFrom("/users/" + follower);
                arr.push(data[0]);
            }

            setFolloweringData(arr);
        })();
    }, []);

    const handleClick = async follower => {
        await postTo(
            props.following
                ? `/users/${follower}/unfollow`
                : `/users/${window.localStorage.getItem("username")}/unfollow`,
            props.following
                ? {
                      username: window.localStorage.getItem("username")
                  }
                : {username: follower}
        );
    };

    let getFolloweringList = () => {
        let fragments = [];
        for (let user of followeringData) {
            fragments.push(
                <React.Fragment>
                    <ListItem key={user.username}>
                        <ListItemAvatar>
                            <Avatar src={TrollFace} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={"u/" + user.username}
                            secondary={`${user.firstName} ${user.lastName}`}
                        />
                        <RemoveFollow
                            onClick={() => handleClick(user.username)}
                            following={props.following}
                        />
                    </ListItem>
                </React.Fragment>
            );
        }
        return fragments.length === 0 ? (
            <Typography align="center">
                {props.following ? "Following no one" : "No followers"}
            </Typography>
        ) : (
            <React.Fragment>{fragments}</React.Fragment>
        );
    };

    return (
        <React.Fragment>
            <Grid container spacing={2} minWidth={350}>
                <Grid item xs={12}>
                    <Typography
                        sx={{
                            mt: 3,
                            backgroundColor: "white",
                            textAlign: "center"
                        }}
                        variant="h5"
                    >
                        {props.following ? "Following" : "Followers"}
                    </Typography>
                    <Divider />
                    <List sx={{backgroundColor: "white"}}>
                        {getFolloweringList()}
                    </List>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
