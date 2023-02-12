import React, {useState} from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import FourBar from "../components/FourBar";
import CreateNew from "../components/MyBoardits/CreateNew";
import NewForm from "../components/MyBoardits/NewForm";
import MyBoarditsTable from "../components/MyBoardits/MyTable";
import {modalStyling} from "../helpers";

export default function MyBoarditsPage(props) {
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);

    return (
        <React.Fragment>
            <FourBar />
            <Box mt={2} display="flex" justifyContent="center">
                <CreateNew modal={showModal} modalFunc={setShowModal} />
            </Box>
            <Modal sx={{marginTop: 3}} open={showModal} onClose={handleClose}>
                <Fade in={showModal}>
                    <Box sx={modalStyling}>
                        <NewForm modalFunc={setShowModal} />
                    </Box>
                </Fade>
            </Modal>
            <MyBoarditsTable />
        </React.Fragment>
    );
}
