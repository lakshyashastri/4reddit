import React, {useState} from "react";
import Card from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import LiquorIcon from "@mui/icons-material/Liquor";

import TrollFace from "../../assets/defaultIcon.jpg";

export default function ProfileCard(props) {
    let [infoShown, setInfoShown] = useState(false);

    let handleInfoClick = () => {
        setInfoShown(!infoShown);
    };

    return (
        <React.Fragment>
            <Card
                sx={{
                    maxWidth: 400,
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <CardMedia
                    sx={{height: 140, width: 140, borderRadius: "50%"}}
                    image={TrollFace}
                    title="You"
                    component="img"
                />

                <CardContent>
                    <Typography variant="h5" component="div" align="center">
                        u/{props.user.username}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        align="center"
                    >
                        {`${props.user.firstName} ${props.user.lastName}`}
                    </Typography>
                </CardContent>

                <CardActions>
                    <Button size="small" variant="text">
                        {props.user.followers.length} Followers
                    </Button>
                    <Button variant="text" startIcon={<LiquorIcon />}>
                        {props.user.dob}
                        {/* time.is link or something (basically lead to info about exact timestamp) */}
                    </Button>
                    <Button size="small" variant="text">
                        {props.user.following.length} Following
                    </Button>
                </CardActions>

                <CardActions>
                    <Button
                        size="small"
                        variant="text"
                        endIcon={
                            infoShown ? <ExpandLessIcon /> : <ExpandMoreIcon />
                        }
                        onClick={handleInfoClick}
                    >
                        Show more info
                    </Button>
                </CardActions>

                <Collapse in={infoShown} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            Email: {props.user.email} <br></br>
                            Contact number: {props.user.number} <br></br>
                            Age: {props.user.dob} <br></br>
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </React.Fragment>
    );
}
