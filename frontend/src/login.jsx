import React, {useState} from "react";
import {useNavigate, withRouter} from "react-router-dom";

import Logo from "./components/Logo";
import {ROOT} from "./components/ProtectedRoute";
import {getFrom, postTo} from "./helpers";

import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import logo from "./assets/4reddit_logo_trans.png";
import logoGIF from "./assets/obamasphere.gif";

import LoginIcon from "@mui/icons-material/Login";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import SchoolIcon from "@mui/icons-material/School";
import GoogleIcon from "@mui/icons-material/Google";

// import "./index.css";

// temporary since importing not working: shift to that later since I can edit css file better there
let styles = {
    flexbox: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    inputField: {m: 0.5, width: 400, input: {color: "rgb(51, 118, 204)"}}
};

function HeadingText(props) {
    return (
        <React.Fragment>
            <Typography component="h1" variant="h2" sx={{m: 1}}>
                {props.signIn ? "Sign in to" : "Register on"} 4reddit
            </Typography>
            <Typography component="h1" variant="h6" sx={{m: 1}}>
                The darkest place on the interwebs
            </Typography>
        </React.Fragment>
    );
}

function SignInForm(props) {
    const navigate = useNavigate();

    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [wrongFields, setWrongFields] = useState({username: 0, password: 0});

    let handleUsernameChange = event => {
        setUsername(event.target.value);
    };

    let handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    let handleSignInClick = async event => {
        event.preventDefault(); // prevents page reload

        window.localStorage.removeItem("username");
        window.localStorage.removeItem("token");

        let res = await postTo("/login", {username, password});
        if (res.status != 204) {
            res = await res.json();
        } else {
            setWrongFields({
                username: res.username,
                password: res.password
            });
        }

        if (res.success) {
            window.localStorage.setItem("username", res.userData.username);
            window.localStorage.setItem("token", res.token);
            navigate(`/u/${res.userData.username}`);
            window.location.reload();
        } else {
            setWrongFields({
                username: res.username,
                password: res.password
            });
        }
    };

    return (
        <React.Fragment>
            <HeadingText signIn={true} />
            <Grid
                style={{
                    ...styles.flexbox,
                    flexDirection: "column",
                    justifyContent: "space-evenly"
                }}
            >
                <TextField
                    type="text"
                    label="Username"
                    variant="outlined"
                    sx={styles.inputField}
                    onChange={handleUsernameChange}
                    error={wrongFields.username}
                    helperText={
                        wrongFields.username ? "Incorrect username" : ""
                    }
                />
                <TextField
                    type="password"
                    label="Password"
                    variant="outlined"
                    sx={styles.inputField}
                    onChange={handlePasswordChange}
                    error={wrongFields.password}
                    helperText={
                        wrongFields.password ? "Incorrect password" : ""
                    }
                />
                <Button
                    variant="contained"
                    size="large"
                    type="submit"
                    endIcon={<LoginIcon />}
                    sx={{mt: 1}}
                    disabled={
                        username.length === 0 || password.length === 0
                            ? true
                            : false
                    }
                    onClick={handleSignInClick}
                >
                    Sign in
                </Button>
            </Grid>
        </React.Fragment>
    );
}

