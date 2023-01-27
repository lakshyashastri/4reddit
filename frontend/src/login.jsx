import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import Logo from "./components/Logo";

import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import logo from "./assets/4reddit_logo_trans.png";
import logoGIF from "./assets/obamasphere.gif";

import LoginIcon from "@mui/icons-material/Login";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";

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

    let handleSignInClick = event => {
        event.preventDefault();
        if (username == "admin" && password == "admin") {
            window.localStorage.setItem("LOGGED_IN", JSON.stringify(true));
            navigate(`/u/${username}`);
        } else {
            setWrongFields({
                username: username == "admin" ? 0 : 1,
                password: password == "admin" ? 0 : 1
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

class RegForm extends React.Component {
    state = {
        forms: {
            firstName: "",
            lastName: "",
            username: "",
            password: "",
            email: "",
            number: "",
            age: 0
        }
    };

    constructor(props) {
        super(props);
    }

    getGridStyle(justify = "center") {
        return {...styles.flexbox, justifyContent: justify};
    }

    getTextFieldStyle = (label, formType, width = 250, type = "text") => {
        return {
            label,
            type,
            variant: "filled",
            sx: {...styles.inputField, width},
            required: true,
            onChange: e => this.handleFieldFill(e, formType)
        };
    };

    handleFieldFill = (event, field) => {
        let formValues = Object.assign({}, this.state.forms);
        formValues[field] = event.target.value;
        this.setState({forms: formValues});
    };

    render() {
        return (
            <React.Fragment>
                <HeadingText signIn={false} />
                <Grid style={this.getGridStyle()}>
                    <TextField
                        {...this.getTextFieldStyle("First name", "firstName")}
                    />
                    <TextField
                        {...this.getTextFieldStyle("Last name", "lastName")}
                    />
                </Grid>
                <Grid style={this.getGridStyle()}>
                    <TextField
                        {...this.getTextFieldStyle("Username", "username")}
                    />
                    <TextField
                        {...this.getTextFieldStyle(
                            "Password",
                            "password",
                            250,
                            "password"
                        )}
                    />
                </Grid>
                <Grid style={this.getGridStyle()}>
                    <TextField
                        {...this.getTextFieldStyle(
                            "Email",
                            "email",
                            510,
                            "email"
                        )}
                        // fullWidth
                    />
                </Grid>
                <Grid style={this.getGridStyle()}>
                    <TextField
                        {...this.getTextFieldStyle("Contact number", "number")}
                    />
                    <TextField
                        {...this.getTextFieldStyle("Age", "age", 250, "number")}
                    />
                </Grid>
                <Button
                    variant="contained"
                    size="large"
                    type="submit"
                    endIcon={<BorderColorOutlinedIcon />}
                    sx={{mt: 1}}
                    disabled={
                        Object.values(this.state.forms).every(item =>
                            Boolean(item)
                        )
                            ? false
                            : true
                    }
                >
                    Register
                </Button>
            </React.Fragment>
        );
    }
}

function BottomText(props) {
    return (
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
    );
}

export default class LoginPage extends React.Component {
    state = {
        showSignIn: true
    };

    handleClick = () => {
        this.setState({
            showSignIn: !this.state.showSignIn
        });
    };

    render() {
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
                        href="/"
                    />
                </div>

                <Grid component="form" sx={{m: 1, textAlign: "center"}}>
                    {this.state.showSignIn ? <SignInForm /> : <RegForm />}
                </Grid>
                <BottomText
                    showSignIn={this.state.showSignIn}
                    onClick={this.handleClick}
                />
            </React.Fragment>
        );
    }
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
