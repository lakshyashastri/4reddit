import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {Typography} from "@mui/material";

import FourBar from "../components/FourBar";

export default function BoarditPage(props) {
    const {boarditName} = useParams();

    return (
        <React.Fragment>
            <FourBar boarditName={boarditName} />
        </React.Fragment>
    );
}
