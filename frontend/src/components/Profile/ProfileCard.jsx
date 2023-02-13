import React, {useEffect, useState} from "react";
import Card from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import LiquorIcon from "@mui/icons-material/Liquor";
import EditIcon from "@mui/icons-material/Edit";

import EditProfileModal from "./EditProfileModal";
import {modalStyling} from "../../helpers";
import TrollFace from "../../assets/defaultIcon.jpg";

export default function ProfileCard(props) {
    const [infoShown, setInfoShown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [userData, setUserData] = useState(null);

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
                <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    sx={{marginBottom: -4, marginLeft: 33}}
                    onClick={() => setShowModal(true)}
                >
                    Edit
                </Button>
                <Modal
                    sx={{marginTop: 3}}
                    open={showModal}
                    onClose={() => setShowModal(false)}
                >
                    <Fade in={showModal}>
                        <Box sx={modalStyling}>
                            <EditProfileModal
                                modalFunc={setShowModal}
                                user={props.user}
                            />
                        </Box>
                    </Fade>
                </Modal>
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
