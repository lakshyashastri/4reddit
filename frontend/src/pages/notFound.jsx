import React from "react";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

import {ROOT} from "../components/ProtectedRoute";

export default function NotFound(props) {
    const navigate = useNavigate();

    let handleClick = () => {
        navigate(ROOT);
    };

    return (
        <React.Fragment>
            <h1>404</h1>
            <Button size="large" variant="outlined" onClick={handleClick}>
                Go home
            </Button>
        </React.Fragment>
    );
}