function RegForm(props) {
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [email, setEmail] = useState("");
    let [number, setNumber] = useState("");
    let [age, setAge] = useState("ok");

    let states = {
        firstName: [firstName, setFirstName],
        lastName: [lastName, setLastName],
        username: [username, setUsername],
        password: [password, setPassword],
        email: [email, setEmail],
        number: [number, setNumber],
        age: [age, setAge]
    };

    const navigate = useNavigate();

    let getGridStyle = (justify = "center") => {
        return {...styles.flexbox, justifyContent: justify};
    };

    let getTextFieldStyle = (label, formType, width = 250, type = "text") => {
        return {
            label,
            type,
            variant: "filled",
            sx: {...styles.inputField, width},
            required: true,
            onChange: e => handleFieldFill(e, formType)
        };
    };

    let handleFieldFill = (event, field) => {
        states[field][1](event.target.value);
    };

    let formatData = () => {
        let formattedData = {};
        for (let state in states) {
            if (state == "age") {
                formattedData.dob = states[state][0];
            } else {
                formattedData[state] = states[state][0];
            }
        }
        formattedData.followers = [];
        formattedData.following = [];
        formattedData.savedPosts = [];

        return formattedData;
    };

    let handleRegClick = event => {
        event.preventDefault();
        postTo("/users", formatData())
            .then(async response => {
                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem("username", data.username);
                    localStorage.setItem("token", data.token);
                    navigate(`/u/${username}`);
                    window.location.reload();
                } else {
                    document.write("oops");
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <React.Fragment>
            <HeadingText signIn={false} />
            <Grid style={getGridStyle()}>
                <TextField {...getTextFieldStyle("First name", "firstName")} />
                <TextField {...getTextFieldStyle("Last name", "lastName")} />
            </Grid>
            <Grid style={getGridStyle()}>
                <TextField {...getTextFieldStyle("Username", "username")} />
                <TextField
                    {...getTextFieldStyle(
                        "Password",
                        "password",
                        250,
                        "password"
                    )}
                />
            </Grid>
            <Grid style={getGridStyle()}>
                <TextField
                    {...getTextFieldStyle("Email", "email", 510, "email")}
                    // error={
                    //     this.state.forms.email.length != 0 &&
                    //     (!this.state.forms.email.includes("@") ||
                    //         !this.state.forms.email.includes("."))
                    // }
                    // fullWidth
                />
            </Grid>
            <Grid style={getGridStyle()}>
                <TextField
                    {...getTextFieldStyle(
                        "Contact number",
                        "number",
                        250,
                        "number"
                    )}
                    inputProps={{maxLength: 10}}
                />
                <TextField
                    {...getTextFieldStyle("Age (18+)", "age", 250, "number")}
                    error={age != "ok" && age < 18}
                />
            </Grid>
            <Button
                variant="contained"
                size="large"
                type="submit"
                endIcon={<BorderColorOutlinedIcon />}
                sx={{mt: 1}}
                disabled={
                    Object.keys(states).every(item => {
                        return item === "age"
                            ? item != "ok" && states[item][0] >= 18
                            : Boolean(states[item][0]);
                    })
                        ? false
                        : true
                }
                onClick={handleRegClick}
            >
                Register
            </Button>
        </React.Fragment>
    );
}

function BottomText(props) {
    return (
        <React.Fragment>
            <Grid sx={{textAlign: "center"}}>
                <Typography component="h6" variant="h6">
                    {props.showSignIn
                        ? "Don't have an account?"
                        : "Already have an account?"}
                </Typography>
                <Button variant="text" size="small" onClick={props.onClick}>
                    {props.showSignIn ? "Register" : "Sign in"} here
                </Button>
            </Grid>
            <Grid
                display="flex"
                justifyContent="center"
                spacing={2}
                marginTop={3}
                container
            >
                <Grid item>
                    <Button
                        variant="contained"
                        size="large"
                        type="submit"
                        endIcon={<SchoolIcon />}
                        sx={{mt: 1}}
                        color="warning"
                        onClick={() =>
                            (window.location.href =
                                "http://localhost:8000/4reddit/api/login/cas")
                        }
                    >
                        Sign in using IIIT CAS
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        size="large"
                        type="submit"
                        endIcon={<GoogleIcon />}
                        sx={{mt: 1}}
                        color="error"
                    >
                        Sign in using Google
                    </Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default function LoginPage(props) {
    const [showSignIn, setShowSignIn] = useState(true);

    const handleClick = () => {
        setShowSignIn(!showSignIn);
    };

    return (
        <React.Fragment>
            <CssBaseline />

            <div style={{...styles.flexbox}}>
                <Logo
                    sx={{
                        height: "256px",
                        width: "256px",
                        marginTop: "20px",
                        borderRadius: "50%"
                    }}
                    href={ROOT}
                />
            </div>

            <Grid component="form" sx={{m: 1, textAlign: "center"}}>
                {showSignIn ? <SignInForm /> : <RegForm />}
            </Grid>
            <BottomText showSignIn={showSignIn} onClick={handleClick} />
        </React.Fragment>
    );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
