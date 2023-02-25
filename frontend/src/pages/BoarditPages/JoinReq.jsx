import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

import {getFrom} from "../../helpers";
import FourBar from "../../components/FourBar";
import Loading from "../../components/Loading";

import TrollFace from "../../assets/defaultIcon.jpg";

function Request(props) {
    const [accept, setAccept] = useState(false);
    const [reject, setReject] = useState(false);

    const handleAccept = async user => {
        if (accept) {
            return;
        }

        await getFrom(`/boardits/${props.boarditName}/accept/${user}`);
        setAccept(true);
    };
    const handleReject = async user => {
        if (reject) {
            return;
        }

        await getFrom(`/boardits/${props.boarditName}/reject/${user}`);
        setReject(true);
    };

    return (
        <ListItem sx={{minWidth: 400}}>
            <ListItemAvatar>
                <Avatar src={TrollFace} />
            </ListItemAvatar>
            <ListItemText>u/{props.user.username}</ListItemText>
            <Button
                color="success"
                disabled={accept || reject}
                onClick={() => handleAccept(props.user.username)}
            >
                {accept ? "Accepted" : "Accept"}
            </Button>
            <Button
                color="error"
                disabled={accept || reject}
                onClick={() => handleReject(props.user.username)}
            >
                {reject ? "Rejected" : "Reject"}
            </Button>
        </ListItem>
    );
}

function PendingRequests(props) {
    return (
        <React.Fragment>
            {props.data.length ? (
                props.data.map(user => (
                    <Request
                        data={props.data}
                        user={user}
                        boarditName={props.boarditName}
                    />
                ))
            ) : (
                <Typography variant="h5" textAlign="center">
                    No join requests
                </Typography>
            )}
        </React.Fragment>
    );
}

export default function JoinRequestsPage() {
    const [joinReqData, setJoinReqData] = useState(null);
    const [mods, setMods] = useState(null);
    const [loading, setLoading] = useState(true);

    const {boarditName} = useParams();

    useEffect(() => {
        (async () => {
            let data = await getFrom(
                `/boardits/${boarditName}/prop/pendingRequests`
            );
            setJoinReqData(data);

            const _mods = await getFrom(`/boardits/${boarditName}/prop/mods`);
            setMods(_mods[0].mods);

            setLoading(false);
        })();
    }, []);

    if (loading) {
        return <Loading />;
    } else if (!mods.includes(window.localStorage.getItem("username"))) {
        return (
            <Typography align="center" variant="h2">
                You do not have access to this page
            </Typography>
        );
    }

    return (
        <React.Fragment>
            <FourBar boarditName={boarditName} />
            <Grid
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{minHeight: "50vh"}}
                container
            >
                <Grid marginBottom={10} item>
                    <Typography align="center" variant="h2">
                        Join requests
                    </Typography>
                    <Typography align="center" variant="h4" gutterBottom>
                        r/
                        {boarditName}
                    </Typography>
                </Grid>

                <Grid
                    container
                    spacing={2}
                    minWidth={350}
                    justifyContent="center"
                >
                    <List sx={{backgroundColor: "white", minWidth: 300}}>
                        {joinReqData ? (
                            <PendingRequests
                                data={joinReqData}
                                boarditName={boarditName}
                            />
                        ) : (
                            <Loading />
                        )}
                    </List>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
