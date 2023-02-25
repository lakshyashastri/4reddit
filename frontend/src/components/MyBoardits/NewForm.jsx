import React, {useState} from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

import {postTo} from "../../helpers";

import jwt_decode from "jwt-decode";

import AddIcon from "@mui/icons-material/Add";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

function HeadingText(props) {
    return (
        <Typography variant="h2" sx={{m: 1}} align="center">
            Make a new Boardit
        </Typography>
    );
}

export default function NewForm(props) {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [tags, setTags] = useState("");
    const [banned, setBanned] = useState("");
    const [nameExists, setNameExists] = useState(false);
    const [created, setCreated] = useState(false);

    const inputFieldProps = {
        style: {m: 0.5, input: {color: "rgb(51, 118, 204)"}},
        variant: "filled"
        // onChange
    };

    const handleClick = async event => {
        if (created) {
            return;
        }

        let res = await postTo("/boardits", {
            name,
            description: desc.length == 0 ? "No description" : desc,
            tags,
            bannedKeywords: banned,
            createdBy: jwt_decode(window.localStorage.getItem("token")).username
        });

        if (res.status == 409) {
            setNameExists(true);
            return;
        }

        setNameExists(false);
        setCreated(true);
        setTimeout(() => {
            props.modalFunc(false);
            window.location.reload();
        }, 800);
    };

    const handleNameChange = event => {
        event.target.value = event.target.value.replace(/\s/g, "_");
        setName(event.target.value);
    };

    return (
        <React.Fragment>
            <HeadingText />
            <Grid marginTop={2} container>
                <TextField
                    {...inputFieldProps}
                    label="Boardit name"
                    fullWidth
                    onChange={handleNameChange}
                    error={nameExists}
                    helperText={
                        nameExists
                            ? "Boardit with this name already exists"
                            : ""
                    }
                    required
                />
            </Grid>
            <Grid marginTop={2} container>
                <TextField
                    {...inputFieldProps}
                    label="Boardit description"
                    multiline
                    rows={4}
                    maxRows={8}
                    fullWidth
                    onChange={event => setDesc(event.target.value)}
                />
            </Grid>
            <Grid marginTop={2} container>
                {/* <Autocomplete /> */}
                <TextField
                    {...inputFieldProps}
                    label="Tags (comma separated)"
                    multiline
                    maxRows={8}
                    fullWidth
                    onChange={event => setTags(event.target.value)}
                />
            </Grid>
            <Grid marginTop={2} container>
                <TextField
                    {...inputFieldProps}
                    label="Banned keywords (comma separated)"
                    multiline
                    maxRows={8}
                    fullWidth
                    onChange={event => setBanned(event.target.value)}
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
                    color={created ? "success" : "primary"}
                    sx={{mt: 1}}
                    onClick={handleClick}
                    // disabled={created}
                >
                    <Box marginRight={0.8} paddingTop={0.6}>
                        {created ? <DoneOutlineIcon /> : <AddIcon />}
                    </Box>
                    {created ? "Boardit created" : "Create"}
                </Button>
            </Grid>
            {created ? (
                <Typography textAlign="center" mt={1} color="green">
                    Success!
                </Typography>
            ) : null}
        </React.Fragment>
    );
}
