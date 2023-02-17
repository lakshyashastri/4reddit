import crypto from "crypto";

export function getID(length = 3) {
    return crypto.randomBytes(length).toString("hex");
}

export async function sendMail(to, message) {
    let res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            service_id: "service_c9f9din",
            template_id: "template_vqvpbes",
            user_id: "C7y0SBYUWwZ-JTYZ3",
            template_params: {
                send_to: to,
                content: message
            },
            accessToken: "cStOPbPpNC124nH0V4XN4"
        })
    });
    return res;
}
