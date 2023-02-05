let API_PATH = "http://localhost:3001/4reddit/api";

export function postTo(url, data) {
    return fetch(API_PATH + url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
}

export async function getFrom(url) {
    let res = await fetch(API_PATH + url);
    if (res.ok) {
        let data = await res.json();
        return data;
    } else {
        return res.statusText;
    }
}
