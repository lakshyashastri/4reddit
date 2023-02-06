import crypto from "crypto";

export function getID(length = 3) {
    return crypto.randomBytes(length).toString("hex");
}
