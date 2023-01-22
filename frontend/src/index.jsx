import React from "react";
import ReactDOM from "react-dom/client";

// import {HeadingText, BottomText} from "./text";

import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import logo from "./assets/4reddit_logo.png";
import logoGIF from "./assets/obamasphere.gif";

import LoginIcon from "@mui/icons-material/Login";
import {TurnRightSharp} from "@mui/icons-material";
// import "./index.css";

// temporary since importing not working: shift to that later since I can edit css file better there
let styles = {
    logo: {
        height: "256px",
        width: "256px",
        marginTop: "20px",
        borderRadius: "50%"
    },
    flexbox: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    inputField: {m: 0.5, width: 400, input: {color: "rgb(51, 118, 204)"}}
};

function HeadingText(props) {
    return (
        <Typography component="h1" variant="h3" sx={{m: 1}}>
            Sign in
        </Typography>
    );
}

class Logo extends React.Component {
    state = {
        hovering: false
    };

    render() {
        return (
            <React.Fragment>
                <div style={styles.flexbox}>
                    <img
                        src={this.state.hovering ? logoGIF : logo}
                        onMouseOver={() => this.setState({hovering: true})}
                        onMouseOut={() => this.setState({hovering: false})}
                        style={styles.logo}
                    />
                </div>
            </React.Fragment>
        );
    }
}

class LoginForm extends React.Component {
    state = {
        username: "",
        password: ""
    };

    handleUsernameChange = event => {
        this.setState({
            username: event.target.value
        });
    };

    handlePasswordChange = event => {
        this.setState({
            password: event.target.value
        });
    };

    render() {
        return (
            <div
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
                    onChange={this.handleUsernameChange}
                />
                <TextField
                    type="password"
                    label="Password"
                    variant="outlined"
                    sx={styles.inputField}
                    onChange={this.handlePasswordChange}
                />
                <Button
                    variant="contained"
                    size="large"
                    endIcon={<LoginIcon />}
                    sx={{mt: 1}}
                    disabled={
                        this.state.username.length === 0 ||
                        this.state.password.length === 0
                            ? true
                            : false
                    }
                >
                    Sign in
                </Button>
            </div>
        );
    }
}

function BottomText(props) {
    return (
        <Box sx={{textAlign: "center"}}>
            <Typography component="h6" variant="h6">
                Don't have an account?
            </Typography>
            <Button variant="text" size="small">
                Register
            </Button>
        </Box>
    );
}

class LoginPage extends React.Component {
    // handleChange(event) {
    //     console.log(event.target.value);
    // }

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <Logo />
                <Box component="form" sx={{m: 1, mb: 3, textAlign: "center"}}>
                    <HeadingText />
                    <LoginForm />
                </Box>
                <BottomText />
            </React.Fragment>
        );
    }
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<LoginPage />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
