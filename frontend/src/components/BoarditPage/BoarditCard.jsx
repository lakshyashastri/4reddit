import React, {useState} from "react";
import Card from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";

import NewPostModal from "../../components/BoarditPage/NewPostModal";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import BorderColorIcon from "@mui/icons-material/BorderColor";

import Logo from "../../assets/4reddit_logo_trans.png";

const modalStyling = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 900,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
};

export default function BoarditCard(props) {
    const [infoShown, setInfoShown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);

    const joined = props.boarditData.followers.includes(
        JSON.parse(window.localStorage.getItem("username"))
    );

    const handleInfoClick = () => {
        setInfoShown(!infoShown);
    };

    const handleCreateClick = () => setShowModal(true);

    return (
        <React.Fragment>
            <Card
                sx={{
                    maxWidth: 400,
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    minWidth: 300
                }}
            >
                <CardMedia
                    sx={{height: 140, width: 140, borderRadius: "50%"}}
                    image={Logo}
                    title="You"
                    component="img"
                />

                <CardContent>
                    <Typography variant="h5" component="div" align="center">
                        r/{props.boarditName}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        align="center"
                    >
                        {props.boarditData.description}
                    </Typography>
                </CardContent>

                <CardActions>
                    <Button
                        variant="text"
                        startIcon={<BorderColorIcon />}
                        color="success"
                        onClick={handleCreateClick}
                        disabled={!joined}
                    >
                        <Typography>
                            {joined ? "Create post" : "Join to create post"}
                        </Typography>
                    </Button>
                    <Modal
                        sx={{marginTop: 3}}
                        open={showModal}
                        onClose={handleClose}
                    >
                        <Fade in={showModal}>
                            <Box sx={modalStyling}>
                                <NewPostModal
                                    modalFunc={setShowModal}
                                    name={props.boarditName}
                                    postedBy={props.boarditData.postedBy}
                                />
                            </Box>
                        </Fade>
                    </Modal>
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
                            Owner: {props.boarditData.createdBy} <br></br>
                            Followers: {props.boarditData.followers.length}
                            <br></br>
                            Posts: {props.boarditData.posts.length} <br></br>
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </React.Fragment>
    );
}
