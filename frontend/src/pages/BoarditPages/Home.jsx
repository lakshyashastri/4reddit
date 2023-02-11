import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Grid from "@mui/material/Grid";

import {getFrom} from "../../helpers";

import FourBar from "../../components/FourBar";
import BoarditCard from "../../components/BoarditPage/BoarditCard";
import Loading from "../../components/Loading";

export default function BoarditPage(props) {
    const [boarditData, setBoarditData] = useState(null);

    const {boarditName} = useParams();

    useEffect(() => {
        (async () => {
            let data = await getFrom(`/boardits/${boarditName}`);
            setBoarditData(data[0]);
        })();
    }, []);

    return (
        <React.Fragment>
            <FourBar boarditName={boarditName} />
            <Grid
                sx={{
                    display: "flex",
                    justifyContent: "left",
                    marginTop: "20px"
                }}
                container
            >
                <Grid item>
                    {boarditData ? (
                        <BoarditCard
                            boarditName={boarditName}
                            boarditData={boarditData}
                        />
                    ) : (
                        <Loading />
                    )}
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
