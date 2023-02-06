import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ConfirmationDialog(props) {
    const handleNo = () => {
        props.setOpen(false);
    };

    const handleYes = () => {
        handleNo();
        props.action();
    };

    return (
        <Dialog open={props.open} onClose={handleNo}>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{props.description}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleNo}>No</Button>
                <Button onClick={handleYes} autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}
