import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import {getFrom, postTo} from "../../helpers";

import EditIcon from "@mui/icons-material/Edit";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

function HeadingText() {
    return (
        <Typography variant="h2" sx={{m: 1}} align="center">
            Edit your profile
        </Typography>
    );
}

export default function EditProfileModal(props) {
    const [username, setUsername] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [number, setNumber] = useState(null);

    const [usernameUnique, setUsernameUnique] = useState(null);
    const [editDone, setEditDone] = useState(null);

    const inputFieldProps = {
        style: {m: 0.5, input: {color: "rgb(51, 118, 204)"}},
        variant: "filled"
    };

    const navigate = useNavigate();

    const handlePostClick = async () => {
        if (editDone) {
            return;
        }

        let res = await getFrom(`/users/${username}`);
        if (
            res.length == 0 ||
            username == window.localStorage.getItem("username")
        ) {
            setUsernameUnique(true);
        } else {
            setUsernameUnique(false);
            return;
        }

        await postTo(
            `/users/${window.localStorage.getItem("username")}/update`,
            {
                firstName: firstName ? firstName : props.user.firstName,
                lastName: lastName ? lastName : props.user.lastName,
                number: number ? number : props.user.number
            }
        );

        setEditDone(true);
        setTimeout(() => window.location.reload(), 300);
    };

    const error = () =>
        !usernameUnique && username == window.localStorage.getItem("username");

    return (
        <React.Fragment>
            <HeadingText name={props.name} />

            <Grid marginTop={2} container>
                <TextField
                    {...inputFieldProps}
                    label="First name"
                    onChange={event => setFirstName(event.target.value)}
                    required
                    defaultValue={props.user.firstName}
                />
                <TextField
                    {...inputFieldProps}
                    sx={{
                        marginLeft: 2.25
                    }}
                    label="Last name"
                    onChange={event => setLastName(event.target.value)}
                    required
                    defaultValue={props.user.lastName}
                />
            </Grid>
            <Grid marginTop={2} container>
                <TextField
                    {...inputFieldProps}
                    label="Number"
                    fullWidth
                    onChange={event => setNumber(event.target.value)}
                    required
                    type="number"
                    defaultValue={props.user.number}
                />
            </Grid>
            <Grid
                marginTop={2}
                sx={{display: "flex", justifyContent: "center"}}
                container
            >
                <Button
                    variant="contained"
                    size="large"
                    type="submit"
                    color={editDone ? "success" : "primary"}
                    sx={{mt: 1}}
                    onClick={handlePostClick}
                    disabled={error()}
                >
                    <Box marginRight={0.8} paddingTop={0.6}>
                        {editDone ? <DoneOutlineIcon /> : <EditIcon />}
                    </Box>
                    {editDone ? "Profile edited!" : "Edit"}
                </Button>
            </Grid>
            {editDone ? (
                <Typography textAlign="center" mt={1} color="green">
                    Success!
                </Typography>
            ) : null}
        </React.Fragment>
    );
}
