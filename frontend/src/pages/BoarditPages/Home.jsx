import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Grid from "@mui/material/Grid";

import {getFrom} from "../../helpers";

import FourBar from "../../components/FourBar";
import BoarditCard from "../../components/BoarditPage/BoarditCard";
import Posts from "../../components/Posts";
import NotFound from "../notFound";
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

    return boarditData === undefined ? (
        <NotFound message={`r/${boarditName} does not exist`} />
    ) : (
        <React.Fragment>
            <FourBar boarditName={boarditName} />
            <Grid
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
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
                <Grid item>
                    <Posts boardit={boarditName} />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
