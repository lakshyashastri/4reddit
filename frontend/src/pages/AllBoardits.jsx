import React from "react";
import Box from "@mui/material/Box";

import FourBar from "../components/FourBar";
import AllBoarditsTable from "../components/AllBoardits";

export default function AllBoarditsPage(props) {
    return (
        <React.Fragment>
            <FourBar />
            <Box mt={2}>
                <AllBoarditsTable />
            </Box>
        </React.Fragment>
    );
}
