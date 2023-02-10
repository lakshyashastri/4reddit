import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {Typography} from "@mui/material";

import FourBar from "../../components/FourBar";
import UserTable from "../../components/BoarditPage/UserTable";

export default function BoarditUsers(props) {
    const {boarditName} = useParams();

    return (
        <React.Fragment>
            <FourBar boarditName={boarditName} />
            <UserTable boarditName={boarditName} />
        </React.Fragment>
    );
}
