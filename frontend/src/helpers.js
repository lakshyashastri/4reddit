let API_PATH = "http://localhost:3001/4reddit/api";

export function postTo(url, data) {
    return fetch(API_PATH + url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(data)
    });
}

export async function getFrom(url) {
    let res = await fetch(API_PATH + url, {
        headers: {authorization: `Bearer ${localStorage.getItem("token")}`}
    });
    if (res.ok) {
        const isJson = res.headers
            .get("content-type")
            ?.includes("application/json");

        if (isJson) {
            let data = await res.json();
            return data;
        } else {
            return res;
        }
    } else {
        return res;
    }
}

export const modalStyling = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
};

export function parseQuery(location) {
    let params = {};
    for (let param of location.slice(1).split("&")) {
        const paramSet = param.split("=");
        params[paramSet[0]] = paramSet[1];
    }
    return params;
}
