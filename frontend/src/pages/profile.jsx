import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";

import FourBar from "../components/FourBar";
import ProfileCard from "../components/Profile/ProfileCard";
import Posts from "../components/Posts";
import FolloweringList from "../components/Profile/FolloweringList";

import {getFrom, modalStyling} from "../helpers";
import NotFound from "./notFound";

import TrollFace from "../assets/defaultIcon.jpg";

export default function ProfilePage(props) {
    const {username} = useParams();

    const [userData, setUserData] = useState([]);
    const [followerModal, setFollowerModal] = useState(false);
    const [followingModal, setFollowingModal] = useState(false);

    useEffect(() => {
        (async () => {
            let data = await getFrom("/users/" + username);
            setUserData(data);
        })();
    }, []);

    if (userData.length === 0) {
        return <NotFound message={"User not found"} />;
    } else if (username != JSON.parse(localStorage.getItem("username"))) {
        return <NotFound message={"This is not your user page"} />;
    }

    return userData.length == 1 ? (
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
                <Posts user={username} />
                <Grid sx={{display: "flex", flexDirection: "column"}}>
                    <ProfileCard
                        user={userData[0]}
                        followerModalFunc={setFollowerModal}
                        followingModalFunc={setFollowingModal}
                    />
                    <Modal
                        sx={{marginTop: 3}}
                        open={followerModal}
                        onClose={() => {
                            setFollowerModal(false);
                            if (userData[0].followers.length != 0) {
                                window.location.reload();
                            }
                        }}
                    >
                        <Fade in={followerModal}>
                            <Box sx={modalStyling}>
                                <FolloweringList user={userData[0]} />
                            </Box>
                        </Fade>
                    </Modal>
                    <Modal
                        sx={{marginTop: 3}}
                        open={followingModal}
                        onClose={() => {
                            setFollowingModal(false);
                            if (userData[0].following.length != 0) {
                                window.location.reload();
                            }
                        }}
                    >
                        <Fade in={followingModal}>
                            <Box sx={modalStyling}>
                                <FolloweringList user={userData[0]} following />
                            </Box>
                        </Fade>
                    </Modal>
                </Grid>
            </Grid>
        </React.Fragment>
    ) : (
        <h1>User not found</h1>
    );
}
