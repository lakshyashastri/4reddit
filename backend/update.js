import {Schema} from "mongoose";
import {getModelCon} from "./config/connections.js";

async function updateBoarditSchema() {
    const [client, Boardits] = await getModelCon("boardits");

    try {
        const result = await Boardits.bulkWrite([
            {
                updateMany: {
                    filter: {},
                    update: {$set: {stats: {}}}
                }
            }
        ]);
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

updateBoarditSchema();
