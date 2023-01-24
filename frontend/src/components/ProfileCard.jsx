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

import TrollFace from "../assets/defaultIcon.jpg";

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
                    <Typography variant="h5" component="div">
                        u/admin
                    </Typography>
                </CardContent>

                <CardActions>
                    <Button size="small" variant="text">
                        4 Followers
                    </Button>
                    <Button variant="text" startIcon={<LiquorIcon />}>
                        26/01/2023
                        {/* time.is link or something (basically lead to info about exact timestamp) */}
                    </Button>
                    <Button size="small" variant="text">
                        2 Following
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
                            First name: Lakshya <br></br>
                            Last name: Shastri <br></br>
                            <br></br>
                            Email: lakshyashastri11@gmail.com <br></br>
                            Contact number: 9899980020 <br></br>
                            Age: 19 <br></br>
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </React.Fragment>
    );
}
