import {useState} from "react";
import Button from "@mui/material/Button";

export default function RemoveFollow(props) {
    const [removed, setRemoved] = useState(false);

    const handleClick = () => {
        props.onClick();
        setRemoved(true);
    };
    return (
        <Button variant="outlined" onClick={handleClick} disabled={removed}>
            {props.following
                ? removed
                    ? "Unfollowed"
                    : "Unfollow"
                : removed
                ? "Removed"
                : "Remove"}
        </Button>
    );
}
