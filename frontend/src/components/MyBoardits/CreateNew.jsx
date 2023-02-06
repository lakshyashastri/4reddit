import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import CreateIcon from "@mui/icons-material/Create";

export default function CreateNew(props) {
    return (
        <Button
            variant="contained"
            onClick={() => props.modalFunc(!props.modal)}
            size="large"
        >
            <Box mt={0.8} mr={1}>
                <CreateIcon />
            </Box>
            Create new Boardit
        </Button>
    );
}
