import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loading(props) {
    return (
        <Box sx={{display: "flex", justifyContent: "center"}}>
            <CircularProgress
                color={props.color ? props.color : "info"}
                size={props.size ? props.size : 60}
            />
        </Box>
    );
}
