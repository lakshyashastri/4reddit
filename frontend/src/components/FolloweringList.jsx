import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

function ShowAll(props) {
    return (
        <Button
            sx={{
                width: "100%",
                textAlign: "center",
                marginBottom: -1
            }}
        >
            Show all
        </Button>
    );
}
export default function FolloweringList(props) {
    let getFolloweringList = users => {
        let fragments = [];
        for (let [index, user] of Object.keys(users).entries()) {
            fragments.push(
                <React.Fragment>
                    <ListItem key={user}>
                        <ListItemAvatar>
                            <Avatar src={users[user].avatar} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={"u/" + user}
                            secondary={"Since " + users[user].date}
                        />
                    </ListItem>
                    {index + 1 === Object.keys(users).length ? null : (
                        <Divider />
                    )}
                </React.Fragment>
            );
            if (index == 2) {
                break;
            }
        }
        return <React.Fragment>{fragments}</React.Fragment>;
    };

    return (
        <React.Fragment>
            <Grid container spacing={2}>
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
                        {getFolloweringList(props.users)}
                        {Object.keys(props.users).length > 3 ? (
                            <ShowAll />
                        ) : null}
                    </List>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
